import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Play, BookOpen } from 'lucide-react';

const lessonsData: Record<string, {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  content: {
    type: 'text' | 'tip' | 'exercise';
    title?: string;
    content: string;
  }[];
}> = {
  '1': {
    id: '1',
    title: 'The Power of Pauses',
    description: 'Learn how strategic pauses can make your speech more impactful',
    duration: '5 min',
    category: 'Delivery',
    content: [
      {
        type: 'text',
        content: 'Pauses are one of the most powerful tools in public speaking. They give your audience time to absorb what you\'ve said and create anticipation for what\'s coming next.'
      },
      {
        type: 'tip',
        title: 'The 2-Second Rule',
        content: 'After making an important point, pause for at least 2 seconds. This feels longer than you think, but it\'s incredibly effective.'
      },
      {
        type: 'text',
        content: 'Great speakers like Barack Obama and Steve Jobs used pauses masterfully. Watch their speeches and notice how they use silence to emphasize key points.'
      },
      {
        type: 'exercise',
        title: 'Practice Exercise',
        content: 'Read a paragraph aloud, inserting a 2-second pause after each sentence. Notice how it changes the impact of your words.'
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Eliminating Filler Words',
    description: 'Techniques to reduce "um", "uh", and other filler words',
    duration: '7 min',
    category: 'Fluency',
    content: [
      {
        type: 'text',
        content: 'Filler words like "um," "uh," "like," and "you know" can undermine your credibility and distract from your message. The good news? They can be eliminated with practice.'
      },
      {
        type: 'tip',
        title: 'Awareness First',
        content: 'Record yourself speaking and count your filler words. Awareness is the first step to change.'
      },
      {
        type: 'text',
        content: 'Replace filler words with pauses. When you feel the urge to say "um," simply pause instead. This makes you sound more thoughtful and confident.'
      },
      {
        type: 'exercise',
        title: 'The Pause Challenge',
        content: 'Speak for 60 seconds about any topic. Every time you feel the urge to use a filler word, pause instead. Count your pauses at the end.'
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Confident Body Language',
    description: 'How your posture and gestures affect your message',
    duration: '6 min',
    category: 'Presence',
    content: [
      {
        type: 'text',
        content: 'Your body speaks before you do. Research shows that 55% of communication is non-verbal. Confident body language can transform how others perceive you.'
      },
      {
        type: 'tip',
        title: 'Power Pose',
        content: 'Stand with your feet shoulder-width apart, shoulders back, and chin slightly raised. This "power pose" not only looks confident but can actually make you feel more confident.'
      },
      {
        type: 'text',
        content: 'Make purposeful gestures. Keep your hands visible and use them to emphasize points. Avoid crossing your arms or putting hands in pockets.'
      },
      {
        type: 'exercise',
        title: 'Mirror Practice',
        content: 'Practice speaking in front of a mirror. Pay attention to your posture, eye contact, and gestures. Adjust until you project confidence.'
      },
    ],
  },
  '4': {
    id: '4',
    title: 'Structuring Your Message',
    description: 'The simple framework for clear, memorable communication',
    duration: '8 min',
    category: 'Content',
    content: [
      {
        type: 'text',
        content: 'A well-structured message is easier to follow and remember. The best speakers use simple frameworks to organize their thoughts.'
      },
      {
        type: 'tip',
        title: 'The Rule of Three',
        content: 'Organize your points into groups of three. Our brains naturally find patterns in threes satisfying and memorable.'
      },
      {
        type: 'text',
        content: 'Use the "What, So What, Now What" framework: What is the situation? So what does it mean? Now what should we do about it?'
      },
      {
        type: 'exercise',
        title: 'Structure Practice',
        content: 'Take any topic and explain it using the "What, So What, Now What" framework. Time yourself to keep it under 2 minutes.'
      },
    ],
  },
  '5': {
    id: '5',
    title: 'Handling Nerves',
    description: 'Practical strategies to manage speaking anxiety',
    duration: '6 min',
    category: 'Mindset',
    content: [
      {
        type: 'text',
        content: 'Even the most experienced speakers feel nervous. The key is not to eliminate nerves, but to channel that energy positively.'
      },
      {
        type: 'tip',
        title: 'Reframe Anxiety',
        content: 'Instead of saying "I\'m nervous," say "I\'m excited." The physical sensations are similar, but the mental framing changes everything.'
      },
      {
        type: 'text',
        content: 'Preparation is your best friend. The more you practice, the more confident you\'ll feel. Know your material so well that nerves can\'t shake you.'
      },
      {
        type: 'exercise',
        title: 'Breathing Exercise',
        content: 'Practice box breathing: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat 4 times before speaking.'
      },
    ],
  },
  '6': {
    id: '6',
    title: 'Engaging Your Audience',
    description: 'Techniques to capture and hold attention',
    duration: '7 min',
    category: 'Connection',
    content: [
      {
        type: 'text',
        content: 'The best presentations feel like conversations. Engaging your audience transforms passive listeners into active participants.'
      },
      {
        type: 'tip',
        title: 'Ask Questions',
        content: 'Ask rhetorical or direct questions. This keeps your audience thinking and engaged with your content.'
      },
      {
        type: 'text',
        content: 'Use stories and examples. Abstract concepts become memorable when wrapped in a compelling narrative or real-world example.'
      },
      {
        type: 'exercise',
        title: 'Story Practice',
        content: 'Think of a point you want to make. Now find a personal story or example that illustrates it. Practice telling the story in under 60 seconds.'
      },
    ],
  },
};

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = id ? lessonsData[id] : null;

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-500">Lesson not found</p>
        <Link to="/learn" className="text-[#0B4CDC] hover:underline mt-4 inline-block">
          Back to lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/learn')}
        className="flex items-center gap-2 text-gray-600 hover:text-[#0B4CDC] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to lessons
      </button>

      {/* Lesson Header */}
      <div className="bg-gradient-to-r from-[#0B4CDC] to-[#0839A8] rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            {lesson.category}
          </span>
          <span className="flex items-center gap-1 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            {lesson.duration}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-white/80">{lesson.description}</p>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6">
        {lesson.content.map((section, index) => (
          <div key={index}>
            {section.type === 'text' && (
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            )}
            {section.type === 'tip' && (
              <div className="bg-[#0B4CDC]/5 border border-[#0B4CDC]/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0B4CDC] text-white flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-[#0B4CDC]">{section.title}</h3>
                </div>
                <p className="text-gray-700">{section.content}</p>
              </div>
            )}
            {section.type === 'exercise' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <Play className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-emerald-700">{section.title}</h3>
                </div>
                <p className="text-gray-700">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Complete Button */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="flex-1 btn-primary py-4 flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Mark as Complete
        </button>
        <Link
          to="/practice"
          className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Practice Now
        </Link>
      </div>
    </div>
  );
}
