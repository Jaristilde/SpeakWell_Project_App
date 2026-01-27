import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, AlertTriangle, TrendingUp, Clock, Volume2 } from 'lucide-react';

interface FeedbackData {
  overallScore: number;
  transcription: string;
  fillerWords: { word: string; count: number }[];
  pace: 'slow' | 'good' | 'fast';
  clarity: number;
  tips: string[];
}

// Generate mock feedback - in production, this would come from OpenAI
const generateMockFeedback = (): FeedbackData => {
  const fillerWords = [
    { word: 'um', count: Math.floor(Math.random() * 5) },
    { word: 'uh', count: Math.floor(Math.random() * 3) },
    { word: 'like', count: Math.floor(Math.random() * 4) },
    { word: 'you know', count: Math.floor(Math.random() * 2) },
  ].filter(f => f.count > 0);

  const paces: ('slow' | 'good' | 'fast')[] = ['slow', 'good', 'fast'];
  const pace = paces[Math.floor(Math.random() * 3)];

  const clarity = Math.floor(Math.random() * 30) + 70;

  const allTips = [
    'Try to pause instead of using filler words like "um" or "uh"',
    'Maintain a steady pace - you rushed through some parts',
    'Great use of pauses for emphasis!',
    'Consider varying your tone more to keep listeners engaged',
    'Your opening was strong and confident',
    'Practice your conclusion to end on a powerful note',
  ];

  const tips = allTips.sort(() => Math.random() - 0.5).slice(0, 3);
  const totalFillers = fillerWords.reduce((sum, f) => sum + f.count, 0);
  const overallScore = Math.max(60, Math.min(100, clarity - totalFillers * 3));

  return {
    overallScore,
    transcription: "This is where your transcribed speech will appear. In production, your audio would be sent to OpenAI's Whisper API for accurate transcription, then analyzed by GPT-4 for detailed feedback on your speaking patterns, filler words, and overall delivery.",
    fillerWords,
    pace,
    clarity,
    tips,
  };
};

export default function Feedback() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [prompt, setPrompt] = useState<{ title: string } | null>(null);

  useEffect(() => {
    // Load recording data from session storage
    const recordingData = sessionStorage.getItem('lastRecording');
    const recordingDuration = sessionStorage.getItem('lastRecordingDuration');
    const promptData = sessionStorage.getItem('lastRecordingPrompt');

    if (recordingData) {
      setAudioUrl(recordingData);
    }
    if (recordingDuration) {
      setDuration(parseInt(recordingDuration));
    }
    if (promptData) {
      setPrompt(JSON.parse(promptData));
    }

    // Simulate API call for feedback
    const timer = setTimeout(() => {
      setFeedback(generateMockFeedback());
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-[#0B4CDC]';
    return 'text-amber-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-[#0B4CDC]';
    return 'bg-amber-500';
  };

  const getPaceInfo = (pace: string) => {
    switch (pace) {
      case 'slow':
        return { color: 'text-amber-500', label: 'Slow', tip: 'Try speaking a bit faster' };
      case 'good':
        return { color: 'text-green-500', label: 'Perfect', tip: 'Great natural pace!' };
      case 'fast':
        return { color: 'text-red-500', label: 'Fast', tip: 'Slow down a little' };
      default:
        return { color: 'text-gray-500', label: 'Unknown', tip: '' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0B4CDC] rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your speech...</h2>
          <p className="text-gray-500">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (!feedback) return null;

  const paceInfo = getPaceInfo(feedback.pace);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            to="/practice"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="font-semibold text-gray-900">Your Feedback</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Score Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 text-center">
          <p className="text-sm text-gray-500 mb-2">{prompt?.title || 'Practice Session'}</p>
          <div className={`text-6xl font-bold ${getScoreColor(feedback.overallScore)} mb-2`}>
            {feedback.overallScore}
          </div>
          <p className="text-gray-600">
            {feedback.overallScore >= 85 ? 'Excellent!' : feedback.overallScore >= 70 ? 'Good job!' : 'Keep practicing!'}
          </p>

          {/* Audio Playback */}
          {audioUrl && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={togglePlayback}
                  className="w-12 h-12 rounded-full bg-[#0B4CDC]/10 text-[#0B4CDC] flex items-center justify-center hover:bg-[#0B4CDC]/20 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                </button>
                <div className="text-sm text-gray-500">
                  <Volume2 className="w-4 h-4 inline mr-1" />
                  Listen to your recording ({duration}s)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <Clock className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{duration}s</p>
            <p className="text-xs text-gray-500">Duration</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${paceInfo.color}`}>{paceInfo.label}</p>
            <p className="text-xs text-gray-500">Pace</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <CheckCircle className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{feedback.clarity}%</p>
            <p className="text-xs text-gray-500">Clarity</p>
          </div>
        </div>

        {/* Transcription */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What You Said</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-600 italic">"{feedback.transcription}"</p>
          </div>
        </div>

        {/* Filler Words */}
        {feedback.fillerWords.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">Filler Words Detected</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {feedback.fillerWords.map((filler, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm"
                >
                  "{filler.word}"
                  <span className="bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full text-xs font-medium">
                    {filler.count}x
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Tips for Improvement</h3>
          <div className="space-y-3">
            {feedback.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0B4CDC] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/practice/${id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Link>
          <Link
            to="/practice"
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Done
          </Link>
        </div>
      </div>
    </div>
  );
}
