import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

// List of admin email addresses
// In production, this should be checked against a database or Firebase custom claims
const ADMIN_EMAILS = [
  'admin@speakwell.com',
  'joanearistilde@gmail.com', // Add your email for testing
];

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0B4CDC] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is an admin
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    // Not an admin, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
