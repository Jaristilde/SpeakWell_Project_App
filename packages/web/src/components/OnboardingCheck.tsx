import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingCheckProps {
  children: React.ReactNode;
}

export default function OnboardingCheck({ children }: OnboardingCheckProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if onboarding is completed
  const onboardingCompleted = localStorage.getItem('onboarding_completed');

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
