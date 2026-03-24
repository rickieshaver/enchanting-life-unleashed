#!/usr/bin/env python3
"""2026 Moon Cycle Life Planner — Enchanting Life Unleashed"""

from datetime import date, timedelta
import calendar, sys, os

OUTPUT_HTML = "Moon_Cycle_Life_Planner_2026.html"
OUTPUT_PDF  = "Moon_Cycle_Life_Planner_2026.pdf"

WD = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
MA = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

WEEK_QUOTES = [
    "Use what resonates, leave what doesn't — your power doesn't need permission.",
    "The harvest is always proportional to the courage of the planting.",
    "What you release creates room for what you are calling in.",
    "She is both the storm and the stillness. She is becoming.",
]

# ── Moon Phase Calculation ────────────────────────────────────────────────────
def get_phase(d, full_date, new_date):
    df = (d - full_date).days
    dn = (d - new_date).days
    if df == 0:              return "🌕", "Full Moon"
    if 1 <= df <= 6:         return "🌖", "Waning Gibbous"
    if df == 7:              return "🌗", "Last Quarter"
    if 8 <= df <= 13:        return "🌘", "Waning Crescent"
    if dn == 0:              return "🌑", "New Moon"
    if 1 <= dn <= 6:         return "🌒", "Waxing Crescent"
    if dn == 7:              return "🌓", "First Quarter"
    if 8 <= dn <= 13:        return "🌔", "Waxing Gibbous"
    if -7 <= df <= -1:       return "🌔", "Waxing Gibbous"
    if df == -8:             return "🌓", "First Quarter"
    if -14 <= df <= -9:      return "🌒", "Waxing Crescent"
    if dn >= 14:             return "🌔", "Waxing Gibbous"
    return "○", "—"

def build_weeks(month_num, full_date, new_date):
    days_in_month = calendar.monthrange(2026, month_num)[1]
    mn = MA[month_num - 1]
    fd, nd = full_date.day, new_date.day
    if fd < nd:  # Full moon first (Jan–May)
        bounds = [(1, fd), (fd+1, min(fd+7, nd-1)), (min(fd+8,nd), nd), (nd+1, days_in_month)]
    else:        # New moon first (Jun–Dec)
        w1e = min(nd-1, 7)
        w3e = min(nd+7, fd-1)
        bounds = [(1, w1e), (w1e+1, nd), (nd+1, w3e), (w3e+1, days_in_month)]
    weeks = []
    for i, (s, e) in enumerate(bounds, 1):
        if s > days_in_month or s > e: continue
        e = min(e, days_in_month)
        days = []
        for dn2 in range(s, e+1):
            d = date(2026, month_num, dn2)
            emoji, pname = get_phase(d, full_date, new_date)
            days.append((WD[d.weekday()], dn2, emoji, pname))
        weeks.append({"num": i, "range": f"{mn} {s}–{mn} {e}", "days": days})
    return weeks

def phase_date_range(month_num, full_date, new_date, phase):
    days_in_month = calendar.monthrange(2026, month_num)[1]
    mn = MA[month_num - 1]
    fd, nd = full_date.day, new_date.day
    if phase == "first_qtr":
        fq = nd + 7
        if fq > days_in_month: return f"{mn} {days_in_month}"
        return f"{mn} {fq}"
    if phase == "wax_gib":
        s, e = max(1, fd-6), fd-1
        if e < 1: return f"{mn} {fd}"   # Bug 3 fix: fd=1 gave "FEB 0"; use full moon date instead
        return f"{mn} {s}–{mn} {e}"
    if phase == "wan_gib":
        s, e = fd+1, min(fd+6, days_in_month)
        return f"{mn} {s}–{mn} {e}"
    if phase == "last_qtr":
        return f"{mn} {min(fd+7, days_in_month)}"
    if phase == "wan_cres":
        s, e = fd+8, min(fd+13, days_in_month)
        if s > days_in_month: return f"{mn} {days_in_month}"
        return f"{mn} {s}–{mn} {e}"
    return ""

