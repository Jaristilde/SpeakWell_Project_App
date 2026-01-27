import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FolderOpen, Dumbbell, Plus, RefreshCw } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { CmsStats } from '../../services/cmsApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState<CmsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsApi.getStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0B4CDC] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Lessons',
      total: stats?.totalLessons || 0,
      active: stats?.publishedLessons || 0,
      activeLabel: 'published',
      icon: BookOpen,
      color: 'blue',
      link: '/admin/lessons',
    },
    {
      title: 'Topics',
      total: stats?.totalTopics || 0,
      active: stats?.activeTopics || 0,
      activeLabel: 'active',
      icon: FolderOpen,
      color: 'green',
      link: '/admin/topics',
    },
    {
      title: 'Exercises',
      total: stats?.totalExercises || 0,
      active: stats?.activeExercises || 0,
      activeLabel: 'active',
      icon: Dumbbell,
      color: 'purple',
      link: '/admin/exercises',
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; badge: string }> = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', badge: 'bg-green-100 text-green-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your content and resources</p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const colors = colorClasses[card.color];
          return (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#0B4CDC] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <card.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.badge}`}>
                  {card.active} {card.activeLabel}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.total}</h3>
              <p className="text-gray-500">Total {card.title}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/lessons/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#0B4CDC] hover:bg-blue-50 transition-all"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New Lesson</p>
              <p className="text-sm text-gray-500">Create a lesson</p>
            </div>
          </Link>

          <Link
            to="/admin/topics/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#0B4CDC] hover:bg-green-50 transition-all"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New Topic</p>
              <p className="text-sm text-gray-500">Create a topic</p>
            </div>
          </Link>

          <Link
            to="/admin/exercises/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#0B4CDC] hover:bg-purple-50 transition-all"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New Exercise</p>
              <p className="text-sm text-gray-500">Create an exercise</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
