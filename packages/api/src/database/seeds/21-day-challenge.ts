/**
 * 21-Day Confidence Challenge - Complete Micro-Lesson Content
 *
 * A structured 21-day program designed to build speaking confidence progressively.
 * Each day builds on the previous, creating a comprehensive confidence journey.
 *
 * Week 1: Foundation (Days 1-7) - Building blocks of confident communication
 * Week 2: Skills (Days 8-14) - Developing specific speaking techniques
 * Week 3: Mastery (Days 15-21) - Advanced application and integration
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';

export const CHALLENGE_21_DAY = {
  id: '21-day-confidence',
  name: '21-Day Confidence Challenge',
  description: 'Transform your speaking confidence in just 21 days with daily micro-lessons',
  totalDays: 21,
};

export const challengeLessons = [
  // ============== WEEK 1: FOUNDATION ==============

  // DAY 1
  {
    title: 'Day 1: Your Confidence Baseline',
    description: 'Discover where you are and set your intention for the journey ahead',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 1,
    isPublished: true,
    tags: ['confidence', 'self-assessment', 'foundation'],

    introductionContent: `
# Welcome to Day 1!

Today marks the beginning of your transformation. Before we can grow, we need to understand where we're starting from.

This lesson will help you:
- Assess your current speaking confidence
- Identify your specific challenges
- Set a clear intention for the next 21 days

Remember: Every expert was once a beginner. Your journey starts now.
    `.trim(),

    learningObjectives: [
      'Complete an honest self-assessment of your speaking confidence',
      'Identify your top 3 speaking challenges',
      'Set a specific, measurable goal for this 21-day journey',
    ],

    coreConceptContent: {
      text: `
## Understanding Your Starting Point

### The Confidence Spectrum

Speaking confidence isn't black and white—it exists on a spectrum:

**1. Avoidant** - You actively avoid speaking situations
**2. Anxious** - You participate but feel significant discomfort
**3. Comfortable** - You can speak when needed but don't seek opportunities
**4. Confident** - You speak with ease and enjoy sharing ideas
**5. Commanding** - You naturally draw attention and inspire others

Most people fall somewhere in the middle, and that's perfectly okay.

### Common Speaking Challenges

Which of these resonate with you?

- **Physical symptoms**: Racing heart, sweating, shaky voice
- **Mental blocks**: Forgetting what to say, mind going blank
- **Self-doubt**: Feeling unqualified or that others judge you
- **Avoidance**: Finding excuses to skip speaking opportunities
- **Perfectionism**: Never feeling "ready" to speak

### The Growth Mindset

Research by Dr. Carol Dweck shows that abilities can be developed through dedication and hard work. Your speaking confidence is not fixed—it's a skill you can build.

**Key insight**: The goal isn't to eliminate nervousness. Even professional speakers feel nervous. The goal is to speak effectively *despite* the nerves.
      `.trim(),
      keyPoints: [
        'Confidence exists on a spectrum—wherever you are is valid',
        'Identifying specific challenges helps target improvement',
        'Speaking confidence is a learnable skill, not a fixed trait',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'On a scale of 1-5, where would you place your current speaking confidence?',
          options: [
            '1-2: I avoid speaking whenever possible',
            '2-3: I can speak but feel very uncomfortable',
            '3-4: I\'m okay in familiar situations but struggle with new ones',
            '4-5: I\'m generally confident but want to improve',
          ],
          correctIndex: -1, // No wrong answer - self-assessment
          explanation: 'There\'s no wrong answer here. This is about honest self-awareness, which is the foundation of growth.',
        },
        {
          question: 'What is your PRIMARY goal for this 21-day challenge?',
          options: [
            'Feel less anxious when speaking',
            'Speak more clearly and articulately',
            'Be more persuasive and influential',
            'Build confidence for a specific upcoming event',
          ],
          correctIndex: -1,
          explanation: 'Keep this goal in mind throughout the challenge. We\'ll work on all of these, but knowing your priority helps focus your practice.',
        },
      ],
    },

    practicePrompt: 'Record yourself answering: "What does speaking confidence mean to me, and why do I want to develop it?" Be honest and speak from the heart.',
    practiceGuidelines: [
      'Speak naturally—don\'t try to be perfect',
      'Share at least one specific situation where you want more confidence',
      'State your goal for completing this 21-day challenge',
      'This recording is just for you—be completely honest',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 1 Complete!

You've taken the most important step: starting. You now have:

✅ A clear picture of where you're starting from
✅ Identified your specific challenges
✅ Set an intention for this journey

**Your Day 1 Mantra**: "Growth begins with awareness."

**Tomorrow's Preview**: We'll explore the science of confidence and how your body and mind work together.

See you on Day 2!
    `.trim(),
    keyTakeaways: [
      'You\'ve identified your starting point on the confidence spectrum',
      'You know your specific challenges to work on',
      'You have a clear goal for the next 21 days',
    ],
  },

  // DAY 2
  {
    title: 'Day 2: The Science of Confidence',
    description: 'Understand how confidence works in your brain and body',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 2,
    isPublished: true,
    tags: ['confidence', 'psychology', 'science'],

    introductionContent: `
# Day 2: The Science Behind Confidence

Today we're going to demystify confidence. When you understand HOW it works, you can learn to CREATE it on demand.

You'll discover:
- What happens in your brain when you feel confident (or anxious)
- The powerful connection between body and mind
- Simple techniques backed by neuroscience

Knowledge is power—let's unlock yours.
    `.trim(),

    learningObjectives: [
      'Understand the neuroscience of confidence and anxiety',
      'Learn how body language affects your internal state',
      'Practice a simple technique to boost confidence in 2 minutes',
    ],

    coreConceptContent: {
      text: `
## Your Brain on Confidence

### The Two Systems

Your brain has two key players in confidence:

**The Amygdala (Fear Center)**
- Triggers fight-or-flight response
- Releases cortisol (stress hormone)
- Makes you want to escape or freeze

**The Prefrontal Cortex (Rational Brain)**
- Handles logical thinking
- Can override fear responses
- Activated by preparation and practice

### The Body-Mind Loop

Here's the fascinating part: the connection goes BOTH ways.

**Mind → Body**: When you feel anxious, your body tenses up
**Body → Mind**: When you adopt confident postures, your brain actually produces confidence chemicals

### The Power Pose Research

Social psychologist Amy Cuddy's research showed:
- 2 minutes of expansive postures increases testosterone (confidence) by 20%
- Decreases cortisol (stress) by 25%
- Participants felt more powerful AND performed better in interviews

### The Confidence Formula

**Confidence = Preparation + Positive Physiology + Practice**

You can influence all three of these factors, starting today.
      `.trim(),
      keyPoints: [
        'Anxiety is a normal brain response—not a character flaw',
        'Your body posture directly influences your confidence chemicals',
        'The confidence formula: Preparation + Positive Physiology + Practice',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You have an important presentation in 10 minutes. You feel your heart racing and palms sweating. Using what you\'ve learned, what would you do?',
        role: 'presenter preparing for a meeting',
        prompts: [
          'What physical technique could you use?',
          'How might you engage your prefrontal cortex?',
          'What self-talk would help?',
        ],
        sampleResponses: [
          'Find a private space and hold a power pose for 2 minutes',
          'Review key points to engage the rational brain and feel prepared',
          'Tell yourself: "I\'ve prepared for this. Nervousness means I care."',
        ],
      },
    },

    practicePrompt: 'Stand in a power pose (hands on hips, feet wide, chin up) for 30 seconds, then immediately record yourself introducing a topic you\'re passionate about. Notice how you feel.',
    practiceGuidelines: [
      'Really commit to the power pose—make yourself big',
      'Take a deep breath before recording',
      'Speak about something you genuinely care about',
      'Notice any difference in how you feel compared to usual',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 2 Complete!

You now understand the science behind confidence:

✅ Your amygdala causes anxiety—it's biology, not weakness
✅ Your body can change your brain chemistry
✅ The confidence formula gives you control

**Your Day 2 Mantra**: "My body can lead my mind to confidence."

**Power Pose Challenge**: Before any speaking situation this week, find 2 minutes to strike a power pose.

**Tomorrow's Preview**: We'll work on the foundation of all confident speaking—your breath.
    `.trim(),
    keyTakeaways: [
      'Anxiety is a normal biological response you can manage',
      'Power poses can increase confidence hormones in just 2 minutes',
      'Confidence = Preparation + Positive Physiology + Practice',
    ],
  },

  // DAY 3
  {
    title: 'Day 3: Breathing for Confidence',
    description: 'Master the breath techniques that instantly calm nerves',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 3,
    isPublished: true,
    tags: ['breathing', 'anxiety', 'techniques'],

    introductionContent: `
# Day 3: The Power of Breath

Your breath is the remote control to your nervous system. Today, you'll learn to use it.

When anxiety strikes, your breathing becomes shallow and fast. But here's the secret: you can REVERSE this. By controlling your breath, you directly calm your body's stress response.

Let's master this fundamental skill.
    `.trim(),

    learningObjectives: [
      'Understand how breathing affects your nervous system',
      'Learn the 4-7-8 calming breath technique',
      'Practice diaphragmatic breathing for voice power',
    ],

    coreConceptContent: {
      text: `
## The Breath-Calm Connection

### How It Works

Your nervous system has two modes:

**Sympathetic (Fight or Flight)**
- Fast, shallow breathing
- Heart races, muscles tense
- Mind focuses on threats

**Parasympathetic (Rest and Digest)**
- Slow, deep breathing
- Heart calms, muscles relax
- Mind thinks clearly

**The key insight**: You can SWITCH modes by changing your breathing.

### Technique 1: The 4-7-8 Breath

This technique activates your calming response:

1. **Inhale** through your nose for 4 counts
2. **Hold** your breath for 7 counts
3. **Exhale** slowly through your mouth for 8 counts

The extended exhale is key—it triggers relaxation.

### Technique 2: Diaphragmatic Breathing

For powerful, steady voice:

1. Place one hand on your chest, one on your belly
2. Breathe so your BELLY rises, not your chest
3. Your voice will become fuller and more resonant

### Pre-Speech Breathing Ritual

Before any speaking situation:
- 3 deep diaphragmatic breaths
- One 4-7-8 breath cycle
- A normal breath, then begin

This takes only 30 seconds and transforms your state.
      `.trim(),
      keyPoints: [
        'Your breath directly controls your nervous system',
        'The 4-7-8 technique quickly activates calm',
        'Diaphragmatic breathing makes your voice stronger',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'In the 4-7-8 technique, why is the exhale longest?',
          options: [
            'It\'s easier to remember',
            'Long exhales activate the parasympathetic nervous system',
            'It empties the lungs completely',
            'It helps you fall asleep',
          ],
          correctIndex: 1,
          explanation: 'Extended exhales signal safety to your nervous system, activating the rest-and-digest response that calms anxiety.',
        },
        {
          question: 'When breathing diaphragmatically, what should rise?',
          options: [
            'Your shoulders',
            'Your chest',
            'Your belly',
            'Your head',
          ],
          correctIndex: 2,
          explanation: 'Diaphragmatic breathing fills your lungs from the bottom up, causing your belly to expand. This provides more air for a stronger voice.',
        },
      ],
    },

    practicePrompt: 'Practice the 4-7-8 breath three times, then immediately record yourself speaking about your morning routine. Focus on speaking from your diaphragm with a calm, measured pace.',
    practiceGuidelines: [
      'Do 3 full cycles of 4-7-8 breathing first',
      'Place a hand on your belly while speaking',
      'Speak more slowly than feels natural',
      'Notice how your voice sounds different when properly supported by breath',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 3 Complete!

You now have a powerful tool that's always with you—your breath:

✅ You understand the breath-calm connection
✅ You've learned the 4-7-8 technique
✅ You know how to breathe for a powerful voice

**Your Day 3 Mantra**: "My breath is my anchor."

**Daily Practice**: Do 3 rounds of 4-7-8 breathing each morning this week.

**Tomorrow's Preview**: We'll tackle the voice itself—pitch, pace, and power.
    `.trim(),
    keyTakeaways: [
      'Breathing controls your nervous system state',
      '4-7-8 breathing: Inhale 4, Hold 7, Exhale 8',
      'Diaphragmatic breathing supports a stronger voice',
    ],
  },

  // DAY 4
  {
    title: 'Day 4: Finding Your Voice',
    description: 'Discover your natural voice and learn to project with ease',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 4,
    isPublished: true,
    tags: ['voice', 'projection', 'speaking'],

    introductionContent: `
# Day 4: Your Voice is Your Instrument

Your voice carries your message to the world. Today, you'll learn to use it like the powerful instrument it is.

Many people speak in a voice that isn't truly theirs—one that's too high, too soft, or too monotone. Let's find YOUR authentic, confident voice.
    `.trim(),

    learningObjectives: [
      'Find your natural pitch and speaking tone',
      'Learn to project without straining',
      'Practice varying your pitch for engagement',
    ],

    coreConceptContent: {
      text: `
## The Elements of a Confident Voice

### 1. Pitch - Your Natural Home Base

Most people speak higher than their natural pitch when nervous. Your natural pitch is:
- More resonant and powerful
- Easier to maintain
- Perceived as more confident and trustworthy

**Finding your natural pitch**: Hum "mmm-hmm" as if agreeing with someone. That's your natural pitch.

### 2. Projection - Speaking to the Back Row

Projection isn't about being loud—it's about directing your voice with intention.

**The technique**:
- Imagine your voice landing on the far wall
- Use breath support (diaphragm, not throat)
- Open your mouth wider than feels natural

### 3. Pace - The Power of Pausing

Confident speakers use pace strategically:
- **Faster** for excitement and enthusiasm
- **Slower** for important points
- **Pauses** for emphasis and to let ideas land

**The nervous speaker's mistake**: Speaking too fast without pauses.

### 4. Variety - Keeping Attention

A monotone voice loses listeners. Vary:
- Volume (louder for emphasis, softer for intimacy)
- Pitch (higher for questions, lower for statements)
- Pace (faster for stories, slower for key points)
      `.trim(),
      keyPoints: [
        'Your natural pitch is lower than your nervous pitch',
        'Project by directing breath, not straining',
        'Strategic pauses convey confidence and allow ideas to land',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Practice saying this sentence three different ways: "This project will change everything."',
        role: 'speaker practicing vocal variety',
        prompts: [
          'Say it with excitement (faster, higher)',
          'Say it with authority (slower, lower)',
          'Say it with a dramatic pause in the middle',
        ],
        sampleResponses: [
          'Fast and energetic: "This project will CHANGE everything!"',
          'Slow and authoritative: "This project... will change... everything."',
          'With dramatic pause: "This project will change [pause] everything."',
        ],
      },
    },

    practicePrompt: 'First, hum to find your natural pitch. Then record yourself explaining why you chose your career or field of study. Focus on: using your natural pitch, projecting to an imaginary back row, and including at least 3 meaningful pauses.',
    practiceGuidelines: [
      'Start by humming "mmm-hmm" to find your baseline pitch',
      'Speak as if someone in the back of a room needs to hear you',
      'Pause for 2-3 seconds after important points',
      'Vary your pitch—don\'t stay monotone',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 4 Complete!

You've discovered the power of your voice:

✅ Found your natural, confident pitch
✅ Learned to project without strain
✅ Practiced strategic pausing and variety

**Your Day 4 Mantra**: "My voice is my instrument—I choose how to play it."

**Voice Exercise**: Throughout today, occasionally hum "mmm-hmm" to reset to your natural pitch before speaking.

**Tomorrow's Preview**: We'll master body language that commands attention.
    `.trim(),
    keyTakeaways: [
      'Hum to find your natural, confident pitch',
      'Project by using breath support and directing your voice',
      'Use pauses and variety to keep listeners engaged',
    ],
  },

  // DAY 5
  {
    title: 'Day 5: Body Language Mastery',
    description: 'Command any room with confident non-verbal communication',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 5,
    isPublished: true,
    tags: ['body-language', 'presence', 'non-verbal'],

    introductionContent: `
# Day 5: Speaking Without Words

Studies show 55% of communication is non-verbal. Your body is always talking—today you'll make sure it's saying the right things.

Confident body language isn't about memorizing poses. It's about aligning your external presence with your internal message.
    `.trim(),

    learningObjectives: [
      'Master the 5 pillars of confident body language',
      'Learn to use gestures that enhance your message',
      'Understand the psychology of eye contact',
    ],

    coreConceptContent: {
      text: `
## The 5 Pillars of Confident Body Language

### 1. Posture - Your Foundation

**The confident stance**:
- Feet shoulder-width apart
- Weight evenly distributed
- Shoulders back, chest open
- Head level (not tilted)

**The psychology**: Taking up space signals confidence. Shrinking signals submission.

### 2. Eye Contact - Creating Connection

**The 3-5 second rule**: Hold eye contact for 3-5 seconds before naturally shifting.

**In groups**: Make eye contact with different people for complete thoughts, not just glances.

**The nervous habit to avoid**: Looking down or away when making important points.

### 3. Gestures - Amplifying Your Message

**Effective gestures**:
- Start from your core, not your wrists
- Match the size of your gesture to the room
- Use open palms (signals honesty)
- Avoid: pointing, hands in pockets, fig-leaf position

### 4. Movement - Commanding Space

**Purposeful movement**:
- Move TO something (a new point, a person, a visual)
- Plant yourself for important statements
- Avoid: swaying, pacing, shifting weight

### 5. Facial Expression - Showing Engagement

**The baseline**: A relaxed, pleasant expression (not forced smile)
**Match your content**: Expression should align with your message
**The power of the pause-and-look**: Make a point, pause, let your face show you believe it
      `.trim(),
      keyPoints: [
        'Take up space with open, grounded posture',
        'Eye contact 3-5 seconds creates connection without intensity',
        'Gestures should be purposeful and start from your core',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'What is the ideal length for eye contact during a presentation?',
          options: [
            '1-2 seconds - quick glances',
            '3-5 seconds - complete thoughts',
            '10+ seconds - showing intensity',
            'Avoid eye contact - look over heads',
          ],
          correctIndex: 1,
          explanation: '3-5 seconds allows you to complete a thought with one person, creating genuine connection without discomfort.',
        },
        {
          question: 'Where should purposeful gestures originate?',
          options: [
            'From your wrists',
            'From your core/torso',
            'From your shoulders',
            'Keep hands still',
          ],
          correctIndex: 1,
          explanation: 'Gestures that start from your core appear more natural and confident. Wrist-only gestures look nervous and ineffective.',
        },
      ],
    },

    practicePrompt: 'Record yourself standing and explaining the three most important things about your favorite hobby or interest. Focus on: confident posture, eye contact with the camera, purposeful gestures, and matching facial expressions.',
    practiceGuidelines: [
      'Stand with feet shoulder-width apart, shoulders back',
      'Look at the camera as if it\'s a person you\'re talking to',
      'Use at least 3 different gestures that match your points',
      'Let your face reflect your genuine interest in the topic',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 5 Complete!

You now know how to communicate confidence without saying a word:

✅ Posture that commands respect
✅ Eye contact that creates connection
✅ Gestures that amplify your message
✅ Movement and expressions that engage

**Your Day 5 Mantra**: "My body speaks my confidence."

**Body Language Check**: Set 3 reminders today to check your posture. Are you taking up space or shrinking?

**Tomorrow's Preview**: We'll conquer the fear of being judged—the mental game of confidence.
    `.trim(),
    keyTakeaways: [
      '5 pillars: Posture, Eye Contact, Gestures, Movement, Expression',
      'Eye contact 3-5 seconds for connection',
      'Confident body language is about taking up space appropriately',
    ],
  },

  // DAY 6
  {
    title: 'Day 6: Conquering Fear of Judgment',
    description: 'Transform your relationship with what others think',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 6,
    isPublished: true,
    tags: ['mindset', 'fear', 'psychology'],

    introductionContent: `
# Day 6: What Will They Think?

The fear of judgment is the #1 barrier to confident speaking. Today, we're going to dismantle it.

Here's the truth: the harsh critic you imagine? They don't exist. Most people are too worried about their own impression to judge yours. Let's explore this together.
    `.trim(),

    learningObjectives: [
      'Understand the spotlight effect and why we overestimate judgment',
      'Learn cognitive reframing techniques',
      'Develop a pre-speaking mindset ritual',
    ],

    coreConceptContent: {
      text: `
## The Fear of Judgment - Exposed

### The Spotlight Effect

Psychology research reveals a powerful truth: we dramatically OVERESTIMATE how much others notice and judge us.

**Studies show**:
- We think mistakes are 2-3x more noticeable than they actually are
- Audiences remember content, not minor stumbles
- People are focused on their own concerns, not critiquing you

### The Harsh Critic Myth

That judgmental audience member you imagine? Consider:
- They might be nervous about their own upcoming turn
- They might be thinking about lunch
- They might actually be admiring your courage
- They almost certainly aren't cataloging your flaws

### Cognitive Reframing

When fear of judgment strikes, reframe:

**Instead of**: "They'll think I'm stupid"
**Think**: "They want me to succeed—nobody enjoys watching someone fail"

**Instead of**: "I'll mess up and everyone will notice"
**Think**: "Small mistakes are normal and quickly forgotten"

**Instead of**: "I'm not qualified to speak on this"
**Think**: "I have a unique perspective that only I can share"

### The Service Mindset

The ultimate reframe: **It's not about you.**

When you focus on SERVING your audience—giving them value, information, or entertainment—you stop worrying about being judged. Your job is to help THEM, not to be perfect.
      `.trim(),
      keyPoints: [
        'The spotlight effect: we overestimate how much others notice',
        'Audiences want you to succeed, not fail',
        'The service mindset shifts focus from yourself to your audience',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You\'re about to give a presentation and the thought hits: "Everyone is going to judge me." How do you reframe this?',
        role: 'speaker preparing mentally',
        prompts: [
          'What does the spotlight effect tell you?',
          'What is the audience actually focused on?',
          'How can you shift to a service mindset?',
        ],
        sampleResponses: [
          'I\'m overestimating how much they\'ll notice any mistakes.',
          'They\'re focused on the content and what they can learn, not on critiquing me.',
          'My job is to share something valuable with them. I\'m here to help, not to be perfect.',
        ],
      },
    },

    practicePrompt: 'Record yourself giving advice to a friend who is afraid of being judged when speaking. Share the key insights you\'ve learned today and why they shouldn\'t worry so much.',
    practiceGuidelines: [
      'Speak as if comforting a nervous friend',
      'Mention the spotlight effect in your own words',
      'Share the service mindset—how focusing on helping others reduces fear',
      'Be genuine and warm in your delivery',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 6 Complete!

You've gained powerful mental tools:

✅ Understanding that the spotlight effect exaggerates our fears
✅ The reality that audiences want you to succeed
✅ The service mindset that transforms fear into purpose

**Your Day 6 Mantra**: "They want me to succeed. I'm here to serve them."

**Mental Exercise**: Next time you speak, before starting, think: "What value can I give them?"

**Tomorrow's Preview**: We wrap up Week 1 by putting it all together in a practice session.
    `.trim(),
    keyTakeaways: [
      'The spotlight effect: others notice far less than we think',
      'Audiences are on your side—they want you to do well',
      'Focus on serving your audience, not on being perfect',
    ],
  },

  // DAY 7
  {
    title: 'Day 7: Week 1 Integration',
    description: 'Combine all your new skills in a powerful practice session',
    category: '21-day-challenge',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 7,
    isPublished: true,
    tags: ['practice', 'integration', 'review'],

    introductionContent: `
# Day 7: Bringing It All Together

Congratulations—you've completed Week 1! 🎉

This week you've learned: confidence science, breathing, voice, body language, and mindset. Today, we integrate everything into a complete practice.

Think of this as your first performance with your new toolkit.
    `.trim(),

    learningObjectives: [
      'Review and integrate all Week 1 skills',
      'Complete a comprehensive speaking practice',
      'Reflect on your progress and growth',
    ],

    coreConceptContent: {
      text: `
## Your Week 1 Toolkit - Review

### The Confidence Stack

Before speaking, prepare with:

**1. Mindset** (Day 6)
- Remember the spotlight effect
- Adopt the service mindset
- You're here to help, not be perfect

**2. Physiology** (Days 2-3)
- 2-minute power pose
- 3 diaphragmatic breaths
- One 4-7-8 breath cycle

**3. Voice Ready** (Day 4)
- Hum to find natural pitch
- Plan your opening words
- Remember: pause, don't rush

**4. Body Ready** (Day 5)
- Plant your feet
- Open your shoulders
- Ready your eye contact and gestures

### The Week 1 Checklist

✅ I understand confidence is a skill, not a trait
✅ I know how to use my body to create confidence
✅ I can calm my nervous system with breath
✅ I know my natural pitch and how to project
✅ I can use body language purposefully
✅ I've reframed my fear of judgment

### Progress Markers

Ask yourself:
- Do I feel even 10% more confident than Day 1?
- Can I name specific techniques I can use?
- Am I more aware of my body and voice when speaking?

Any "yes" is progress. Celebrate it.
      `.trim(),
      keyPoints: [
        'You now have a complete pre-speaking ritual',
        'Confidence builds through consistent practice',
        'Small improvements compound into major transformation',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Put these pre-speaking preparations in order:',
          options: [
            'Breath → Power pose → Find pitch → Check posture',
            'Power pose → Mindset → Breath → Voice',
            'Mindset → Physiology → Voice → Body',
            'Body → Voice → Breath → Mindset',
          ],
          correctIndex: 2,
          explanation: 'Start with mindset (why you\'re speaking), then physiology (power pose, breathing), then voice (pitch), then body (posture, gestures). This builds confidence from the inside out.',
        },
        {
          question: 'The service mindset means:',
          options: [
            'Being subservient to your audience',
            'Focusing on what value you can give',
            'Asking the audience for help',
            'Serving refreshments after speaking',
          ],
          correctIndex: 1,
          explanation: 'The service mindset shifts your focus from "how will I be judged?" to "how can I help them?" This reduces self-consciousness and increases genuine connection.',
        },
      ],
    },

    practicePrompt: 'This is your Week 1 final practice. Before recording: do a power pose, do your breathing ritual, hum to find your pitch. Then record yourself sharing your biggest takeaway from Week 1 and what you\'re looking forward to in Week 2.',
    practiceGuidelines: [
      'Complete the full pre-speaking ritual before recording',
      'Use confident posture and eye contact with the camera',
      'Speak at your natural pitch with intentional pauses',
      'Focus on sharing value, not being perfect',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Week 1 Complete! 🏆

You've built a strong foundation:

✅ Understand the science of confidence
✅ Can control your nervous system
✅ Know how to use your voice effectively
✅ Command attention with body language
✅ Have tools to manage fear of judgment

**Week 1 Mantra**: "I have the tools. Now I practice."

**Weekend Challenge**: Use your pre-speaking ritual before at least one conversation this weekend.

**Coming in Week 2**: We dive into specific skills—storytelling, handling tough questions, and speaking impromptu.
    `.trim(),
    keyTakeaways: [
      'You have a complete toolkit for confident speaking',
      'Small consistent practice creates lasting change',
      'Week 2 will build specific communication skills',
    ],
  },

  // ============== WEEK 2: SKILLS ==============

  // DAY 8
  {
    title: 'Day 8: The Power of Storytelling',
    description: 'Learn to captivate any audience with well-crafted stories',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 8,
    isPublished: true,
    tags: ['storytelling', 'engagement', 'narrative'],

    introductionContent: `
# Day 8: Stories That Stick

Welcome to Week 2! We're building specific skills now.

Facts inform. Stories TRANSFORM. Humans are wired for narrative—we remember stories 22x more than facts alone.

Today you'll learn the simple structure that makes any story compelling.
    `.trim(),

    learningObjectives: [
      'Understand why stories are so powerful',
      'Learn the simple story structure that works every time',
      'Practice crafting a personal story',
    ],

    coreConceptContent: {
      text: `
## Why Stories Work

### The Science

When you share facts, two areas of the listener's brain activate (language processing).

When you tell a story, SEVEN areas activate—including those that would activate if they were LIVING the experience.

Stories create:
- Emotional connection
- Memory retention
- Trust and relatability

### The Simple Story Structure

Every great story follows this pattern:

**1. SITUATION** - Set the scene
"I was sitting in my car before the biggest interview of my career..."

**2. COMPLICATION** - What went wrong
"...when I realized I'd left my portfolio at home."

**3. RESOLUTION** - What happened
"I had to walk in with nothing but my confidence..."

**4. LESSON** - Why it matters
"That day I learned that YOU are the presentation, not your materials."

### Story Starters

To find your stories, complete these prompts:
- "I'll never forget the time..."
- "I used to believe... until..."
- "The moment everything changed was..."
- "The hardest lesson I learned was..."

### The 2-Minute Story

For professional settings, aim for 2 minutes max:
- 15 sec: Situation
- 30 sec: Complication
- 45 sec: Resolution
- 30 sec: Lesson
      `.trim(),
      keyPoints: [
        'Stories engage 7x more brain areas than facts',
        'Structure: Situation → Complication → Resolution → Lesson',
        'Professional stories should be under 2 minutes',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to tell a story about a time you overcame a challenge. Map out the structure:',
        role: 'storyteller',
        prompts: [
          'What\'s your situation/scene?',
          'What was the complication/obstacle?',
          'How was it resolved?',
          'What\'s the lesson?',
        ],
        sampleResponses: [
          'Situation: "My first day at my job, asked to present to executives"',
          'Complication: "I had 2 hours to prepare for a topic I barely knew"',
          'Resolution: "I focused on what I DID know and was honest about learning"',
          'Lesson: "Authenticity beats pretending to know everything"',
        ],
      },
    },

    practicePrompt: 'Tell a 2-minute story about a time you learned something the hard way. Use the Situation-Complication-Resolution-Lesson structure.',
    practiceGuidelines: [
      'Set the scene quickly—just enough context',
      'Make the complication feel real (emotions, stakes)',
      'Show, don\'t just tell, the resolution',
      'End with a clear, applicable lesson',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Day 8 Complete!

You've unlocked the power of storytelling:

✅ Understand why stories captivate
✅ Know the 4-part structure that works
✅ Have a story ready to share

**Your Day 8 Mantra**: "Data tells, stories sell."

**Story Practice**: Think of 3 stories from your life that illustrate resilience, learning, or growth. These are your go-to professional stories.

**Tomorrow's Preview**: Structuring any message for maximum impact.
    `.trim(),
    keyTakeaways: [
      'Stories are 22x more memorable than facts alone',
      'Use: Situation → Complication → Resolution → Lesson',
      'Keep professional stories under 2 minutes',
    ],
  },

  // Continue with Days 9-21...
  // DAY 9
  {
    title: 'Day 9: Structure for Clarity',
    description: 'Organize your thoughts so anyone can follow',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 9,
    isPublished: true,
    tags: ['structure', 'clarity', 'organization'],

    introductionContent: `
# Day 9: Clear Message, Clear Impact

Have you ever listened to someone ramble and thought, "What's the point?"

Today you'll learn simple structures that make any message crystal clear. When people can follow you easily, they trust you more.
    `.trim(),

    learningObjectives: [
      'Learn the "Bottom Line Up Front" technique',
      'Master the "Rule of Three" for memorable messages',
      'Practice structuring complex ideas simply',
    ],

    coreConceptContent: {
      text: `
## Message Structure Made Simple

### 1. Bottom Line Up Front (BLUF)

Instead of building to your point, START with it:

**Instead of**: "So I looked at the data, and there were several factors, and after considering everything..."

**Use BLUF**: "We should launch in March. Here's why..."

### 2. The Rule of Three

The human brain loves threes:
- "Life, liberty, and the pursuit of happiness"
- "Location, location, location"
- "Stop, look, and listen"

Structure your message in 3 parts:
- 3 reasons
- 3 examples
- 3 steps

### 3. The What-So What-Now What

Universal structure for any update:

**WHAT**: The facts/information
"Sales increased 20% this quarter."

**SO WHAT**: Why it matters
"This puts us ahead of our annual target."

**NOW WHAT**: The action/next step
"We should reinvest in the strategy that's working."

### 4. The Transition Bridge

Move between points smoothly:
- "Building on that..."
- "Now let's look at..."
- "The second reason is..."
- "Here's where it gets interesting..."
      `.trim(),
      keyPoints: [
        'Start with your main point (BLUF)',
        'Organize in groups of three',
        'What → So What → Now What for any update',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'In "Bottom Line Up Front," what comes first?',
          options: [
            'Background and context',
            'Your main point or recommendation',
            'An engaging story',
            'Data and evidence',
          ],
          correctIndex: 1,
          explanation: 'BLUF means stating your conclusion or recommendation FIRST, then supporting it with reasoning. This respects the listener\'s time and attention.',
        },
        {
          question: 'The "What-So What-Now What" structure is best for:',
          options: [
            'Telling personal stories',
            'Giving updates or presenting information',
            'Making jokes',
            'Introducing yourself',
          ],
          correctIndex: 1,
          explanation: 'This structure works perfectly for status updates, presenting findings, or sharing any information where you need to show relevance and suggest action.',
        },
      ],
    },

    practicePrompt: 'Practice the "What-So What-Now What" structure. Choose any recent event in your life or work, and explain it using this framework.',
    practiceGuidelines: [
      'WHAT: State the facts in 2-3 sentences',
      'SO WHAT: Explain why this matters',
      'NOW WHAT: Suggest an action or next step',
      'Keep the total message under 90 seconds',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 9 Complete!

You now have structures for any message:

✅ BLUF for leading with your point
✅ Rule of Three for memorability
✅ What-So What-Now What for updates

**Your Day 9 Mantra**: "Clear structure, clear message, clear impact."

**Practice Today**: When sending your next email or message, try using BLUF—start with your main point.

**Tomorrow's Preview**: Thinking on your feet—impromptu speaking skills.
    `.trim(),
    keyTakeaways: [
      'BLUF: Lead with your conclusion',
      'Group ideas in threes for memorability',
      'What → So What → Now What for any update',
    ],
  },

  // DAY 10
  {
    title: 'Day 10: Impromptu Speaking',
    description: 'Sound articulate when you have no time to prepare',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 10,
    isPublished: true,
    tags: ['impromptu', 'quick-thinking', 'agility'],

    introductionContent: `
# Day 10: Speaking Without a Script

"What do you think?" You're put on the spot. No time to prepare. What do you do?

Impromptu speaking is a fear for many, but with the right frameworks, you can sound polished even when surprised.
    `.trim(),

    learningObjectives: [
      'Learn frameworks for organizing thoughts quickly',
      'Practice the "pause with confidence" technique',
      'Build impromptu speaking agility',
    ],

    coreConceptContent: {
      text: `
## The Impromptu Speaking Toolkit

### The Power Pause

When caught off guard:
1. Take a breath
2. Say "That's a great question" (buys 2 seconds)
3. Pause visibly (this looks thoughtful, not lost)

Remember: A confident pause beats nervous rambling.

### Framework 1: PREP

**P - Point**: State your main idea
**R - Reason**: Give your rationale
**E - Example**: Provide evidence or illustration
**P - Point**: Restate your main idea

"I think we should delay the launch. (Point)
The market research isn't complete. (Reason)
Last time we launched early, we missed our target by 40%. (Example)
So yes, let's wait for the data. (Point)"

### Framework 2: Past-Present-Future

Great for "Tell us about..." questions:

**Past**: Where you/it came from
**Present**: Where things are now
**Future**: Where you/it is going

### Framework 3: Problem-Solution-Benefit

Perfect for recommendations:

**Problem**: What needs fixing
**Solution**: Your proposed fix
**Benefit**: What improves as a result

### The Secret: You Don't Need to Be Comprehensive

Impromptu speaking isn't about saying everything—it's about saying SOMETHING clear and organized. Pick one framework and stick to it.
      `.trim(),
      keyPoints: [
        'Pause with confidence—silence beats rambling',
        'PREP: Point-Reason-Example-Point',
        'You don\'t need to say everything, just something clear',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'In a meeting, you\'re suddenly asked: "What do you think is our biggest opportunity this year?"',
        role: 'team member responding impromptu',
        prompts: [
          'What would you do first?',
          'Which framework would you use?',
          'How would you structure your answer?',
        ],
        sampleResponses: [
          'Pause, breathe, say "That\'s a great question..."',
          'Use PREP: Point-Reason-Example-Point',
          '"I think it\'s [Point]. Because [Reason]. For instance [Example]. So I\'d focus on [Point]."',
        ],
      },
    },

    practicePrompt: 'Impromptu challenge: Answer this question using the PREP framework: "What is a skill everyone should learn?" Pause, then respond in under 60 seconds.',
    practiceGuidelines: [
      'Take a visible pause before starting (2-3 seconds)',
      'State your Point clearly first',
      'Give one Reason and one Example',
      'Circle back to your Point at the end',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 10 Complete!

You can now think on your feet:

✅ Know to pause with confidence, not panic
✅ Have the PREP framework memorized
✅ Understand you don't need to be comprehensive

**Your Day 10 Mantra**: "Organized beats comprehensive every time."

**Impromptu Practice**: At dinner tonight, ask someone a random "what do you think" question and mentally use PREP as you answer too.

**Tomorrow's Preview**: Handling tough questions and pushback.
    `.trim(),
    keyTakeaways: [
      'A confident pause beats nervous rambling',
      'PREP: Point → Reason → Example → Point',
      'Being organized matters more than being comprehensive',
    ],
  },

  // DAY 11-21 (abbreviated for space - full versions would follow same pattern)
  {
    title: 'Day 11: Handling Tough Questions',
    description: 'Stay composed when challenged or confronted',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 11,
    isPublished: true,
    tags: ['questions', 'composure', 'difficult-situations'],

    introductionContent: `
# Day 11: Grace Under Pressure

Someone challenges you. Questions your data. Pushes back on your idea. What do you do?

Today you'll learn to handle the toughest questions with composure and credibility.
    `.trim(),

    learningObjectives: [
      'Learn the ARC technique for answering difficult questions',
      'Practice staying calm when challenged',
      'Know when and how to say "I don\'t know"',
    ],

    coreConceptContent: {
      text: `
## The ARC Technique

### A - Acknowledge
Show you heard and understood the question.
"That's an important concern..."

### R - Respond
Address the question directly.
"Here's what we know..."

### C - Control
Bridge back to your message.
"And that's why we recommend..."

## When You Don't Know

**Never fake it.** Instead:
- "I don't have that data, but I'll find out"
- "That's outside my expertise, but [name] would know"
- "Great question—let me research that and follow up"

This builds MORE credibility than guessing.

## Handling Hostility

If someone is aggressive:
1. Lower your voice (they may match)
2. Slow your pace
3. Acknowledge their emotion: "I can see this is important to you"
4. Focus on facts, not defending yourself
      `.trim(),
      keyPoints: [
        'ARC: Acknowledge, Respond, Control',
        '"I don\'t know, but I\'ll find out" builds credibility',
        'Lower your voice and slow down to defuse hostility',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Someone interrupts your presentation: "These numbers don\'t match what we saw last quarter. Are you sure about this?"',
        role: 'presenter being challenged',
        prompts: [
          'How do you acknowledge their concern?',
          'How do you respond?',
          'How do you control back to your message?',
        ],
        sampleResponses: [
          '"That\'s a great catch, and I appreciate you raising it."',
          '"The methodology changed this quarter—we\'re now including [X], which accounts for the difference."',
          '"With this more complete picture, here\'s what the trend tells us..."',
        ],
      },
    },

    practicePrompt: 'Pretend someone just challenged you with: "I don\'t think that approach will work." Use the ARC technique to respond.',
    practiceGuidelines: [
      'Acknowledge: "I understand that concern..."',
      'Respond: Address their specific doubt',
      'Control: Bridge to why your approach makes sense',
      'Keep calm and measured throughout',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 11 Complete!

✅ You have the ARC technique for tough questions
✅ You know how to admit gaps professionally
✅ You can defuse hostility with composure

**Your Day 11 Mantra**: "Acknowledge, respond, control."

**Tomorrow's Preview**: Making your ideas persuasive and compelling.
    `.trim(),
    keyTakeaways: [
      'Use ARC: Acknowledge → Respond → Control',
      '"I\'ll find out" beats guessing every time',
      'Stay calm, lower voice, slow down when challenged',
    ],
  },

  // DAY 12
  {
    title: 'Day 12: The Art of Persuasion',
    description: 'Make your ideas compelling and actionable',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 12,
    isPublished: true,
    tags: ['persuasion', 'influence', 'rhetoric'],

    introductionContent: `
# Day 12: Persuasion That Works

Speaking confidently is one thing. Speaking persuasively is another.

Today you'll learn the timeless principles of influence—used by leaders, marketers, and changemakers throughout history.
    `.trim(),

    learningObjectives: [
      'Understand Aristotle\'s three modes of persuasion',
      'Learn to appeal to logic, emotion, and credibility',
      'Practice making a persuasive case',
    ],

    coreConceptContent: {
      text: `
## The Three Pillars of Persuasion

Aristotle identified three ways to persuade:

### 1. Ethos (Credibility)
Why should they trust YOU?
- Share relevant experience
- Cite credible sources
- Be honest about limitations

### 2. Logos (Logic)
Why does your argument make sense?
- Clear reasoning
- Data and evidence
- Logical structure

### 3. Pathos (Emotion)
Why should they CARE?
- Stories that resonate
- Paint the future state
- Connect to their values

**The key**: Use all three. Logic alone is cold. Emotion alone is manipulative. Credibility alone is boring.

## The Persuasive Structure

1. Hook: Get attention (story, question, startling fact)
2. Problem: What needs to change
3. Solution: Your proposal
4. Proof: Why it works (ethos, logos)
5. Vision: The better future (pathos)
6. Call to Action: What they should do
      `.trim(),
      keyPoints: [
        'Ethos (credibility) + Logos (logic) + Pathos (emotion)',
        'Use all three modes together for maximum impact',
        'Always end with a clear call to action',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which persuasion mode does "In my 15 years of experience..." appeal to?',
          options: ['Pathos (emotion)', 'Logos (logic)', 'Ethos (credibility)', 'None of these'],
          correctIndex: 2,
          explanation: 'Citing your experience builds ethos—your credibility and authority to speak on the topic.',
        },
        {
          question: 'Which persuasion mode does "Studies show a 40% improvement..." appeal to?',
          options: ['Pathos (emotion)', 'Logos (logic)', 'Ethos (credibility)', 'None of these'],
          correctIndex: 1,
          explanation: 'Data and evidence appeal to logos—the logical, rational part of decision-making.',
        },
      ],
    },

    practicePrompt: 'Make a 90-second persuasive case for something you believe in (remote work, exercise, a hobby, etc.). Include at least one appeal to each: credibility, logic, and emotion.',
    practiceGuidelines: [
      'Start with a hook (question, story, or fact)',
      'Include why YOU can speak to this (ethos)',
      'Include data or logical reasoning (logos)',
      'Include a story or emotional appeal (pathos)',
      'End with a clear call to action',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 12 Complete!

✅ You know the three pillars: Ethos, Logos, Pathos
✅ You understand how to combine them effectively
✅ You can structure a persuasive argument

**Your Day 12 Mantra**: "Logic gets attention. Emotion drives action."

**Tomorrow's Preview**: We'll reach the halfway point with a skills integration practice.
    `.trim(),
    keyTakeaways: [
      'Persuasion = Ethos (credibility) + Logos (logic) + Pathos (emotion)',
      'Logic alone won\'t move people—add emotion',
      'Always include a clear call to action',
    ],
  },

  // DAY 13
  {
    title: 'Day 13: Connecting With Your Audience',
    description: 'Create rapport and read the room effectively',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 13,
    isPublished: true,
    tags: ['connection', 'rapport', 'audience'],

    introductionContent: `
# Day 13: It's About Them, Not You

The best speakers don't just deliver content—they CREATE CONNECTION.

Today you'll learn to read your audience, adapt in real-time, and make everyone feel included.
    `.trim(),

    learningObjectives: [
      'Learn techniques for building rapport quickly',
      'Understand how to read and respond to audience cues',
      'Practice inclusive speaking techniques',
    ],

    coreConceptContent: {
      text: `
## Building Instant Connection

### The First 30 Seconds

Connection is won or lost early:
- Smile genuinely before speaking
- Make eye contact with several people
- Use "we" and "us" instead of "you" and "I"
- Reference something you have in common

### Reading the Room

Watch for:
**Engaged** (lean in, nod, eye contact)
→ Keep going, you're on track

**Confused** (furrowed brows, tilted heads)
→ Pause and clarify: "Let me put that another way..."

**Disengaged** (phone, looking away, slumped)
→ Change something: pace, ask a question, tell a story

### Inclusive Language

Make everyone feel part of the conversation:
- "Have you ever..." (shared experiences)
- "You might be thinking..." (address objections)
- "Raise your hand if..." (physical engagement)
- "Whether you're X or Y..." (acknowledge diversity)

### The Power of Names

If possible, use people's names:
- "Great point, Sarah"
- "As Marcus mentioned earlier..."
This makes the conversation personal, not performative.
      `.trim(),
      keyPoints: [
        'Connection happens in the first 30 seconds',
        'Watch audience cues and adapt accordingly',
        'Use "we" language and acknowledge diverse perspectives',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Midway through your presentation, you notice several people looking at their phones and one person yawning.',
        role: 'presenter adapting to audience',
        prompts: [
          'What do these cues tell you?',
          'What might you do differently?',
          'How could you re-engage them?',
        ],
        sampleResponses: [
          'The audience is disengaged—I\'m losing them.',
          'Change pace: tell a story, ask a question, or move on to more interesting content.',
          '"Let me share a quick story..." or "What do you think about this?"',
        ],
      },
    },

    practicePrompt: 'Practice opening a talk with connection-building. Introduce any topic but focus on: smiling, using "we" language, and asking a rhetorical question that relates to the audience.',
    practiceGuidelines: [
      'Start with a warm, genuine smile',
      'Use "we" or "us" at least twice',
      'Ask a question like "Have you ever..."',
      'Reference something your audience cares about',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 13 Complete!

✅ You know how to build connection in the first 30 seconds
✅ You can read audience cues and adapt
✅ You have inclusive language techniques

**Your Day 13 Mantra**: "They need to feel it, not just hear it."

**Tomorrow's Preview**: Week 2 integration—combining all your new skills.
    `.trim(),
    keyTakeaways: [
      'Connection is built in the first 30 seconds',
      'Watch for cues: engaged, confused, or disengaged',
      'Use inclusive "we" language',
    ],
  },

  // DAY 14
  {
    title: 'Day 14: Week 2 Integration',
    description: 'Combine storytelling, structure, and persuasion in practice',
    category: '21-day-challenge',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 14,
    isPublished: true,
    tags: ['integration', 'practice', 'skills'],

    introductionContent: `
# Day 14: Week 2 Complete!

You've built powerful skills this week: storytelling, structure, impromptu speaking, handling tough questions, persuasion, and connection.

Today we integrate everything in a comprehensive practice.
    `.trim(),

    learningObjectives: [
      'Review all Week 2 skills',
      'Complete an integrated speaking practice',
      'Reflect on progress from Week 1 to now',
    ],

    coreConceptContent: {
      text: `
## Week 2 Skills Review

### Storytelling (Day 8)
Situation → Complication → Resolution → Lesson

### Structure (Day 9)
- BLUF: Lead with your point
- Rule of Three
- What → So What → Now What

### Impromptu (Day 10)
- Pause with confidence
- PREP: Point-Reason-Example-Point

### Tough Questions (Day 11)
- ARC: Acknowledge-Respond-Control
- "I'll find out" beats guessing

### Persuasion (Day 12)
- Ethos + Logos + Pathos
- End with a call to action

### Connection (Day 13)
- First 30 seconds matter
- Read and adapt to audience
- Use inclusive language

## The Integration Challenge

For today's practice, you'll combine multiple skills:
- Tell a brief story (storytelling)
- Structure it clearly (structure)
- Make it persuasive (persuasion)
- Invite connection (audience focus)
      `.trim(),
      keyPoints: [
        'You now have 6 specific communication skills',
        'Integration means using multiple skills together naturally',
        'Practice builds automaticity—skills become second nature',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'You\'re making a recommendation. Which combination of techniques would be most effective?',
          options: [
            'BLUF + Rule of Three',
            'Ethos + Logos only',
            'Storytelling alone',
            'Asking for questions first',
          ],
          correctIndex: 0,
          explanation: 'Starting with your bottom line (BLUF) and organizing in three points creates a clear, memorable recommendation.',
        },
        {
          question: 'Someone challenges your data mid-presentation. You should:',
          options: [
            'Defend yourself strongly',
            'Ignore it and move on',
            'Use ARC: Acknowledge, Respond, Control',
            'Admit you were wrong',
          ],
          correctIndex: 2,
          explanation: 'ARC lets you address the challenge professionally while maintaining control of your message.',
        },
      ],
    },

    practicePrompt: 'Share a 2-minute pitch for a change you\'d like to see (at work, in your community, or in your life). Include: a brief story, clear structure, persuasive elements (ethos/logos/pathos), and connection with your imagined audience.',
    practiceGuidelines: [
      'Start with a story or compelling hook',
      'Structure your argument (problem → solution → benefit)',
      'Include credibility, logic, AND emotion',
      'Use "we" language to create connection',
      'End with a clear call to action',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Week 2 Complete! 🎯

You've dramatically expanded your toolkit:

✅ Tell compelling stories
✅ Structure any message clearly
✅ Think on your feet
✅ Handle tough questions
✅ Speak persuasively
✅ Connect with any audience

**Week 2 Mantra**: "Skills, when practiced, become superpowers."

**Coming in Week 3**: Advanced applications—high-stakes situations, leadership presence, and your final transformation.
    `.trim(),
    keyTakeaways: [
      'You now have 6 specific, actionable skills',
      'Integration means combining skills naturally',
      'Week 3 will apply these to high-stakes situations',
    ],
  },

  // ============== WEEK 3: MASTERY ==============

  // DAY 15-21 (continuing the pattern)
  {
    title: 'Day 15: High-Stakes Presentations',
    description: 'Deliver when it matters most',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 15,
    isPublished: true,
    tags: ['presentations', 'high-stakes', 'delivery'],

    introductionContent: `
# Day 15: When It Matters Most

Welcome to Week 3: Mastery. Now we apply everything to high-stakes situations.

Big presentation. Important meeting. Career-defining moment. When the pressure is highest, your preparation matters most.
    `.trim(),

    learningObjectives: [
      'Learn the high-stakes preparation protocol',
      'Master techniques for managing heightened nerves',
      'Practice delivering under pressure',
    ],

    coreConceptContent: {
      text: `
## The High-Stakes Protocol

### Before the Day

**1. Prepare Three Versions**
- Full version (all details)
- Medium version (key points only)
- Elevator version (30 seconds)

**2. Anticipate Questions**
List the 5 hardest questions you might get. Prepare answers.

**3. Visualize Success**
Mentally rehearse: See yourself speaking confidently, audience engaged, ending strong.

### Day Of

**Morning Routine**
- Exercise (burns cortisol)
- Review key points (not memorizing)
- Positive self-talk: "I'm prepared. I belong here."

**30 Minutes Before**
- Find private space for power pose
- Breathing ritual (4-7-8)
- Check tech/materials
- Hum to find pitch

**Right Before**
- Smile (triggers positive state)
- Take one deep breath
- First line memorized
- Begin

### During Delivery

- If you lose your place, pause confidently
- If tech fails, have analog backup
- If time is cut, use your short version
- If challenged, use ARC technique
      `.trim(),
      keyPoints: [
        'Prepare three versions of your content',
        'Anticipate and prepare for tough questions',
        'Have a consistent pre-presentation ritual',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Why prepare three versions of your presentation?',
          options: [
            'To show off how much you know',
            'To adapt to time changes and situations',
            'To have backup slides',
            'To confuse the audience',
          ],
          correctIndex: 1,
          explanation: 'Time often changes, questions may take longer, or you may need to summarize quickly. Having three versions lets you adapt professionally.',
        },
        {
          question: 'What should you memorize for a high-stakes presentation?',
          options: [
            'The entire script word-for-word',
            'Nothing at all',
            'Your first line and key transitions',
            'All the data and statistics',
          ],
          correctIndex: 2,
          explanation: 'Memorizing your opening line ensures a confident start. Key transitions keep you on track. But don\'t memorize everything—it sounds robotic.',
        },
      ],
    },

    practicePrompt: 'Practice the opening 60 seconds of an important presentation (real or imagined). Focus on a confident start, clear structure preview, and connection with your audience.',
    practiceGuidelines: [
      'Memorize your first line so you start strong',
      'Preview your structure ("Today I\'ll cover three things...")',
      'Use confident body language from the start',
      'Make eye contact with the camera as if it\'s a friendly face',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 15 Complete!

✅ You have a high-stakes preparation protocol
✅ You know to prepare three versions
✅ You have a day-of ritual for peak performance

**Your Day 15 Mantra**: "Preparation breeds confidence."

**Tomorrow's Preview**: Leadership presence—how to sound like a leader.
    `.trim(),
    keyTakeaways: [
      'Prepare full, medium, and elevator versions',
      'Anticipate your 5 hardest questions',
      'Have a consistent pre-presentation ritual',
    ],
  },

  // DAY 16
  {
    title: 'Day 16: Leadership Presence',
    description: 'Speak like a leader others want to follow',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 16,
    isPublished: true,
    tags: ['leadership', 'presence', 'authority'],

    introductionContent: `
# Day 16: Speaking Like a Leader

Leadership isn't a title—it's a way of communicating.

Today you'll learn the speaking patterns that distinguish influential leaders. These techniques work whether you're a CEO or just starting out.
    `.trim(),

    learningObjectives: [
      'Understand the vocal and verbal patterns of leaders',
      'Learn to project calm authority',
      'Practice leadership language patterns',
    ],

    coreConceptContent: {
      text: `
## What Leaders Sound Like

### Vocal Patterns

**Leaders DO:**
- Speak at a measured pace (no rushing)
- Use downward inflections (statements sound like statements)
- Pause for emphasis
- Keep a lower pitch (their "home base")

**Leaders DON'T:**
- Speak in upspeak (everything sounds like a question?)
- Rush through important points
- Fill silence with "um" and "uh"
- Let nerves raise their pitch

### Language Patterns

**Confident language:**
- "I believe..." (not "I think maybe...")
- "We will..." (not "We could try to...")
- "The data shows..." (not "The data kind of suggests...")
- "I recommend..." (not "Maybe we should...")

**Taking ownership:**
- "I don't know, but I'll find out" (not "I'm not sure, someone else might know")
- "I made a mistake" (not "Mistakes were made")
- "I'll handle it" (not "Hopefully it works out")

### The Leadership Pause

When asked a question:
1. Pause (shows thoughtfulness)
2. Answer decisively
3. Stop talking (don't keep justifying)

The confident pause communicates: "I'm in control here."
      `.trim(),
      keyPoints: [
        'Leaders use downward inflections and measured pacing',
        'Replace weak language with confident alternatives',
        'The confident pause shows control and thoughtfulness',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You\'re in a meeting and asked: "Should we move forward with this project?"',
        role: 'leader giving a decision',
        prompts: [
          'What would weak language sound like?',
          'What would leader language sound like?',
          'How would you use the leadership pause?',
        ],
        sampleResponses: [
          'Weak: "Um, I think maybe we could try it? If everyone\'s okay with that?"',
          'Leader: "Yes. Based on the data, I recommend we proceed. Here\'s why..."',
          'Pause, then: "Yes. [pause] We should move forward." [stop talking]',
        ],
      },
    },

    practicePrompt: 'Practice being asked to make a decision and responding like a leader. Answer: "What direction should we go?" Use measured pacing, confident language, downward inflection, and a decisive close.',
    practiceGuidelines: [
      'Pause before answering (2-3 seconds)',
      'Use "I recommend..." or "We should..."',
      'End sentences with downward inflection (statements, not questions)',
      'Stop talking after your answer—don\'t over-explain',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Day 16 Complete!

✅ You know the vocal patterns of leaders
✅ You can use confident language
✅ You understand the power of the leadership pause

**Your Day 16 Mantra**: "Speak with the confidence of someone who belongs in the room."

**Tomorrow's Preview**: Networking and small talk—making connections effortlessly.
    `.trim(),
    keyTakeaways: [
      'Leaders use measured pace and downward inflections',
      'Replace "I think maybe" with "I recommend"',
      'The leadership pause shows confidence and control',
    ],
  },

  // Days 17-21 follow similar pattern...
  {
    title: 'Day 17: Networking & Small Talk',
    description: 'Make genuine connections in any setting',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 17,
    isPublished: true,
    tags: ['networking', 'small-talk', 'social'],

    introductionContent: `
# Day 17: The Art of Connection

Networking doesn't have to feel awkward or transactional.

Today you'll learn how to start conversations, keep them going, and leave people genuinely wanting to talk to you again.
    `.trim(),

    learningObjectives: [
      'Master conversation starters that go beyond "What do you do?"',
      'Learn the FORD technique for endless conversation',
      'Practice graceful conversation exits',
    ],

    coreConceptContent: {
      text: `
## Making Connection Easy

### Better Openers Than "What Do You Do?"

Instead try:
- "What's keeping you busy these days?"
- "How do you know [host/event/group]?"
- "What brought you here tonight?"
- "I love your [specific observation]. Where did you get it?"

### The FORD Technique

When conversation lulls, go to FORD:
**F - Family**: "Do you have family in the area?"
**O - Occupation**: "What do you enjoy about your work?"
**R - Recreation**: "What do you like to do outside of work?"
**D - Dreams**: "What's something you're excited about coming up?"

### The 2:1 Ratio

Ask two questions for every one statement you make. People love to talk about themselves, and you become memorable for being interested.

### The Graceful Exit

- "I don't want to monopolize your time, but it was great meeting you."
- "I should make sure to mingle, but let's definitely connect on LinkedIn."
- "I'm going to grab a drink—would you like one?" [natural break]
      `.trim(),
      keyPoints: [
        'Better openers lead to better conversations',
        'FORD: Family, Occupation, Recreation, Dreams',
        'Ask 2 questions for every 1 statement',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which is the BEST networking opener?',
          options: [
            '"So what do you do?"',
            '"What brings you to this event?"',
            '"Hi, I\'m looking for investors."',
            '"Nice weather, huh?"',
          ],
          correctIndex: 1,
          explanation: '"What brings you here?" is specific to the context, invites a story, and is more engaging than the generic "what do you do?"',
        },
      ],
    },

    practicePrompt: 'Practice starting a networking conversation. Pretend you just met someone at a professional event. Introduce yourself, ask an engaging opening question, and practice a follow-up question using FORD.',
    practiceGuidelines: [
      'Start with a warm greeting and your name',
      'Use an opener that\'s not "What do you do?"',
      'Ask a follow-up question (show genuine interest)',
      'Practice the 2:1 ratio—ask more than you state',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 17 Complete!

✅ You have better conversation openers
✅ You know FORD for endless conversation
✅ You can exit gracefully

**Your Day 17 Mantra**: "Be interested, and you become interesting."

**Tomorrow's Preview**: Handling mistakes and recovering with grace.
    `.trim(),
    keyTakeaways: [
      'Skip "What do you do?" for better openers',
      'FORD: Family, Occupation, Recreation, Dreams',
      'Ask 2 questions for every 1 statement you make',
    ],
  },

  {
    title: 'Day 18: Recovering From Mistakes',
    description: 'Handle errors, stumbles, and brain freezes with grace',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 18,
    isPublished: true,
    tags: ['mistakes', 'recovery', 'composure'],

    introductionContent: `
# Day 18: Everyone Stumbles

Here's a secret: EVERYONE makes mistakes when speaking. The difference is how you handle them.

Today you'll learn to recover from stumbles so gracefully that your audience won't remember they happened.
    `.trim(),

    learningObjectives: [
      'Learn the recovery techniques used by pros',
      'Understand why audiences forgive mistakes',
      'Practice recovering from mid-speech stumbles',
    ],

    coreConceptContent: {
      text: `
## The Recovery Playbook

### The Truth About Mistakes

Research shows:
- Audiences forget small mistakes within seconds
- Confidence in recovery matters more than the mistake itself
- Acknowledging a mistake with humor INCREASES likability

### Recovery Techniques

**The Pause-Restart**
Stop. Breathe. "Let me say that more clearly." Restart.

**The Humor Bridge**
"Well, that came out wrong! What I meant to say is..."

**The Pivot**
"Actually, the more important point is..."

**The Acknowledge-Continue**
"I lost my train of thought—where was I? Right..."

### What NOT To Do

- Don't keep apologizing ("I'm so sorry, I'm so nervous")
- Don't dwell on it ("I can't believe I just said that")
- Don't pretend it didn't happen if it was obvious

### The 10-Second Rule

Any mistake feels worse to you than to your audience. Within 10 seconds of moving on, they've forgotten it. Don't extend the moment by over-addressing it.
      `.trim(),
      keyPoints: [
        'Audiences forgive and forget mistakes quickly',
        'Confident recovery increases likability',
        'Don\'t over-apologize or dwell on mistakes',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Mid-presentation, your mind goes completely blank. You can\'t remember your next point.',
        role: 'speaker recovering from brain freeze',
        prompts: [
          'What do you do first?',
          'What do you say?',
          'How do you continue?',
        ],
        sampleResponses: [
          'Pause confidently (don\'t panic visibly)',
          '"Let me take a moment... [check notes]" or "[with humor] My brain just went on vacation—one moment."',
          'Find your place and continue without over-apologizing',
        ],
      },
    },

    practicePrompt: 'Practice recovering from a mistake. Start talking about any topic, intentionally stumble or lose your place midway, then use one of the recovery techniques and continue smoothly.',
    practiceGuidelines: [
      'Intentionally pause as if you lost your thought',
      'Use one of: Pause-Restart, Humor Bridge, or Acknowledge-Continue',
      'Move on confidently—don\'t keep apologizing',
      'Notice how quickly you can recover and continue',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Day 18 Complete!

✅ You have multiple recovery techniques
✅ You understand the 10-second rule
✅ You can turn mistakes into human moments

**Your Day 18 Mantra**: "Mistakes are human. Recovery is professional."

**Tomorrow's Preview**: Building your personal brand through speaking.
    `.trim(),
    keyTakeaways: [
      'Audiences forget mistakes faster than you think',
      'Confident recovery increases your likability',
      'Don\'t over-apologize—move on',
    ],
  },

  {
    title: 'Day 19: Your Speaking Brand',
    description: 'Develop your unique voice and signature style',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 19,
    isPublished: true,
    tags: ['branding', 'authenticity', 'style'],

    introductionContent: `
# Day 19: What Makes You YOU?

Great speakers aren't great because they copy others. They're great because they've found THEIR voice.

Today you'll discover what makes your speaking style unique—and how to amplify it.
    `.trim(),

    learningObjectives: [
      'Identify your natural speaking strengths',
      'Understand different speaking archetypes',
      'Develop your authentic speaking identity',
    ],

    coreConceptContent: {
      text: `
## Finding Your Speaking Style

### The Four Archetypes

Most speakers lean toward one primary style:

**The Storyteller**: Captivates through narrative and emotion
*Strength: Connection. Watch for: Too long without the point.*

**The Expert**: Commands respect through knowledge and data
*Strength: Credibility. Watch for: Can feel cold or dense.*

**The Energizer**: Inspires through enthusiasm and passion
*Strength: Motivation. Watch for: Can feel exhausting.*

**The Coach**: Guides through questions and dialogue
*Strength: Engagement. Watch for: May lack direction.*

### Discovering Your Strengths

Ask yourself:
- When do people compliment my communication?
- What feels most natural when I speak?
- What do I admire in speakers I enjoy?

### Amplifying Authenticity

Your "brand" isn't something you create—it's something you UNCOVER.

- If you're naturally funny, use more humor
- If you're naturally calm, lean into gravitas
- If you're naturally warm, make connection your superpower
- If you're naturally analytical, make complexity clear

Don't try to be someone else. Be more of who you already are.
      `.trim(),
      keyPoints: [
        'Four archetypes: Storyteller, Expert, Energizer, Coach',
        'Know your natural strengths and amplify them',
        'Authenticity > imitation',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which archetype do you most identify with?',
          options: [
            'The Storyteller - I love narratives and emotional connection',
            'The Expert - I lead with knowledge and credibility',
            'The Energizer - I motivate with enthusiasm and passion',
            'The Coach - I engage through questions and dialogue',
          ],
          correctIndex: -1,
          explanation: 'There\'s no wrong answer. Understanding your natural style helps you lean into your strengths while being aware of potential blind spots.',
        },
      ],
    },

    practicePrompt: 'In your own authentic style, share something you\'re passionate about. Don\'t try to be anyone else—speak as the truest version of you. Whether that\'s enthusiastic, calm, analytical, or warm.',
    practiceGuidelines: [
      'Choose a topic you genuinely care about',
      'Speak in your natural voice and style',
      'Lean into your strengths (humor, warmth, energy, or depth)',
      'Be yourself—authenticity resonates',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Day 19 Complete!

✅ You know your primary speaking archetype
✅ You've identified your natural strengths
✅ You're leaning into authenticity, not imitation

**Your Day 19 Mantra**: "The world needs my voice, not a copy of someone else's."

**Tomorrow's Preview**: Your final preparation before the Day 21 showcase.
    `.trim(),
    keyTakeaways: [
      'Know your archetype and its strengths/weaknesses',
      'Amplify your natural style, don\'t fake another',
      'Authenticity resonates more than perfection',
    ],
  },

  {
    title: 'Day 20: Final Preparation',
    description: 'Prepare for your Day 21 transformation showcase',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 20,
    isPublished: true,
    tags: ['preparation', 'review', 'synthesis'],

    introductionContent: `
# Day 20: The Day Before

Tomorrow is your Day 21 showcase—a chance to see how far you've come.

Today is about review, preparation, and getting ready to shine.
    `.trim(),

    learningObjectives: [
      'Review all skills from the 21 days',
      'Prepare for the Day 21 showcase recording',
      'Reflect on your growth and transformation',
    ],

    coreConceptContent: {
      text: `
## Your Complete Toolkit

### Week 1: Foundation
- Day 1: Self-assessment and intention
- Day 2: Confidence science and power poses
- Day 3: Breathing techniques (4-7-8)
- Day 4: Voice—pitch, projection, pace
- Day 5: Body language mastery
- Day 6: Overcoming fear of judgment
- Day 7: Week 1 integration

### Week 2: Skills
- Day 8: Storytelling structure
- Day 9: Message structure (BLUF, Rule of 3)
- Day 10: Impromptu speaking (PREP)
- Day 11: Handling tough questions (ARC)
- Day 12: Persuasion (Ethos, Logos, Pathos)
- Day 13: Audience connection
- Day 14: Week 2 integration

### Week 3: Mastery
- Day 15: High-stakes presentations
- Day 16: Leadership presence
- Day 17: Networking and small talk
- Day 18: Recovering from mistakes
- Day 19: Your speaking brand

### Tomorrow's Showcase

You'll record a 2-3 minute talk that demonstrates:
- Confident delivery
- Clear structure
- Your authentic style
- Connection with your audience (camera)

Topic: "What I've learned about confident communication"
      `.trim(),
      keyPoints: [
        'You\'ve built 19 days of skills and practice',
        'Tomorrow is your transformation showcase',
        'Topic: What you\'ve learned about confident communication',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'For your Day 21 showcase, you should:',
          options: [
            'Memorize a script word-for-word',
            'Speak entirely off-the-cuff with no preparation',
            'Know your structure and key points, but speak naturally',
            'Read from notes the entire time',
          ],
          correctIndex: 2,
          explanation: 'Knowing your structure keeps you organized, while speaking naturally keeps you authentic. Don\'t memorize or read—find the balance.',
        },
      ],
    },

    practicePrompt: 'Do a draft run of your Day 21 showcase. Topic: "The most important thing I\'ve learned about confident communication." Aim for 2 minutes.',
    practiceGuidelines: [
      'Structure: Opening hook → 2-3 key lessons → Closing',
      'Be specific—share what actually helped you',
      'Use the skills you\'ve learned (story, structure, delivery)',
      'This is practice—tomorrow is the real showcase',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Day 20 Complete!

✅ You've reviewed all 21 days of content
✅ You've done a draft showcase
✅ You're ready for tomorrow

**Your Day 20 Mantra**: "I've done the work. I'm ready."

**Tomorrow**: Your Day 21 Transformation Showcase. Show yourself how far you've come.

Rest well. Tomorrow you celebrate.
    `.trim(),
    keyTakeaways: [
      '19 days of skills and practice behind you',
      'Tomorrow: 2-3 minute showcase on confident communication',
      'Know your structure, speak naturally, be authentic',
    ],
  },

  {
    title: 'Day 21: Transformation Showcase',
    description: 'Celebrate your growth with your final confident presentation',
    category: '21-day-challenge',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 21,
    isPublished: true,
    tags: ['celebration', 'showcase', 'transformation'],

    introductionContent: `
# Day 21: Your Transformation 🎉

You made it. 21 days of learning, practice, and growth.

Today isn't a test—it's a celebration. It's a chance to see how far you've come by doing what you've been learning to do: SPEAK with confidence.

Let's make this count.
    `.trim(),

    learningObjectives: [
      'Deliver a confident showcase presentation',
      'Recognize and celebrate your progress',
      'Set intentions for continued growth',
    ],

    coreConceptContent: {
      text: `
## Your Showcase Guidelines

### The Assignment

Record a 2-3 minute presentation on:
**"What I've learned about confident communication and how I'll apply it"**

### Suggested Structure

**Opening (20 sec)**
Hook your audience—start strong

**Where I Started (30 sec)**
Brief mention of where you were on Day 1

**What I Learned (60-90 sec)**
Share 2-3 specific lessons that impacted you

**How I'll Apply It (30 sec)**
What will you do differently going forward?

**Closing (20 sec)**
End with impact—leave them inspired

### Remember Your Skills

- Pre-speaking ritual (pose, breathe, pitch)
- Confident body language
- Clear structure
- Authentic style
- Connection with camera/audience

### This Is Your Victory Lap

Don't aim for perfection. Aim for GROWTH. Compare this recording to Day 1—that's your measure of success.

You've done the work. You ARE a more confident speaker than you were 21 days ago. Show yourself.
      `.trim(),
      keyPoints: [
        'This is a celebration, not a test',
        '2-3 minutes on your confident communication journey',
        'Compare to Day 1—that\'s your growth measure',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Before your showcase, you will:',
          options: [
            'Skip the pre-speaking ritual—I know this stuff',
            'Do your full ritual: power pose, breathing, find pitch',
            'Just start recording immediately',
            'Worry about making mistakes',
          ],
          correctIndex: 1,
          explanation: 'The pre-speaking ritual isn\'t just for beginners. It\'s for every time you speak—especially important moments like this.',
        },
        {
          question: 'The goal of this showcase is:',
          options: [
            'To prove I\'m now a perfect speaker',
            'To show growth and celebrate progress',
            'To impress other people',
            'To get it over with',
          ],
          correctIndex: 1,
          explanation: 'This is YOUR celebration. It\'s not about perfection—it\'s about recognizing how far you\'ve come in 21 days.',
        },
      ],
    },

    practicePrompt: 'Your Day 21 Transformation Showcase. Record your final 2-3 minute presentation: "What I\'ve learned about confident communication and how I\'ll apply it." Do your full pre-speaking ritual first. This is your victory lap.',
    practiceGuidelines: [
      'Complete pre-speaking ritual before recording',
      'Use confident posture and eye contact',
      'Follow structure: Opening → Journey → Lessons → Application → Closing',
      'Be authentic—this is YOUR transformation',
      'Enjoy this moment—you\'ve earned it',
    ],
    practiceRecordingDurationSeconds: 180,

    summaryContent: `
## 🏆 21-DAY CHALLENGE COMPLETE! 🏆

You did it.

**What You've Built:**
✅ Understanding of confidence science
✅ Breathing and vocal techniques
✅ Commanding body language
✅ Mental tools for managing fear
✅ Storytelling and structure skills
✅ Impromptu speaking ability
✅ Handling tough questions
✅ Persuasion techniques
✅ Leadership presence
✅ Your authentic speaking brand

**What's Next?**

Confidence is a muscle. Keep exercising it:
- Use your pre-speaking ritual before every important conversation
- Seek out speaking opportunities
- Record yourself occasionally to track progress
- Return to any day's lesson for a refresher

**Your Final Mantra**: "I am a confident speaker. I have the skills. I've done the work. I continue to grow."

Thank you for committing to this journey. The world needs your voice.

Now go speak it. 🎤
    `.trim(),
    keyTakeaways: [
      'You completed 21 days of transformation',
      'Confidence is a muscle—keep exercising it',
      'You have all the tools—now use them',
    ],
  },
];

export default challengeLessons;
