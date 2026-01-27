import { Link } from 'react-router-dom';
import { Clock, ChevronRight, BookOpen, Target, Users, Lightbulb, Award, type LucideIcon } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  icon: LucideIcon;
  progress: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'The Power of Pauses',
    description: 'Learn how strategic pauses can make your speech more impactful',
    duration: '5 min',
    category: 'Delivery',
    icon: Clock,
    progress: 0,
  },
  {
    id: '2',
    title: 'Eliminating Filler Words',
    description: 'Techniques to reduce "um", "uh", and other filler words',
    duration: '7 min',
    category: 'Fluency',
    icon: Target,
    progress: 0,
  },
  {
    id: '3',
    title: 'Confident Body Language',
    description: 'How your posture and gestures affect your message',
    duration: '6 min',
    category: 'Presence',
    icon: Users,
    progress: 0,
  },
  {
    id: '4',
    title: 'Structuring Your Message',
    description: 'The simple framework for clear, memorable communication',
    duration: '8 min',
    category: 'Content',
    icon: Lightbulb,
    progress: 0,
  },
  {
    id: '5',
    title: 'Handling Nerves',
    description: 'Practical strategies to manage speaking anxiety',
    duration: '6 min',
    category: 'Mindset',
    icon: Award,
    progress: 0,
  },
  {
    id: '6',
    title: 'Engaging Your Audience',
    description: 'Techniques to capture and hold attention',
    duration: '7 min',
    category: 'Connection',
    icon: Users,
    progress: 0,
  },
];

const categories = ['All', 'Delivery', 'Fluency', 'Presence', 'Content', 'Mindset', 'Connection'];

export default function Learn() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p className="text-gray-600">Master the art of confident communication</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-[#0B4CDC] to-[#0839A8] rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">Your Progress</p>
            <p className="text-2xl font-bold">0 of {lessons.length} lessons completed</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-0" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === 'All'
                ? 'bg-[#0B4CDC] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => {
          const Icon = lesson.icon;
          return (
            <Link
              key={lesson.id}
              to={`/learn/${lesson.id}`}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0B4CDC]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center group-hover:bg-[#0B4CDC] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#0B4CDC] transition-colors">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#0B4CDC] bg-[#0B4CDC]/10 px-2 py-1 rounded-full">
                  {lesson.category}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-[#0B4CDC] group-hover:gap-2 transition-all">
                  Start
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
