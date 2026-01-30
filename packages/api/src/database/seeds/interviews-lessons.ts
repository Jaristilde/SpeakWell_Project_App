/**
 * Job Interviews Category - 10 Micro-Lessons
 */

import { Difficulty, LessonExerciseType } from '../../cms/dto/lesson.dto';

export const interviewsLessons = [
  {
    title: 'Tell Me About Yourself',
    description: 'Nail the most common interview opening',
    category: 'job-interviews',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 1,
    isPublished: true,
    tags: ['interviews', 'introduction', 'TMAY'],

    introductionContent: `
# The Question That Starts It All

"Tell me about yourself" is asked in nearly every interview. And most people answer it poorly.

This is your chance to set the tone. Let's make it count.
    `.trim(),

    learningObjectives: [
      'Structure a compelling 90-second intro',
      'Avoid common TMAY mistakes',
      'Customize for different roles',
    ],

    coreConceptContent: {
      text: `
## The Present-Past-Future Formula

### Present (30 sec)
"Currently, I'm a [role] at [company], where I [key responsibility/achievement]."

### Past (30 sec)
"Before that, I [relevant experience] which taught me [relevant skill]."

### Future (30 sec)
"Now I'm looking to [what you want], which is why [this role] excites me because [connection to opportunity]."

## What NOT to Do

- Recite your resume chronologically
- Start with "Well, I was born in..."
- Share unrelated personal details
- Ramble without structure
- Speak for more than 2 minutes

## Customization Tips

Research the role and weave in:
- Skills they're looking for
- Values they mention
- Challenges you could solve
      `.trim(),
      keyPoints: [
        'Present → Past → Future structure',
        '90 seconds max',
        'End with why THIS role excites you',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'The best "Tell me about yourself" answer:',
          options: [
            'Covers your entire work history in detail',
            'Present → Past → Future, connected to this role',
            'Shares personal hobbies and interests',
            'Reads directly from your resume',
          ],
          correctIndex: 1,
          explanation: 'Present-Past-Future creates a narrative arc that ends with why you\'re perfect for THIS opportunity.',
        },
      ],
    },

    practicePrompt: 'Practice your "Tell me about yourself" answer using Present-Past-Future. Keep it under 90 seconds and end with why you\'re excited about a role you want.',
    practiceGuidelines: [
      'Start with your current situation',
      'Briefly mention relevant past experience',
      'End by connecting to your future goals',
      'Stay under 90 seconds',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

✅ Present → Past → Future
✅ Under 90 seconds
✅ End with connection to this role

**Mantra**: "My intro is my first impression—make it strategic."
    `.trim(),
    keyTakeaways: [
      'Use Present-Past-Future structure',
      'Keep it under 90 seconds',
      'Connect your story to the role',
    ],
  },

  {
    title: 'Answering Behavioral Questions',
    description: 'Master the STAR method for "Tell me about a time..."',
    category: 'job-interviews',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 2,
    isPublished: true,
    tags: ['interviews', 'behavioral', 'STAR'],

    introductionContent: `
# "Tell Me About a Time When..."

Behavioral questions predict future performance based on past behavior. They're the backbone of modern interviews.

Learn the STAR method and never ramble again.
    `.trim(),

    learningObjectives: [
      'Master the STAR response method',
      'Prepare stories for common themes',
      'Quantify results whenever possible',
    ],

    coreConceptContent: {
      text: `
## The STAR Method

**S - Situation** (10%)
Set the context briefly. When, where, what was happening.

**T - Task** (20%)
What was your specific responsibility or challenge?

**A - Action** (50%)
What did YOU do? Be specific. Use "I", not "we".

**R - Result** (20%)
What was the outcome? Quantify if possible.

## Common Behavioral Themes

Prepare stories for:
- Leadership / Initiative
- Conflict / Difficult people
- Failure / Mistake / Learning
- Achievement / Success
- Teamwork / Collaboration
- Problem-solving / Creativity

## Pro Tips

- Keep answers 90-120 seconds
- Use "I" not "we"—they want YOUR contribution
- Quantify results: "increased by 30%", "saved 10 hours/week"
- Have 5-6 strong stories that can flex to different questions
      `.trim(),
      keyPoints: [
        'STAR: Situation, Task, Action, Result',
        'Spend 50% on YOUR actions',
        'Quantify results when possible',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Interview question: "Tell me about a time you had to deal with a difficult coworker."',
        role: 'job candidate',
        prompts: [
          'What\'s your Situation?',
          'What was your Task?',
          'What Actions did you take?',
          'What was the Result?',
        ],
        sampleResponses: [
          'S: "On a project team, one member consistently missed deadlines."',
          'T: "As project lead, I needed to address it without damaging the relationship."',
          'A: "I scheduled a private conversation, listened to their challenges, and we created a realistic timeline together."',
          'R: "They hit every deadline after that, and we delivered the project on time."',
        ],
      },
    },

    practicePrompt: 'Answer this using STAR: "Tell me about a time you achieved something you\'re proud of." Keep it 90-120 seconds.',
    practiceGuidelines: [
      'Brief Situation (2-3 sentences)',
      'Clear Task (your responsibility)',
      'Detailed Actions (what YOU did)',
      'Quantified Result (the outcome)',
    ],
    practiceRecordingDurationSeconds: 120,

    summaryContent: `
## Key Takeaways

✅ STAR: Situation, Task, Action, Result
✅ 50% of time on your Actions
✅ Quantify results

**Mantra**: "I have stories that prove I can do this job."
    `.trim(),
    keyTakeaways: [
      'STAR structures behavioral answers',
      'Focus on YOUR specific actions',
      'Prepare 5-6 flexible stories',
    ],
  },

  {
    title: 'Why Do You Want This Job?',
    description: 'Show genuine interest that stands out',
    category: 'job-interviews',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 3,
    isPublished: true,
    tags: ['interviews', 'motivation', 'research'],

    introductionContent: `
# They Want to Know: Will You Stay?

"Why do you want this job?" is really asking: "If we invest in you, will you stick around?"

Generic answers fail. Specific, researched answers win.
    `.trim(),

    learningObjectives: [
      'Research effectively before interviews',
      'Connect your goals to their needs',
      'Show enthusiasm authentically',
    ],

    coreConceptContent: {
      text: `
## The 3-Part Answer

### 1. Why This Company (30%)
What specifically attracts you to them?
- Mission/values
- Culture/reputation
- Products/impact
- Growth/innovation

### 2. Why This Role (40%)
How does this position fit your goals?
- Skill development
- Career progression
- Interest alignment
- Challenge/growth

### 3. Why You're Right For It (30%)
What do you bring that matches their needs?
- Relevant experience
- Unique skills
- Culture fit

## What NOT to Say

- "I need a job"
- "The salary is good"
- "It's close to my house"
- Generic answers that apply to any company

## Research Before the Interview

- Company website (About, Mission, News)
- LinkedIn (company page, employees)
- Recent news articles
- Glassdoor reviews (with grain of salt)
- Job description details
      `.trim(),
      keyPoints: [
        '3 parts: Company, Role, Fit',
        'Be specific—generic fails',
        'Research is non-negotiable',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which answer is MOST effective?',
          options: [
            '"The benefits package is great."',
            '"I\'ve always wanted to work for a big company."',
            '"Your mission to democratize education aligns with why I became a teacher, and this role lets me scale that impact."',
            '"I think I\'d be good at it."',
          ],
          correctIndex: 2,
          explanation: 'This answer shows research (mission), personal connection, and specific value—it could only apply to THIS company.',
        },
      ],
    },

    practicePrompt: 'Answer "Why do you want this job?" for a role you\'re interested in (or dream role). Include: why this company, why this role, and why you\'re right for it.',
    practiceGuidelines: [
      'Be specific about what attracts you to the company',
      'Connect the role to your goals',
      'Show what you bring that they need',
      'Sound genuinely enthusiastic',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

✅ Company + Role + Fit
✅ Research and be specific
✅ Generic answers fail

**Mantra**: "I know why I want THIS, not just any job."
    `.trim(),
    keyTakeaways: [
      'Answer: Company, Role, and Fit',
      'Specificity shows genuine interest',
      'Research is required preparation',
    ],
  },

  {
    title: 'Discussing Weaknesses',
    description: 'Turn a trap question into an opportunity',
    category: 'job-interviews',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 4,
    isPublished: true,
    tags: ['interviews', 'weaknesses', 'self-awareness'],

    introductionContent: `
# "What's Your Greatest Weakness?"

Everyone dreads this question. But it's actually testing your self-awareness and growth mindset—both critical for any role.

Learn to answer honestly while still making a positive impression.
    `.trim(),

    learningObjectives: [
      'Answer honestly without disqualifying yourself',
      'Show self-awareness and growth mindset',
      'Avoid cliché and dishonest answers',
    ],

    coreConceptContent: {
      text: `
## The Weakness Formula

### 1. Name a Real Weakness
Be honest, but strategic. Choose something:
- Not critical to the core job function
- That you're actively working on
- That doesn't raise red flags

### 2. Show Self-Awareness
Explain HOW this weakness manifests and its impact.

### 3. Demonstrate Action
Describe what you're doing to improve.

## Good Examples

"I tend to over-prepare. I'll research extensively before meetings, which used to mean I'd spend too long on prep. I've learned to set time limits and trust that I'll know enough."

"I'm not naturally strong at public speaking. Recognizing this, I joined Toastmasters last year and have given 12 speeches. I'm much more comfortable now."

## What NOT to Say

- "I'm a perfectionist" (cliché)
- "I work too hard" (humble brag)
- "I have no weaknesses" (arrogant)
- Critical job skills (disqualifying)
      `.trim(),
      keyPoints: [
        'Real weakness + Self-awareness + Action',
        'Avoid clichés like "perfectionist"',
        'Show you\'re actively improving',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which weakness answer is best?',
          options: [
            '"I\'m a perfectionist who works too hard."',
            '"I don\'t have any real weaknesses."',
            '"I struggle with delegation. I\'m working on it by assigning tasks with clear check-ins."',
            '"I\'m terrible with technology and numbers."',
          ],
          correctIndex: 2,
          explanation: 'This shows honest self-awareness and specific action to improve—exactly what interviewers want to see.',
        },
      ],
    },

    practicePrompt: 'Answer "What\'s your greatest weakness?" using the formula: Name it, show awareness, demonstrate action. Be honest but strategic.',
    practiceGuidelines: [
      'Choose a real weakness (not a fake one)',
      'Explain how it shows up',
      'Share specific steps you\'re taking to improve',
      'Keep it under 60 seconds',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Real weakness + Awareness + Action
✅ Avoid clichés
✅ Show growth mindset

**Mantra**: "Self-awareness is a strength."
    `.trim(),
    keyTakeaways: [
      'Weakness + Awareness + Action',
      'Be honest but strategic',
      'Clichés hurt credibility',
    ],
  },

  {
    title: 'Salary Negotiation',
    description: 'Get paid what you\'re worth',
    category: 'job-interviews',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 5,
    isPublished: true,
    tags: ['interviews', 'salary', 'negotiation'],

    introductionContent: `
# Know Your Worth

Salary negotiation is uncomfortable. But negotiating just once can mean tens of thousands of dollars over your career.

Learn the scripts and strategies that work.
    `.trim(),

    learningObjectives: [
      'Deflect premature salary questions',
      'Anchor effectively when asked',
      'Negotiate beyond just base salary',
    ],

    coreConceptContent: {
      text: `
## When Asked Early in Process

"What are your salary expectations?"

**Deflect**: "I'm focused on finding the right fit. I'm confident we can agree on fair compensation once we establish mutual interest."

**Turn it back**: "I'd love to understand the budget you have for this role."

## When You Must Answer

**Research first**: Know the market range (Glassdoor, Levels.fyi, industry data)

**Give a range**: "Based on my research and experience, I'm targeting $X-$Y."

Tip: Make your bottom number your actual target.

## After Receiving an Offer

**Don't accept immediately**: "Thank you! I'm excited. Can I have 48 hours to review?"

**Counter professionally**: "I'm very excited about this opportunity. Based on my research and experience, I was hoping for closer to $X. Is there flexibility?"

## Beyond Base Salary

Negotiate:
- Signing bonus
- Remote work days
- Start date
- Title
- Performance review timing
- PTO / vacation
      `.trim(),
      keyPoints: [
        'Deflect early salary questions',
        'Research before you answer',
        'Negotiate more than just base salary',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Interviewer: "What salary are you looking for?"',
        role: 'candidate in interview',
        prompts: [
          'How would you deflect if it\'s too early?',
          'How would you answer if you must?',
        ],
        sampleResponses: [
          '"I\'m flexible and more focused on fit right now. What\'s the range budgeted for this role?"',
          '"Based on my research for this role and market, I\'m targeting $85,000-$95,000, depending on total compensation."',
        ],
      },
    },

    practicePrompt: 'Practice responding to "What are your salary expectations?" First deflect, then give a researched answer with a range.',
    practiceGuidelines: [
      'First, practice a professional deflection',
      'Then, practice giving a range',
      'Sound confident, not apologetic',
      'Keep answers concise',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Deflect early questions
✅ Research before negotiating
✅ Consider total compensation, not just salary

**Mantra**: "I advocate for my worth."
    `.trim(),
    keyTakeaways: [
      'Deflect premature salary questions',
      'Always research market rates first',
      'Negotiate total compensation',
    ],
  },

  {
    title: 'Questions to Ask the Interviewer',
    description: 'Stand out by asking great questions',
    category: 'job-interviews',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 6,
    isPublished: true,
    tags: ['interviews', 'questions', 'research'],

    introductionContent: `
# "Do You Have Any Questions?"

This isn't a formality—it's your chance to interview THEM and show you're strategic.

The questions you ask reveal as much about you as your answers.
    `.trim(),

    learningObjectives: [
      'Ask questions that impress',
      'Avoid questions that hurt you',
      'Gather information you actually need',
    ],

    coreConceptContent: {
      text: `
## Great Questions to Ask

### About the Role
- "What does success look like in the first 90 days?"
- "What are the biggest challenges someone in this role faces?"
- "How is performance measured?"

### About the Team/Culture
- "How would you describe the team dynamics?"
- "What do you enjoy most about working here?"
- "How does the team handle disagreements?"

### About Growth
- "What learning opportunities are available?"
- "Where have people in this role progressed to?"
- "How does the company support professional development?"

### Strategic Questions
- "What's the company's biggest priority this year?"
- "How does this role contribute to that goal?"

## Questions to AVOID

- "What does the company do?" (shows no research)
- "How soon can I take vacation?"
- "What's the salary/benefits?" (too early)
- "Did I get the job?"
- Questions easily answered on their website
      `.trim(),
      keyPoints: [
        'Prepare 3-5 thoughtful questions',
        'Ask about success, challenges, and growth',
        'Avoid questions that show no research',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'Which question is BEST to ask an interviewer?',
          options: [
            '"What does the company do?"',
            '"What does success look like in this role in the first 90 days?"',
            '"How much vacation do I get?"',
            '"When will I hear back?"',
          ],
          correctIndex: 1,
          explanation: 'This shows you\'re thinking about performance and success, which signals commitment and strategic thinking.',
        },
      ],
    },

    practicePrompt: 'Practice asking two thoughtful questions as if you\'re at the end of an interview. Deliver them naturally, not like you\'re reading from a list.',
    practiceGuidelines: [
      'Ask about success metrics or challenges',
      'Ask about team culture or growth',
      'Sound genuinely curious, not scripted',
      'Keep it conversational',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ Great questions show strategic thinking
✅ Ask about success, challenges, growth
✅ Never ask what you could Google

**Mantra**: "My questions show how I think."
    `.trim(),
    keyTakeaways: [
      'Prepare 3-5 strong questions',
      'Focus on success, challenges, growth',
      'Avoid easily Googled questions',
    ],
  },

  {
    title: 'Virtual Interview Success',
    description: 'Master the technical and personal sides',
    category: 'job-interviews',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 7,
    isPublished: true,
    tags: ['interviews', 'virtual', 'video'],

    introductionContent: `
# The Virtual Interview Era

Most first-round interviews are now virtual. Technical issues and awkward backgrounds have disqualified candidates.

Don't let logistics cost you the job.
    `.trim(),

    learningObjectives: [
      'Optimize your virtual setup',
      'Test technology thoroughly',
      'Maintain connection through screen',
    ],

    coreConceptContent: {
      text: `
## The Technical Checklist

### Before the Day
- Test your camera, mic, and internet
- Download any required software
- Have a backup plan (phone hotspot, different device)

### Your Setup
- Camera at eye level
- Light facing you (not behind)
- Clean, professional background
- Phone on silent, notifications off

### During Interview
- Look at camera (not screen) for key moments
- Dress professionally—full outfit
- Have notes nearby (not obvious)
- Keep water within reach

## Connection Tips

### Energy
Increase energy 50%. Screens flatten personality.

### Eye Contact
Look directly at camera when speaking, not at their video feed.

### Pauses
Add slightly longer pauses—there's often audio lag.

### Engage
Nod, smile, react visibly. They need visual feedback.
      `.trim(),
      keyPoints: [
        'Test all technology beforehand',
        'Look at camera, not screen',
        'Increase energy for virtual presence',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'For virtual interview eye contact, you should:',
          options: [
            'Look at the interviewer\'s face on your screen',
            'Look directly at your camera lens',
            'Look at your own video feed',
            'Avoid looking at the screen',
          ],
          correctIndex: 1,
          explanation: 'Looking at the camera creates the appearance of eye contact for the viewer, even though it feels unnatural to you.',
        },
      ],
    },

    practicePrompt: 'Practice introducing yourself as if starting a virtual interview. Look at your camera, not your screen. Bring extra energy.',
    practiceGuidelines: [
      'Test your camera and lighting first',
      'Look directly at your camera when speaking',
      'Smile and bring 50% more energy than feels natural',
      'Speak clearly with slight pauses',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Tech testing is non-negotiable
✅ Camera = eye contact
✅ Energy x 1.5 on screen

**Mantra**: "I control my environment."
    `.trim(),
    keyTakeaways: [
      'Test technology thoroughly',
      'Look at camera for eye contact',
      'Increase energy for screen presence',
    ],
  },

  {
    title: 'Handling Rejection Gracefully',
    description: 'Turn "no" into future opportunities',
    category: 'job-interviews',
    difficulty: Difficulty.INTERMEDIATE,
    durationMinutes: 15,
    order: 8,
    isPublished: true,
    tags: ['interviews', 'rejection', 'resilience'],

    introductionContent: `
# Rejection Isn't the End

Most candidates never hear back—or hear "no." How you respond can turn rejection into a future opportunity.

Professionals get rejected. Champions respond well.
    `.trim(),

    learningObjectives: [
      'Respond professionally to rejection',
      'Ask for feedback constructively',
      'Maintain relationships for future opportunities',
    ],

    coreConceptContent: {
      text: `
## Responding to Rejection

### The Gracious Response

"Thank you for letting me know. I enjoyed learning about [Company] and meeting [names]. If future opportunities arise that match my background, I'd welcome the chance to reconnect."

### Asking for Feedback

"I appreciate your time in the process. If you're open to it, I'd welcome any feedback on how I could improve for future opportunities."

Note: Many won't give feedback, but some will.

## The Long Game

### Stay Connected
- Connect on LinkedIn
- Occasionally engage with their content
- Send congratulations on company news

### Things Change
- The hired candidate might not work out
- New roles open up
- Hiring managers move companies

### Statistics
Studies show 15-20% of rejected candidates eventually get hired by the same company.
      `.trim(),
      keyPoints: [
        'Respond graciously—always',
        'Ask for feedback professionally',
        'Stay connected for future opportunities',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'You receive: "We\'ve decided to move forward with another candidate."',
        role: 'rejected candidate responding',
        prompts: [
          'What would your response email say?',
          'How would you ask for feedback?',
        ],
        sampleResponses: [
          '"Thank you for letting me know. I appreciated the opportunity to interview and learn about the team."',
          '"If you have time, I\'d value any feedback on how I might improve for future opportunities."',
        ],
      },
    },

    practicePrompt: 'Practice what you would SAY if someone called to tell you that you didn\'t get the job. Respond graciously and ask for feedback.',
    practiceGuidelines: [
      'Thank them for the opportunity',
      'Express continued interest in the company',
      'Ask for feedback politely',
      'Sound positive, not bitter',
    ],
    practiceRecordingDurationSeconds: 45,

    summaryContent: `
## Key Takeaways

✅ Gracious responses preserve relationships
✅ Ask for feedback professionally
✅ Stay connected—things change

**Mantra**: "This 'no' might become a future 'yes'."
    `.trim(),
    keyTakeaways: [
      'Always respond graciously',
      'Ask for feedback constructively',
      'Maintain relationships for the future',
    ],
  },

  {
    title: 'Case Interview Basics',
    description: 'Structure your thinking under pressure',
    category: 'job-interviews',
    difficulty: Difficulty.ADVANCED,
    durationMinutes: 15,
    order: 9,
    isPublished: true,
    tags: ['interviews', 'case', 'consulting'],

    introductionContent: `
# Thinking Out Loud

Case interviews test how you think, not what you know. Consulting, strategy, and many tech roles use them.

Learn the frameworks that help you structure any problem.
    `.trim(),

    learningObjectives: [
      'Understand case interview structure',
      'Use frameworks to organize thinking',
      'Practice thinking out loud',
    ],

    coreConceptContent: {
      text: `
## The Case Interview Process

1. **Listen** - Understand the question fully
2. **Clarify** - Ask questions to narrow scope
3. **Structure** - Present your framework
4. **Analyze** - Work through systematically
5. **Conclude** - Summarize and recommend

## Basic Frameworks

### Profitability
Revenue - Costs = Profit
- Revenue: Price × Volume
- Costs: Fixed vs. Variable

### Market Entry
- Market attractiveness (size, growth)
- Company capabilities (fit, resources)
- Competitive landscape
- Economics (can we make money?)

### General Problem Solving
- Internal vs. External factors
- Quantitative vs. Qualitative

## Key Tips

- **Think out loud** - They want to see your reasoning
- **Ask clarifying questions** - Shows rigor
- **Use round numbers** - Easier mental math
- **Structure, don't memorize** - Adapt to the problem
      `.trim(),
      keyPoints: [
        'Case interviews test thinking process',
        'Use frameworks to structure approach',
        'Think out loud—they want to see your reasoning',
      ],
    },

    exerciseType: LessonExerciseType.SCENARIO,
    exerciseContent: {
      scenario: {
        situation: 'Case: "A coffee shop chain\'s profits are declining. How would you approach this?"',
        role: 'candidate in case interview',
        prompts: [
          'What clarifying questions would you ask?',
          'What framework would you use?',
        ],
        sampleResponses: [
          '"What timeframe? Are all locations affected equally? Any recent changes?"',
          '"I\'d look at Revenue (price × volume) and Costs (fixed vs variable) to isolate the driver."',
        ],
      },
    },

    practicePrompt: 'Practice structuring this problem out loud: "A retailer wants to decide whether to launch an online store. How would you approach this?" Think out loud.',
    practiceGuidelines: [
      'Start by clarifying the question',
      'Present a framework before diving in',
      'Think out loud—verbalize your reasoning',
      'End with a summary of your approach',
    ],
    practiceRecordingDurationSeconds: 90,

    summaryContent: `
## Key Takeaways

✅ Structure your thinking with frameworks
✅ Think out loud—show your reasoning
✅ Ask clarifying questions

**Mantra**: "They're hiring my thinking, not my answers."
    `.trim(),
    keyTakeaways: [
      'Use frameworks to structure problems',
      'Think out loud to show reasoning',
      'Clarify before diving in',
    ],
  },

  {
    title: 'Following Up After Interviews',
    description: 'Stand out in the crucial 24-48 hours',
    category: 'job-interviews',
    difficulty: Difficulty.BEGINNER,
    durationMinutes: 15,
    order: 10,
    isPublished: true,
    tags: ['interviews', 'follow-up', 'thank-you'],

    introductionContent: `
# The Follow-Up Advantage

The interview ends. But your impression doesn't. A great follow-up can be the tiebreaker between equally qualified candidates.

Learn the timing, content, and tone that works.
    `.trim(),

    learningObjectives: [
      'Send effective thank-you notes',
      'Follow up without being pushy',
      'Handle silence professionally',
    ],

    coreConceptContent: {
      text: `
## The Thank-You Note

### Timing
Send within 24 hours. Same day is ideal.

### Format
Email is standard. Handwritten is memorable but slower.

### Content
1. Thank them for their time
2. Reference something specific from conversation
3. Reiterate your interest and fit
4. End with forward momentum

### Example

"Hi [Name],

Thank you for taking the time to speak with me today about the [Role] position. I especially enjoyed our discussion about [specific topic]—your insight on [detail] resonated with my experience at [example].

Our conversation reinforced my enthusiasm for this opportunity. I'm confident my background in [relevant skill] would help achieve [goal they mentioned].

I look forward to the next steps. Please let me know if you need any additional information.

Best regards,
[Your name]"

## Following Up on Timeline

If they said you'd hear by Friday and it's Monday:
"Hi [Name], I wanted to check in on the timeline for next steps. I remain very interested in the opportunity. Please let me know if you need anything from me."
      `.trim(),
      keyPoints: [
        'Thank-you note within 24 hours',
        'Reference something specific from conversation',
        'Follow up once if timeline passes',
      ],
    },

    exerciseType: LessonExerciseType.QUIZ,
    exerciseContent: {
      questions: [
        {
          question: 'The best thank-you note includes:',
          options: [
            'Generic thanks and nothing specific',
            'A request for the salary range',
            'A specific reference to the conversation and reiterated interest',
            'Multiple paragraphs about your qualifications',
          ],
          correctIndex: 2,
          explanation: 'Specific references show you were engaged, and reiterated interest confirms you\'re still excited about the role.',
        },
      ],
    },

    practicePrompt: 'Practice VERBALLY delivering what you would write in a follow-up email. Thank them, reference something specific, and reiterate your interest.',
    practiceGuidelines: [
      'Keep it concise (would fit in a short email)',
      'Reference something specific from an imagined interview',
      'Express continued enthusiasm',
      'Sound professional but warm',
    ],
    practiceRecordingDurationSeconds: 60,

    summaryContent: `
## Key Takeaways

✅ Send thank-you within 24 hours
✅ Be specific—generic fails
✅ Follow up once if timeline passes

**Mantra**: "The interview continues until I get a yes or no."
    `.trim(),
    keyTakeaways: [
      'Thank-you note within 24 hours',
      'Reference specific conversation details',
      'Follow up once if timeline passes',
    ],
  },
];

export default interviewsLessons;