# ── Month Data ────────────────────────────────────────────────────────────────
MONTHS = [
  { "num":1,"name":"JANUARY","moon_name":"Wolf Moon",
    "full_date":date(2026,1,3),"full_sign":"Cancer",
    "new_date":date(2026,1,17),"new_sign":"Capricorn",
    "full_energy":"The Wolf Moon in Cancer brings deep emotional wisdom and a call to honor your inner circle. This is the pack moon — a time to strengthen bonds with those who matter most and release relationships that drain your energy.",
    "new_energy":"The New Moon in Capricorn calls you to set structured, ambitious intentions. What does success look like this year? Set one clear, measurable goal that honors both your ambition and your soul.",
    "supplies":"White/silver candle · Paper &amp; pen · Bowl of salt water",
    "ritual_steps":["Light a white or silver candle. Arrange photos of loved ones nearby.",
      "Hold both hands over your heart. Say: <i>'I honor my pack. I honor myself.'</i>",
      "Write two lists: 'My Pack' (those who nourish you) and 'What I'm Releasing.'",
      "Read your Pack list aloud, sending gratitude to each person.",
      "Read your release list, then burn it or place it in salt water to dissolve.",
      "Close: <i>'I am protected. My pack is strong. Only aligned energy enters my circle.'</i>"],
    "affirmation":"I am protected by love, surrounded by loyalty, and grounded in my own power.",
    "journal_prompts":["Who are the people I truly feel safe with?",
      "Where am I over-giving in relationships?","What part of myself have I been neglecting?",
      "If I could release one draining pattern, what would it be?"] },

  { "num":2,"name":"FEBRUARY","moon_name":"Snow Moon",
    "full_date":date(2026,2,1),"full_sign":"Leo",
    "new_date":date(2026,2,17),"new_sign":"Aquarius",
    "full_energy":"The Snow Moon in Leo is fire burning through winter's stillness. Leo energy is bold, creative, and unapologetically visible. This moon asks you to step into your power, claim your stage, and stop dimming yourself for anyone.",
    "new_energy":"The New Moon in Aquarius invites revolutionary intentions. Think beyond personal goals — what vision benefits your community? Dream bigger, break conventional thinking, and claim your authentic path.",
    "supplies":"Gold/orange candle · Mirror · Paper &amp; pen",
    "ritual_steps":["Light a gold or orange candle. Place a mirror in front of you.",
      "Hand on heart. Say: <i>'I am radiant. I am worthy of being seen.'</i>",
      "Write: 'Where I've Been Dimming My Light.' Read it aloud. Release it.",
      "Look into the mirror. Say three times: <i>'I am brilliant. I am bold. I am unleashed.'</i>",
      "Hold gold jewelry or citrine, visualizing it absorbing your intention.",
      "Blow out the candle knowing your inner fire burns regardless."],
    "affirmation":"I shine without apology. My radiance is my birthright. I am seen, celebrated, and unstoppable.",
    "journal_prompts":["Where in my life have I been playing small?",
      "What would I do if I knew I couldn't fail?","What gifts am I hiding that the world needs to see?",
      "How can I give myself permission to take up more space?"] },

  { "num":3,"name":"MARCH","moon_name":"Worm Moon",
    "full_date":date(2026,3,3),"full_sign":"Virgo",
    "new_date":date(2026,3,18),"new_sign":"Pisces",
    "full_energy":"The Worm Moon in Virgo signals rebirth through the soil. As earthworms emerge, Virgo calls you to tend your inner garden with precision. Release perfectionism while honoring your need for order. Spring is coming — first, clear the debris of winter.",
    "new_energy":"The New Moon in Pisces is the most mystical new moon of the year. Set spiritual intentions, trust your intuition, and dream beyond what your mind can plan. What does your soul want?",
    "supplies":"Green/brown candle · Small plant or seeds · Sage or herbs",
    "ritual_steps":["Light a green or brown candle. Cleanse your space with sage or herbs.",
      "Hold soil or a plant. Feel its weight. Say: <i>'I am of the earth. I am growing.'</i>",
      "Write: 'What I'm Composting' and 'What I'm Planting.'",
      "Bury or tear your composting list — literally return it to earth.",
      "Plant seeds or place your planting list beneath a plant.",
      "Visualize roots growing from your body. Say: <i>'I am rooted. I grow in my own time.'</i>"],
    "affirmation":"I release perfectionism. I embrace growth. I am grounded in my becoming.",
    "journal_prompts":["What old patterns am I ready to compost?",
      "What new habit do I want to cultivate this spring?","How can I be kinder to myself during seasons of growth?",
      "What part of my life needs more grounded, practical attention?"] },

  { "num":4,"name":"APRIL","moon_name":"Pink Moon",
    "full_date":date(2026,4,2),"full_sign":"Libra",
    "new_date":date(2026,4,17),"new_sign":"Aries",
    "full_energy":"The Pink Moon in Libra blooms with balance, beauty, and relational harmony. Libra seeks fairness, not martyrdom. Beauty, not perfection. Connection, not codependence. Peace begins within.",
    "new_energy":"The New Moon in Aries ignites a powerful new cycle. Aries is bold and pioneering. This is the new moon for new beginnings — a new project, a new direction, a new version of you. Start before you're ready.",
    "supplies":"Pink/white candle · Fresh flowers · Two papers &amp; pen",
    "ritual_steps":["Light a pink or white candle. Arrange fresh flowers nearby.",
      "Write: 'Where I Give Too Much' on one paper. 'Where I Receive Too Little' on another.",
      "Hold both papers. Notice which feels heavier.",
      "Say: <i>'I honor both giving and receiving.'</i>",
      "Choose one action to rebalance: stop over-giving + allow yourself to receive.",
      "Place your commitment paper beneath the flowers as a living reminder."],
    "affirmation":"I am balanced. I give and receive with grace. I am worthy of harmony in all things.",
    "journal_prompts":["Where in my life am I out of balance?",
      "What relationship needs more reciprocity?","How do I define beauty? Am I allowing it into my daily life?",
      "What would perfect balance look like right now?"] },

  { "num":5,"name":"MAY","moon_name":"Flower Moon",
    "full_date":date(2026,5,1),"full_sign":"Scorpio",
    "new_date":date(2026,5,16),"new_sign":"Taurus",
    "full_energy":"The Flower Moon in Scorpio is a paradox: bloom and shadow, beauty and depth. Scorpio dives beneath the surface to the roots. This moon wants your truth. What are you hiding? What needs to die so something more authentic can bloom?",
    "new_energy":"The New Moon in Taurus grounds your intentions in abundance, beauty, and sensory pleasure. What do you want to build — slowly, deliberately, with staying power? Taurus plants seeds that become forests.",
    "supplies":"Deep red/black candle · A flower · Fireproof bowl",
    "ritual_steps":["Light a deep red or black candle in a dark, dimly lit space.",
      "Hold a flower. Observe its beauty and its impermanence. Say: <i>'Both are sacred.'</i>",
      "Write: 'The Shadow I'm Ready to Face.' Read it aloud. Witness it without judgment.",
      "Safely burn or shred the paper. Say: <i>'What was hidden is now released.'</i>",
      "Write: 'What Can Now Bloom.' Place it under your flower.",
      "Say: <i>'I bloom from my depths. I am whole — shadow and light. I am unleashed.'</i>"],
    "affirmation":"I embrace my shadows. I honor my depths. I bloom from truth, not perfection.",
    "journal_prompts":["What truth have I been avoiding?",
      "What part of myself have I been rejecting or hiding?","What old version of me is ready to die so something authentic can emerge?",
      "If I stopped hiding my depth, what would bloom?"] },

  { "num":6,"name":"JUNE","moon_name":"Strawberry Moon",
    "full_date":date(2026,6,30),"full_sign":"Capricorn",
    "new_date":date(2026,6,15),"new_sign":"Gemini",
    "full_energy":"The Strawberry Moon in Capricorn is the harvest of disciplined effort. This moon isn't just about celebrating what's ripe — it's about honoring the work that got you here. The strawberries didn't grow overnight. Neither did your success.",
    "new_energy":"The New Moon in Gemini electrifies your mind. Set intentions around communication, learning, and connection. What do you want to learn? What story do you want to tell? What conversation needs to happen?",
    "supplies":"Green/brown candle · Something sweet to eat · Paper &amp; pen",
    "ritual_steps":["Light a brown or dark green candle. Place a symbol of your work nearby.",
      "Acknowledge your progress. Hand on heart: <i>'I honor my effort. I celebrate.'</i>",
      "Create three lists: 'What I've Harvested,' 'Still Building,' and 'Structure I Need.'",
      "Read your harvest list aloud. Eat something sweet slowly, savoring your wins.",
      "For your building list, write one concrete next step per goal.",
      "Choose ONE structural improvement to implement this month. Commit."],
    "affirmation":"I celebrate my wins. I honor my discipline. I build a life that lasts.",
    "journal_prompts":["What success have I been downplaying?",
      "What goal am I still building toward?","What structure would make my life more sustainable?",
      "How can I honor both ambition and rest?"] },

  { "num":7,"name":"JULY","moon_name":"Buck Moon",
    "full_date":date(2026,7,29),"full_sign":"Aquarius",
    "new_date":date(2026,7,14),"new_sign":"Cancer",
    "full_energy":"The Buck Moon in Aquarius is the rebel's moon. Aquarius pushes you to break free from conformity and embrace your authentic, revolutionary self. Are you living by someone else's rules, or pioneering your own path?",
    "new_energy":"The New Moon in Cancer calls you home — to your feelings, your roots, your family, your sanctuary. What emotional foundation do you want to build? Where do you need more nourishment and belonging?",
    "supplies":"Blue/silver candle · Paper &amp; pen · Amethyst (optional)",
    "ritual_steps":["Light a blue, silver, or white candle. Break your usual routine — sit somewhere new.",
      "Hand on third eye. Say: <i>'I see beyond the present. I am free to be exactly who I am.'</i>",
      "Write: 'The Rules I'm Breaking.' Read each one aloud. Cross it out with fierce intention.",
      "On the back, write: 'My Vision for the Future.' Read it as if already true.",
      "Create a personal symbol — a doodle, a word, a gesture. This is your signature.",
      "Say: <i>'This is my revolution. I am unleashed.'</i>"],
    "affirmation":"I am free. I am weird. I am visionary. My authenticity is my revolution.",
    "journal_prompts":["What rule or expectation am I ready to break?",
      "If I could create any future, what would it look like?","What makes me uniquely ME?",
      "How can I contribute my gifts to the collective?"] },

  { "num":8,"name":"AUGUST","moon_name":"Sturgeon Moon",
    "full_date":date(2026,8,28),"full_sign":"Pisces",
    "new_date":date(2026,8,12),"new_sign":"Leo",
    "full_energy":"The Sturgeon Moon in Pisces swims through the depths of intuition, dreams, and divine connection. Pisces dissolves the boundary between logic and intuition. This moon invites you to trust what you can't prove, and let your dreams guide you.",
    "new_energy":"The New Moon in Leo roars with creative fire. Set intentions for bold self-expression and stepping into your spotlight. What do you want to create? How do you want to shine this season?",
    "supplies":"Purple/seafoam candle · Bowl of water · Journal",
    "ritual_steps":["Light a purple or seafoam candle. Play soft meditative music. Dim the lights.",
      "Gaze into a bowl of water. Soften your eyes. Say: <i>'I open to divine guidance.'</i>",
      "Hands over the water. Close your eyes. Ask: <i>'What message does my highest self have for me?'</i>",
      "Sit in silence 3–5 minutes. Notice images, words, feelings. Trust what comes.",
      "Write everything you received — even if it seems strange. Don't edit. Just flow.",
      "Place your writing under your pillow tonight. Ask your dreams to clarify."],
    "affirmation":"I trust my intuition. I honor my dreams. I am divinely guided.",
    "journal_prompts":["What recurring symbols or synchronicities have I been noticing?",
      "What does my intuition already know that my logical mind is resisting?","If I trusted my dreams completely, what would they tell me?",
      "How can I create more space for mystery in my life?"] },

  { "num":9,"name":"SEPTEMBER","moon_name":"Harvest Moon",
    "full_date":date(2026,9,26),"full_sign":"Aries",
    "new_date":date(2026,9,11),"new_sign":"Virgo",
    "full_energy":"The Harvest Moon in Aries is a warrior's celebration. You didn't just wait for the harvest — you planted it, watered it, protected it. This moon honors your courage, your initiative, your refusal to quit. Claim your victory.",
    "new_energy":"The New Moon in Virgo is precise, purposeful, and practical. Set intentions around health, daily routines, and work. What systems need improving? What habits will support your vision for the year ahead?",
    "supplies":"Red/orange candle · Paper &amp; pen · Carnelian (optional)",
    "ritual_steps":["Light a red or orange candle with fierce intention. Stand if possible.",
      "Hand on solar plexus. Say loudly: <i>'I am a warrior. I am victorious. I claim my power.'</i>",
      "Create a Victory List: every battle won this year, big or small.",
      "Read each victory aloud, stomping your foot or clapping after each.",
      "Write a victory declaration: <i>'I, [your name], am victorious because I…'</i>",
      "Read it three times, each louder. Blow out the candle like you're blowing out fear."],
    "affirmation":"I am courageous. I am victorious. I honor my warrior spirit.",
    "journal_prompts":["What battles have I won that I haven't fully celebrated?",
      "Where did I show courage even when terrified?","What do I need to start or fight for next?",
      "How can I bring more warrior energy to areas where I've been passive?"] },

  { "num":10,"name":"OCTOBER","moon_name":"Hunter's Moon",
    "full_date":date(2026,10,26),"full_sign":"Taurus",
    "new_date":date(2026,10,10),"new_sign":"Libra",
    "full_energy":"The Hunter's Moon in Taurus is about claiming abundance with grounded precision. Taurus doesn't chase; it waits for the right moment, then takes what it needs. What resources do you require? What abundance is yours for the taking?",
    "new_energy":"The New Moon in Libra seeks beauty, balance, and harmonious beginnings. Set intentions around relationships, justice, and beauty. Where do you want more harmony? What partnership is ready to evolve?",
    "supplies":"Green candle · Coins or bills · Something pleasurable · Pyrite (optional)",
    "ritual_steps":["Light a green or brown candle. Arrange coins, bills, or abundance symbols around it.",
      "Touch each item, feeling its texture. Say: <i>'Abundance is my birthright.'</i>",
      "Write: 'The Abundance I'm Hunting.' Read each item: <i>'I claim this. It is already mine.'</i>",
      "Write: 'The Action I'm Taking.' Choose ONE action within 48 hours. Circle it.",
      "Hold your money symbol. Visualize it multiplying. Feel the weight of abundance.",
      "Indulge slowly in a pleasure — chocolate, flowers, soft fabric. Receive without guilt."],
    "affirmation":"I am abundant. I claim my wealth with clarity. I receive pleasure without guilt.",
    "journal_prompts":["What specific abundance am I calling in? Be detailed.",
      "What action can I take this week to claim that abundance?","Where have I been rejecting abundance because I didn't feel worthy?",
      "How can I ground myself and trust my timing?"] },

  { "num":11,"name":"NOVEMBER","moon_name":"Beaver Moon",
    "full_date":date(2026,11,24),"full_sign":"Gemini",
    "new_date":date(2026,11,9),"new_sign":"Scorpio",
    "full_energy":"The Beaver Moon in Gemini is about building your bridge to the future. Beavers construct structures requiring intelligence, adaptability, and communication. This moon asks: What mental structures are you building? What conversations need to happen?",
    "new_energy":"The New Moon in Scorpio dives deep. This is the most powerful new moon for transformation, release, and rebirth. What are you ready to surrender? What version of yourself is being born in this darkness?",
    "supplies":"Yellow/blue candle · Journal · A book or course you've been putting off",
    "ritual_steps":["Light a yellow or light blue candle. Say: <i>'I honor my mind. My words have power.'</i>",
      "Write three lists: 'Conversations I've Been Avoiding,' 'Knowledge I Want,' 'Ideas to Share.'",
      "Choose ONE avoided conversation. Write exactly what you'll say and when.",
      "Choose ONE thing to learn this month. Schedule it in your calendar now.",
      "Choose ONE idea to share publicly. Draft it now — even just an outline.",
      "Hands at throat. Say: <i>'My voice matters. My ideas are valuable. I speak my truth.'</i>"],
    "affirmation":"My words have power. My mind is brilliant. I am a bridge between ideas and action.",
    "journal_prompts":["What conversation have I been avoiding?",
      "What skill or knowledge would make my work more effective?","What idea has been living in my head that needs to be shared?",
      "How can I be more curious and less judgmental in my learning?"] },

  { "num":12,"name":"DECEMBER","moon_name":"Cold Moon",
    "full_date":date(2026,12,24),"full_sign":"Cancer",
    "new_date":date(2026,12,9),"new_sign":"Sagittarius",
    "full_energy":"The Cold Moon in Cancer brings you home to yourself. As the year ends and the longest nights settle in, Cancer asks: Have you been caring for yourself the way you care for others? Home is not a place. Home is how you feel about yourself.",
    "new_energy":"The New Moon in Sagittarius lights the archer's arrow toward a new horizon. Set expansive, philosophical intentions. What truth do you want to live by in the year ahead? What adventure is your soul craving?",
    "supplies":"White/silver candle · Something cozy · Photos of loved ones",
    "ritual_steps":["Create the coziest space you can. Light your candle. Wrap yourself in a blanket.",
      "Hold something that represents home to you. Breathe deeply.",
      "Write: 'What Home Feels Like to Me.' Don't edit — just let it flow.",
      "Write: 'How I Want to Feel in My Body and Life.' Read it as a permission slip.",
      "Look at photos of loved ones. Send each one silent love and gratitude.",
      "Say: <i>'I am home in myself. I am held. I am whole. The year is complete.'</i>"],
    "affirmation":"I am home in myself. I nourish what matters. I end this year whole and begin the next one free.",
    "journal_prompts":["What has this year taught me about what home really means?",
      "How have I grown in my relationship with myself?","What do I want to leave behind as this year closes?",
      "What single word do I want to carry into next year?"] },
]

