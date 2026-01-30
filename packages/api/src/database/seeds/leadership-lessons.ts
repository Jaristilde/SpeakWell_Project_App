/**
 * Leadership Category - 10 Micro-Lessons
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';

export const leadershipLessons = [
  {
    title: 'Speaking with Authority',
    description: 'Command respect through voice and presence',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 1,
    isPublished: true,
    tags: ['leadership', 'authority', 'presence'],

    introductionContent: `# Authority Is Projected, Not Claimed

You don't earn authority by announcing it. You earn it through how you communicate.

Learn the vocal and verbal patterns that command respect.`,

    learningObjectives: [
      'Use downward inflections for statements',
      'Eliminate weak language patterns',
      'Project calm confidence under pressure',
    ],

    coreConceptContent: {
      text: `## Vocal Authority

### Downward Inflections
Statements should end going DOWN, not up.
- "We should proceed." ↓ (confident)
- "We should proceed?" ↑ (uncertain)

### Pace and Pause
- Speak slower than feels natural
- Pause before important points
- Resist filling silence

### Pitch
Find your natural pitch (hum to find it). Lower = more authority.

## Language Patterns

### Replace Weak with Strong
- "I think maybe..." → "I recommend..."
- "Does that make sense?" → "Questions?"
- "Just a quick idea" → "Here's my recommendation"
- "Sorry to bother you" → "I need a moment"

### The Leadership Pause
When asked a question, pause before answering. It shows thoughtfulness, not uncertainty.`,
      keyPoints: [
        'Downward inflections = authority',
        'Pause with confidence, not anxiety',
        'Replace weak language patterns',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to tell your team about a difficult decision.',
        role: 'leader communicating a decision',
        prompts: ['What would weak language sound like?', 'What would authoritative language sound like?'],
        sampleResponses: [
          'Weak: "So, um, I think we might need to maybe push back the deadline?"',
          'Strong: "We\'re pushing the deadline to March 15. Here\'s why, and here\'s our path forward."',
        ],
      },
    },

    practicePrompt: 'Practice announcing a decision with authority: "We\'re changing our approach to [X]." Use downward inflection, measured pace, and confident pauses.',
    practiceGuidelines: ['End statements going down, not up', 'Pause after key points', 'No hedging language', 'Sound certain'],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `## Key Takeaways

✅ Downward inflections signal confidence
✅ Strategic pauses show thoughtfulness
✅ Strong language replaces weak hedging`,
    keyTakeaways: ['Downward inflections for statements', 'Pause with confidence', 'Eliminate weak language'],
  },

  {
    title: 'Delivering Feedback',
    description: 'Give feedback that improves performance',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 2,
    isPublished: true,
    tags: ['leadership', 'feedback', 'coaching'],

    introductionContent: `# Feedback Is a Gift

Most people avoid giving feedback. Great leaders do it regularly and well.

Learn to deliver feedback that motivates improvement.`,

    learningObjectives: [
      'Use the SBI feedback model',
      'Balance positive and constructive feedback',
      'Make feedback specific and actionable',
    ],

    coreConceptContent: {
      text: `## The SBI Model

**S - Situation**: When and where
**B - Behavior**: What you observed (facts, not judgments)
**I - Impact**: The effect it had

### Example
"In yesterday's client meeting (S), when you interrupted Sarah twice (B), she stopped contributing ideas for the rest of the meeting (I)."

## Positive Feedback
Use SBI for praise too:
"In your presentation (S), the way you handled that tough question calmly (B) showed the client we're prepared for anything (I)."

## Making It Actionable
Add: "Going forward, could you try [specific behavior]?"

## The Feedback Sandwich?
Research shows the "sandwich" (positive-negative-positive) dilutes the message. Instead, be direct but kind.`,
      keyPoints: [
        'SBI: Situation, Behavior, Impact',
        'Be specific—vague feedback doesn\'t help',
        'Skip the sandwich—be direct but kind',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Which feedback is most effective?',
        options: [
          '"You need to be more professional."',
          '"In the meeting, arriving 10 minutes late disrupted the flow and we had to restart."',
          '"You\'re always late."',
          '"Good job overall, but try harder."',
        ],
        correctIndex: 1,
        explanation: 'This uses SBI: specific situation, observable behavior, and clear impact—making it actionable.',
      }],
    },

    practicePrompt: 'Practice giving SBI feedback: Someone on your team submitted a report late. Use Situation, Behavior, Impact, then add a forward-looking request.',
    practiceGuidelines: ['State the specific situation', 'Describe observable behavior only', 'Explain the impact', 'End with a constructive request'],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `## Key Takeaways

✅ SBI: Situation, Behavior, Impact
✅ Specific and actionable
✅ Direct is kinder than vague`,
    keyTakeaways: ['Use SBI model', 'Be specific and actionable', 'Direct feedback is kind feedback'],
  },

  {
    title: 'Running Effective Meetings',
    description: 'Lead meetings people actually want to attend',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 3,
    isPublished: true,
    tags: ['leadership', 'meetings', 'facilitation'],

    introductionContent: `# Meetings Don't Have to Suck

Bad meetings waste billions of hours yearly. Good meetings energize teams.

Learn to run meetings that respect time and achieve results.`,

    learningObjectives: [
      'Structure meetings for outcomes',
      'Facilitate discussion effectively',
      'End with clear action items',
    ],

    coreConceptContent: {
      text: `## Before the Meeting

### The 3 Questions
1. What's the PURPOSE? (Inform, Decide, Create)
2. Who NEEDS to be there?
3. What OUTCOME do we need?

No clear answers? Maybe don't have the meeting.

## During the Meeting

### Opening (2 min)
"We're here to [purpose]. By the end, we need [outcome]. Here's our agenda."

### Managing Discussion
- "Let's hear from everyone on this"
- "I want to make sure we stay on track"
- "Let's take that offline"
- "What haven't we considered?"

### Closing (5 min)
- Summarize decisions
- Assign actions with owners and deadlines
- State next steps

## The Meeting Leader's Job
- Start and end on time (always)
- Ensure everyone is heard
- Keep discussion focused
- Drive toward decision/action`,
      keyPoints: [
        'Purpose + Attendees + Outcome before scheduling',
        'Open with purpose, close with actions',
        'Start and end on time—always',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to open a team meeting about a new project.',
        role: 'meeting facilitator',
        prompts: ['How do you open?', 'How do you close?'],
        sampleResponses: [
          'Open: "We\'re here to align on our Q2 project priorities. By end of this 30 minutes, we need to agree on our top 3 focus areas."',
          'Close: "So we\'ve agreed on X, Y, Z. Sarah owns X by Friday, Mike owns Y by Monday. Any questions? Great, we\'re done."',
        ],
      },
    },

    practicePrompt: 'Practice opening and closing a meeting. Open with purpose and outcome, close with decisions and actions.',
    practiceGuidelines: ['State clear purpose', 'Set expectations for outcome', 'Summarize decisions made', 'Assign actions with owners'],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `## Key Takeaways

✅ Purpose + Attendees + Outcome
✅ Open with agenda, close with actions
✅ Respect time—start and end on time`,
    keyTakeaways: ['Question every meeting\'s necessity', 'Clear opening and closing', 'Actions need owners and deadlines'],
  },

  {
    title: 'Motivating Your Team',
    description: 'Inspire action through communication',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 4,
    isPublished: true,
    tags: ['leadership', 'motivation', 'inspiration'],

    introductionContent: `# Words That Move People

Leaders don't just assign tasks—they inspire meaning.

Learn to communicate in ways that motivate lasting engagement.`,

    learningObjectives: [
      'Connect work to purpose',
      'Recognize effectively',
      'Communicate through challenges',
    ],

    coreConceptContent: {
      text: `## The Why Behind the What

People are motivated by PURPOSE, not just tasks.

**Task-focused**: "Complete the quarterly report by Friday."
**Purpose-focused**: "The quarterly report helps leadership make decisions that affect our team's future. Your accuracy matters."

## Recognition That Works

### Be Specific
"Great job" → "The way you handled that difficult client saved the account."

### Be Timely
Recognize in the moment, not weeks later.

### Be Public (when appropriate)
Public recognition amplifies impact.

## Communicating Through Challenges

### Acknowledge Reality
"This is hard. I won't pretend otherwise."

### Express Confidence
"I believe we can do this because..."

### Show the Path
"Here's how we'll get through this..."

### Invite Input
"I need your ideas on how we tackle this together."`,
      keyPoints: [
        'Connect work to meaning',
        'Specific recognition > generic praise',
        'Acknowledge difficulty, express confidence',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Best way to motivate during a difficult project?',
        options: [
          '"Just get it done."',
          '"I know this is hard. I believe we can do it because of how we handled X. Here\'s our path forward."',
          '"Everything\'s fine, don\'t worry."',
          '"If you can\'t handle it, I\'ll find someone who can."',
        ],
        correctIndex: 1,
        explanation: 'This acknowledges reality, expresses genuine confidence with evidence, and provides direction.',
      }],
    },

    practicePrompt: 'Practice motivating a team facing a tight deadline. Acknowledge the challenge, express confidence, and show the path forward.',
    practiceGuidelines: ['Acknowledge the difficulty honestly', 'Express genuine confidence', 'Reference past successes', 'Show clear path forward'],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `## Key Takeaways

✅ Connect work to purpose
✅ Specific, timely recognition
✅ Acknowledge + Confidence + Path`,
    keyTakeaways: ['Purpose motivates more than tasks', 'Recognition should be specific and timely', 'Acknowledge challenges honestly'],
  },

  {
    title: 'Delegating Effectively',
    description: 'Assign work that develops others',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 5,
    isPublished: true,
    tags: ['leadership', 'delegation', 'development'],

    introductionContent: `# Delegation Is Development

Poor delegation dumps tasks. Great delegation develops people.

Learn to delegate in ways that grow your team's capabilities.`,

    learningObjectives: [
      'Match tasks to development needs',
      'Set clear expectations',
      'Balance autonomy and support',
    ],

    coreConceptContent: {
      text: `## The Delegation Conversation

### 1. Context
Why this matters and why them
"I'm asking you because this will stretch your [skill]."

### 2. Outcome
What success looks like
"I need [specific deliverable] by [date]."

### 3. Boundaries
What's fixed vs. flexible
"The budget is fixed, but approach is up to you."

### 4. Support
What help is available
"Check in with me Wednesday, and Sarah can help with data."

### 5. Authority
What decisions they can make
"You have authority to approve up to $500."

## Common Mistakes
- Delegating without context
- Micromanaging the process
- Not checking in until the deadline
- Taking work back at first struggle`,
      keyPoints: [
        'Context + Outcome + Boundaries + Support + Authority',
        'Delegate outcomes, not methods',
        'Balance autonomy with appropriate check-ins',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You need to delegate a client presentation to a team member.',
        role: 'leader delegating',
        prompts: ['How do you provide context?', 'How do you set expectations?'],
        sampleResponses: [
          'Context: "I\'d like you to lead the client presentation Thursday. This is a growth opportunity for you."',
          'Expectations: "I need a 20-minute presentation covering X, Y, Z. Let\'s review a draft together Tuesday."',
        ],
      },
    },

    practicePrompt: 'Practice delegating a project using all 5 elements: Context, Outcome, Boundaries, Support, Authority.',
    practiceGuidelines: ['Explain why this task and why them', 'Be specific about the outcome', 'Clarify what\'s flexible', 'Offer support and define authority'],
    practiceRecordingDurationSeconds: 75,

    summaryContent: `## Key Takeaways

✅ 5 elements of effective delegation
✅ Delegate outcomes, not methods
✅ Delegation develops people`,
    keyTakeaways: ['Context + Outcome + Boundaries + Support + Authority', 'Let them own the how', 'Check in without micromanaging'],
  },

  {
    title: 'Having Difficult Conversations',
    description: 'Address performance issues constructively',
    category: 'leadership',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 6,
    isPublished: true,
    tags: ['leadership', 'difficult', 'performance'],

    introductionContent: `# The Conversations We Avoid

The conversations we avoid become the problems we create.

Learn to have difficult conversations that preserve relationships.`,

    learningObjectives: [
      'Prepare for difficult conversations',
      'Use the DEAR framework',
      'Handle emotional responses',
    ],

    coreConceptContent: {
      text: `## The DEAR Framework

**D - Describe**: State facts without judgment
"I've noticed the last three reports were submitted late."

**E - Express**: Share your concern
"I'm concerned because it affects the team's workflow."

**A - Ask**: Invite their perspective
"Help me understand what's happening."

**R - Request**: State what you need
"Going forward, I need reports by Thursday EOD."

## Preparation

Before the conversation:
- What are the facts?
- What's the impact?
- What outcome do I need?
- What might they say?

## Handling Emotion

If they get defensive:
- "I can see this is frustrating. Take a moment."
- "I'm not here to blame—I want to solve this together."
- "What do you need from me to make this work?"`,
      keyPoints: [
        'DEAR: Describe, Express, Ask, Request',
        'Prepare facts and desired outcome',
        'Stay calm when they get emotional',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'A team member has been consistently negative in meetings.',
        role: 'leader addressing the behavior',
        prompts: ['How do you Describe?', 'How do you Ask?', 'How do you Request?'],
        sampleResponses: [
          'Describe: "In the last few meetings, I noticed responses like \'that won\'t work\' to several ideas."',
          'Ask: "Help me understand what\'s driving that. Is there something I should know?"',
          'Request: "I need us to approach ideas constructively—challenges with solutions."',
        ],
      },
    },

    practicePrompt: 'Practice addressing a performance issue using DEAR: Describe, Express, Ask, Request. Stay factual and constructive.',
    practiceGuidelines: ['State observable facts only', 'Express concern, not frustration', 'Genuinely ask for their perspective', 'Make a clear request'],
    practiceRecordingDurationSeconds: 75,

    summaryContent: `## Key Takeaways

✅ DEAR: Describe, Express, Ask, Request
✅ Prepare with facts and outcomes
✅ Stay calm through emotion`,
    keyTakeaways: ['Use the DEAR framework', 'Facts, not judgments', 'Ask before telling'],
  },

  {
    title: 'Communicating Change',
    description: 'Lead teams through uncertainty',
    category: 'leadership',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 7,
    isPublished: true,
    tags: ['leadership', 'change', 'communication'],

    introductionContent: `# Change Fails on Communication

Most change initiatives fail—not because of bad ideas, but bad communication.

Learn to communicate change in ways that build buy-in.`,

    learningObjectives: [
      'Use the change communication framework',
      'Address resistance constructively',
      'Maintain trust through uncertainty',
    ],

    coreConceptContent: {
      text: `## The Change Communication Framework

### 1. Why Change?
What's broken or at risk if we don't change?
"We're losing market share because..."

### 2. Why Now?
What makes this urgent?
"If we wait, we'll face..."

### 3. What's Changing?
Be specific about what will be different
"We're moving from X to Y..."

### 4. What's NOT Changing?
Anchor on stability
"What stays the same: our values, our commitment to..."

### 5. What's the Path?
How will we get there?
"Here's the timeline and how we'll support you..."

## Addressing Resistance

- "I understand this is unsettling. Let me address concerns."
- "What questions do you have?"
- "What would help you feel better about this?"

## The #1 Rule
Don't pretend to have answers you don't have.
"I don't know yet, but I'll find out and share by [date]."`,
      keyPoints: [
        'Why + Why Now + What + What\'s Not + Path',
        'Acknowledge concerns directly',
        'Honesty builds trust through uncertainty',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'When communicating change, you should:',
        options: [
          'Only share what\'s changing, not why',
          'Pretend to have all the answers',
          'Address why the change, what\'s changing, and what\'s staying the same',
          'Avoid questions to prevent resistance',
        ],
        correctIndex: 2,
        explanation: 'Complete communication includes the why, the what, and anchors on what\'s stable.',
      }],
    },

    practicePrompt: 'Practice announcing a change to your team (e.g., new process, reorg). Cover: Why, Why Now, What\'s Changing, What\'s Not, and Path Forward.',
    practiceGuidelines: ['Explain the why clearly', 'Create urgency with why now', 'Be specific about changes', 'Anchor on what stays stable'],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `## Key Takeaways

✅ Complete framework: Why, Why Now, What, What's Not, Path
✅ Acknowledge concerns openly
✅ Honesty > false confidence`,
    keyTakeaways: ['Cover all 5 elements', 'Anchor on stability', 'Admit what you don\'t know'],
  },

  {
    title: 'Executive Presence',
    description: 'Project leadership before you speak',
    category: 'leadership',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 8,
    isPublished: true,
    tags: ['leadership', 'presence', 'gravitas'],

    introductionContent: `# Presence Before Words

Executive presence is the impression you make before saying anything.

Learn to project leadership through your physical and vocal presence.`,

    learningObjectives: [
      'Master the physical elements of presence',
      'Develop vocal gravitas',
      'Enter rooms with intention',
    ],

    coreConceptContent: {
      text: `## Physical Presence

### The Power Position
- Feet firmly planted
- Shoulders back, chest open
- Hands visible (not in pockets)
- Head level, chin neutral

### Entering a Room
- Pause at the doorway (1 second)
- Scan the room with purpose
- Walk with intention, not hurry
- Greet with eye contact and confidence

## Vocal Presence

### The 3 Ps
**Pace**: Slower than feels natural
**Pitch**: Lower end of your range
**Pauses**: Strategic silence for emphasis

### Words to Eliminate
- "Just" ("I just wanted to...")
- "Actually" ("I actually think...")
- "Kind of" / "Sort of"
- "Does that make sense?"

## The Leadership Pause

When asked a question:
1. Pause (2-3 seconds)
2. Answer decisively
3. Stop talking

This projects thoughtfulness and confidence.`,
      keyPoints: [
        'Physical: grounded, open, intentional',
        'Vocal: slow, low, pauses',
        'Eliminate diminishing words',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'Which demonstrates strongest executive presence?',
        options: [
          '"I just wanted to quickly share a thought, if that\'s okay?"',
          'Walking quickly into a room while looking at your phone',
          'Pausing, answering decisively, then stopping',
          '"Does that make sense? I hope I explained it okay."',
        ],
        correctIndex: 2,
        explanation: 'The pause-answer-stop pattern projects confidence and thoughtfulness.',
      }],
    },

    practicePrompt: 'Practice answering a question with executive presence: "What should we do about [issue]?" Pause, answer decisively, stop.',
    practiceGuidelines: ['Pause before answering', 'Answer with confidence', 'No hedging language', 'Stop when you\'ve made your point'],
    practiceRecordingDurationSeconds: 30,

    summaryContent: `## Key Takeaways

✅ Physical: grounded and intentional
✅ Vocal: slow, low, with pauses
✅ Pause → Answer → Stop`,
    keyTakeaways: ['Presence is projected physically', 'Eliminate diminishing language', 'The leadership pause works'],
  },

  {
    title: 'Building Trust Through Communication',
    description: 'Create psychological safety on your team',
    category: 'leadership',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 9,
    isPublished: true,
    tags: ['leadership', 'trust', 'safety'],

    introductionContent: `# Trust Is Built in Small Moments

Trust isn't built in big gestures. It's built in daily communication.

Learn the communication patterns that create psychological safety.`,

    learningObjectives: [
      'Demonstrate vulnerability appropriately',
      'Respond to mistakes constructively',
      'Create space for honest dialogue',
    ],

    coreConceptContent: {
      text: `## Trust-Building Behaviors

### Admit What You Don't Know
"I'm not sure about this. What do you think?"

### Share Your Mistakes
"I made a mistake last week. Here's what I learned..."

### Ask Before Telling
"Before I share my view, I'd like to hear yours."

### Respond to Bad News Well
"Thanks for telling me. Let's figure out what to do."

## Creating Psychological Safety

### In Meetings
- "There are no bad ideas right now"
- "I want to hear dissenting views"
- "What am I missing?"

### When They Make Mistakes
- "What can we learn from this?"
- NOT "How did you let this happen?"

### Following Through
Say what you'll do, do what you say.
Nothing destroys trust faster than broken promises.`,
      keyPoints: [
        'Vulnerability builds trust',
        'How you respond to bad news matters',
        'Consistency between words and actions',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'A team member comes to you with bad news about a missed deadline.',
        role: 'leader responding',
        prompts: ['What would break trust?', 'What would build trust?'],
        sampleResponses: [
          'Break trust: "How could you let this happen? I\'m so disappointed."',
          'Build trust: "Thanks for telling me directly. Let\'s figure out how to address it and what we learn for next time."',
        ],
      },
    },

    practicePrompt: 'Practice responding to a team member who admits they made a mistake. Respond in a way that builds trust and psychological safety.',
    practiceGuidelines: ['Thank them for telling you', 'Focus on solving, not blaming', 'Ask what we can learn', 'Support their growth'],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `## Key Takeaways

✅ Vulnerability builds trust
✅ Respond to mistakes constructively
✅ Consistency between words and actions`,
    keyTakeaways: ['Admit what you don\'t know', 'Respond well to bad news', 'Do what you say you\'ll do'],
  },

  {
    title: 'Leading Through Crisis',
    description: 'Communicate when stakes are highest',
    category: 'leadership',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 10,
    isPublished: true,
    tags: ['leadership', 'crisis', 'resilience'],

    introductionContent: `# When It All Goes Wrong

In crisis, communication matters more than ever. Silence creates fear. Poor communication creates panic.

Learn to lead with clarity when stakes are highest.`,

    learningObjectives: [
      'Communicate quickly and honestly in crisis',
      'Balance transparency with stability',
      'Maintain trust through uncertainty',
    ],

    coreConceptContent: {
      text: `## Crisis Communication Framework

### 1. Acknowledge Immediately
Don't hide or delay. Address it.
"We have a situation I need to share with you."

### 2. State What You Know
Be honest about what you know and don't know.
"Here's what we know so far..."

### 3. Share What You're Doing
"Here's what we're doing right now..."

### 4. Commit to Updates
"I'll update you again at [specific time]."

### 5. Express Confidence
"This is hard, but I'm confident in this team."

## Key Principles

### Overcommunicate
In crisis, silence is filled with fear. Communicate more than you think necessary.

### Honesty > Optimism
Don't sugarcoat. People can handle truth better than dishonesty discovered later.

### Calm Is Contagious
Your demeanor sets the tone. Stay composed.`,
      keyPoints: [
        'Acknowledge → Know → Doing → Updates → Confidence',
        'Overcommunicate in crisis',
        'Your calm is contagious',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [{
        question: 'In a crisis, a leader should:',
        options: [
          'Wait until they have all the facts before communicating',
          'Stay positive and downplay concerns',
          'Acknowledge quickly, share what\'s known, and commit to updates',
          'Let others deliver the bad news',
        ],
        correctIndex: 2,
        explanation: 'Quick acknowledgment with honest information and commitment to updates builds trust in crisis.',
      }],
    },

    practicePrompt: 'Practice communicating a crisis to your team: a major client is unhappy. Use: Acknowledge, State What You Know, Share Actions, Commit to Updates.',
    practiceGuidelines: ['Acknowledge directly', 'Be honest about what you know', 'Share what you\'re doing', 'Commit to a specific update time', 'Stay calm'],
    practiceRecordingDurationSeconds: 75,

    summaryContent: `## Key Takeaways

✅ Acknowledge → Know → Doing → Updates → Confidence
✅ Overcommunicate, don\'t go silent
✅ Your calm sets the tone`,
    keyTakeaways: ['Act quickly, communicate honestly', 'Silence breeds fear', 'Calm is contagious'],
  },
];

export default leadershipLessons;
