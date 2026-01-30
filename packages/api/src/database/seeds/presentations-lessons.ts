/**
 * Presentations Category - 10 Micro-Lessons
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';

export const presentationsLessons = [
  {
    title: 'Opening with Impact',
    description: 'Capture attention in the first 30 seconds',
    category: 'presentations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 1,
    isPublished: true,
    tags: ['presentations', 'openings', 'hooks'],

    introductionContent: `
# The First 30 Seconds

You have 30 seconds to capture your audience. Make them count.

Studies show audiences decide within the first minute whether to pay attention. Today you'll learn opening techniques that guarantee engagement.
    `.trim(),

    learningObjectives: [
      'Learn 5 powerful opening techniques',
      'Understand what makes openings fail',
      'Practice crafting compelling hooks',
    ],

    coreConceptContent: {
      text: `
## 5 Powerful Opening Techniques

### 1. The Startling Statistic
"Every 3 seconds, someone in this room checks their phone."

### 2. The Provocative Question
"What would you do if you had 6 months to live?"

### 3. The Story Hook
"Last Tuesday at 3am, I got a call that changed everything..."

### 4. The Bold Statement
"Everything you know about productivity is wrong."

### 5. The Imagination Prompt
"Imagine walking into work and your entire team is smiling..."

## What NOT to Do

- "Hi, my name is... and today I'll be talking about..."
- "Can you hear me? Is this working?"
- "I'm not really prepared, but..."
- Starting with an apology
      `.trim(),
      keyPoints: [
        '5 techniques: Statistic, Question, Story, Bold Statement, Imagination',
        'Avoid weak openings that apologize or bore',
        'The first 30 seconds set the tone for everything',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which opening is MOST effective?',
          options: [
            '"Hi everyone, today I\'ll discuss quarterly results."',
            '"What if I told you we could double revenue in 6 months?"',
            '"So, um, let me start by saying..."',
            '"Can everyone see the screen okay?"',
          ],
          correctIndex: 1,
          explanation: 'The provocative question immediately engages curiosity and promises value. The others are weak, generic, or apologetic.',
        },
      ],
    },

    practicePrompt: 'Create and deliver an opening for a presentation about a topic you know well. Use one of the 5 techniques. Your entire recording should be just the opening—30-45 seconds max.',
    practiceGuidelines: [
      'Choose ONE technique and commit to it',
      'Don\'t introduce yourself first—hook them first',
      'Deliver with energy and confidence',
      'Make them want to hear more',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ 5 opening techniques that work
✅ Avoid weak, apologetic starts
✅ Hook first, introduce second

**Mantra**: "Earn their attention, don't assume it."
    `.trim(),
    keyTakeaways: [
      '5 techniques: Statistic, Question, Story, Bold, Imagination',
      'Hook first, introduce yourself second',
      'First 30 seconds determine audience engagement',
    ],
  },

  {
    title: 'Structuring Your Presentation',
    description: 'Create a clear flow that audiences can follow',
    category: 'presentations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 2,
    isPublished: true,
    tags: ['presentations', 'structure', 'organization'],

    introductionContent: `
# Structure = Clarity

A brilliant message delivered poorly is a poor message. Structure is the backbone of every great presentation.

Today you'll learn frameworks that make any content easy to follow.
    `.trim(),

    learningObjectives: [
      'Master the classic 3-part structure',
      'Learn the Problem-Solution-Benefit framework',
      'Practice signposting for clarity',
    ],

    coreConceptContent: {
      text: `
## The Classic Structure

### Tell Them 3 Times
1. **Tell them what you'll tell them** (Preview)
2. **Tell them** (Content)
3. **Tell them what you told them** (Summary)

### The Power of Three

Organize content in 3 parts:
- 3 main points
- 3 supporting examples
- 3 action items

### Problem-Solution-Benefit

**Problem**: What's wrong / what needs to change
**Solution**: Your proposal / recommendation
**Benefit**: What improves as a result

### Signposting

Guide your audience with verbal markers:
- "First... Second... Third..."
- "Now let's move to..."
- "The key takeaway here is..."
- "To summarize..."
      `.trim(),
      keyPoints: [
        'Tell them 3 times: preview, content, summary',
        'Organize in groups of three',
        'Use signposting to guide the audience',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to present a new project idea to your team.',
        role: 'presenter',
        prompts: [
          'What\'s your preview/opening?',
          'What are your 3 main points?',
          'How do you summarize?',
        ],
        sampleResponses: [
          '"Today I\'ll share our new initiative: the problem, our solution, and the expected impact."',
          '1) The current challenge, 2) Our proposed approach, 3) Timeline and resources',
          '"In summary: big problem, smart solution, significant upside. Questions?"',
        ],
      },
    },

    practicePrompt: 'Deliver a 90-second structured mini-presentation on any topic. Include: preview, 3 points with signposts, and summary.',
    practiceGuidelines: [
      'Start with a clear preview of your 3 points',
      'Use signposts: "First... Second... Finally..."',
      'End with a brief summary',
      'Keep each point concise',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

✅ Tell them 3 times structure
✅ Power of three for memorability
✅ Signposts guide your audience

**Mantra**: "If they can't follow, they can't remember."
    `.trim(),
    keyTakeaways: [
      'Preview → Content → Summary',
      'Organize in threes',
      'Use signposts to guide audience',
    ],
  },

  {
    title: 'Using Visual Aids Effectively',
    description: 'Make slides support you, not replace you',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 3,
    isPublished: true,
    tags: ['presentations', 'slides', 'visuals'],

    introductionContent: `
# Slides Are Not Your Script

The biggest mistake presenters make? Putting everything on slides and reading them.

Today you'll learn to use visuals that enhance your message, not compete with it.
    `.trim(),

    learningObjectives: [
      'Apply the 6x6 rule for slide text',
      'Use images and data effectively',
      'Present without being dependent on slides',
    ],

    coreConceptContent: {
      text: `
## The 6x6 Rule

Maximum per slide:
- 6 lines of text
- 6 words per line

Better yet: aim for even less.

## Visual Hierarchy

**One idea per slide.** If you need more, use more slides.

## Images > Bullets

Instead of bullet points, use:
- Powerful images that evoke emotion
- Simple diagrams that clarify
- Data visualizations that reveal

## Present the Slide, Don't Read It

Your audience can read faster than you can speak.

**Instead of reading**: "Our Q3 results show 23% growth..."
**Say**: "Look at this number. 23%. That's our best quarter ever."

## The Black Slide Technique

Insert black slides when you want full attention on YOU, not the screen.
      `.trim(),
      keyPoints: [
        '6x6 rule: max 6 lines, 6 words each',
        'One idea per slide',
        'Present the slide, don\'t read it',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'What\'s the best approach when a complex slide appears?',
          options: [
            'Read everything on the slide aloud',
            'Let the audience read while you stay silent',
            'Direct attention to the key point and explain its significance',
            'Apologize for the complexity',
          ],
          correctIndex: 2,
          explanation: 'Guide their attention to what matters most, then add context they can\'t get from just reading.',
        },
      ],
    },

    practicePrompt: 'Pretend you\'re showing a slide with one key statistic. Present it compellingly without "reading" it—make the number come alive with context and significance.',
    practiceGuidelines: [
      'State the number dramatically',
      'Explain what it means',
      'Tell them why it matters',
      'Connect it to them personally',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ 6x6 rule for minimal text
✅ One idea per slide
✅ Present slides, don't read them

**Mantra**: "You are the presentation. Slides are your backup singers."
    `.trim(),
    keyTakeaways: [
      'Less text = more impact',
      'One idea per slide',
      'YOU are the presentation, not your slides',
    ],
  },

  {
    title: 'Handling Q&A Sessions',
    description: 'Turn questions into opportunities',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 4,
    isPublished: true,
    tags: ['presentations', 'Q&A', 'questions'],

    introductionContent: `
# Q&A: Where Credibility Is Won or Lost

Your presentation might be polished. But Q&A reveals your true expertise.

Learn to handle any question—even the ones you can't answer.
    `.trim(),

    learningObjectives: [
      'Use the PREP technique for structured answers',
      'Handle "I don\'t know" professionally',
      'Manage hostile or off-topic questions',
    ],

    coreConceptContent: {
      text: `
## The PREP Technique

**P - Point**: State your answer
**R - Reason**: Explain why
**E - Example**: Give evidence
**P - Point**: Restate answer

## When You Don't Know

Never fake it. Options:
- "I don't have that data, but I'll follow up by Friday."
- "Great question—that's outside my area, but [name] would know."
- "I'd want to verify before answering. Can I get back to you?"

## Handling Difficult Questions

**Hostile**: Stay calm, acknowledge the concern, pivot to facts
**Off-topic**: "Great question. Let's discuss offline so we stay on track."
**Multipart**: "Let me take those one at a time..."

## Q&A Best Practices

- Repeat or paraphrase the question (confirms understanding, buys time)
- Make eye contact with questioner, then whole room while answering
- Keep answers concise (30-60 seconds max)
- End Q&A on your terms: "Time for one more question..."
      `.trim(),
      keyPoints: [
        'PREP: Point, Reason, Example, Point',
        '"I\'ll find out" beats faking it',
        'Keep answers concise (30-60 seconds)',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'After your presentation, someone asks: "How does this compare to what our competitors are doing?"',
        role: 'presenter in Q&A',
        prompts: [
          'How would you use PREP to answer?',
          'What if you don\'t know the competitive landscape?',
        ],
        sampleResponses: [
          'Point: "We\'re ahead." Reason: "Our approach is X." Example: "Competitor A does Y." Point: "So we\'re well-positioned."',
          '"I\'d want to give you accurate data on that. Let me research and follow up tomorrow."',
        ],
      },
    },

    practicePrompt: 'Practice answering: "What\'s the biggest risk with this plan?" Use the PREP technique in under 60 seconds.',
    practiceGuidelines: [
      'State your main point first',
      'Give one clear reason',
      'Provide a brief example or evidence',
      'Circle back to your point',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ PREP structures any answer
✅ Admitting gaps builds credibility
✅ Keep answers under 60 seconds

**Mantra**: "Q&A is where trust is earned."
    `.trim(),
    keyTakeaways: [
      'Use PREP for structured answers',
      'Never fake expertise you don\'t have',
      'Concise answers show confidence',
    ],
  },

  {
    title: 'Closing with Power',
    description: 'End memorably and inspire action',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 5,
    isPublished: true,
    tags: ['presentations', 'closing', 'call-to-action'],

    introductionContent: `
# The Last Thing They Hear

Your closing is what people remember most. Make it count.

A weak ending undermines everything that came before. A powerful ending inspires action.
    `.trim(),

    learningObjectives: [
      'Learn 4 powerful closing techniques',
      'Avoid common closing mistakes',
      'Craft clear calls to action',
    ],

    coreConceptContent: {
      text: `
## 4 Powerful Closing Techniques

### 1. The Callback
Return to your opening hook. Creates satisfying closure.
"Remember that 3am phone call? Today I'm glad it happened..."

### 2. The Challenge
Call them to action.
"The question isn't whether this will work. It's whether you'll act."

### 3. The Vision
Paint the future.
"Imagine six months from now, looking back at this moment..."

### 4. The Quote
Borrow wisdom that reinforces your message.
"As Maya Angelou said, 'People will forget what you said, but never how you made them feel.'"

## What NOT to Do

- "Well, I guess that's it..."
- "Any questions?" (as your ending)
- "Sorry I went over time"
- Trailing off without closure
- Introducing new content

## The Call to Action Formula

**What** do you want them to do?
**When** should they do it?
**Why** should they care?

"Sign up before Friday to lock in the early rate."
      `.trim(),
      keyPoints: [
        '4 closings: Callback, Challenge, Vision, Quote',
        'Always include a clear call to action',
        'Never end with "any questions?" or trailing off',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which closing is STRONGEST?',
          options: [
            '"So, yeah, that\'s pretty much it. Questions?"',
            '"In conclusion, we covered points A, B, and C."',
            '"The choice is yours. Start today, or stay stuck. I know what I\'d choose."',
            '"Thanks for listening. Have a good day."',
          ],
          correctIndex: 2,
          explanation: 'The challenge close inspires action and creates emotional impact. The others are generic or weak.',
        },
      ],
    },

    practicePrompt: 'Deliver a powerful 30-second closing for any presentation topic. Use one of the 4 techniques and include a clear call to action.',
    practiceGuidelines: [
      'Choose one technique: Callback, Challenge, Vision, or Quote',
      'Include a specific call to action',
      'End strong—don\'t trail off',
      'Deliver with conviction',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ 4 powerful closing techniques
✅ Clear call to action
✅ End with strength, not apology

**Mantra**: "The last words linger longest."
    `.trim(),
    keyTakeaways: [
      'Callback, Challenge, Vision, Quote',
      'Include specific call to action',
      'Never trail off or apologize at the end',
    ],
  },

  {
    title: 'Managing Presentation Nerves',
    description: 'Channel anxiety into powerful energy',
    category: 'presentations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 6,
    isPublished: true,
    tags: ['presentations', 'anxiety', 'nerves'],

    introductionContent: `
# Nerves Are Normal

Even the best speakers feel nervous. The goal isn't to eliminate nerves—it's to channel them.

Today you'll learn techniques pros use to turn anxiety into energy.
    `.trim(),

    learningObjectives: [
      'Understand the anxiety-performance connection',
      'Learn pre-presentation calming techniques',
      'Reframe nervousness as excitement',
    ],

    coreConceptContent: {
      text: `
## The Truth About Nerves

Research shows moderate anxiety IMPROVES performance:
- Increases alertness
- Heightens focus
- Boosts energy

Too little anxiety = flat delivery
Optimal anxiety = peak performance
Too much anxiety = impairment

## Pre-Presentation Protocol

**30 minutes before:**
- Review key points only (don't cram)
- Light movement (walk, stretch)
- Avoid caffeine overdose

**5 minutes before:**
- Power pose (2 minutes)
- 4-7-8 breathing (3 cycles)
- Positive self-talk

**Right before:**
- Smile (triggers positive state)
- One deep breath
- "I'm excited" (reframe nerves)

## The Reframe Technique

Anxiety and excitement are physiologically identical. Your label matters.

**Instead of**: "I'm so nervous"
**Say**: "I'm so excited"

Research shows this simple reframe improves performance.
      `.trim(),
      keyPoints: [
        'Moderate nerves improve performance',
        'Have a consistent pre-presentation ritual',
        'Reframe "nervous" as "excited"',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'The best approach to presentation nerves is:',
          options: [
            'Try to eliminate all anxiety',
            'Channel it into energy and reframe as excitement',
            'Tell the audience you\'re nervous',
            'Have a drink to calm down',
          ],
          correctIndex: 1,
          explanation: 'Moderate anxiety actually helps performance. Reframing as excitement uses that energy positively.',
        },
      ],
    },

    practicePrompt: 'Practice the pre-speaking ritual: power pose for 30 seconds, three 4-7-8 breaths, say "I\'m excited," then immediately record a confident 30-second introduction of yourself.',
    practiceGuidelines: [
      'Actually do the power pose before recording',
      'Do the breathing—don\'t skip it',
      'Say "I\'m excited" out loud',
      'Notice how your state shifts',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ Moderate nerves help performance
✅ Pre-presentation ritual creates consistency
✅ "I'm excited" reframe works

**Mantra**: "Nerves mean I care. I channel them."
    `.trim(),
    keyTakeaways: [
      'Some anxiety improves performance',
      'Have a consistent pre-presentation ritual',
      'Reframe nervousness as excitement',
    ],
  },

  {
    title: 'Presenting Data Compellingly',
    description: 'Make numbers tell a story',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 7,
    isPublished: true,
    tags: ['presentations', 'data', 'storytelling'],

    introductionContent: `
# Data Without Story Is Just Numbers

"Revenue increased 23%" is data. "We've never had a quarter this good—23% above last year" is a story.

Learn to make your data meaningful and memorable.
    `.trim(),

    learningObjectives: [
      'Translate data into human terms',
      'Use comparisons that resonate',
      'Build narrative around numbers',
    ],

    coreConceptContent: {
      text: `
## Making Data Human

### Translate to Tangible

**Instead of**: "2 million users"
**Say**: "That's the population of Houston using our app"

**Instead of**: "15% reduction"
**Say**: "For every 20 customers, 3 more now stay with us"

### Use Comparisons

- "That's like [familiar reference]"
- "Enough to fill [visual image]"
- "More than [competitor/benchmark]"

### The Story Arc for Data

1. **Context**: Where we were
2. **Change**: What happened
3. **Impact**: What it means
4. **Future**: Where we're going

### One Number Rule

If you share 10 numbers, they'll remember zero.
If you share 1 number with context, they'll remember it.

"If you remember one thing: 47. That's the percentage of customers who said they'd recommend us. Last year it was 31."
      `.trim(),
      keyPoints: [
        'Translate abstract numbers to human scale',
        'Use comparisons to familiar things',
        'One memorable number beats ten forgettable ones',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to present this data point: "Processing time reduced from 48 hours to 12 hours."',
        role: 'presenter making data compelling',
        prompts: [
          'How would you make this tangible?',
          'What comparison could you use?',
          'How would you connect it to the audience?',
        ],
        sampleResponses: [
          '"What used to take two full days now takes half a day."',
          '"That\'s the difference between ordering Monday and getting it Wednesday vs. getting it Monday afternoon."',
          '"For you, it means results by lunch instead of waiting until Thursday."',
        ],
      },
    },

    practicePrompt: 'Present this statistic compellingly: "Customer satisfaction increased 18% this quarter." Make it tangible, use comparison, and connect it to your audience.',
    practiceGuidelines: [
      'Don\'t just state the number',
      'Put it in human terms',
      'Use a comparison',
      'Explain why it matters to them',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Translate numbers to human scale
✅ Comparisons make data memorable
✅ One powerful number > many forgettable ones

**Mantra**: "Data tells, but stories sell."
    `.trim(),
    keyTakeaways: [
      'Make abstract numbers tangible',
      'Use familiar comparisons',
      'Focus on one memorable number',
    ],
  },

  {
    title: 'Presenting to Senior Leaders',
    description: 'Adapt your style for executive audiences',
    category: 'presentations',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 8,
    isPublished: true,
    tags: ['presentations', 'executive', 'leadership'],

    introductionContent: `
# The Executive Audience

Presenting to senior leaders is different. They're time-starved, decision-focused, and allergic to fluff.

Learn to give executives what they need: clarity, brevity, and recommendations.
    `.trim(),

    learningObjectives: [
      'Understand executive communication preferences',
      'Lead with the bottom line',
      'Prepare for rapid-fire questions',
    ],

    coreConceptContent: {
      text: `
## What Executives Want

### Bottom Line Up Front (BLUF)
Don't build up to your recommendation. START with it.

"I recommend we proceed with Option B. Here's why..."

### The 3 Things They Care About
1. **Impact**: What's the effect on business?
2. **Risk**: What could go wrong?
3. **Resources**: What's needed to execute?

### The Executive Summary Format

**Recommendation** (10 seconds)
**Key reasons** (60 seconds)
**Risks and mitigations** (30 seconds)
**Ask/Next steps** (10 seconds)

Total: Under 2 minutes. Then they'll ask questions.

### Be Ready For

- Interruptions (normal, not rude)
- Rapid topic shifts
- "What do YOU think?"
- "Cut to the bottom line"

### What to Avoid

- Long backstory/context
- Reading slides
- Hedging language
- Saying "I think" when you mean "I recommend"
      `.trim(),
      keyPoints: [
        'Lead with your recommendation (BLUF)',
        'Focus on impact, risk, resources',
        'Keep it under 2 minutes, then take questions',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'An executive interrupts mid-sentence. You should:',
          options: [
            'Ask them to let you finish',
            'Get flustered and lose your place',
            'Answer their question directly, then ask if they want you to continue',
            'Ignore the question and keep going',
          ],
          correctIndex: 2,
          explanation: 'Executive interruptions are normal—they\'re trying to get to what matters. Answer directly, then check if they want more detail.',
        },
      ],
    },

    practicePrompt: 'Deliver a 90-second executive briefing on any business decision. Lead with your recommendation, cover impact/risk/resources briefly, and end with a clear ask.',
    practiceGuidelines: [
      'Start with "I recommend..." not background',
      'Keep total time under 2 minutes',
      'Speak with confidence and directness',
      'End with a specific ask or next step',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

✅ Lead with recommendation (BLUF)
✅ Impact, Risk, Resources
✅ Under 2 minutes, then Q&A

**Mantra**: "Executives want answers, not journeys."
    `.trim(),
    keyTakeaways: [
      'Start with your recommendation',
      'Cover impact, risk, and resources',
      'Be brief, direct, and prepared for questions',
    ],
  },

  {
    title: 'Virtual Presentation Mastery',
    description: 'Engage audiences through screens',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 9,
    isPublished: true,
    tags: ['presentations', 'virtual', 'remote'],

    introductionContent: `
# Presenting Through Screens

Virtual presentations have unique challenges: competing for attention, reading engagement, technical risks.

Master the techniques that make you compelling even through a camera.
    `.trim(),

    learningObjectives: [
      'Optimize your virtual setup',
      'Maintain energy and engagement virtually',
      'Handle technical issues gracefully',
    ],

    coreConceptContent: {
      text: `
## Virtual Setup Essentials

### Lighting
Face a window or light source. Never have a window behind you.

### Camera
- At eye level (not looking up your nose)
- Look at camera, not the screen, for key moments

### Audio
- Use headphones with a mic
- Mute when not speaking
- Test audio BEFORE you start

### Background
- Clean and professional
- Virtual backgrounds can be distracting

## Virtual Engagement Techniques

### Energy x 1.5
Increase your energy 50%. What feels "too much" to you looks "just right" on screen.

### The 20-Minute Rule
Attention drops after 20 mins. Build in interaction every 15-20 minutes.

### Engagement Tools
- Polls and reactions
- Chat questions
- Breakout discussions
- Direct questions by name

### Eye Contact Hack
Put a sticky dot near your camera. Look at it when making important points.
      `.trim(),
      keyPoints: [
        'Optimize lighting, camera, and audio',
        'Increase energy 50% for screen',
        'Engage every 15-20 minutes',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'For virtual eye contact, you should:',
          options: [
            'Look at attendee faces on screen',
            'Look directly at your camera lens',
            'Look at your notes',
            'Close your eyes to focus',
          ],
          correctIndex: 1,
          explanation: 'Looking at the camera lens creates the illusion of eye contact for viewers, even though it feels unnatural to you.',
        },
      ],
    },

    practicePrompt: 'Deliver a 60-second virtual presentation directly to your camera. Treat the camera lens as a person. Bring extra energy and end with a question for engagement.',
    practiceGuidelines: [
      'Look directly at the camera, not the screen',
      'Bring 50% more energy than feels natural',
      'End with an engaging question',
      'Smile—it shows through the screen',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Setup matters: lighting, camera, audio
✅ Energy x 1.5 for virtual
✅ Engage every 15-20 minutes

**Mantra**: "Through screens, I can still connect."
    `.trim(),
    keyTakeaways: [
      'Technical setup creates first impression',
      'Virtual requires higher energy',
      'Look at camera for eye contact effect',
    ],
  },

  {
    title: 'Rehearsing for Excellence',
    description: 'Practice techniques that make perfect',
    category: 'presentations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 10,
    isPublished: true,
    tags: ['presentations', 'rehearsal', 'practice'],

    introductionContent: `
# Practice Makes Permanent

"I'll wing it" is not a strategy. The best presentations look effortless because they were practiced extensively.

Learn how to rehearse effectively—not just repeat.
    `.trim(),

    learningObjectives: [
      'Learn the 4 levels of rehearsal',
      'Practice out loud, not just in your head',
      'Use video review for improvement',
    ],

    coreConceptContent: {
      text: `
## The 4 Levels of Rehearsal

### Level 1: Content Review
Read through your material. Ensure logical flow.
*Time: 15 mins*

### Level 2: Talk-Through
Speak it out loud, alone. Don't memorize—find your natural phrasing.
*Time: 20-30 mins*

### Level 3: Full Run-Through
Full presentation: standing, with slides, timed.
*Do this 3-5 times*

### Level 4: Simulation
Present to a colleague or record yourself. Get feedback.
*Do this 1-2 times*

## Practice Tips

### Out Loud, Not In Your Head
Speaking aloud uses different brain processes than thinking. You must practice OUT LOUD.

### Stand, Don't Sit
If you'll present standing, practice standing.

### Record Yourself
Watch your recording with sound off (body language) and with eyes closed (voice). Fix what you find.

### Memorize Strategically
- First line (so you start strong)
- Transitions (so you don't get lost)
- Key statistics/quotes (so you're credible)
- Last line (so you end powerfully)
      `.trim(),
      keyPoints: [
        '4 levels: Review, Talk-Through, Run-Through, Simulation',
        'Practice out loud, not just mentally',
        'Memorize strategically: opening, transitions, close',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'What should you memorize for a presentation?',
          options: [
            'The entire script word for word',
            'Nothing—just wing it',
            'Opening, transitions, and closing',
            'Every statistic and data point',
          ],
          correctIndex: 2,
          explanation: 'Strategic memorization (opening, transitions, close) ensures smooth delivery without sounding robotic.',
        },
      ],
    },

    practicePrompt: 'Do a Level 2 rehearsal: talk through a 2-minute presentation topic out loud. Focus on natural phrasing, not memorization. Notice what feels smooth vs. awkward.',
    practiceGuidelines: [
      'Stand as if presenting',
      'Speak at full volume',
      'Don\'t try to be perfect—find natural phrasing',
      'Note where you stumble for extra practice',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Key Takeaways

✅ 4 levels of effective rehearsal
✅ Out loud > in your head
✅ Memorize strategically

**Mantra**: "The best impromptu speeches are the most rehearsed."
    `.trim(),
    keyTakeaways: [
      '4 levels: Review → Talk-Through → Run-Through → Simulation',
      'Always practice out loud',
      'Memorize opening, transitions, and closing',
    ],
  },
];

export default presentationsLessons;