# ── Phases Data (educational pages) ──────────────────────────────────────────
PHASES = [
  { "emoji":"🌑","name":"NEW MOON","subtitle":"Intentions · Beginnings · Planting Seeds",
    "energy":"The New Moon marks the beginning of the lunar cycle. In darkness, seeds germinate. This is a time of quiet power — setting intentions, planting seeds, and visualizing what you want to call into being. The slate is wiped clean. What will you write on it?",
    "focus":"Intention-setting. Vision. Beginning. Ask: What do I want to create this cycle? Write it down with clarity and emotion. The New Moon is a portal, not a performance.",
    "ritual":"In the dark or by candlelight, write your intentions. Be specific. Be bold. Say aloud: <i>'I plant this intention with faith. The universe conspires in my favor.'</i>",
    "quote":"In the darkness, seeds germinate.",
    "ws_fields":[("My New Moon Intention",5),("Why This Matters to Me",4),("How I Will Feel When This Manifests",4)],
    "ws_checklist":"Seeds I Am Planting This Cycle" },

  { "emoji":"🌒","name":"WAXING CRESCENT","subtitle":"Momentum · Action · First Steps",
    "energy":"The sliver of light grows. Energy builds. This is the phase of beginnings gaining traction — the first steps, the first actions, the first momentum. What you started at the New Moon is now asking for movement.",
    "focus":"Take the first concrete action toward your intention. Clarity through doing, not planning. Break your intention into one small, visible step and take it today.",
    "ritual":"Write one action you can take today. Say: <i>'I take this step in faith. My intention grows.'</i> Then take it.",
    "quote":"The journey of a thousand miles begins with a single step taken in the direction of the moon.",
    "ws_fields":[("My First Action Step",4),("What's Building in My Life Right Now",5),("Where I Need to Trust the Process",4)],
    "ws_checklist":"Actions I'm Committed to This Week" },

  { "emoji":"🌓","name":"FIRST QUARTER","subtitle":"Decisions · Commitment · Push Through",
    "energy":"The moon is half-illuminated — and so are you. Resistance shows up. Doubt creeps in. Obstacles appear. This is completely normal. The universe is testing your commitment. First Quarter energy is friction. But friction isn't failure — it's fuel.",
    "focus":"Face the friction. Make the decision. What choice is being asked of you? What boundary needs to be set? Choose your intention over your fear.",
    "ritual":"Hold a stone. Visualize the obstacle you're facing. Say: <i>'I am stronger than this resistance. I choose my intention over my fear.'</i> Carry the stone as a reminder.",
    "quote":"Friction is not failure — it's fuel.",
    "ws_fields":[("Decisions I'm Facing",5),("What Resistance Is Showing Me",5),("My Commitment Statement",4)],
    "ws_checklist":"Boundaries I'm Setting This Week" },

  { "emoji":"🌔","name":"WAXING GIBBOUS","subtitle":"Refinement · Trust · Almost There",
    "energy":"The moon is almost full — you can feel the peak approaching. This is the final push before manifestation. Energy supports editing, optimizing, and trusting that what you've built is coming together. Refine, yes. But don't undo your progress with perfectionism.",
    "focus":"What needs fine-tuning? Where can you make small adjustments without overhauling everything? Trust. The magic is already working. Don't sabotage it with doubt.",
    "ritual":"Stand outside if possible. Place hands on heart. Say: <i>'I trust divine timing. I refine without obsessing. The magic is already working.'</i> Take three deep breaths.",
    "quote":"Almost there. Trust the timing.",
    "ws_fields":[("What's Working (celebrate this)",5),("What Needs a Small Adjustment",4),("Where I Need to Trust More",5)],
    "ws_checklist":"Preparing for the Peak — What do I want to celebrate? What do I want to release?" },

  { "emoji":"🌕","name":"FULL MOON","subtitle":"Illumination · Celebration · Release",
    "energy":"Peak power. Maximum illumination. Everything is visible, nothing can hide. Emotions run high. Energy runs higher. This is a time of both celebration and release. Honor how far you've come. Then let go of what's blocking your next level.",
    "focus":"First, celebrate. What wins can you acknowledge? What growth have you experienced? Second, release. What's being illuminated that no longer serves you?",
    "ritual":"Write what you're releasing on a separate piece of paper. Read it aloud: <i>'I release what no longer serves me. I make space for what's coming.'</i> Safely burn it or bury it.",
    "quote":"Let it go. Let it glow.",
    "ws_fields":[("What I'm Celebrating",5),("What's Being Illuminated (what truth is emerging?)",5),("What I'm Releasing Tonight",5)],
    "ws_checklist":"Full Moon Affirmations" },

  { "emoji":"🌖","name":"WANING GIBBOUS","subtitle":"Gratitude · Integration · Sharing",
    "energy":"The peak has passed. The moon begins to wane, and energy turns inward. This is the harvest phase — time to gather the fruits of your labor and integrate the lessons of this cycle. The Waning Gibbous asks you to practice gratitude and share what you've learned.",
    "focus":"What did this cycle teach you? Don't rush past the lessons — integrate them. Practice gratitude for both the wins and the challenges. Share your wisdom with someone who needs it.",
    "ritual":"Place your hand on your heart. Say: <i>'I receive the wisdom of this cycle. I am grateful for every lesson.'</i> Write three lessons from this cycle. Share one with someone.",
    "quote":"The harvest is in your hands.",
    "ws_fields":[("Lessons This Cycle Taught Me",5),("What I'm Grateful For",5),("Wisdom to Remember & Share",5)],
    "ws_checklist":"How I'm Integrating — practices, beliefs, or changes I'm embodying" },

  { "emoji":"🌗","name":"LAST QUARTER","subtitle":"Forgiveness · Surrender · Closure",
    "energy":"Half-lit again, but now moving toward darkness. This is the release phase — time for forgiveness, surrender, and tying up loose ends. What's unfinished? Last Quarter energy can feel heavy if you resist it. But when you lean into release, there's profound freedom on the other side.",
    "focus":"Where do you need to forgive — yourself or others? What conversations need to happen? What projects need to be completed or consciously released? Completion creates space for creation.",
    "ritual":"Write what you're forgiving on paper. Say: <i>'I release resentment. I choose peace. I complete this cycle.'</i> Tear up the paper. Wash your hands with intention.",
    "quote":"Completion creates space for creation.",
    "ws_fields":[("What I'm Forgiving Myself For",5),("What I'm Forgiving Others For",5),("What I'm Surrendering Control Of",4)],
    "ws_checklist":"Unfinished Business — conversations, projects, tasks, decisions" },

  { "emoji":"🌘","name":"WANING CRESCENT","subtitle":"Rest · Reflection · Renewal",
    "energy":"The final sliver of light before the moon goes dark. This is the void — the quiet before rebirth. Energy is at its lowest point, and your body, mind, and spirit are asking for rest. Don't fight it. Your magic regenerates in the dark.",
    "focus":"Rest is not laziness. Sleep is productive. Stillness is sacred. How does your body need to rest? What needs to be quiet so you can hear your intuition? What dreams are trying to come through?",
    "ritual":"In darkness or candlelight, close your eyes. Whisper: <i>'I rest without guilt. In stillness, I am reborn.'</i> Go to bed early. Cancel something unnecessary. Say no to at least one thing.",
    "quote":"In the darkness, seeds germinate.",
    "ws_fields":[("How My Body Needs Rest",4),("Reflections on This Cycle",5),("Dreams &amp; Intuitive Downloads",5)],
    "ws_checklist":"Preparing for the New Moon — what intention is starting to form?" },
]

