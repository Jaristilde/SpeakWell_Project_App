/**
 * Daily Conversations Category - 10 Micro-Lessons
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';

export const conversationsLessons = [
  {
    title: 'Starting Conversations with Anyone',
    description: 'Break the ice in any situation',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 1,
    isPublished: true,
    tags: ['conversations', 'ice-breakers', 'social'],

    introductionContent: `# Breaking the Ice

Starting conversations with strangers is a skill, not a personality trait.

Today you'll learn openers that work in any situation.`,

    learningObjectives: [
      'Use situational openers',
      'Ask questions that invite conversation',
      'Move past small talk naturally',
    ],

    coreConceptContent: {
      text: `## The Art of Starting

### Situational Openers
Comment on your shared environment:
- "This coffee is amazing—have you tried it?"
- "How do you know [host]?"
- "What brought you to this event?"

### The FORD Method
**F** - Family: "Are you from around here?"
**O** - Occupation: "What keeps you busy?"
**R** - Recreation: "Do anything fun this weekend?"
**D** - Dreams: "What are you excited about lately?"

### Moving Beyond Small Talk
Follow their answers with:
- "Tell me more about that..."
- "What do you enjoy about it?"
- "How did you get into that?"`,
      keyPoints: [
        'Start with situational observations',
        'FORD gives endless conversation fuel',
        'Follow-up questions go deeper',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best opener at a networking event?',
        options: [
          '"So what do you do?"',
          '"What brings you to this event?"',
          '"Nice weather today."',
          '"I hate these things."',
        ],
        correctIndex: 1,
        explanation: 'This is specific to the situation and invites a more interesting answer than generic questions.',
      }],
    },

    practicePrompt: 'Practice starting a conversation with a stranger at an event. Use a situational opener and follow up with FORD questions.',
    practiceGuidelines: ['Start with context', 'Ask one FORD question', 'Ask a follow-up', 'Keep it warm and curious'],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `## Key Takeaways

✅ Situational openers work everywhere
✅ FORD for endless topics
✅ Follow-ups create depth`,
    keyTakeaways: ['Use situational openers', 'FORD: Family, Occupation, Recreation, Dreams', 'Follow-up questions show genuine interest'],
  },

  {
    title: 'Active Listening',
    description: 'Make others feel truly heard',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 2,
    isPublished: true,
    tags: ['conversations', 'listening', 'empathy'],

    introductionContent: `# The Gift of Attention

Most people listen to respond. Great conversationalists listen to understand.

Learn to make anyone feel like the most important person in the room.`,

    learningObjectives: [
      'Practice presence and attention',
      'Use reflection to show understanding',
      'Avoid common listening mistakes',
    ],

    coreConceptContent: {
      text: `## The 3 Levels of Listening

### Level 1: Internal (worst)
Thinking about what you'll say next

### Level 2: Focused
Hearing their words and content

### Level 3: Global (best)
Noticing tone, emotion, body language, what's unsaid

## Active Listening Techniques

**Reflect**: "It sounds like you're feeling..."
**Paraphrase**: "So what you're saying is..."
**Clarify**: "Help me understand..."
**Validate**: "That makes sense because..."

## What NOT to Do
- Interrupt to share your story
- Look at your phone
- Finish their sentences
- Give unsolicited advice`,
      keyPoints: [
        'Level 3 listening = words + emotions + context',
        'Reflect feelings before solving problems',
        'Validate before advising',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Friend says: "I\'ve been so stressed at work lately. My boss keeps piling on projects."',
        role: 'active listener',
        prompts: ['What would you reflect?', 'What would you NOT do?'],
        sampleResponses: [
          '"That sounds overwhelming. What\'s been the hardest part?"',
          'NOT: "You should talk to HR" or "Same thing happened to me..."',
        ],
      },
    },

    practicePrompt: 'Practice responding to: "I\'m thinking of making a big career change but I\'m scared." Use reflection and follow-up, not advice.',
    practiceGuidelines: ['Reflect the emotion first', 'Ask a follow-up question', 'Don\'t jump to advice', 'Show genuine curiosity'],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `## Key Takeaways

✅ Listen to understand, not respond
✅ Reflect feelings before solving
✅ Level 3: words + emotion + context`,
    keyTakeaways: ['Three levels of listening', 'Reflect before advising', 'Presence is a gift'],
  },

  {
    title: 'Giving Compliments',
    description: 'Make genuine compliments that land',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 3,
    isPublished: true,
    tags: ['conversations', 'compliments', 'connection'],

    introductionContent: `# The Art of Genuine Praise

Generic compliments feel hollow. Specific, genuine ones create connection.

Learn to give compliments that people remember.`,

    learningObjectives: [
      'Make compliments specific and genuine',
      'Compliment effort over traits',
      'Receive compliments gracefully',
    ],

    coreConceptContent: {
      text: `## What Makes Compliments Land

### Be Specific
**Generic**: "Great presentation!"
**Specific**: "The way you explained that data was so clear—I finally understand it."

### Focus on Effort/Choices
**Trait**: "You're so smart"
**Effort**: "The research you did was thorough"

### Include Impact
"Your feedback helped me improve my approach—thank you."

## The 3-Part Compliment
1. What you noticed
2. Why it matters
3. How it affected you

"The way you handled that difficult customer [noticed] showed real patience [why it matters]. I learned something watching you [impact]."

## Receiving Compliments
Just say "Thank you." Don't deflect or minimize.`,
      keyPoints: [
        'Specific > Generic',
        'Effort > Traits',
        'Include the impact on you',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Which compliment is most effective?',
        options: [
          '"Good job on the project."',
          '"The structure you created made our work so much easier. Thanks for thinking that through."',
          '"You\'re really talented."',
          '"That was nice."',
        ],
        correctIndex: 1,
        explanation: 'This is specific, mentions effort, and includes impact—making it memorable and meaningful.',
      }],
    },

    practicePrompt: 'Practice giving a specific 3-part compliment to an imagined coworker who helped you on a project.',
    practiceGuidelines: ['Be specific about what they did', 'Explain why it mattered', 'Share how it impacted you', 'Sound genuine'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Specific beats generic
✅ Compliment effort, not traits
✅ Include the impact`,
    keyTakeaways: ['Be specific and genuine', 'Focus on effort and choices', 'Say "Thank you" when receiving'],
  },

  {
    title: 'Navigating Difficult Conversations',
    description: 'Handle conflict with grace',
    category: 'daily-conversations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 4,
    isPublished: true,
    tags: ['conversations', 'conflict', 'difficult'],

    introductionContent: `# When Conversations Get Hard

Avoiding difficult conversations creates bigger problems. Having them skillfully creates stronger relationships.

Learn to navigate conflict without damaging connections.`,

    learningObjectives: [
      'Use "I" statements effectively',
      'Separate observation from judgment',
      'Find common ground',
    ],

    coreConceptContent: {
      text: `## The Difficult Conversation Framework

### 1. State the Facts (observation)
"I noticed the report was submitted late" vs. "You're always late"

### 2. Share Your Feeling (impact)
"I felt concerned because..."

### 3. Express Your Need
"I need us to meet deadlines so that..."

### 4. Make a Request
"Could we discuss how to prevent this?"

## "I" vs "You" Language
**You**: "You never listen to me" (accusation)
**I**: "I don't feel heard when..." (experience)

## Finding Common Ground
Before arguing positions, identify shared goals:
"We both want this project to succeed..."`,
      keyPoints: [
        'Facts → Feelings → Needs → Request',
        '"I" statements prevent defensiveness',
        'Start with common ground',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'A colleague keeps interrupting you in meetings.',
        role: 'person addressing the issue',
        prompts: ['What are the facts?', 'What\'s your feeling?', 'What\'s your need?', 'What\'s your request?'],
        sampleResponses: [
          'Fact: "I\'ve noticed I get interrupted when sharing ideas"',
          'Feeling: "I feel frustrated because I can\'t complete my thoughts"',
          'Need: "I need space to fully share my perspective"',
          'Request: "Could we try letting each person finish before responding?"',
        ],
      },
    },

    practicePrompt: 'Practice addressing a difficult situation using Facts → Feelings → Needs → Request. Example: a friend who frequently cancels plans.',
    practiceGuidelines: ['State observable facts only', 'Use "I feel" not "You make me"', 'Be clear about your need', 'End with a specific request'],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `## Key Takeaways

✅ Facts → Feelings → Needs → Request
✅ "I" statements prevent defensiveness
✅ Find common ground first`,
    keyTakeaways: ['Use the 4-part framework', '"I" beats "You" language', 'Identify shared goals first'],
  },

  {
    title: 'Saying No Gracefully',
    description: 'Set boundaries without burning bridges',
    category: 'daily-conversations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 5,
    isPublished: true,
    tags: ['conversations', 'boundaries', 'assertiveness'],

    introductionContent: `# The Power of No

"Yes" to everything means mediocre at everything. Learn to protect your time while preserving relationships.

A graceful "no" is a gift to everyone.`,

    learningObjectives: [
      'Say no without excessive apology',
      'Offer alternatives when appropriate',
      'Handle pushback on your no',
    ],

    coreConceptContent: {
      text: `## The Graceful No Formula

### 1. Thank/Acknowledge
"Thank you for thinking of me"

### 2. Clear No
"I'm not able to take this on"

### 3. Brief Reason (optional)
"I have competing commitments"

### 4. Alternative (if genuine)
"Could I help by [smaller ask]?"

## Examples
"I appreciate you asking. I'm not able to join this committee right now, but I'd be happy to review the materials."

## Common Mistakes
- Over-apologizing
- Leaving the door open when you mean no
- Lengthy explanations that invite debate
- Lying about why

## Handling Pushback
"I understand it's important. Unfortunately, my answer is still no. I hope you find someone great."`,
      keyPoints: [
        'Thank → No → Reason → Alternative',
        'Don\'t over-explain or apologize',
        'A firm no is clearer than a weak maybe',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best way to decline a request you can\'t fulfill?',
        options: [
          '"I\'ll try, but I probably can\'t..."',
          '"I can\'t do that. I\'m too busy with a million things."',
          '"Thanks for thinking of me. I\'m not able to take this on right now."',
          '"Maybe, let me get back to you" (then avoid)',
        ],
        correctIndex: 2,
        explanation: 'Clear, gracious, and doesn\'t leave false hope or require extensive explanation.',
      }],
    },

    practicePrompt: 'Practice declining a request to join a committee. Use: Thank → No → Brief reason → Alternative (if appropriate).',
    practiceGuidelines: ['Acknowledge the request warmly', 'Be clear in your decline', 'Keep reasoning brief', 'Offer alternative if genuine'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Thank → No → Reason → Alternative
✅ Brief is better than over-explaining
✅ A clear no is kinder than a vague maybe`,
    keyTakeaways: ['Follow the graceful no formula', 'Don\'t over-apologize', 'Clear no > weak maybe'],
  },

  {
    title: 'Apologizing Effectively',
    description: 'Make apologies that actually repair',
    category: 'daily-conversations',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 6,
    isPublished: true,
    tags: ['conversations', 'apologies', 'repair'],

    introductionContent: `# When Sorry Isn't Enough

"Sorry" is easy. A real apology that repairs is harder—and more valuable.

Learn the elements of an apology that actually heals.`,

    learningObjectives: [
      'Understand the 5 parts of effective apology',
      'Avoid non-apology apologies',
      'Know when and how to apologize',
    ],

    coreConceptContent: {
      text: `## The 5-Part Apology

### 1. Take Responsibility
"I made a mistake when I..."

### 2. Acknowledge Impact
"I can see that hurt you because..."

### 3. Express Genuine Remorse
"I'm truly sorry"

### 4. Commit to Change
"Going forward, I will..."

### 5. Ask What They Need
"Is there anything else I can do?"

## Non-Apologies to Avoid
- "I'm sorry you feel that way" (not taking responsibility)
- "I'm sorry, but..." (justifying)
- "Mistakes were made" (passive)
- "If I hurt you, I'm sorry" (conditional)

## The Right Mindset
Apologies aren't about being right. They're about the relationship.`,
      keyPoints: [
        '5 parts: Responsibility, Impact, Remorse, Change, Ask',
        'No "but" after sorry',
        'Focus on relationship, not being right',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You forgot an important meeting with a colleague.',
        role: 'person apologizing',
        prompts: ['How do you take responsibility?', 'How do you acknowledge impact?', 'How do you commit to change?'],
        sampleResponses: [
          '"I missed our meeting. That was my mistake."',
          '"I know that wasted your time and that\'s frustrating."',
          '"I\'ve set a reminder system so this won\'t happen again."',
        ],
      },
    },

    practicePrompt: 'Practice a 5-part apology for being late to dinner with a friend. Include all elements without making excuses.',
    practiceGuidelines: ['Take clear responsibility', 'Acknowledge specific impact', 'Express genuine remorse', 'Commit to concrete change'],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `## Key Takeaways

✅ 5 parts make apologies complete
✅ "Sorry, but..." isn't sorry
✅ Relationship > being right`,
    keyTakeaways: ['Responsibility + Impact + Remorse + Change + Ask', 'Avoid non-apology apologies', 'Apologies serve the relationship'],
  },

  {
    title: 'Making Small Talk Meaningful',
    description: 'Turn surface chat into real connection',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 7,
    isPublished: true,
    tags: ['conversations', 'small-talk', 'connection'],

    introductionContent: `# Beyond the Weather

Small talk doesn't have to be small. It's the gateway to deeper connection.

Learn to make every conversation more interesting.`,

    learningObjectives: [
      'Ask questions that invite real answers',
      'Share to create connection',
      'Move from surface to substance',
    ],

    coreConceptContent: {
      text: `## Better Questions

### Instead of "How are you?"
- "What's been the highlight of your week?"
- "What are you working on that you're excited about?"
- "What's keeping you busy these days?"

### The Magic Follow-Up
Whatever they say, respond with:
- "Tell me more about that..."
- "What's that like?"
- "How did that happen?"

## Share to Connect
After asking, share something related:
"That reminds me of when I..."

The rhythm: Ask → Listen → Relate → Ask

## Going Deeper
Move from facts to feelings to values:
- Facts: "What do you do?"
- Feelings: "What do you enjoy about it?"
- Values: "What drew you to that field?"`,
      keyPoints: [
        'Better questions get better answers',
        '"Tell me more" unlocks depth',
        'Facts → Feelings → Values',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best way to deepen small talk?',
        options: [
          'Share your own story immediately',
          'Ask "Tell me more about that"',
          'Change the subject',
          'Give advice',
        ],
        correctIndex: 1,
        explanation: '"Tell me more" shows interest and invites them to go deeper, naturally extending the conversation.',
      }],
    },

    practicePrompt: 'Practice taking "I just got back from vacation" and making it meaningful. Ask follow-ups that go from facts to feelings.',
    practiceGuidelines: ['Ask about the trip (facts)', 'Ask what they enjoyed most (feelings)', 'Connect with something related', 'Show genuine curiosity'],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `## Key Takeaways

✅ Better questions, better conversations
✅ "Tell me more" creates depth
✅ Facts → Feelings → Values`,
    keyTakeaways: ['Ask interesting questions', 'Follow up to go deeper', 'Share to create connection'],
  },

  {
    title: 'Handling Awkward Silences',
    description: 'Keep conversations flowing naturally',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 8,
    isPublished: true,
    tags: ['conversations', 'silence', 'flow'],

    introductionContent: `# When Conversation Stalls

Awkward silences happen. They're only truly awkward if you make them so.

Learn to embrace pauses and restart naturally.`,

    learningObjectives: [
      'Reframe silence as normal',
      'Use conversation rescue techniques',
      'Exit gracefully when needed',
    ],

    coreConceptContent: {
      text: `## Reframing Silence

Silence isn't failure—it's a natural pause. You don't need to fill every second.

## Conversation Rescue Techniques

### Return to Earlier Topic
"You mentioned earlier that... tell me more about that"

### Environmental Comment
"Oh look, they just brought out desserts..."

### Observation
"I love this music—do you know the artist?"

### Direct Acknowledgment (advanced)
"I'm trying to think of what to ask you next..." (surprisingly effective)

## When It's Time to Exit

"It's been great talking to you. I'm going to grab a drink / say hi to someone."

## The 2:1 Exit
After 2 topics, naturally find an exit if the energy is low.`,
      keyPoints: [
        'Silence is natural, not failure',
        'Return to earlier topics as rescue',
        'Know when to gracefully exit',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best response to an awkward silence?',
        options: [
          'Say "This is awkward"',
          'Look at your phone',
          '"You mentioned earlier you like hiking—do you go often?"',
          'Walk away without saying anything',
        ],
        correctIndex: 2,
        explanation: 'Returning to an earlier topic naturally restarts the conversation and shows you were listening.',
      }],
    },

    practicePrompt: 'Practice acknowledging a silence and then rescuing with a return to an earlier topic or an observation.',
    practiceGuidelines: ['Pause comfortably first', 'Return to something they mentioned', 'Or comment on environment', 'Keep it natural'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Silence is normal, not awkward
✅ Return to earlier topics
✅ Exit gracefully when needed`,
    keyTakeaways: ['Reframe silence as natural', 'Use rescue techniques', 'Know when to exit'],
  },

  {
    title: 'Remembering Names',
    description: 'Never forget a name again',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 9,
    isPublished: true,
    tags: ['conversations', 'names', 'memory'],

    introductionContent: `# The Sweetest Sound

Dale Carnegie said a person's name is the sweetest sound to them.

Forgetting names hurts connection. Let's fix that forever.`,

    learningObjectives: [
      'Use techniques to remember names',
      'Recover gracefully when you forget',
      'Make names stick long-term',
    ],

    coreConceptContent: {
      text: `## Name Memory Techniques

### 1. Repeat Immediately
"Nice to meet you, Sarah. How do you know [host], Sarah?"

### 2. Make an Association
Connect their name to someone you know or a visual:
"Mike" → "Mike like the musician I love"

### 3. Use It in Conversation
Use their name 2-3 times naturally in the first few minutes.

### 4. Write It Down
After parting, jot their name with a note about them.

## When You Forget

### Ask Early
"I'm sorry, I missed your name—what was it again?"

### Admit Later
"I'm embarrassed—I've blanked on your name. Help me out?"

### Mutual Introduction Trick
If with someone, introduce your companion and they'll often introduce themselves.`,
      keyPoints: [
        'Repeat → Associate → Use → Write',
        'Ask immediately if you miss it',
        'Admit and ask—better than faking',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best technique for remembering names?',
        options: [
          'Just try really hard to remember',
          'Repeat, associate with something, and use it in conversation',
          'Don\'t worry—names aren\'t important',
          'Ask them to wear a nametag',
        ],
        correctIndex: 1,
        explanation: 'Using multiple techniques (repetition, association, usage) creates stronger memory encoding.',
      }],
    },

    practicePrompt: 'Practice meeting "Marcus" and using name memory techniques: repeat the name, create an association out loud, and use it in follow-up questions.',
    practiceGuidelines: ['Say the name back immediately', 'Share your association', 'Use the name naturally twice', 'Make it conversational'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Repeat → Associate → Use → Write
✅ Ask immediately if you miss it
✅ Better to ask than fake`,
    keyTakeaways: ['Use multiple encoding techniques', 'Ask early if you miss it', 'Admitting you forgot beats faking'],
  },

  {
    title: 'Ending Conversations Gracefully',
    description: 'Exit without awkwardness',
    category: 'daily-conversations',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 10,
    isPublished: true,
    tags: ['conversations', 'exits', 'grace'],

    introductionContent: `# The Art of the Exit

Knowing how to end a conversation is as important as starting one.

Exit gracefully and leave people wanting more.`,

    learningObjectives: [
      'Recognize exit signals',
      'Use graceful exit phrases',
      'End on a positive note',
    ],

    coreConceptContent: {
      text: `## Graceful Exit Phrases

### Social Events
- "I don't want to monopolize your time—it was great meeting you!"
- "I'm going to make the rounds, but let's connect on LinkedIn."
- "I'm going to grab a drink—can I get you anything?" (natural break)

### Professional
- "I'll let you get back to it. Thanks for the chat!"
- "I know you're busy—I appreciate your time."

### With Friends
- "I should let you go, but let's catch up properly soon."
- "This was great—let's do it again."

## Exit Signals
Watch for:
- Checking phone/watch
- Looking around
- Shorter answers
- Shifting weight toward exit

## The Positive Close
End on a high note:
"This was really great. I loved hearing about [specific thing]."`,
      keyPoints: [
        'Watch for exit signals',
        'Have graceful phrases ready',
        'End on a positive note',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best way to exit a conversation?',
        options: [
          'Just stop talking and walk away',
          'Say "I have to go" without context',
          '"I don\'t want to keep you—it was great chatting about [topic]!"',
          'Wait for them to end it',
        ],
        correctIndex: 2,
        explanation: 'This is gracious, references something specific, and makes them feel valued.',
      }],
    },

    practicePrompt: 'Practice ending a conversation at a networking event. Use a graceful exit phrase and end on a positive note about the conversation.',
    practiceGuidelines: ['Use a graceful exit phrase', 'Reference something specific from the conversation', 'Express desire to connect again', 'Sound warm and genuine'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Have exit phrases ready
✅ Watch for exit signals
✅ End on a positive, specific note`,
    keyTakeaways: ['Graceful exits are a skill', 'Reference something specific', 'Leave people wanting more'],
  },
];

export default conversationsLessons;
