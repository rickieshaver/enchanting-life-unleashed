/**
 * Unit tests: quiz-submit and qsg-optin routes attach contacts to the
 * ELU Newsletter segment after creation (funnel-to-newsletter wiring).
 *
 * Mocking strategy:
 *  - @/lib/resend/client  → resend.contacts.create + resend.contacts.segments.add
 *  - @/lib/resend/send    → sendEmail (no-op — we're not testing drip scheduling)
 *  - @/lib/turnstile/verify → always passes
 *  - next/server          → minimal NextResponse stub
 *
 * RESEND_NEWSLETTER_AUDIENCE_ID is read from env inside attachToNewsletter.
 * Tests set it via process.env directly — no real segment id is hardcoded.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ---------------------------------------------------------------------------
// Constants used across tests (mock values — never real credentials)
// ---------------------------------------------------------------------------
const MOCK_SEGMENT_ID = 'test-segment-id-00000000'
const MOCK_CONTACT_ID = 'test-contact-id-11111111'
const MOCK_EMAIL = 'unit-test@example.com'

// ---------------------------------------------------------------------------
// Mock: Resend client
// ---------------------------------------------------------------------------
const mockContactsCreate = vi.fn()
const mockSegmentsAdd = vi.fn()

vi.mock('@/lib/resend/client', () => ({
  resend: {
    contacts: {
      create: mockContactsCreate,
      segments: {
        add: mockSegmentsAdd,
      },
    },
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'email-id' }, error: null }),
    },
  },
  FROM: 'Ren <connect@enchantinglifeunleashed.com>',
  SITE_URL: 'https://enchantinglifeunleashed.com',
  getResend: vi.fn(),
}))

// ---------------------------------------------------------------------------
// Mock: sendEmail — no-op (drip scheduling is not under test here)
// ---------------------------------------------------------------------------
vi.mock('@/lib/resend/send', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}))

// ---------------------------------------------------------------------------
// Mock: Turnstile — always passes
// ---------------------------------------------------------------------------
vi.mock('@/lib/turnstile/verify', () => ({
  verifyTurnstileToken: vi.fn().mockResolvedValue({ success: true }),
}))

// ---------------------------------------------------------------------------
// Mock: next/server — minimal stub so route files can import without Next.js
// ---------------------------------------------------------------------------
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      _stub: true,
      body,
      status: init?.status ?? 200,
    }),
    redirect: (url: unknown, status?: number) => ({
      _stub: true,
      redirect: String(url),
      status,
    }),
  },
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeJsonRequest(body: unknown): Request {
  return {
    headers: { get: (k: string) => (k === 'content-type' ? 'application/json' : null) },
    json: () => Promise.resolve(body),
  } as unknown as Request
}

// Default success: creates a new contact (returns data with an id)
function setupCreateSuccess() {
  mockContactsCreate.mockResolvedValue({
    data: { id: MOCK_CONTACT_ID },
    error: null,
  })
}

// Already-exists: create returns an error with an "already exists" message
function setupCreateAlreadyExists() {
  mockContactsCreate.mockResolvedValue({
    data: null,
    error: { message: 'Contact already exists' },
  })
}

// Default: segment add succeeds
function setupSegmentAddSuccess() {
  mockSegmentsAdd.mockResolvedValue({ data: {}, error: null })
}

// ---------------------------------------------------------------------------
// quiz-submit route tests
// ---------------------------------------------------------------------------
describe('quiz-submit: newsletter segment wiring', () => {
  // Dynamically import to ensure mocks are in place first
  let POST: (req: Request) => Promise<unknown>

  beforeEach(async () => {
    vi.resetModules()
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_NEWSLETTER_AUDIENCE_ID = MOCK_SEGMENT_ID
    setupCreateSuccess()
    setupSegmentAddSuccess()
    const mod = await import('@/app/api/quiz-submit/route')
    POST = mod.POST
  })

  afterEach(() => {
    vi.clearAllMocks()
    delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID
  })

  const validQuizBody = {
    firstName: 'Test',
    email: MOCK_EMAIL,
    archetype: 'open-door',
    primaryArea: 'spellbreaker',
    resultKey: 'open-door-spellbreaker',
    turnstileToken: 'mock-token',
    scores: {
      archetype: { 'open-door': 10, 'cracked-window': 5, 'sacred-keeper': 3 },
      area: { spellbreaker: 8, 'time-keeper': 4, 'sacred-vessel': 3, 'resource-guardian': 2 },
    },
  }

  it('calls contacts.segments.add with the newsletter segment id after a fresh contact create', async () => {
    await POST(makeJsonRequest(validQuizBody))

    expect(mockContactsCreate).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      contactId: MOCK_CONTACT_ID,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('falls back to email when contact already existed (no contactId)', async () => {
    setupCreateAlreadyExists()

    await POST(makeJsonRequest(validQuizBody))

    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('still returns ok:true even when segment attach fails', async () => {
    mockSegmentsAdd.mockResolvedValue({
      data: null,
      error: { message: 'Segment not found' },
    })

    const response = await POST(makeJsonRequest(validQuizBody)) as { body: { ok: boolean } }

    expect(response.body.ok).toBe(true)
    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
  })

  it('returns ok:false (500) when contacts.create has a hard error — segment attach is skipped', async () => {
    mockContactsCreate.mockResolvedValue({
      data: null,
      error: { message: 'API rate limit exceeded' },
    })

    const response = await POST(makeJsonRequest(validQuizBody)) as { status: number; body: { ok: boolean } }

    expect(response.status).toBe(500)
    expect(response.body.ok).toBe(false)
    // Segment add must NOT be called when contact creation hard-fails
    expect(mockSegmentsAdd).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// qsg-optin route tests
// ---------------------------------------------------------------------------
describe('qsg-optin: newsletter segment wiring', () => {
  let POST: (req: Request) => Promise<unknown>

  beforeEach(async () => {
    vi.resetModules()
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_NEWSLETTER_AUDIENCE_ID = MOCK_SEGMENT_ID
    setupCreateSuccess()
    setupSegmentAddSuccess()
    const mod = await import('@/app/api/qsg-optin/route')
    POST = mod.POST
  })

  afterEach(() => {
    vi.clearAllMocks()
    delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID
  })

  const validQsgBody = {
    email: MOCK_EMAIL,
    firstName: 'Test',
    source: 'qsg-optin',
    turnstileToken: 'mock-token',
  }

  it('calls contacts.segments.add with the newsletter segment id after a fresh contact create', async () => {
    await POST(makeJsonRequest(validQsgBody))

    expect(mockContactsCreate).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      contactId: MOCK_CONTACT_ID,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('falls back to email when contact already existed (no contactId)', async () => {
    setupCreateAlreadyExists()

    await POST(makeJsonRequest(validQsgBody))

    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('still returns ok:true even when segment attach fails', async () => {
    mockSegmentsAdd.mockResolvedValue({
      data: null,
      error: { message: 'Segment not found' },
    })

    const response = await POST(makeJsonRequest(validQsgBody)) as { status: number; body: { ok: boolean } }

    // QSG delivery fires regardless of segment attach outcome
    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(mockSegmentsAdd).toHaveBeenCalledOnce()
  })

  it('does NOT call segments.add when RESEND_NEWSLETTER_AUDIENCE_ID is missing', async () => {
    delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID

    await POST(makeJsonRequest(validQsgBody))

    // attachToNewsletter logs an error and returns early — segments.add never fires
    expect(mockSegmentsAdd).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// attach-to-newsletter helper unit tests
// ---------------------------------------------------------------------------
describe('attachToNewsletter helper', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_NEWSLETTER_AUDIENCE_ID = MOCK_SEGMENT_ID
    setupSegmentAddSuccess()
  })

  afterEach(() => {
    vi.clearAllMocks()
    delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID
  })

  it('uses contactId when provided', async () => {
    const { attachToNewsletter } = await import('@/lib/resend/attach-to-newsletter')
    await attachToNewsletter(MOCK_CONTACT_ID, MOCK_EMAIL, '[test]')

    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      contactId: MOCK_CONTACT_ID,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('uses email fallback when contactId is null', async () => {
    const { attachToNewsletter } = await import('@/lib/resend/attach-to-newsletter')
    await attachToNewsletter(null, MOCK_EMAIL, '[test]')

    expect(mockSegmentsAdd).toHaveBeenCalledWith({
      email: MOCK_EMAIL,
      segmentId: MOCK_SEGMENT_ID,
    })
  })

  it('does not throw when segmentId env var is missing', async () => {
    delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID
    const { attachToNewsletter } = await import('@/lib/resend/attach-to-newsletter')
    await expect(attachToNewsletter(MOCK_CONTACT_ID, MOCK_EMAIL, '[test]')).resolves.toBeUndefined()
    expect(mockSegmentsAdd).not.toHaveBeenCalled()
  })

  it('does not throw when segments.add returns an error', async () => {
    mockSegmentsAdd.mockResolvedValue({ data: null, error: { message: 'boom' } })
    const { attachToNewsletter } = await import('@/lib/resend/attach-to-newsletter')
    await expect(attachToNewsletter(MOCK_CONTACT_ID, MOCK_EMAIL, '[test]')).resolves.toBeUndefined()
  })
})
