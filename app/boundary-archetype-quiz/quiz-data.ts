export type ArchetypeKey = 'open-door' | 'cracked-window' | 'sacred-keeper'
export type AreaKey = 'spellbreaker' | 'time-keeper' | 'sacred-vessel' | 'resource-guardian'

export interface QuizOption {
  text: string
  archetype: ArchetypeKey
}

export interface Question {
  id: number
  area: AreaKey
  text: string
  options: QuizOption[]
}

export interface Archetype {
  key: ArchetypeKey
  name: string
  tagline: string
  description: string
  superpower: string
  challenge: string
}

export interface QuizResult {
  archetype: ArchetypeKey
  primaryArea: AreaKey
  scores: { archetype: Record<ArchetypeKey, number>; area: Record<AreaKey, number> }
}

export const archetypes: Record<ArchetypeKey, Archetype> = {
  'open-door': {
    key: 'open-door',
    name: 'The Open Door',
    tagline: 'You give the yes before you\'ve checked in with yourself.',
    description:
      'You are the person who\'s always available — not because you choose to be, but because the yes fires before you\'ve decided anything. The boundary exists in your head. It just never makes it out of your mouth. You\'re not over-giving because you\'re weak. You\'re over-giving because somewhere early on, you learned that your availability was the price of belonging.',
    superpower:
      'You make people feel held, seen, and safe. That capacity for presence is real — and rare. When you direct it intentionally, it becomes something extraordinary.',
    challenge:
      'Right now, it\'s not directed. It\'s automatic. And the automatic yes is draining you in ways you\'ve stopped naming because naming it felt like complaining.',
  },
  'cracked-window': {
    key: 'cracked-window',
    name: 'The Cracked Window',
    tagline: 'You set the limit. It breaks in the first 60 seconds.',
    description:
      'You know your limits. You set them. You say the no — and then someone pushes back, the silence gets uncomfortable, or they look disappointed, and the window cracks. Not because you\'re a pushover. Because the moment after the boundary is where the pressure lives, and you haven\'t had a system for that moment yet.',
    superpower:
      'You\'re self-aware enough to set the limit in the first place. That\'s further than most people get. The infrastructure is there — it just needs reinforcement.',
    challenge:
      'Every time you cave after holding, it costs you more than the original ask — because now you\'ve also paid the credibility tax. People learn your no is an opening offer.',
  },
  'sacred-keeper': {
    key: 'sacred-keeper',
    name: 'The Sacred Keeper',
    tagline: 'You hold the boundary. Then audit it for an hour.',
    description:
      'You\'ve done enough work to hold limits under pressure. That\'s not nothing — it\'s two full stages of work most people never complete. The leak isn\'t in the boundary itself. It\'s in what comes after: the guilt that fires in the silence, the follow-up that softens what you said, the internal audit that runs until you\'ve almost talked yourself into taking it back.',
    superpower:
      'You can hold a limit when it counts. That foundation is built. What you\'re building now is the quiet after — the part where the limit stands without you defending it to yourself.',
    challenge:
      'The boundary holds but the aftermath costs you. You enforce the limit and then pay a maintenance tax on it for the next 24 hours. That\'s the pattern you\'re interrupting now.',
  },
}

export const areaLabels: Record<AreaKey, string> = {
  spellbreaker: 'Spellbreaker',
  'time-keeper': 'Time Keeper',
  'sacred-vessel': 'Sacred Vessel',
  'resource-guardian': 'Resource Guardian',
}

