/**
 * Sample Micro-Lesson Content
 *
 * This file contains sample lesson data following the 15-minute micro-lesson structure:
 * - Introduction (1 min): Topic intro and learning objectives
 * - Core Concept (4 min): Video or interactive text explanation
 * - Interactive Exercise (5 min): Puzzles, communication scenarios
 * - Practice & Record (4 min): Speaking exercise with recording
 * - Summary (1 min): Key takeaways recap
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';
import { TopicCategory } from '../../cms/dto/topic.dto';

export const sampleLessons = [
  // ========== COMMUNICATION SKILLS ==========
  {
    title: 'The Art of Active Listening',
    description: 'Learn how to truly hear and understand others in conversations',
    category: TopicCategory.COMMUNICATION_SKILLS,
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 1,
    isPublished: true,

    // Introduction (1 min)
    introductionContent: `
# Welcome to Active Listening

Have you ever been in a conversation where you felt truly heard? That feeling of connection comes from active listening - a skill that transforms ordinary conversations into meaningful exchanges.

In this lesson, you'll discover the power of giving your full attention and learn practical techniques to become a better listener.
    `.trim(),
    learningObjectives: [
      'Understand what active listening is and why it matters',
      'Learn the 3 key components of active listening',
      'Practice reflecting and paraphrasing techniques',
    ],

    // Core Concept (4 min)
    coreConceptContent: {
      text: `
## What is Active Listening?

Active listening is more than just hearing words - it's about fully engaging with the speaker to understand their message, feelings, and intentions.

### The 3 Pillars of Active Listening

**1. Attention**
Give your undivided focus. Put away distractions, maintain eye contact, and be present in the moment.

**2. Reflection**
Show understanding by paraphrasing what you heard. "So what you're saying is..." or "It sounds like you feel..."

**3. Response**
Ask clarifying questions and provide thoughtful feedback that shows you understood.

### Why It Matters

Studies show that we typically remember only 25-50% of what we hear. Active listening can increase retention to 70-80% and dramatically improve relationships.
      `.trim(),
      videoUrl: null, // Can add YouTube or Vimeo URL
      images: [],
      keyPoints: [
        'Active listening requires intentional effort',
        'The 3 pillars: Attention, Reflection, Response',
        'It improves both understanding and relationships',
      ],
    },

    // Interactive Exercise (5 min)
    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Your friend Sarah comes to you looking stressed and says: "I just found out I didn\'t get the promotion I was hoping for. I worked so hard for months, and they gave it to someone who started after me."',
        role: 'supportive friend',
        prompts: [
          'What would be a good active listening response?',
          'How could you reflect her feelings back to her?',
          'What follow-up question shows you understood?',
        ],
        sampleResponses: [
          '"That sounds really frustrating, especially after all the effort you put in."',
          '"I can hear how disappointed you are. Being passed over when you worked so hard must feel unfair."',
          '"What aspects of the decision were most surprising to you?"',
        ],
      },
      questions: [
        {
          question: 'Which response shows the BEST active listening?',
          options: [
            '"Don\'t worry, there will be other opportunities."',
            '"That\'s terrible! You should complain to HR."',
            '"It sounds like you\'re really disappointed after working so hard."',
            '"The same thing happened to me last year."',
          ],
          correctIndex: 2,
          explanation: 'This response reflects her feelings without dismissing them, offering unsolicited advice, or redirecting to yourself.',
        },
      ],
    },

    // Practice & Record (4 min)
    practicePrompt: 'Imagine a friend tells you they\'re nervous about an upcoming job interview. Record yourself practicing an active listening response that acknowledges their feelings and shows understanding.',
    practiceGuidelines: [
      'Start by acknowledging their emotion',
      'Paraphrase what they shared to show understanding',
      'Ask an open-ended follow-up question',
      'Keep your tone warm and supportive',
    ],
    practiceRecordingDurationSeconds: 60,

    // Summary (1 min)
    summaryContent: `
## Key Takeaways

You've learned the fundamentals of active listening - a powerful skill that strengthens every relationship in your life.

**Remember the 3 pillars:**
1. **Attention** - Be fully present
2. **Reflection** - Mirror back understanding
3. **Response** - Ask thoughtful questions

**Your challenge:** In your next conversation today, practice using at least one reflection technique: "So what you're saying is..." or "It sounds like you feel..."
    `.trim(),
    keyTakeaways: [
      'Active listening = Attention + Reflection + Response',
      'Reflect feelings before offering solutions',
      'Open-ended questions deepen understanding',
    ],
  },

  // ========== SELF GROWTH ==========
  {
    title: 'Building Confident Body Language',
    description: 'Master the non-verbal signals that project confidence',
    category: TopicCategory.SELF_GROWTH,
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 2,
    isPublished: true,

    introductionContent: `
# Your Body Speaks Before You Do

Did you know that 55% of communication is non-verbal? Your body language tells others whether you're confident, nervous, open, or closed off - often before you say a single word.

In this lesson, you'll learn the specific body language cues that project confidence and how to use them naturally.
    `.trim(),
    learningObjectives: [
      'Identify the key elements of confident body language',
      'Learn the "power pose" technique backed by research',
      'Practice confident posture and gestures',
    ],

    coreConceptContent: {
      text: `
## The Language of Confidence

### The 4 Pillars of Confident Body Language

**1. Posture**
Stand tall with shoulders back. Imagine a string pulling you up from the crown of your head. This "power posture" not only looks confident but actually makes you feel more confident.

**2. Eye Contact**
Maintain comfortable eye contact for 3-5 seconds at a time. Too little seems evasive; too much can feel intense.

**3. Open Gestures**
Keep your hands visible and use open palm gestures. Avoid crossing arms or putting hands in pockets.

**4. Grounded Movement**
Move deliberately, not frantically. Take up appropriate space and avoid fidgeting.

### The Science Behind It

Research by Amy Cuddy showed that holding a "power pose" for just 2 minutes can increase testosterone (confidence hormone) by 20% and decrease cortisol (stress hormone) by 25%.
      `.trim(),
      keyPoints: [
        'Posture, eye contact, gestures, and movement are key',
        'Power poses chemically boost confidence',
        'Confidence is a skill that can be practiced',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which body language signal projects the MOST confidence?',
          options: [
            'Crossed arms while leaning back',
            'Standing with feet shoulder-width apart, hands visible',
            'Quick, nervous hand movements',
            'Looking down while speaking',
          ],
          correctIndex: 1,
          explanation: 'An open stance with visible hands signals confidence and openness. Crossed arms appear defensive, quick movements signal nervousness.',
        },
        {
          question: 'How long should you hold eye contact in a conversation?',
          options: [
            '10+ seconds without breaking',
            '3-5 seconds at a time',
            'Never - it\'s intimidating',
            'Only when you\'re speaking',
          ],
          correctIndex: 1,
          explanation: '3-5 seconds is the comfortable sweet spot. Longer can feel intense, while avoiding eye contact seems evasive.',
        },
        {
          question: 'What effect does a 2-minute power pose have?',
          options: [
            'No measurable effect',
            'Increases stress hormones',
            'Increases confidence hormones, decreases stress hormones',
            'Only works for extroverts',
          ],
          correctIndex: 2,
          explanation: 'Research shows power poses increase testosterone by 20% and decrease cortisol by 25%, creating a chemical confidence boost.',
        },
      ],
    },

    practicePrompt: 'Stand up, do a 30-second power pose, then introduce yourself as if you\'re meeting an important person for the first time. Focus on confident posture, eye contact (look at the camera), and open gestures.',
    practiceGuidelines: [
      'Start with a power pose to boost confidence',
      'Stand tall with shoulders back',
      'Look directly at the camera as you speak',
      'Use open hand gestures',
      'Speak slowly and clearly',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

You now have the tools to project confidence through your body language, even when you don't feel confident inside.

**The 4 Pillars:**
1. **Posture** - Stand tall, shoulders back
2. **Eye Contact** - 3-5 seconds at a time
3. **Open Gestures** - Visible hands, no crossing
4. **Grounded Movement** - Deliberate, not fidgety

**Your challenge:** Before your next important interaction, strike a power pose for 2 minutes. Notice how it changes how you feel and how others respond to you.
    `.trim(),
    keyTakeaways: [
      '55% of communication is non-verbal',
      'Power poses create real chemical changes',
      'Confident body language can be practiced and mastered',
    ],
  },

  // ========== KNOWLEDGE ==========
  {
    title: 'The Art of Logical Reasoning',
    description: 'Sharpen your thinking with fundamental logic principles',
    category: TopicCategory.KNOWLEDGE,
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 3,
    isPublished: true,

    introductionContent: `
# Think Clearly, Argue Well

Every day, we're bombarded with arguments - in news, social media, and conversations. How do you know which ones are valid? Logic gives you the tools to evaluate any argument.

In this lesson, you'll learn to identify logical fallacies and construct sound arguments.
    `.trim(),
    learningObjectives: [
      'Understand the structure of logical arguments',
      'Identify 3 common logical fallacies',
      'Practice constructing valid arguments',
    ],

    coreConceptContent: {
      text: `
## The Basics of Logic

### What Makes an Argument Valid?

An argument has two parts:
- **Premises**: The supporting statements
- **Conclusion**: What follows from the premises

A valid argument means IF the premises are true, the conclusion MUST be true.

### Example of a Valid Argument:
- Premise 1: All humans are mortal
- Premise 2: Socrates is a human
- Conclusion: Therefore, Socrates is mortal

### 3 Common Fallacies to Watch For

**1. Ad Hominem**
Attacking the person instead of their argument.
❌ "You can't trust his climate research - he drives an SUV."

**2. False Dichotomy**
Presenting only two options when more exist.
❌ "You're either with us or against us."

**3. Appeal to Authority**
Using status instead of evidence.
❌ "This celebrity says this product works, so it must."
      `.trim(),
      keyPoints: [
        'Valid arguments: true premises → true conclusion',
        'Fallacies are flawed reasoning patterns',
        'Recognizing fallacies improves critical thinking',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Identify the fallacy: "You can\'t argue that exercise is healthy - you don\'t even go to the gym!"',
          options: [
            'False dichotomy',
            'Ad hominem',
            'Appeal to authority',
            'This is a valid argument',
          ],
          correctIndex: 1,
          explanation: 'This attacks the person\'s behavior rather than addressing whether exercise is actually healthy. The truth of a claim doesn\'t depend on who says it.',
        },
        {
          question: 'Identify the fallacy: "Either you support this policy completely, or you hate our country."',
          options: [
            'Ad hominem',
            'Appeal to authority',
            'False dichotomy',
            'Valid argument',
          ],
          correctIndex: 2,
          explanation: 'This presents only two extreme options, ignoring that someone might partially support the policy or oppose it for patriotic reasons.',
        },
        {
          question: 'Which is a VALID argument?',
          options: [
            'Most doctors recommend this, so it must be true.',
            'All birds have wings. Penguins are birds. Therefore, penguins have wings.',
            'You\'re young, so you can\'t understand politics.',
            'Everyone believes this, so it must be correct.',
          ],
          correctIndex: 1,
          explanation: 'This follows valid logical structure: if the premises are true, the conclusion must be true. The others rely on authority, age-based dismissal, or popularity.',
        },
      ],
    },

    practicePrompt: 'Think of a common argument you\'ve heard recently (from news, social media, or conversation). Explain whether it\'s valid or contains a fallacy, and why. Structure your response with the premise(s) and conclusion.',
    practiceGuidelines: [
      'State the original argument clearly',
      'Identify the premises and conclusion',
      'Explain if it\'s valid or what fallacy it contains',
      'Suggest how the argument could be improved',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

You now have tools to evaluate any argument you encounter and construct your own sound reasoning.

**Remember:**
- Valid arguments: True premises lead to true conclusions
- Watch for: Ad hominem, False dichotomy, Appeal to authority

**Your challenge:** Today, when you see an argument online or hear one in conversation, pause to identify the premises and conclusion. Ask: "If the premises are true, must the conclusion be true?"
    `.trim(),
    keyTakeaways: [
      'Arguments = Premises + Conclusion',
      'Valid doesn\'t mean the premises are true',
      'Fallacies are common but recognizable patterns',
    ],
  },
];

export const sampleTopics = [
  // Communication Skills
  {
    name: 'Active Listening',
    description: 'Master the art of truly hearing and understanding others',
    category: TopicCategory.COMMUNICATION_SKILLS,
    subCategory: 'active_listening',
    icon: 'ear',
    color: '#4A90D9',
    order: 1,
    isActive: true,
  },
  {
    name: 'Public Speaking',
    description: 'Speak confidently and persuasively to any audience',
    category: TopicCategory.COMMUNICATION_SKILLS,
    subCategory: 'public_speaking',
    icon: 'microphone',
    color: '#5B8DEF',
    order: 2,
    isActive: true,
  },
  {
    name: 'Storytelling',
    description: 'Craft compelling narratives that captivate listeners',
    category: TopicCategory.COMMUNICATION_SKILLS,
    subCategory: 'storytelling',
    icon: 'book-open',
    color: '#7B68EE',
    order: 3,
    isActive: true,
  },

  // Self Growth
  {
    name: 'Building Confidence',
    description: 'Develop unshakeable self-belief in any situation',
    category: TopicCategory.SELF_GROWTH,
    subCategory: 'confidence',
    icon: 'star',
    color: '#FFB347',
    order: 1,
    isActive: true,
  },
  {
    name: 'Emotional Intelligence',
    description: 'Understand and manage emotions effectively',
    category: TopicCategory.SELF_GROWTH,
    subCategory: 'emotional_intelligence',
    icon: 'heart',
    color: '#FF6B6B',
    order: 2,
    isActive: true,
  },
  {
    name: 'Leadership Skills',
    description: 'Inspire and guide others to achieve shared goals',
    category: TopicCategory.SELF_GROWTH,
    subCategory: 'leadership',
    icon: 'users',
    color: '#4ECDC4',
    order: 3,
    isActive: true,
  },

  // Knowledge
  {
    name: 'Logic & Critical Thinking',
    description: 'Sharpen your reasoning and analytical skills',
    category: TopicCategory.KNOWLEDGE,
    subCategory: 'logic',
    icon: 'brain',
    color: '#9B59B6',
    order: 1,
    isActive: true,
  },
  {
    name: 'Financial Literacy',
    description: 'Understand money, investing, and building wealth',
    category: TopicCategory.KNOWLEDGE,
    subCategory: 'finance',
    icon: 'dollar-sign',
    color: '#2ECC71',
    order: 2,
    isActive: true,
  },
  {
    name: 'History & Culture',
    description: 'Learn from the past to understand the present',
    category: TopicCategory.KNOWLEDGE,
    subCategory: 'history',
    icon: 'landmark',
    color: '#E67E22',
    order: 3,
    isActive: true,
  },
];
