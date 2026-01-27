import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/constants/colors';
import { authApi } from '../../src/api/auth';
import { useAuthStore } from '../../src/store/authStore';

export default function CompleteScreen() {
  const router = useRouter();
  const { ageGroup, goals } = useLocalSearchParams();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const goalsArray = (goals as string)?.split(',') || [];
      const updatedUser = await authApi.completeOnboarding({
        ageGroup: ageGroup as string,
        learningGoals: goalsArray,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text variant="caption" color="gray600">
          Step 3 of 3
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text variant="h1" color="white">
              ✓
            </Text>
          </View>
        </View>

        <Text variant="h2" align="center">
          You're all set!
        </Text>
        <Text variant="body" color="gray600" align="center" style={styles.subtitle}>
          We've personalized your learning path based on your preferences
        </Text>

        <View style={styles.summaryCard}>
          <Text variant="body" weight="semibold" style={styles.summaryTitle}>
            Your Learning Path
          </Text>
          <View style={styles.summaryItem}>
            <Text variant="bodySmall" color="gray600">
              Daily lessons tailored to your goals
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text variant="bodySmall" color="gray600">
              Practice exercises with feedback
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text variant="bodySmall" color="gray600">
              Progress tracking and streaks
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Learning"
          onPress={handleComplete}
          loading={loading}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  progress: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.emerald,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  summaryCard: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 16,
    padding: Spacing.lg,
    width: '100%',
  },
  summaryTitle: {
    marginBottom: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  footer: {
    padding: Spacing.lg,
  },
});