export const areaDescriptions: Record<AreaKey, { what: string; where: string }> = {
  spellbreaker: {
    what: 'Your voice domain — truth, communication, and saying the thing clearly, once, without a disclaimer.',
    where: 'This is where you stay silent when you should speak, soften truth until it\'s unrecognizable, or say it and then spend an hour wondering if you were wrong to.',
  },
  'time-keeper': {
    what: 'Your time and availability domain — what you protect tells people exactly what you think you\'re worth.',
    where: 'This is where you\'re always on, always available, always the one who stays late — not because you want to be, but because you haven\'t decided otherwise.',
  },
  'sacred-vessel': {
    what: 'Your energy and emotional field — what you absorb, carry, and allow into your space.',
    where: 'This is where you end the day drained without knowing why, where other people\'s emergencies become your emergencies, and where empathy becomes obligation.',
  },
  'resource-guardian': {
    what: 'Your capacity, money, and self-regard — the promises you make to yourself first.',
    where: 'This is where your own commitments are the most flexible ones you have, where rest is something you earn by collapsing, and where your needs are always the ones that get cut.',
  },
}

export const questions: Question[] = [
  // ─── SPELLBREAKER ───────────────────────────────────────────────────────────
  {
    id: 1,
    area: 'spellbreaker',
    text: 'Someone says something about you that isn\'t true. You:',
    options: [
      { text: 'Let it go. You\'ll hold the correction in your head and act differently next time without saying anything.', archetype: 'open-door' },
      { text: 'Start to address it — hear their pushback — say "You\'re probably right" before you\'ve finished your thought.', archetype: 'cracked-window' },
      { text: 'Correct it clearly — then spend the next hour replaying whether you came across as defensive.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 2,
    area: 'spellbreaker',
    text: 'You need to tell someone that what they did hurt you. You:',
    options: [
      { text: 'Don\'t bring it up. You process it alone and act like everything\'s fine the next time you see them.', archetype: 'open-door' },
      { text: 'Bring it up — accept their explanation before you\'ve finished saying yours — close the conversation early.', archetype: 'cracked-window' },
      { text: 'Say it once, clearly — and then follow up the next day to make sure you weren\'t too harsh about it.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 3,
    area: 'spellbreaker',
    text: 'In a group setting, someone says something you disagree with. You:',
    options: [
      { text: 'Stay quiet. You find the part you can agree with and let the rest go.', archetype: 'open-door' },
      { text: 'Start to push back — soften it mid-sentence into a question so it\'s less confrontational — drop the thread.', archetype: 'cracked-window' },
      { text: 'Say the thing directly — then spend the drive home reading the room in your memory to see if you misread it.', archetype: 'sacred-keeper' },
    ],
  },
  // ─── TIME KEEPER ────────────────────────────────────────────────────────────
  {
    id: 4,
    area: 'time-keeper',
    text: 'A message comes in at 9pm asking for something non-urgent. You:',
    options: [
      { text: 'Respond. Because what if they think you\'re ignoring them?', archetype: 'open-door' },
      { text: 'Put the phone down — pick it back up 20 minutes later and reply anyway.', archetype: 'cracked-window' },
      { text: 'Leave it until morning — and note the thought "I hope that didn\'t come across as cold."', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 5,
    area: 'time-keeper',
    text: 'Someone asks you to take on something extra when you\'re already at capacity. You:',
    options: [
      { text: 'Take it. You figure out where it fits later.', archetype: 'open-door' },
      { text: 'Say "I\'m pretty stretched" — hear "I know, but it\'ll be quick" — agree to it.', archetype: 'cracked-window' },
      { text: 'Decline with a clear reason — then send a follow-up over-explaining your capacity so they don\'t think it\'s personal.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 6,
    area: 'time-keeper',
    text: 'A meeting runs over your hard stop. You:',
    options: [
      { text: 'Stay. You\'d feel bad walking out while people are still mid-conversation.', archetype: 'open-door' },
      { text: 'Say "I have a hard stop" at the start — and still stay 20 minutes past it when it gets interesting.', archetype: 'cracked-window' },
      { text: 'Leave when you said you would — and text the organizer afterward to make sure it wasn\'t taken the wrong way.', archetype: 'sacred-keeper' },
    ],
  },
  // ─── SACRED VESSEL ──────────────────────────────────────────────────────────
  {
    id: 7,
    area: 'sacred-vessel',
    text: 'A friend calls in full crisis mode — again. You:',
    options: [
      { text: 'Pick up every time. You\'re their first call and that means something.', archetype: 'open-door' },
      { text: 'Tell yourself you\'ll keep it to 20 minutes — hang up an hour later, completely drained.', archetype: 'cracked-window' },
      { text: 'Hold the 20-minute limit — and feel guilty the rest of the day for not being more available when she needed someone.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 8,
    area: 'sacred-vessel',
    text: 'You walk into a room where the tension is thick. You:',
    options: [
      { text: 'Immediately start managing it — checking in, lightening the mood, absorbing the weight so others don\'t have to.', archetype: 'open-door' },
      { text: 'Try not to take it on — feel yourself absorbing it anyway — carry it for the rest of the day without deciding to.', archetype: 'cracked-window' },
      { text: 'Let it exist without fixing it — and replay it later wondering whether you should have done something about it.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 9,
    area: 'sacred-vessel',
    text: 'After an emotionally heavy day, your reset looks like:',
    options: [
      { text: 'There\'s no reset. You\'re already thinking about who needs you tomorrow.', archetype: 'open-door' },
      { text: 'You plan rest — it gets interrupted by someone\'s urgency or your own guilt — you give up and keep going.', archetype: 'cracked-window' },
      { text: 'You protect your downtime — and feel a low hum of "should I be more available right now" the whole time.', archetype: 'sacred-keeper' },
    ],
  },
  // ─── RESOURCE GUARDIAN ──────────────────────────────────────────────────────
  {
    id: 10,
    area: 'resource-guardian',
    text: 'You told yourself you\'d stop at a certain time today. That time arrives. You:',
    options: [
      { text: 'Keep going. Your commitment to yourself is the most flexible one you have.', archetype: 'open-door' },
      { text: 'Start to wrap up — one more thing pulls you back in — you stay 45 minutes longer than you said you would.', archetype: 'cracked-window' },
      { text: 'Stop when you said you would — and immediately start mentally listing what still needs to get done.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 11,
    area: 'resource-guardian',
    text: 'Someone asks for something you genuinely don\'t have the money, time, or energy for. You:',
    options: [
      { text: 'Find a way to say yes. You\'ll sort out the aftermath on your own.', archetype: 'open-door' },
      { text: 'Start to decline — they push back or express disappointment — you agree to a smaller version that still costs more than you have.', archetype: 'cracked-window' },
      { text: 'Hold the no — and spend the next day running the numbers in your head to see if you could have made it work after all.', archetype: 'sacred-keeper' },
    ],
  },
  {
    id: 12,
    area: 'resource-guardian',
    text: 'Your relationship with your own needs right now is:',
    options: [
      { text: 'I defer them. Other people\'s needs feel more urgent and more real than mine.', archetype: 'open-door' },
      { text: 'I name them — and then talk myself out of them when something or someone else needs me.', archetype: 'cracked-window' },
      { text: 'I protect them — and occasionally run an audit on whether doing so makes me selfish.', archetype: 'sacred-keeper' },
    ],
  },
]

export function calculateResult(answers: number[]): QuizResult {
  const archetypeScores: Record<ArchetypeKey, number> = {
    'open-door': 0,
    'cracked-window': 0,
    'sacred-keeper': 0,
  }
  const areaScores: Record<AreaKey, number> = {
    spellbreaker: 0,
    'time-keeper': 0,
    'sacred-vessel': 0,
    'resource-guardian': 0,
  }

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex]
    const chosen = question.options[answerIndex]
    archetypeScores[chosen.archetype] += 1

    // Area score = how much work this area needs (Open Door = 2, Cracked Window = 1, Sacred Keeper = 0)
    const needsWork =
      chosen.archetype === 'open-door' ? 2 : chosen.archetype === 'cracked-window' ? 1 : 0
    areaScores[question.area] += needsWork
  })

  const archetype = (Object.entries(archetypeScores) as [ArchetypeKey, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0]

  const primaryArea = (Object.entries(areaScores) as [AreaKey, number][]).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0]

  return {
    archetype,
    primaryArea,
    scores: { archetype: archetypeScores, area: areaScores },
  }
}
