import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import OnboardingCheck from './components/OnboardingCheck';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import PracticeSession from './pages/PracticeSession';
import Feedback from './pages/Feedback';
import Learn from './pages/Learn';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import {
  AdminLayout,
  AdminDashboard,
  AdminLessons,
  AdminLessonForm,
  AdminTopics,
  AdminExercises,
  AdminExerciseForm,
} from './pages/admin';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Onboarding - requires auth but not onboarding completion */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />

            {/* Protected Routes - requires auth AND onboarding */}
            <Route element={
              <OnboardingCheck>
                <Layout />
              </OnboardingCheck>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/:id" element={<PracticeSession />} />
              <Route path="/practice/:id/feedback" element={<Feedback />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:id" element={<LessonDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Routes - requires admin access */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="lessons" element={<AdminLessons />} />
              <Route path="lessons/:id" element={<AdminLessonForm />} />
              <Route path="topics" element={<AdminTopics />} />
              <Route path="topics/new" element={<AdminTopics />} />
              <Route path="exercises" element={<AdminExercises />} />
              <Route path="exercises/:id" element={<AdminExerciseForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
