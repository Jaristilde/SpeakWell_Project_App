import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, Card, ProgressBar } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';

interface FeedbackData {
  transcription: string;
  fillerWords: { word: string; count: number }[];
  pace: 'slow' | 'good' | 'fast';
  clarity: number;
  tips: string[];
  overallScore: number;
}

const generateMockFeedback = (duration: number): FeedbackData => {
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

  return { transcription: "This is where your transcribed speech will appear. In a production environment, your audio would be sent to OpenAI's Whisper API for accurate transcription, then analyzed by GPT-4 for detailed feedback.", fillerWords, pace, clarity, tips, overallScore };
};

export default function FeedbackScreen() {
  const { duration, promptId, promptTitle } = useLocalSearchParams<{ duration: string; promptId: string; promptTitle: string }>();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedback(generateMockFeedback(parseInt(duration || '30')));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [duration]);

  const getPaceIcon = (pace: string): keyof typeof Ionicons.glyphMap => {
    switch (pace) {
      case 'slow': return 'speedometer-outline';
      case 'good': return 'checkmark-circle';
      case 'fast': return 'flash';
      default: return 'speedometer-outline';
    }
  };

  const getPaceColor = (pace: string) => {
    switch (pace) {
      case 'slow': return Colors.semantic.warning;
      case 'good': return Colors.semantic.success;
      case 'fast': return Colors.semantic.error;
      default: return Colors.text.muted;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return Colors.semantic.success;
    if (score >= 70) return Colors.primary.purple;
    return Colors.semantic.warning;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <LinearGradient colors={Colors.gradient.primary as [string, string]} style={styles.loadingSpinner}>
              <ActivityIndicator size="large" color={Colors.neutral.white} />
            </LinearGradient>
            <Text variant="h3" align="center">Analyzing your speech...</Text>
            <Text variant="body" color="secondary" align="center">This may take a moment</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!feedback) return null;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text variant="h2">Your Feedback</Text>
            <Text variant="body" color="secondary">{promptTitle || 'Practice Session'}</Text>
          </View>

          {/* Overall Score */}
          <Card variant="gradient" padding="lg" style={styles.scoreCard}>
            <View style={[styles.scoreCircle, { borderColor: getScoreColor(feedback.overallScore) }]}>
              <Text variant="display" style={{ color: getScoreColor(feedback.overallScore) }}>{feedback.overallScore}</Text>
            </View>
            <Text variant="h3" align="center">Overall Score</Text>
            <Text variant="bodySmall" color="secondary" align="center">
              {feedback.overallScore >= 85 ? 'Excellent work!' : feedback.overallScore >= 70 ? 'Good job!' : 'Keep practicing!'}
            </Text>
          </Card>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="time-outline" size={24} color={Colors.primary.blue} />
              <Text variant="h3">{duration}s</Text>
              <Text variant="caption" color="muted">Duration</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name={getPaceIcon(feedback.pace)} size={24} color={getPaceColor(feedback.pace)} />
              <Text variant="h3" style={{ color: getPaceColor(feedback.pace) }}>
                {feedback.pace.charAt(0).toUpperCase() + feedback.pace.slice(1)}
              </Text>
              <Text variant="caption" color="muted">Pace</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="analytics" size={24} color={Colors.primary.purple} />
              <Text variant="h3">{feedback.clarity}%</Text>
              <Text variant="caption" color="muted">Clarity</Text>
            </View>
          </View>

          {/* Transcription */}
          <Card variant="default" padding="lg" style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>What You Said</Text>
            <View style={styles.transcriptionBox}>
              <Text variant="body" color="secondary">"{feedback.transcription}"</Text>
            </View>
          </Card>

          {/* Filler Words */}
          {feedback.fillerWords.length > 0 && (
            <Card variant="default" padding="lg" style={styles.section}>
              <Text variant="h3" style={styles.sectionTitle}>Filler Words Detected</Text>
              <View style={styles.fillerWordsContainer}>
                {feedback.fillerWords.map((filler, index) => (
                  <View key={index} style={styles.fillerWordBadge}>
                    <Text variant="body" weight="semibold">"{filler.word}"</Text>
                    <View style={styles.fillerCount}>
                      <Text variant="caption" color="white" weight="bold">{filler.count}x</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {/* Tips */}
          <Card variant="default" padding="lg" style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>Tips for Improvement</Text>
            {feedback.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <LinearGradient colors={Colors.gradient.primary as [string, string]} style={styles.tipBullet}>
                  <Text variant="caption" color="white" weight="bold">{index + 1}</Text>
                </LinearGradient>
                <Text variant="body" color="secondary" style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </Card>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Try Again"
            variant="outline"
            size="lg"
            onPress={() => router.replace({ pathname: '/(tabs)/practice/record', params: { promptId } })}
            icon={<Ionicons name="refresh" size={20} color={Colors.primary.purple} />}
            style={styles.footerButton}
          />
          <Button
            title="Done"
            variant="gradient"
            size="lg"
            onPress={() => router.replace('/(tabs)/practice')}
            icon={<Ionicons name="checkmark" size={20} color={Colors.neutral.white} />}
            style={styles.footerButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingSpinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.glow,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingVertical: Spacing.lg,
  },
  scoreCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  transcriptionBox: {
    backgroundColor: Colors.background.tertiary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  fillerWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  fillerWordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
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
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  tipBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.muted,
    gap: Spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});
