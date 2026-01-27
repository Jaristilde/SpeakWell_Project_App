import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Mic, Target, Clock, Sparkles, Check, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Confidently!',
    subtitle: "Let's personalize your experience",
  },
  {
    id: 'age',
    title: 'What\'s your age group?',
    subtitle: 'We\'ll tailor content to your needs',
  },
  {
    id: 'goal',
    title: 'What\'s your main goal?',
    subtitle: 'This helps us recommend the right content',
  },
  {
    id: 'experience',
    title: 'How would you rate your speaking skills?',
    subtitle: 'Be honest - there\'s no wrong answer',
  },
  {
    id: 'time',
    title: 'How much time can you practice daily?',
    subtitle: 'Consistency is more important than duration',
  },
  {
    id: 'ready',
    title: 'You\'re all set!',
    subtitle: 'Let\'s start your journey to confident speaking',
  },
];

const goals = [
  { id: 'presentations', label: 'Nail presentations', icon: '🎤' },
  { id: 'interviews', label: 'Ace job interviews', icon: '💼' },
  { id: 'social', label: 'Be confident socially', icon: '👥' },
  { id: 'meetings', label: 'Speak up in meetings', icon: '🗣️' },
  { id: 'general', label: 'Overall improvement', icon: '✨' },
];

const experienceLevels = [
  { id: 'beginner', label: 'Beginner', description: 'I get nervous speaking in front of others' },
  { id: 'intermediate', label: 'Intermediate', description: 'I\'m okay but want to improve' },
  { id: 'advanced', label: 'Advanced', description: 'I\'m good but want to be great' },
];

const timeOptions = [
  { id: '5', label: '5 minutes', description: 'Quick daily practice' },
  { id: '10', label: '10 minutes', description: 'Balanced approach' },
  { id: '15', label: '15+ minutes', description: 'Dedicated practice' },
];

const ageGroups = [
  { id: 'teen', label: '13-17', description: 'Teen', icon: '🎓' },
  { id: 'young-adult', label: '18-24', description: 'Young Adult', icon: '🎯' },
  { id: 'adult', label: '25-34', description: 'Adult', icon: '💼' },
  { id: 'professional', label: '35-44', description: 'Professional', icon: '📊' },
  { id: 'experienced', label: '45-54', description: 'Experienced', icon: '🏆' },
  { id: 'senior', label: '55+', description: 'Senior', icon: '⭐' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save onboarding data to localStorage
    const onboardingData = {
      ageGroup: selectedAge,
      goal: selectedGoal,
      experience: selectedExperience,
      dailyTime: selectedTime,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_preferences', JSON.stringify(onboardingData));
    navigate('/dashboard');
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return true;
      case 'age':
        return selectedAge !== '';
      case 'goal':
        return selectedGoal !== '';
      case 'experience':
        return selectedExperience !== '';
      case 'time':
        return selectedTime !== '';
      case 'ready':
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] flex items-center justify-center mx-auto mb-8 shadow-xl">
              <span className="text-white font-bold text-4xl">C</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Hi{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}! 👋
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              We're excited to help you become a more confident speaker. Let's take a minute to personalize your experience.
            </p>
          </div>
        );

      case 'age':
        return (
          <div className="grid grid-cols-2 gap-3">
            {ageGroups.map((age) => (
              <button
                key={age.id}
                onClick={() => setSelectedAge(age.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedAge === age.id
                    ? 'border-[#0B4CDC] bg-[#0B4CDC]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-3xl">{age.icon}</span>
                <span className="font-bold text-gray-900">{age.label}</span>
                <span className="text-xs text-gray-500">{age.description}</span>
                {selectedAge === age.id && (
                  <Check className="w-4 h-4 text-[#0B4CDC]" />
                )}
              </button>
            ))}
          </div>
        );

      case 'goal':
        return (
          <div className="space-y-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  selectedGoal === goal.id
                    ? 'border-[#0B4CDC] bg-[#0B4CDC]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{goal.icon}</span>
                <span className="font-medium text-gray-900">{goal.label}</span>
                {selectedGoal === goal.id && (
                  <Check className="w-5 h-5 text-[#0B4CDC] ml-auto" />
                )}
              </button>
            ))}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedExperience(level.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedExperience === level.id
                    ? 'border-[#0B4CDC] bg-[#0B4CDC]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{level.label}</p>
                    <p className="text-sm text-gray-500">{level.description}</p>
                  </div>
                  {selectedExperience === level.id && (
                    <Check className="w-5 h-5 text-[#0B4CDC]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'time':
        return (
          <div className="space-y-3">
            {timeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedTime(option.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedTime === option.id
                    ? 'border-[#0B4CDC] bg-[#0B4CDC]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${selectedTime === option.id ? 'text-[#0B4CDC]' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                  {selectedTime === option.id && (
                    <Check className="w-5 h-5 text-[#0B4CDC]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 'ready':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Your personalized plan is ready!
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-[#0B4CDC]" />
                <span className="text-gray-700">
                  Age: <span className="font-medium">{ageGroups.find(a => a.id === selectedAge)?.label}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-[#0B4CDC]" />
                <span className="text-gray-700">
                  Goal: <span className="font-medium">{goals.find(g => g.id === selectedGoal)?.label}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Mic className="w-5 h-5 text-[#0B4CDC]" />
                <span className="text-gray-700">
                  Level: <span className="font-medium">{experienceLevels.find(e => e.id === selectedExperience)?.label}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#0B4CDC]" />
                <span className="text-gray-700">
                  Daily: <span className="font-medium">{timeOptions.find(t => t.id === selectedTime)?.label}</span>
                </span>
              </div>
            </div>
            <p className="text-gray-600">
              Let's start building your confidence!
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-[#0B4CDC]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Step Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 flex items-center justify-center gap-2 btn-primary py-3"
              >
                Start Practicing
                <Sparkles className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Skip option for first step */}
          {currentStep === 0 && (
            <button
              onClick={handleComplete}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
