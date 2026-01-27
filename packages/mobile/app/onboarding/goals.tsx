import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/constants/colors';

const LEARNING_GOALS = [
  { id: 'public-speaking', label: 'Public Speaking', description: 'Present with confidence' },
  { id: 'interviews', label: 'Job Interviews', description: 'Ace your next interview' },
  { id: 'social', label: 'Social Confidence', description: 'Connect with others easily' },
  { id: 'leadership', label: 'Leadership', description: 'Lead with authority' },
  { id: 'networking', label: 'Networking', description: 'Build professional relationships' },
  { id: 'storytelling', label: 'Storytelling', description: 'Engage and inspire' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { ageGroup } = useLocalSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelected((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    router.push({
      pathname: '/onboarding/complete',
      params: {
        ageGroup: ageGroup as string,
        goals: selected.join(','),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <Text variant="caption" color="gray600">
          Step 2 of 3
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text variant="h2">What do you want to improve?</Text>
        <Text variant="body" color="gray600" style={styles.subtitle}>
          Select all that apply. You can change this later.
        </Text>

        <View style={styles.options}>
          {LEARNING_GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.optionCard,
                selected.includes(goal.id) && styles.optionCardSelected,
              ]}
              onPress={() => toggleGoal(goal.id)}
            >
              <View style={styles.optionContent}>
                <Text
                  variant="body"
                  weight="semibold"
                  color={selected.includes(goal.id) ? 'white' : 'charcoal'}
                >
                  {goal.label}
                </Text>
                <Text
                  variant="caption"
                  color={selected.includes(goal.id) ? 'gray200' : 'gray600'}
                >
                  {goal.description}
                </Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selected.includes(goal.id) && styles.checkboxSelected,
                ]}
              >
                {selected.includes(goal.id) && (
                  <Text variant="caption" color="white" weight="bold">
                    ✓
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={selected.length === 0}
          size="lg"
        />
        <Text variant="caption" color="gray400" align="center" style={styles.hint}>
          Select at least one goal to continue
        </Text>
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
    backgroundColor: Colors.primary.deepIndigo,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  subtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  options: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: Colors.primary.deepIndigo,
    borderColor: Colors.primary.deepIndigo,
  },
  optionContent: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.neutral.gray400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary.emerald,
    borderColor: Colors.primary.emerald,
  },
  footer: {
    padding: Spacing.lg,
  },
  hint: {
    marginTop: Spacing.sm,
  },
});
