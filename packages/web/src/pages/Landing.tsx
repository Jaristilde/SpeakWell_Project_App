import { Link } from 'react-router-dom';
import { Mic, BookOpen, TrendingUp, Star } from 'lucide-react';

const features = [
  {
    title: 'Daily Lessons',
    description: 'Bite-sized lessons tailored to your goals, delivered fresh every day.',
    icon: BookOpen,
    gradient: 'from-[#0B4CDC] to-[#3D6FE8]',
  },
  {
    title: 'AI-Powered Feedback',
    description: 'Get instant, personalized feedback on your speaking with advanced AI.',
    icon: Star,
    gradient: 'from-[#06B6D4] to-[#0891B2]',
  },
  {
    title: 'Practice Recording',
    description: 'Record yourself speaking and track your progress over time.',
    icon: Mic,
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    title: 'Progress Tracking',
    description: 'Visualize your improvement with streaks and achievements.',
    icon: TrendingUp,
    gradient: 'from-[#8B5CF6] to-[#7C3AED]',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] flex items-center justify-center shadow-lg shadow-[#0B4CDC]/25">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Confidently</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#0B4CDC] transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#0B4CDC] transition-colors font-medium">
                How It Works
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-[#0B4CDC] font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 -z-10" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#0B4CDC]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-[#0B4CDC]/10 text-[#0B4CDC] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Transform Your Communication
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Speak with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B4CDC] to-[#06B6D4]">
                Confidence
              </span>
              <br />
              Every Time
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Master the art of communication with AI-powered coaching, personalized lessons,
              and practice sessions designed to help you speak confidently in any situation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Start Practicing Free
              </Link>
              <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#0B4CDC] text-sm font-semibold tracking-wide uppercase mb-3">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B4CDC] to-[#06B6D4]">
                Speak Better
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#0B4CDC]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#0B4CDC] text-sm font-semibold tracking-wide uppercase mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '01', title: 'Choose a Prompt', description: 'Select from a variety of speaking scenarios designed to improve different skills.' },
              { number: '02', title: 'Record Yourself', description: 'Use your microphone to record your response. Speak naturally and confidently.' },
              { number: '03', title: 'Get Feedback', description: 'Receive instant AI-powered feedback on your speech, with tips to improve.' },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B4CDC] to-[#3D6FE8] flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0B4CDC] to-[#0839A8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Speak Confidently?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Start practicing today and see the difference in your communication skills.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-[#0B4CDC] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Start Practicing Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Confidently</span>
            </div>

            <div className="flex flex-wrap gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#0B4CDC] transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#0B4CDC] transition-colors">How It Works</a>
              <a href="#" className="text-gray-600 hover:text-[#0B4CDC] transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-[#0B4CDC] transition-colors">Terms</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Confidently. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
