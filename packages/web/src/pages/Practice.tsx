import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Mic, Users, Briefcase, MessageSquare } from 'lucide-react';

const practicePrompts = [
  {
    id: '1',
    title: 'Self Introduction',
    description: 'Introduce yourself in 30 seconds',
    duration: 30,
    category: 'Basic',
    icon: Users,
  },
  {
    id: '2',
    title: 'Elevator Pitch',
    description: 'Describe your work or passion project',
    duration: 60,
    category: 'Professional',
    icon: Briefcase,
  },
  {
    id: '3',
    title: 'Story Time',
    description: 'Share a memorable experience',
    duration: 90,
    category: 'Storytelling',
    icon: MessageSquare,
  },
  {
    id: '4',
    title: 'Opinion Piece',
    description: 'Share your view on a topic you care about',
    duration: 120,
    category: 'Advanced',
    icon: Mic,
  },
  {
    id: '5',
    title: 'Job Interview',
    description: 'Answer: Why should we hire you?',
    duration: 60,
    category: 'Professional',
    icon: Briefcase,
  },
  {
    id: '6',
    title: 'Meeting Opener',
    description: 'Start a team meeting with confidence',
    duration: 45,
    category: 'Professional',
    icon: Users,
  },
];

export default function Practice() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice</h1>
        <p className="text-gray-600">Choose a prompt and start recording</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-[#0B4CDC]">0</p>
          <p className="text-sm text-gray-500">Sessions Today</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-[#10B981]">0</p>
          <p className="text-sm text-gray-500">Day Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-2xl font-bold text-[#8B5CF6]">0</p>
          <p className="text-sm text-gray-500">Total Sessions</p>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Prompts</h2>

      {/* Practice Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {practicePrompts.map((prompt) => {
          const Icon = prompt.icon;
          return (
            <Link
              key={prompt.id}
              to={`/practice/${prompt.id}`}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0B4CDC]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center group-hover:bg-[#0B4CDC] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {prompt.duration}s
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#0B4CDC] transition-colors">
                {prompt.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{prompt.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#0B4CDC] bg-[#0B4CDC]/10 px-2 py-1 rounded-full">
                  {prompt.category}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0B4CDC] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
