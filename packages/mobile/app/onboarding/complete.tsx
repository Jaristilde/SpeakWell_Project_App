import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Text, Button, StepProgress, Card } from '../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/colors';
import { authApi } from '../../src/api/auth';
import { useAuthStore } from '../../src/store/authStore';
import { useEffect } from 'react';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function CompleteScreen() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Animation for the success icon
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleComplete = async () => {
    setLoading(true);
    try {
      const updatedUser = await authApi.completeOnboarding({
        ageGroup: user?.ageGroup || '',
        learningGoals: user?.learningGoals || [],
      });
      setUser(updatedUser);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Please try again'
      );
    } finally {
      setLoading(false);
    }
  };

  const summaryItems = [
    {
      icon: 'calendar' as const,
      title: 'Daily Micro-Lessons',
      description: '15-minute sessions designed for your schedule',
    },
    {
      icon: 'mic' as const,
      title: 'Practice Exercises',
      description: 'Record and get AI-powered feedback',
    },
    {
      icon: 'trending-up' as const,
      title: 'Progress Tracking',
      description: 'Build streaks and see your improvement',
    },
    {
      icon: 'trophy' as const,
      title: '21-Day Challenges',
      description: 'Focused challenges to build lasting habits',
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Progress indicator */}
          <StepProgress currentStep={6} totalSteps={6} style={styles.progress} />

          {/* Success animation */}
          <View style={styles.successContainer}>
            <Animated.View style={animatedStyle}>
              <LinearGradient
                colors={Colors.gradient.primary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.successIcon}
              >
                <Ionicons name="checkmark" size={48} color={Colors.neutral.white} />
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text variant="h1" align="center">
              You're all set!
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
              Your personalized learning journey begins now
            </Text>
          </View>

          {/* Summary card */}
          <Card variant="gradient" padding="lg" style={styles.summaryCard}>
            <Text variant="h3" style={styles.summaryTitle}>
              Your Learning Path
            </Text>
            <View style={styles.summaryList}>
              {summaryItems.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <View style={styles.summaryIcon}>
                    <Ionicons name={item.icon} size={20} color={Colors.primary.purple} />
                  </View>
                  <View style={styles.summaryText}>
                    <Text variant="body" weight="semibold">{item.title}</Text>
                    <Text variant="caption" color="secondary">{item.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Start Your Journey"
            variant="gradient"
            size="lg"
            onPress={handleComplete}
            loading={loading}
            icon={<Ionicons name="arrow-forward" size={20} color={Colors.neutral.white} />}
            iconPosition="right"
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  progress: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glow,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    maxHeight: 300,
  },
  summaryTitle: {
    marginBottom: Spacing.md,
  },
  summaryList: {
    gap: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
  },
});