# ── CSS ───────────────────────────────────────────────────────────────────────
CSS = """
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600&family=Allura&display=swap');

:root {
  --dark: #1E0A16;  --cream: #FFFCF7;  --burg: #6D2E46;
  --rose: #A26769;  --pink: #D5B9B2;   --gold: #EDB74D;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { margin:0; background:#888; }
.page { width:8.5in; height:11in; position:relative; overflow:hidden; page-break-after:always; break-after:page; }
@media print { body{background:white;} .page{page-break-after:always;break-after:page;} }
@page { size:8.5in 11in; margin:0; }

.page-dark  { background:var(--dark); }
.page-cream { background:var(--cream); }

/* Brackets */
.bracket { position:absolute; width:20px; height:20px; border-color:rgba(109,46,70,0.4); border-style:solid; }
.page-dark .bracket { border-color:rgba(237,183,77,0.2); }
.bracket.tl { top:22px; left:22px; border-width:1.5px 0 0 1.5px; }
.bracket.tr { top:22px; right:22px; border-width:1.5px 1.5px 0 0; }
.bracket.bl { bottom:22px; left:22px; border-width:0 0 1.5px 1.5px; }
.bracket.br { bottom:22px; right:22px; border-width:0 1.5px 1.5px 0; }

/* Content pad */
.cp { padding:48px 58px 32px; height:100%; display:flex; flex-direction:column; }
.cp-sm { padding:40px 52px 28px; height:100%; display:flex; flex-direction:column; }

/* Rules */
.gold-rule { height:0.5px; background:linear-gradient(90deg,transparent,var(--gold),transparent); margin:10px 0; }
.gold-rule-l { height:0.5px; background:linear-gradient(90deg,var(--gold),transparent); margin:8px 0; }
.burg-rule { height:0.5px; background:linear-gradient(90deg,var(--gold),rgba(109,46,70,0.3),transparent); margin:8px 0; }

/* Write lines */
.wl   { height:1px; background:rgba(109,46,70,0.15); margin:17px 0; }
.wl-s { height:1px; background:rgba(109,46,70,0.13); margin:13px 0; }
.wl-x { height:0.7px; background:rgba(109,46,70,0.10); margin:9px 0; }
.wl-w { height:1px; background:rgba(109,46,70,0.13); margin:11px 0; }
.wl-t { height:0.5px; background:rgba(109,46,70,0.10); margin:6px 0; }
.wl-d { height:1px; background:rgba(237,183,77,0.15); margin:15px 0; }
.wl-ds { height:0.7px; background:rgba(237,183,77,0.12); margin:10px 0; }

/* Dark typography */
.eyebrow-g { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:.35em; color:var(--gold); text-transform:uppercase; margin-bottom:5px; }
.dark-h1 { font-family:'Playfair Display',serif; font-size:52px; font-weight:700; color:var(--cream); line-height:1.1; margin:6px 0 14px; }
.dark-h2 { font-family:'Playfair Display',serif; font-size:40px; font-weight:700; color:var(--cream); line-height:1.15; margin:6px 0 10px; }
.dark-h3 { font-family:'Poppins',sans-serif; font-size:15px; font-weight:500; color:var(--pink); letter-spacing:.06em; margin:4px 0 10px; }
.dark-body { font-family:'Poppins',sans-serif; font-size:13px; color:var(--cream); line-height:1.8; margin-bottom:10px; }
.dark-sm { font-family:'Poppins',sans-serif; font-size:12px; color:var(--pink); line-height:1.7; }
.dark-date { font-family:'Poppins',sans-serif; font-size:13px; color:var(--rose); letter-spacing:.03em; margin-bottom:12px; }
.dark-quote { font-family:'Playfair Display',serif; font-size:15px; font-style:italic; color:var(--gold); text-align:center; padding:14px 24px; border-top:.5px solid rgba(237,183,77,0.2); margin-top:auto; }

/* Cream typography */
.eyebrow-b { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:.3em; color:var(--gold); text-transform:uppercase; margin-bottom:5px; }
.cream-h1 { font-family:'Playfair Display',serif; font-size:52px; font-weight:700; color:var(--burg); line-height:1.1; margin:6px 0 14px; }
.cream-h2 { font-family:'Playfair Display',serif; font-size:40px; font-weight:700; color:var(--burg); line-height:1.15; margin:6px 0 10px; }
.cream-h3 { font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; color:var(--burg); letter-spacing:.12em; text-transform:uppercase; margin:4px 0 8px; }
.cream-body { font-family:'Poppins',sans-serif; font-size:13px; color:var(--burg); line-height:1.8; margin-bottom:10px; }
.cream-sm { font-family:'Poppins',sans-serif; font-size:12px; color:var(--rose); line-height:1.7; font-style:italic; }
.cream-date { font-family:'Poppins',sans-serif; font-size:13px; color:var(--rose); margin-bottom:10px; }
.cream-quote { font-family:'Playfair Display',serif; font-size:15px; font-style:italic; color:var(--rose); text-align:center; padding:12px 20px; border-top:.5px solid rgba(109,46,70,0.15); margin-top:auto; }

/* Labels */
.lbl-g { font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.25em; color:var(--gold); text-transform:uppercase; margin-bottom:4px; margin-top:12px; border-bottom:.5px solid rgba(237,183,77,0.2); padding-bottom:3px; }
.lbl-b { font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.25em; color:var(--gold); text-transform:uppercase; margin-bottom:4px; margin-top:12px; border-bottom:.5px solid rgba(109,46,70,0.15); padding-bottom:3px; }

/* Page footer */
.pf-d { position:absolute; bottom:18px; left:0; right:0; text-align:center; font-family:'Poppins',sans-serif; font-size:9px; color:rgba(162,103,105,0.35); letter-spacing:.2em; }
.pf-c { position:absolute; bottom:18px; left:0; right:0; text-align:center; font-family:'Poppins',sans-serif; font-size:9px; color:rgba(109,46,70,0.25); letter-spacing:.2em; }

/* Cover */
.cover-wrap { position:absolute; top:50%; left:50%; transform:translate(-50%,-55%); text-align:center; z-index:2; width:80%; }
.cover-allura { font-family:'Allura',cursive; font-size:96px; color:var(--gold); line-height:1.1; margin-bottom:0; }
.cover-title { font-family:'Playfair Display',serif; font-size:44px; font-weight:700; color:var(--cream); line-height:1.1; margin:0; }
.cover-year { font-family:'Poppins',sans-serif; font-size:14px; color:var(--pink); letter-spacing:.3em; margin-top:10px; }
.cover-brand { font-family:'Poppins',sans-serif; font-size:11px; letter-spacing:.35em; color:var(--gold); text-transform:uppercase; margin-bottom:14px; }
.cover-moon { position:absolute; bottom:80px; left:50%; transform:translateX(-50%); width:220px; height:220px; }
.cover-moon svg { width:100%; height:100%; }

/* Phase education */
.phase-edu-icon { font-size:60px; margin-bottom:6px; }
.phase-edu-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:12px; flex:1; }
.phase-edu-box { background:rgba(237,183,77,0.05); border:.5px solid rgba(237,183,77,0.15); border-radius:4px; padding:14px 16px; }
.phase-edu-box-title { font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; margin-bottom:6px; }

/* Ritual steps */
.ritual-steps { margin:6px 0; }
.rstep { display:flex; align-items:flex-start; gap:12px; margin-bottom:8px; }
.rnum { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; color:var(--gold); min-width:22px; padding-top:2px; }
.rtext { font-family:'Poppins',sans-serif; font-size:13px; color:var(--cream); line-height:1.7; }

/* Checklist */
.chk-item { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.chk-box { width:13px; height:13px; border:.7px solid rgba(109,46,70,0.25); border-radius:1px; flex-shrink:0; }
.chk-line { flex:1; height:0.7px; background:rgba(109,46,70,0.12); }
.chk-box-d { width:13px; height:13px; border:.7px solid rgba(237,183,77,0.2); border-radius:1px; flex-shrink:0; }
.chk-line-d { flex:1; height:0.7px; background:rgba(237,183,77,0.1); }

/* Worksheet fields */
.ws-field { margin-bottom:20px; }
.ws-ftitle { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:.12em; color:var(--burg); text-transform:uppercase; margin-bottom:4px; }
.ws-fsub { font-family:'Poppins',sans-serif; font-size:12px; color:var(--rose); font-style:italic; margin-bottom:5px; }

/* Two-column layout */
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:28px; flex:1; }
.two-col-65 { display:grid; grid-template-columns:65fr 35fr; gap:24px; flex:1; }

/* Monthly overview */
.mo-moon-box { background:rgba(109,46,70,0.05); border:.5px solid rgba(109,46,70,0.12); border-radius:4px; padding:14px 16px; margin-bottom:12px; }
.mo-moon-label { font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.25em; color:var(--gold); text-transform:uppercase; margin-bottom:4px; }
.mo-moon-date { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--burg); margin-bottom:4px; }
.mo-moon-sign { font-family:'Poppins',sans-serif; font-size:12px; color:var(--rose); font-style:italic; margin-bottom:8px; }
.mo-moon-energy { font-family:'Poppins',sans-serif; font-size:13px; color:var(--burg); line-height:1.75; }

/* Intentions table */
.int-table { width:100%; border-collapse:collapse; font-family:'Poppins',sans-serif; font-size:12px; }
.int-table th { font-size:10px; letter-spacing:.15em; color:var(--gold); text-transform:uppercase; border-bottom:.5px solid rgba(109,46,70,0.2); padding:4px 8px 6px; text-align:left; font-weight:600; }
.int-table td { border-bottom:.5px solid rgba(109,46,70,0.08); padding:13px 8px; height:27px; box-sizing:border-box; }
.int-col1 { width:44%; } .int-col2 { width:38%; } .int-col3 { width:18%; }

/* Weekly planner — Design A: gradient header bar + dark day cards */
.wp-header-bar { background:linear-gradient(135deg,var(--burg) 0%,var(--dark) 100%); padding:12px 16px; border-radius:4px; margin-bottom:14px; flex-shrink:0; }
.wp-header-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:var(--cream); letter-spacing:.1em; text-transform:uppercase; }
.wp-header-sub { font-family:'Poppins',sans-serif; font-size:12px; color:var(--gold); letter-spacing:.2em; text-transform:uppercase; margin-top:3px; }
.wp-day-card { background:#f9eae1; border-radius:6px; padding:14px 18px 6px; margin-bottom:8px; }
.wp-day-top { display:flex; align-items:baseline; gap:10px; margin-bottom:6px; }
.wp-dname { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:var(--burg); letter-spacing:.15em; text-transform:uppercase; min-width:36px; }
.wp-dnum { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--burg); min-width:26px; line-height:1; }
.wp-phase { font-family:'Poppins',sans-serif; font-size:11px; color:var(--rose); }
.wp-days-col { display:flex; flex-direction:column; }
.wp-sidebar { display:flex; flex-direction:column; }
.wl-day { height:.5px; background:rgba(109,46,70,0.25); margin:28px 0; }
.wl-day-lg { height:.5px; background:rgba(109,46,70,0.25); margin:42px 0; }

/* Moon tasks sidebar */
.task-section { margin-bottom:12px; }
.task-title { font-family:'Poppins',sans-serif; font-size:12px; font-weight:600; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; border-bottom:.5px solid rgba(109,46,70,0.15); padding-bottom:3px; margin-bottom:8px; }
.task-item { display:flex; align-items:flex-start; gap:8px; margin-bottom:8px; }
.task-emoji { font-size:14px; line-height:1.4; flex-shrink:0; }
.task-text { font-family:'Poppins',sans-serif; font-size:13px; color:var(--burg); line-height:1.5; flex:1; }
.task-pg { font-family:'Poppins',sans-serif; font-size:12px; color:var(--rose); font-style:italic; }

/* Prompt boxes — Design A prompt-box from page-design.html */
.wp-prompt-box { background:var(--pink); border-radius:8px; padding:16px 18px; margin-bottom:14px; flex:1; display:flex; flex-direction:column; }
.wp-prompt-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:var(--burg); letter-spacing:.15em; text-transform:uppercase; margin-bottom:6px; }
.wp-lines-wrap { flex:1; display:flex; flex-direction:column; justify-content:space-between; }
.wl-pk { height:.5px; background:rgba(162,103,105,0.5); }

/* Week quote */
.wq { font-family:'Playfair Display',serif; font-size:12px; font-style:italic; color:var(--rose); text-align:center; padding-top:10px; border-top:.5px solid rgba(109,46,70,0.1); margin-top:auto; }

/* New moon intention page */
.nm-table-wrap { margin:14px 0; }
.nm-prompt-num { font-family:'Poppins',sans-serif; font-size:12px; font-weight:600; color:var(--gold); margin-right:4px; }
.nm-prompt-q { font-family:'Poppins',sans-serif; font-size:13px; color:var(--burg); font-weight:500; line-height:1.5; }
.nm-affirmation { font-family:'Playfair Display',serif; font-size:15px; font-style:italic; color:var(--rose); text-align:center; padding:12px 20px; border:.5px solid rgba(109,46,70,0.15); border-radius:4px; margin-top:auto; background:rgba(109,46,70,0.03); }

/* Lunar calendar */
.cal-table { width:100%; border-collapse:collapse; font-family:'Poppins',sans-serif; font-size:13px; }
.cal-table th { font-size:10px; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; border-bottom:.5px solid rgba(237,183,77,0.3); padding:7px 8px; text-align:left; font-weight:600; }
.cal-table td { padding:9px 8px; border-bottom:.5px solid rgba(237,183,77,0.08); vertical-align:middle; }
.cal-month { font-family:'Playfair Display',serif; font-weight:700; color:var(--cream); font-size:14px; }
.cal-sign { color:var(--rose); font-size:12px; }

/* Yearly overview */
.yo-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.yo-box { background:rgba(109,46,70,0.05); border:.5px solid rgba(109,46,70,0.12); border-radius:4px; padding:12px 14px; }
.yo-label { font-family:'Poppins',sans-serif; font-size:10px; font-weight:600; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; margin-bottom:3px; }
.yo-sub { font-family:'Poppins',sans-serif; font-size:11px; color:var(--rose); font-style:italic; margin-bottom:6px; }
"""

