import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Award, Target, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    setLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (err) {
      setError('Failed to log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Profile'}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] flex items-center justify-center text-white text-2xl font-bold">
              {getInitials(user?.displayName)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || 'User'}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
            <button className="mt-2 text-sm text-[#0B4CDC] font-medium hover:underline">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <Award className="w-6 h-6 text-[#0B4CDC] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500">Achievements</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <Target className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500">Goals Met</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <Calendar className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <MenuItem icon={User} label="Account Settings" />
        <MenuItem icon={Bell} label="Notifications" />
        <MenuItem icon={Target} label="Goals & Preferences" />
        <MenuItem icon={HelpCircle} label="Help & Support" />
        <MenuItem icon={Settings} label="App Settings" />
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="flex-1 text-left font-medium text-red-500">
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </span>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">Confidently v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">Made with care for confident speakers</p>
      </div>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <Icon className="w-5 h-5 text-gray-400" />
      <span className="flex-1 text-left font-medium text-gray-900">
        {label}
      </span>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  );
}
