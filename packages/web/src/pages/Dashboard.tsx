import { Link } from 'react-router-dom';
import { Mic, BookOpen, TrendingUp, Flame, ChevronRight, Play } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Ready to practice speaking today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Day Streak</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-3">
            <Mic className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Sessions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500">Lessons</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-gray-900">--</p>
          <p className="text-sm text-gray-500">Avg Score</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Practice Card */}
        <Link
          to="/practice"
          className="group bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] rounded-2xl p-6 text-white hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Mic className="w-7 h-7" />
            </div>
            <ChevronRight className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start Practice</h3>
          <p className="text-white/80">Choose a prompt and record yourself speaking</p>
        </Link>

        {/* Learn Card */}
        <Link
          to="/learn"
          className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0B4CDC]/30 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#0B4CDC] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Continue Learning</h3>
          <p className="text-gray-600">Pick up where you left off in your lessons</p>
        </Link>
      </div>

      {/* Today's Recommended */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
        <div className="space-y-4">
          {[
            { title: 'Self Introduction', description: 'Perfect for beginners', duration: '30s' },
            { title: 'Elevator Pitch', description: 'Great for professionals', duration: '60s' },
          ].map((item, index) => (
            <Link
              key={index}
              to={`/practice/${index + 1}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-[#0B4CDC]/5 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center group-hover:bg-[#0B4CDC] group-hover:text-white transition-colors">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <span className="text-sm text-gray-400">{item.duration}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