# ── Helpers ───────────────────────────────────────────────────────────────────
def brackets():
    return '<div class="bracket tl"></div><div class="bracket tr"></div><div class="bracket bl"></div><div class="bracket br"></div>'

def wlines(n, style="wl"):
    return "".join(f'<div class="{style}"></div>' for _ in range(n))

def moon_svg(color="#6D2E46", size=140):
    return f'<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}"><circle cx="100" cy="100" r="70" fill="none" stroke="{color}" stroke-width="1.5"/><circle cx="100" cy="100" r="50" fill="none" stroke="{color}" stroke-width="1" opacity="0.6"/><circle cx="100" cy="100" r="88" fill="none" stroke="{color}" stroke-width=".8" opacity="0.4"/><circle cx="100" cy="100" r="105" fill="none" stroke="{color}" stroke-width=".6" opacity="0.3"/></svg>'

def step_html(steps):
    h = ""
    for i, s in enumerate(steps,1):
        h += f'<div class="rstep"><span class="rnum">0{i}</span><span class="rtext">{s}</span></div>'
    return h

def chk_rows(n, dark=False):
    box = "chk-box-d" if dark else "chk-box"
    line = "chk-line-d" if dark else "chk-line"
    return "".join(f'<div class="chk-item"><div class="{box}"></div><div class="{line}"></div></div>' for _ in range(n))

def ws_field(title, lines_n, style="wl-s"):
    return f'<div class="ws-field"><div class="ws-ftitle">{title}</div>{wlines(lines_n, style)}</div>'

# ── Cover ─────────────────────────────────────────────────────────────────────
def page_cover():
    return f"""
<div class="page page-dark">
  {brackets()}
  <div class="cover-wrap">
    <div class="cover-brand">Enchanting Life Unleashed</div>
    <div class="gold-rule" style="width:160px;margin:10px auto;"></div>
    <div class="cover-allura">Moon Cycle</div>
    <div class="cover-title">Life Planner</div>
    <div class="cover-year">✦ 2026 ✦</div>
    <div class="gold-rule" style="width:160px;margin:14px auto;"></div>
    <div style="font-family:'Poppins',sans-serif;font-size:12px;color:var(--pink);letter-spacing:.08em;">Work with the moon. Transform your life.</div>
  </div>
  <div class="cover-moon">{moon_svg("rgba(237,183,77,0.3)", 220)}</div>
  <div class="pf-d">EnchantingLifeUnleashed.com</div>
</div>"""

