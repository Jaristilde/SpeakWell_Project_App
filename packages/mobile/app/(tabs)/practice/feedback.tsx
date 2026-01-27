import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';

interface FeedbackData {
  transcription: string;
  fillerWords: { word: string; count: number }[];
  pace: 'slow' | 'good' | 'fast';
  clarity: number;
  tips: string[];
  overallScore: number;
}

// Mock feedback generator - in production, this would come from OpenAI
const generateMockFeedback = (duration: number): FeedbackData => {
  const fillerWords = [
    { word: 'um', count: Math.floor(Math.random() * 5) },
    { word: 'uh', count: Math.floor(Math.random() * 3) },
    { word: 'like', count: Math.floor(Math.random() * 4) },
    { word: 'you know', count: Math.floor(Math.random() * 2) },
  ].filter(f => f.count > 0);

  const paces: ('slow' | 'good' | 'fast')[] = ['slow', 'good', 'fast'];
  const pace = paces[Math.floor(Math.random() * 3)];

  const clarity = Math.floor(Math.random() * 30) + 70; // 70-100

  const allTips = [
    'Try to pause instead of using filler words',
    'Maintain eye contact with your audience',
    'Use hand gestures to emphasize key points',
    'Vary your tone to keep listeners engaged',
    'Practice your opening line until it feels natural',
    'Take a breath before starting to center yourself',
  ];

  const tips = allTips.sort(() => Math.random() - 0.5).slice(0, 3);

  const totalFillers = fillerWords.reduce((sum, f) => sum + f.count, 0);
  const overallScore = Math.max(60, Math.min(100, clarity - totalFillers * 3));

  return {
    transcription: "This is where your transcribed speech will appear. In a production environment, your audio would be sent to OpenAI's Whisper API for accurate transcription, then analyzed by GPT-4 for detailed feedback on your speaking patterns.",
    fillerWords,
    pace,
    clarity,
    tips,
    overallScore,
  };
};

export default function FeedbackScreen() {
  const router = useRouter();
  const { duration, promptId, promptTitle } = useLocalSearchParams<{
    duration: string;
    promptId: string;
    promptTitle: string;
  }>();

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setFeedback(generateMockFeedback(parseInt(duration || '30')));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [duration]);

  const getPaceColor = (pace: string) => {
    switch (pace) {
      case 'slow': return Colors.semantic.warning;
      case 'good': return Colors.semantic.success;
      case 'fast': return Colors.semantic.error;
      default: return Colors.neutral.gray600;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return Colors.semantic.success;
    if (score >= 70) return Colors.primary.deepTeal;
    return Colors.semantic.warning;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner} />
          <Text variant="h3" align="center">Analyzing your speech...</Text>
          <Text variant="body" color="gray600" align="center">
            This may take a moment
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!feedback) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2">Your Feedback</Text>
          <Text variant="body" color="gray600">
            {promptTitle || 'Practice Session'}
          </Text>
        </View>

        {/* Overall Score */}
        <View style={styles.scoreCard}>
          <View style={[styles.scoreCircle, { borderColor: getScoreColor(feedback.overallScore) }]}>
            <Text variant="h1" style={{ color: getScoreColor(feedback.overallScore) }}>
              {feedback.overallScore}
            </Text>
          </View>
          <Text variant="h3" align="center">Overall Score</Text>
          <Text variant="bodySmall" color="gray600" align="center">
            {feedback.overallScore >= 85 ? 'Excellent!' :
             feedback.overallScore >= 70 ? 'Good job!' : 'Keep practicing!'}
          </Text>
        </View>

        {/* Transcription */}
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>What You Said</Text>
          <View style={styles.transcriptionBox}>
            <Text variant="body" color="gray600">
              "{feedback.transcription}"
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>Speech Analysis</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text variant="caption" color="gray600">Duration</Text>
              <Text variant="h3">{duration}s</Text>
            </View>
            <View style={styles.statCard}>
              <Text variant="caption" color="gray600">Pace</Text>
              <Text variant="h3" style={{ color: getPaceColor(feedback.pace) }}>
                {feedback.pace.charAt(0).toUpperCase() + feedback.pace.slice(1)}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text variant="caption" color="gray600">Clarity</Text>
              <Text variant="h3">{feedback.clarity}%</Text>
            </View>
          </View>
        </View>

        {/* Filler Words */}
        {feedback.fillerWords.length > 0 && (
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>Filler Words Detected</Text>
            <View style={styles.fillerWordsContainer}>
              {feedback.fillerWords.map((filler, index) => (
                <View key={index} style={styles.fillerWordBadge}>
                  <Text variant="body" weight="semibold">"{filler.word}"</Text>
                  <View style={styles.fillerCount}>
                    <Text variant="caption" color="white">{filler.count}x</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>Tips for Improvement</Text>
          {feedback.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipBullet}>
                <Text variant="caption" color="white" weight="bold">{index + 1}</Text>
              </View>
              <Text variant="body" style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Try Again"
          onPress={() => router.replace({
            pathname: '/(tabs)/practice/record',
            params: { promptId },
          })}
          variant="outline"
          size="lg"
          style={styles.footerButton}
        />
        <Button
          title="Done"
          onPress={() => router.replace('/(tabs)/practice')}
          size="lg"
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.neutral.gray200,
    borderTopColor: Colors.primary.deepIndigo,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
  },
  scoreCard: {
    backgroundColor: Colors.neutral.white,
    margin: Spacing.lg,
    marginTop: 0,
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  transcriptionBox: {
    backgroundColor: Colors.neutral.gray100,
    padding: Spacing.md,
    borderRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral.gray100,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  fillerWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  fillerWordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    gap: Spacing.sm,
  },
  fillerCount: {
    backgroundColor: Colors.semantic.warning,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  tipBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.deepIndigo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
  },
  spacer: {
    height: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
    gap: Spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});
