import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mic, Square, AlertCircle } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

const practicePrompts: Record<string, { title: string; description: string; duration: number }> = {
  '1': { title: 'Self Introduction', description: 'Introduce yourself in 30 seconds. Share your name, what you do, and something interesting about yourself.', duration: 30 },
  '2': { title: 'Elevator Pitch', description: 'Describe your work or passion project in 60 seconds. Make it compelling and memorable.', duration: 60 },
  '3': { title: 'Story Time', description: 'Share a memorable experience from your life. Focus on emotions and details.', duration: 90 },
  '4': { title: 'Opinion Piece', description: 'Share your view on a topic you care about. Be persuasive but respectful.', duration: 120 },
  '5': { title: 'Job Interview', description: 'Answer the question: Why should we hire you? Highlight your strengths.', duration: 60 },
  '6': { title: 'Meeting Opener', description: 'Start a team meeting. Set the agenda and get everyone engaged.', duration: 45 },
};

export default function PracticeSession() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prompt = practicePrompts[id || '1'] || practicePrompts['1'];

  const {
    isRecording,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Navigate to feedback when recording is complete
  useEffect(() => {
    if (audioBlob && !isRecording && hasStarted) {
      // Store audio blob in session storage for feedback page
      const reader = new FileReader();
      reader.onloadend = () => {
        sessionStorage.setItem('lastRecording', reader.result as string);
        sessionStorage.setItem('lastRecordingDuration', recordingTime.toString());
        sessionStorage.setItem('lastRecordingPrompt', JSON.stringify(prompt));
        navigate(`/practice/${id}/feedback`);
      };
      reader.readAsDataURL(audioBlob);
    }
  }, [audioBlob, isRecording, hasStarted, navigate, id, prompt, recordingTime]);

  const handleStartRecording = async () => {
    try {
      setError(null);
      await startRecording();
      setHasStarted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              if (isRecording) {
                stopRecording();
              }
              navigate('/practice');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Cancel</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Prompt Card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-12 text-center">
            <p className="text-xs font-semibold text-[#0B4CDC] uppercase tracking-wide mb-2">
              Your Prompt
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {prompt.title}
            </h1>
            <p className="text-gray-600">
              {prompt.description}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Microphone Access Required</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Timer */}
          <div className="text-center mb-8">
            {isRecording && (
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse-recording" />
                <span className="text-sm font-medium text-red-500">Recording</span>
              </div>
            )}
            <p className="text-6xl font-light text-gray-900 tabular-nums">
              {formatTime(recordingTime)}
            </p>
            <p className="text-gray-500 mt-2">
              {isRecording ? 'Speak clearly into your microphone' : 'Ready to record'}
            </p>
          </div>

          {/* Waveform Visualization (when recording) */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1 h-16 mb-8">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#0B4CDC] rounded-full"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animation: `waveform ${0.3 + Math.random() * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Record Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30'
                  : 'bg-gradient-to-br from-[#0B4CDC] to-[#0839A8] hover:from-[#0839A8] hover:to-[#062875] shadow-lg shadow-[#0B4CDC]/30'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
            <p className="text-gray-500 text-sm">
              {isRecording ? 'Tap to stop' : 'Tap to start recording'}
            </p>
          </div>
        </div>
      </div>

      {/* Tips Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-gray-500 text-center">
            <strong className="text-gray-700">Tip:</strong> Speak at a natural pace and maintain eye contact with your camera.
          </p>
        </div>
      </div>
    </div>
  );
}