# ── Welcome ───────────────────────────────────────────────────────────────────
def page_welcome():
    items = [
        ("The Moon", "Your celestial guide. The moon moves through 8 distinct phases every 29.5 days, each carrying a unique energetic signature. When you align your actions with these phases, you stop fighting the current — and start riding it."),
        ("This Planner", "A full-year companion for working with the moon's natural rhythm. Each month includes phase worksheets, a full moon ritual, new moon intention setting, and weekly planning pages tied to actual lunar dates."),
        ("How to Use It", "Start at the monthly overview to understand the moon's energy for the month. Then follow the weekly pages through each phase. Use the worksheets to reflect, release, and reset. There are no wrong answers — only honest ones."),
        ("The Magic", "The moon doesn't make things happen for you — she illuminates what's already there. The intention you set. The courage you've been gathering. The dream you haven't spoken yet. This planner is the space where that becomes real."),
    ]
    rows = ""
    for title, body in items:
        rows += f'<div class="rstep"><span class="rnum" style="color:var(--gold);font-size:18px;">✦</span><div><div style="font-family:\'Poppins\',sans-serif;font-size:12px;font-weight:600;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px;">{title}</div><div class="dark-body">{body}</div></div></div>'
    return f"""
<div class="page page-dark">
  {brackets()}
  <div style="position:absolute;top:-20px;right:-20px;opacity:.35;">{moon_svg("rgba(237,183,77,0.6)",200)}</div>
  <div class="cp">
    <div class="eyebrow-g">Welcome</div>
    <div class="dark-h1">You Are<br><span style="color:var(--gold);">Lunar Magic.</span></div>
    <div class="gold-rule-l" style="margin-bottom:18px;"></div>
    <div class="dark-body" style="margin-bottom:16px;">You were born to move in cycles — not straight lines. The hustle culture lied to you. Consistent pushing doesn't lead to consistent results. But moving with intention, with rhythm, with the wisdom of the cosmos? That does.</div>
    {rows}
    <div class="dark-quote" style="font-family:'Allura',cursive;font-size:28px;color:var(--gold);border-top:.5px solid rgba(237,183,77,0.2);padding-top:14px;margin-top:auto;">She dances with the moon and calls it strategy.</div>
  </div>
</div>"""

# ── How It Works ──────────────────────────────────────────────────────────────
def page_how_it_works():
    sections = [
        ("🌑 New Moon · Days 1–3","Set your intention. Plant your seed. Write your vision. This is the most potent time for new beginnings, fresh starts, and bold declarations."),
        ("🌒 Waxing Crescent · Days 3–7","Take action. Build momentum. The sliver of light grows — your intentions need movement to manifest. Act before you feel ready."),
        ("🌓 First Quarter · Days 7–10","Face the challenge. Make the decision. Resistance is normal. Push through. Friction is fuel, not failure."),
        ("🌔 Waxing Gibbous · Days 10–13","Refine and trust. You're almost at peak power. Make small adjustments. Don't undo your progress with perfectionism."),
        ("🌕 Full Moon · Day 14–15","Celebrate and release. Peak illumination. Honor your progress. Let go of what blocks your next level."),
        ("🌖 Waning Gibbous · Days 15–19","Integrate and share. Harvest the lessons. Practice gratitude. Share your wisdom generously."),
        ("🌗 Last Quarter · Days 19–22","Forgive and complete. Tie up loose ends. Forgive yourself and others. Completion creates space for creation."),
        ("🌘 Waning Crescent · Days 22–29","Rest and renew. The void before rebirth. Your magic regenerates in the dark. Rest is sacred, not lazy."),
    ]
    boxes = ""
    for title, body in sections:
        boxes += f'<div style="background:rgba(109,46,70,0.05);border:.5px solid rgba(109,46,70,0.15);border-radius:4px;padding:12px 14px;"><div style="font-family:\'Poppins\',sans-serif;font-size:11px;font-weight:600;color:var(--burg);letter-spacing:.08em;margin-bottom:4px;">{title}</div><div style="font-family:\'Poppins\',sans-serif;font-size:12px;color:var(--rose);line-height:1.65;">{body}</div></div>'
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp-sm">
    <div class="eyebrow-b">Your Guide</div>
    <div class="cream-h2" style="margin-bottom:4px;">How This Planner Works</div>
    <div class="cream-sm" style="margin-bottom:14px;">Each lunar month cycles through 8 phases. Each phase has a distinct energy — and a distinct purpose in your planning practice.</div>
    <div class="burg-rule"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1;align-content:start;margin-top:10px;">{boxes}</div>
    <div class="cream-quote">Trust the cycle. Every phase is working for you.</div>
  </div>
</div>"""

# ── Lunar Calendar ────────────────────────────────────────────────────────────
def page_lunar_calendar():
    rows = ""
    for m in MONTHS:
        mn = MA[m["num"]-1]
        fd = m["full_date"].strftime("%-d %b")
        nd = m["new_date"].strftime("%-d %b")
        rows += f'''<tr>
          <td><span class="cal-month">{m["name"]}</span></td>
          <td>🌕 {fd}<br><span class="cal-sign">{m["full_sign"]} · {m["moon_name"]}</span></td>
          <td>🌑 {nd}<br><span class="cal-sign">{m["new_sign"]}</span></td>
        </tr>'''
    return f"""
<div class="page page-dark">
  {brackets()}
  <div class="cp">
    <div class="eyebrow-g">Reference Guide</div>
    <div class="dark-h1" style="font-size:44px;">2026 Lunar<br><span style="color:var(--gold);">Calendar</span></div>
    <div class="gold-rule-l" style="margin-bottom:16px;"></div>
    <div class="dark-sm" style="text-align:center;margin-bottom:14px;">All dates are approximate · Times vary by timezone</div>
    <table class="cal-table">
      <thead><tr>
        <th style="width:28%;">Month</th>
        <th style="width:36%;">Full Moon</th>
        <th style="width:36%;">New Moon</th>
      </tr></thead>
      <tbody>{rows}</tbody>
    </table>
    <div class="dark-quote">The moon keeps perfect time. Let her be your calendar.</div>
  </div>
</div>"""

# ── Yearly Overview ───────────────────────────────────────────────────────────
def page_yearly_overview():
    boxes = ""
    labels = ["My Word of the Year","My #1 Goal for 2026","What I'm Releasing","What I'm Calling In",
              "How I Want to Feel","My Non-Negotiables","Areas of Focus","This Year's Theme"]
    for lbl in labels:
        boxes += f'<div class="yo-box"><div class="yo-label">{lbl}</div><div class="yo-sub">Write your answer below</div>{wlines(3,"wl-s")}</div>'
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp-sm">
    <div class="eyebrow-b">Before You Begin</div>
    <div class="cream-h2" style="margin-bottom:4px;">Yearly Overview</div>
    <div class="cream-sm" style="margin-bottom:12px;">Take a breath. Get clear. Before you dive into the months, answer these questions from your soul, not your to-do list.</div>
    <div class="burg-rule"></div>
    <div class="yo-grid" style="margin-top:12px;">{boxes}</div>
    <div class="cream-quote">A year is just twelve new moons. Make them count.</div>
  </div>
</div>"""

# ── Phase Section Header ──────────────────────────────────────────────────────
def page_phase_section_header():
    return f"""
<div class="page page-dark" style="display:flex;align-items:center;justify-content:center;">
  {brackets()}
  <div style="text-align:center;padding:40px;">
    <div class="eyebrow-g" style="letter-spacing:.4em;font-size:12px;">Your Cosmic Roadmap</div>
    <div class="gold-rule" style="margin:14px auto;width:120px;"></div>
    <div style="font-family:'Allura',cursive;font-size:80px;color:var(--gold);line-height:1;">The 8</div>
    <div style="font-family:'Playfair Display',serif;font-size:54px;font-weight:700;color:var(--cream);line-height:1.1;margin-top:-8px;">Moon Phases</div>
    <div class="gold-rule" style="margin:16px auto;width:120px;"></div>
    <div style="font-family:'Poppins',sans-serif;color:var(--pink);font-size:14px;max-width:420px;margin:0 auto;line-height:1.75;">Each phase carries distinct energy. Work with the moon's natural rhythm and you'll find yourself more aligned, more intentional, and more powerful than you ever imagined.</div>
    <div style="margin-top:40px;font-family:'Poppins',sans-serif;color:rgba(237,183,77,0.5);font-size:26px;letter-spacing:14px;">🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘</div>
  </div>
</div>"""

# ── Phase Education Page ──────────────────────────────────────────────────────
def page_phase_education(p):
    boxes = [
        ("Energy", p["energy"]),
        ("Your Focus", p["focus"]),
        ("Simple Ritual", p["ritual"]),
    ]
    box_html = ""
    for title, body in boxes:
        box_html += f'<div class="phase-edu-box"><div class="phase-edu-box-title">{title}</div><div class="dark-sm" style="font-style:normal;">{body}</div></div>'
    return f"""
<div class="page page-dark">
  {brackets()}
  <div style="position:absolute;top:30px;right:40px;opacity:.4;font-size:64px;">{p["emoji"]}</div>
  <div class="cp">
    <div class="eyebrow-g">Moon Phase</div>
    <div class="dark-h1" style="font-size:46px;">{p["name"]}</div>
    <div class="dark-h3">{p["subtitle"]}</div>
    <div class="gold-rule-l" style="margin-bottom:14px;"></div>
    <div style="display:grid;grid-template-columns:1fr;gap:14px;flex:1;">
      {box_html}
      <div class="phase-edu-box" style="background:rgba(237,183,77,0.06);">
        <div class="phase-edu-box-title">Affirmation</div>
        <div style="font-family:'Playfair Display',serif;font-size:16px;font-style:italic;color:var(--gold);">"{p["quote"]}"</div>
      </div>
    </div>
  </div>
</div>"""

# ── Monthly Overview ──────────────────────────────────────────────────────────
def page_month_overview(m, page_num):
    full_str = m["full_date"].strftime("%B %-d, 2026")
    new_str  = m["new_date"].strftime("%B %-d, 2026")
    int_rows = "".join(f'<tr><td class="int-col1"></td><td class="int-col2"></td><td class="int-col3"></td></tr>' for _ in range(7))
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp-sm">
    <div class="eyebrow-b">{m["name"]} 2026</div>
    <div style="font-family:'Allura',cursive;font-size:64px;color:var(--burg);line-height:1.1;margin-bottom:4px;">{m["name"].title()}</div>
    <div class="burg-rule" style="margin-bottom:14px;"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
      <div class="mo-moon-box">
        <div class="mo-moon-label">🌕 Full Moon</div>
        <div class="mo-moon-date">{m["moon_name"]}</div>
        <div class="mo-moon-sign">{full_str} · in {m["full_sign"]}</div>
        <div class="mo-moon-energy">{m["full_energy"][:200]}...</div>
      </div>
      <div class="mo-moon-box">
        <div class="mo-moon-label">🌑 New Moon</div>
        <div class="mo-moon-date">New Moon in {m["new_sign"]}</div>
        <div class="mo-moon-sign">{new_str}</div>
        <div class="mo-moon-energy">{m["new_energy"][:200]}...</div>
      </div>
    </div>
    <div class="lbl-b" style="margin-bottom:6px;">This Month's Theme</div>
    {wlines(5,"wl-s")}
    <div class="burg-rule" style="margin:14px 0 10px;"></div>
    <div class="lbl-b">Monthly Intentions + Aligned Actions</div>
    <table class="int-table" style="margin-top:8px;">
      <thead><tr>
        <th class="int-col1">Soul Intention</th>
        <th class="int-col2">Aligned Action</th>
        <th class="int-col3">Complete By</th>
      </tr></thead>
      <tbody>{int_rows}</tbody>
    </table>
  </div>
  <div class="pf-c">{m["name"]} 2026 · {page_num}</div>
</div>"""

# ── Weekly Planner ────────────────────────────────────────────────────────────
def page_weekly_planner(m, week_data, tasks, quote, page_num):
    ndays = len(week_data["days"])
    if ndays <= 3:    n_lines, line_style = 5, "wl-day-lg"
    elif ndays <= 5:  n_lines, line_style = 3, "wl-day"
    elif ndays <= 7:  n_lines, line_style = 2, "wl-day"
    elif ndays <= 10: n_lines, line_style = 2, "wl-day"
    else:             n_lines, line_style = 1, "wl-day"

    days_html = ""
    for wd, dnum, emoji, pname in week_data["days"]:
        days_html += f"""
        <div class="wp-day-card">
          <div class="wp-day-top">
            <span class="wp-dname">{wd}</span>
            <span class="wp-dnum">{dnum}</span>
            <span class="wp-phase">{emoji} {pname}</span>
          </div>
          {wlines(n_lines, line_style)}
        </div>"""

    tasks_html = ""
    for t in tasks:
        tasks_html += f'<div class="task-item"><span class="task-emoji">{t["emoji"]}</span><div><div class="task-text">{t["name"]}</div><div class="task-pg">\u2192 page {t["page"]}</div></div></div>'

    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp-sm">
    <div class="wp-header-bar">
      <div class="wp-header-title">{m["name"]}</div>
      <div class="wp-header-sub">Week {week_data["num"]} \u2756 {week_data["range"]}</div>
    </div>
    <div class="two-col-65">
      <div class="wp-days-col">{days_html}</div>
      <div class="wp-sidebar">
        <div class="task-section">
          <div class="task-title">This Week\u2019s Moon Tasks</div>
          {tasks_html}
        </div>
        <div class="wp-prompt-box" style="margin-top:12px;">
          <div class="wp-prompt-label">Goals This Week</div>
          <div class="wp-lines-wrap">{wlines(10, "wl-pk")}</div>
        </div>
        <div class="wp-prompt-box">
          <div class="wp-prompt-label">Gratitude</div>
          <div class="wp-lines-wrap">{wlines(9, "wl-pk")}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="pf-c">{m["name"]} 2026 \u00b7 Week {week_data["num"]} \u00b7 {page_num}</div>
</div>"""

# ── Phase Worksheet (per month) ───────────────────────────────────────────────
def page_phase_worksheet(m, phase_idx, date_range, page_num):
    p = PHASES[phase_idx]
    fields_html = ""
    for title, n in p["ws_fields"]:
        fields_html += ws_field(title, n)
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp-sm">
    <div class="eyebrow-b">{m["name"]} 2026 · {date_range}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:4px;">
      <span style="font-size:40px;">{p["emoji"]}</span>
      <div>
        <div class="cream-h2" style="margin:0;">{p["name"]}</div>
        <div class="cream-sm">{p["subtitle"]}</div>
      </div>
    </div>
    <div class="burg-rule" style="margin-bottom:12px;"></div>
    <div class="cream-body" style="font-style:italic;margin-bottom:12px;">{p["energy"][:220]}...</div>
    {fields_html}
    <div class="lbl-b" style="margin-top:14px;">{p["ws_checklist"]}</div>
    {chk_rows(6)}
    <div class="cream-quote">"{p["quote"]}"</div>
  </div>
  <div class="pf-c">{m["name"]} · {p["name"]} Worksheet · {page_num}</div>
</div>"""

# ── Full Moon Ritual ──────────────────────────────────────────────────────────
def page_full_moon_ritual(m, page_num):
    full_str = m["full_date"].strftime("%B %-d, 2026")
    return f"""
<div class="page page-dark">
  {brackets()}
  <div style="position:absolute;top:-20px;right:-20px;opacity:.5;">{moon_svg("rgba(237,183,77,0.5)",190)}</div>
  <div class="cp-sm">
    <div class="eyebrow-g">Full Moon Ritual · {m["name"]} 2026</div>
    <div class="dark-h2">{m["moon_name"]}<br><span style="color:var(--gold);">Full Moon Ritual</span></div>
    <div class="dark-date">🌕 {full_str} · Moon in {m["full_sign"]}</div>
    <div class="gold-rule-l" style="margin-bottom:10px;"></div>
    <div class="dark-body">{m["full_energy"]}</div>
    <div class="lbl-g">You Will Need</div>
    <div class="dark-sm" style="font-style:italic;margin-bottom:10px;">{m["supplies"]}</div>
    <div class="lbl-g">The Ritual</div>
    <div class="ritual-steps" style="margin-bottom:6px;">{step_html(m["ritual_steps"])}</div>
    <div style="font-family:'Poppins',sans-serif;font-size:12px;font-style:italic;color:var(--gold);margin-bottom:8px;padding:8px 14px;border:.5px solid rgba(237,183,77,0.2);border-radius:3px;">Affirmation: {m["affirmation"]}</div>
    <div style="background:rgba(237,183,77,0.04);border:.5px solid rgba(237,183,77,0.15);border-radius:4px;padding:12px 14px;margin-top:4px;">
      <div style="font-family:'Poppins',sans-serif;font-size:10px;font-weight:600;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;border-bottom:.5px solid rgba(237,183,77,0.15);padding-bottom:4px;margin-bottom:8px;">Reflection &amp; Release · After the Ritual</div>
      {wlines(4,"wl-ds")}
    </div>
  </div>
  <div class="pf-d">{m["name"]} 2026 · {m["moon_name"]} Full Moon Ritual · {page_num}</div>
</div>"""

# ── New Moon Intention ────────────────────────────────────────────────────────
def page_new_moon_intention(m, page_num):
    new_str = m["new_date"].strftime("%B %-d, 2026")
    prompts_html = ""
    for i, q in enumerate(m["journal_prompts"], 1):
        prompts_html += f'<div style="margin-bottom:12px;"><div style="margin-bottom:4px;"><span class="nm-prompt-num">{i}.</span><span class="nm-prompt-q">{q}</span></div>{wlines(2,"wl-s")}</div>'
    int_rows = "".join(f'<tr><td class="int-col1"></td><td class="int-col2"></td><td class="int-col3"></td></tr>' for _ in range(4))
    return f"""
<div class="page page-cream">
  {brackets()}
  <div style="position:absolute;top:40px;right:40px;opacity:.2;">{moon_svg("#6D2E46",90)}</div>
  <div class="cp-sm">
    <div class="eyebrow-b">New Moon · {m["name"]} 2026</div>
    <div class="cream-h2" style="margin-bottom:4px;">New Moon in {m["new_sign"]}</div>
    <div class="cream-date">🌑 {new_str}</div>
    <div class="burg-rule" style="margin-bottom:10px;"></div>
    <div class="cream-body" style="font-style:italic;margin-bottom:14px;">{m["new_energy"]}</div>
    <div class="lbl-b">Set Your Intention</div>
    <div class="nm-table-wrap">
      <table class="int-table">
        <thead><tr>
          <th class="int-col1">Soul Intention</th>
          <th class="int-col2">Aligned Action</th>
          <th class="int-col3">Complete By</th>
        </tr></thead>
        <tbody>{int_rows}</tbody>
      </table>
    </div>
    <div class="burg-rule" style="margin:12px 0;"></div>
    <div class="lbl-b" style="margin-bottom:8px;">Journal — What's Ready to Be Born This Cycle?</div>
    {prompts_html}
    <div class="nm-affirmation">{m["affirmation"]}</div>
  </div>
  <div class="pf-c">{m["name"]} · New Moon Intention · {page_num}</div>
</div>"""

# ── Back Matter ───────────────────────────────────────────────────────────────
def page_cycle_complete():
    qs = ["What was I most proud of this year?","Where did I surprise myself?",
          "What relationships changed or deepened?","What did I release that I thought I couldn't?",
          "How did I grow in the way I see myself?","What do I want to begin next year differently?"]
    rows = ""
    for q in qs:
        rows += f'<div style="margin-bottom:12px;"><div class="cream-sm" style="font-family:\'Poppins\',sans-serif;color:var(--burg);font-style:normal;font-size:13px;margin-bottom:4px;">{q}</div>{wlines(2,"wl-s")}</div>'
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp">
    <div class="eyebrow-b">Year-End Ritual</div>
    <div class="cream-h2">Cycle Complete</div>
    <div class="burg-rule" style="margin-bottom:12px;"></div>
    <div class="cream-body" style="font-style:italic;margin-bottom:14px;">You made it through twelve moons. That is not nothing. That is everything. Before you close this planner, honor the journey.</div>
    {rows}
    <div class="cream-quote" style="font-family:'Allura',cursive;font-size:32px;">The cycle is complete. You are not the same.</div>
  </div>
</div>"""

def page_moving_forward():
    return f"""
<div class="page page-dark">
  {brackets()}
  <div class="cp">
    <div class="eyebrow-g">Looking Ahead</div>
    <div class="dark-h1">Moving<br><span style="color:var(--gold);">Forward</span></div>
    <div class="gold-rule-l" style="margin-bottom:14px;"></div>
    <div class="dark-body">You've worked with twelve full moons and twelve new moons. You've released and begun, celebrated and surrendered, planned and trusted. Now you stand at the threshold of a new cycle with more wisdom, more clarity, and more power than when you began.</div>
    <div class="lbl-g" style="margin-top:14px;">What I'm Carrying Into Next Year</div>
    {wlines(4,"wl-d")}
    <div class="lbl-g">What I'm Finally Leaving Behind</div>
    {wlines(4,"wl-d")}
    <div class="lbl-g">My Intention for the Year Ahead</div>
    {wlines(3,"wl-d")}
    <div class="dark-quote" style="font-family:'Allura',cursive;font-size:30px;color:var(--gold);">She rises. Always.</div>
  </div>
</div>"""

def page_notes():
    return f"""
<div class="page page-cream">
  {brackets()}
  <div class="cp">
    <div class="eyebrow-b" style="margin-bottom:6px;">Sacred Space</div>
    <div class="cream-h2" style="margin-bottom:4px;">Notes &amp; Downloads</div>
    <div class="burg-rule" style="margin-bottom:16px;"></div>
    <div style="flex:1;">{wlines(24,"wl")}</div>
  </div>
</div>"""

def page_back_cover():
    return f"""
<div class="page page-dark" style="display:flex;align-items:center;justify-content:center;">
  {brackets()}
  <div style="text-align:center;padding:40px;">
    <div class="eyebrow-g">Enchanting Life Unleashed</div>
    <div class="gold-rule" style="margin:12px auto;width:100px;"></div>
    <div style="font-family:'Allura',cursive;font-size:72px;color:var(--gold);line-height:1.1;">Twelve moons.</div>
    <div style="font-family:'Playfair Display',serif;color:var(--cream);font-size:38px;font-weight:700;line-height:1.3;margin-top:-4px;">
      One extraordinary<br><span style="color:var(--gold);">you.</span>
    </div>
    <div class="gold-rule" style="margin:16px auto;width:100px;"></div>
    <div style="font-family:'Poppins',sans-serif;color:var(--pink);font-size:14px;font-style:italic;max-width:360px;margin:0 auto 24px;line-height:1.8;">May your year be illuminated, your power be unleashed,<br>and your magic be undeniable.</div>
    <div style="font-family:'Poppins',sans-serif;color:rgba(237,183,77,0.8);font-size:13px;letter-spacing:.1em;">EnchantingLifeUnleashed.com</div>
    <div style="font-family:'Poppins',sans-serif;color:rgba(162,103,105,0.7);font-size:13px;margin-top:4px;">@enchantinglifeunleashed</div>
    <div style="font-family:'Poppins',sans-serif;color:rgba(162,103,105,0.4);font-size:11px;margin-top:20px;">© Enchanting Life Unleashed 2026. All rights reserved.</div>
  </div>
</div>"""

# ── Build ─────────────────────────────────────────────────────────────────────
PHASE_IDX = {"first_qtr":2, "wax_gib":3, "wan_gib":5, "last_qtr":6, "wan_cres":7}

def build_html():
    pages = []

    # Front matter (14 pages)
    pages.append(page_cover())          # p1
    pages.append(page_welcome())        # p2
    pages.append(page_how_it_works())   # p3
    pages.append(page_lunar_calendar()) # p4
    pages.append(page_yearly_overview())# p5
    pages.append(page_phase_section_header()) # p6
    for ph in PHASES:                   # p7-p14
        pages.append(page_phase_education(ph))

    FRONT = 14

    # Monthly (12 pages × 12)
    for i, m in enumerate(MONTHS):
        base = FRONT + 1 + i * 12  # 1-indexed page numbers
        # Page offsets within month (0-indexed from base):
        # 0=overview, 1=week1, 2=first_qtr_ws, 3=wax_gib_ws, 4=full_moon,
        # 5=week2, 6=wan_gib_ws, 7=week3, 8=last_qtr_ws,
        # 9=wan_cres_ws, 10=week4, 11=new_moon

        weeks = build_weeks(m["num"], m["full_date"], m["new_date"])
        # Ensure we always have 4 weeks
        while len(weeks) < 4:
            weeks.append({"num": len(weeks)+1, "range": MA[m["num"]-1]+" —", "days":[]})

        dr = {k: phase_date_range(m["num"], m["full_date"], m["new_date"], k)
              for k in PHASE_IDX}

        # Week task definitions
        w1_tasks = [
            {"emoji":"🌓","name":"First Quarter Worksheet","page": base+2},
            {"emoji":"🌔","name":"Waxing Gibbous Worksheet","page": base+3},
            {"emoji":"🌕","name":f"{m['moon_name']} Full Moon Ritual","page": base+4},
        ]
        w2_tasks = [
            {"emoji":"🌖","name":"Waning Gibbous Worksheet","page": base+6},
        ]
        w3_tasks = [
            {"emoji":"🌗","name":"Last Quarter Worksheet","page": base+8},
            {"emoji":"🌘","name":"Waning Crescent Worksheet","page": base+9},
            {"emoji":"🌑","name":"New Moon Intention","page": base+11},
        ]
        w4_tasks = [
            {"emoji":"🌑","name":"New Moon Intention","page": base+11},
        ]

        pages.append(page_month_overview(m, base))                                           # +0
        pages.append(page_weekly_planner(m, weeks[0], w1_tasks, WEEK_QUOTES[0], base+1))    # +1
        pages.append(page_phase_worksheet(m, PHASE_IDX["first_qtr"], dr["first_qtr"], base+2)) # +2
        pages.append(page_phase_worksheet(m, PHASE_IDX["wax_gib"], dr["wax_gib"], base+3))  # +3
        pages.append(page_full_moon_ritual(m, base+4))                                       # +4
        pages.append(page_weekly_planner(m, weeks[1], w2_tasks, WEEK_QUOTES[1], base+5))    # +5
        pages.append(page_phase_worksheet(m, PHASE_IDX["wan_gib"], dr["wan_gib"], base+6))  # +6
        pages.append(page_weekly_planner(m, weeks[2], w3_tasks, WEEK_QUOTES[2], base+7))    # +7
        pages.append(page_phase_worksheet(m, PHASE_IDX["last_qtr"], dr["last_qtr"], base+8)) # +8
        pages.append(page_phase_worksheet(m, PHASE_IDX["wan_cres"], dr["wan_cres"], base+9)) # +9
        pages.append(page_weekly_planner(m, weeks[3], w4_tasks, WEEK_QUOTES[3], base+10))   # +10
        pages.append(page_new_moon_intention(m, base+11))                                    # +11

    # Back matter
    pages.append(page_cycle_complete())
    pages.append(page_moving_forward())
    pages.append(page_notes())
    pages.append(page_notes())
    pages.append(page_back_cover())

    total = len(pages)
    print(f"Total pages: {total}")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>2026 Moon Cycle Life Planner — Enchanting Life Unleashed</title>
<style>{CSS}</style>
</head>
<body>{''.join(pages)}</body>
</html>"""

# ── Main ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print("Building HTML...")
    html = build_html()
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML saved: {os.path.abspath(OUTPUT_HTML)}")

    print("Generating PDF via Chrome...")
    import subprocess
    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    result = subprocess.run([
        chrome, "--headless", "--disable-gpu",
        f"--print-to-pdf={os.path.abspath(OUTPUT_PDF)}",
        "--print-to-pdf-no-header",
        os.path.abspath(OUTPUT_HTML)
    ], capture_output=True, text=True)
    if os.path.exists(OUTPUT_PDF):
        size = os.path.getsize(OUTPUT_PDF)
        print(f"PDF saved: {os.path.abspath(OUTPUT_PDF)} ({size:,} bytes)")
    else:
        print("PDF generation failed.")
        print(result.stderr[:500])
