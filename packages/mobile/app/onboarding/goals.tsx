import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, StepProgress } from '../../src/components/ui';
import { Colors, Spacing, BorderRadius } from '../../src/constants/colors';
import { useAuthStore } from '../../src/store/authStore';

const goals = [
  {
    id: 'public_speaking',
    label: 'Public Speaking',
    description: 'Present with confidence to any audience',
    icon: 'megaphone' as const,
  },
  {
    id: 'job_interviews',
    label: 'Job Interviews',
    description: 'Ace interviews and land your dream job',
    icon: 'briefcase' as const,
  },
  {
    id: 'social_confidence',
    label: 'Social Confidence',
    description: 'Feel comfortable in social situations',
    icon: 'people' as const,
  },
  {
    id: 'leadership',
    label: 'Leadership Communication',
    description: 'Inspire and lead your team effectively',
    icon: 'flag' as const,
  },
  {
    id: 'networking',
    label: 'Networking',
    description: 'Build meaningful professional connections',
    icon: 'git-network' as const,
  },
  {
    id: 'storytelling',
    label: 'Storytelling',
    description: 'Captivate with compelling narratives',
    icon: 'book' as const,
  },
];

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const { user, setUser } = useAuthStore();

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0 && user) {
      setUser({ ...user, learningGoals: selectedGoals });
      router.push('/onboarding/skill-level');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress indicator */}
          <StepProgress currentStep={4} totalSteps={6} style={styles.progress} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text variant="h2" align="center">
              What are your goals?
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
              Select all that apply — we'll personalize your journey
            </Text>
          </View>

          {/* Goal options */}
          <View style={styles.options}>
            {goals.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);
              return (
                <TouchableOpacity
                  key={goal.id}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => toggleGoal(goal.id)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.optionIcon,
                    isSelected && styles.optionIconSelected,
                  ]}>
                    <Ionicons
                      name={goal.icon}
                      size={24}
                      color={isSelected ? Colors.neutral.white : Colors.primary.purple}
                    />
                  </View>
                  <View style={styles.optionText}>
                    <Text
                      variant="body"
                      weight="semibold"
                      color={isSelected ? 'white' : 'primary'}
                    >
                      {goal.label}
                    </Text>
                    <Text
                      variant="caption"
                      color={isSelected ? 'accent' : 'muted'}
                    >
                      {goal.description}
                    </Text>
                  </View>
                  <View style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}>
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color={Colors.neutral.white} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="caption" color="muted" align="center" style={styles.selectedCount}>
            {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected
          </Text>
          <Button
            title="Continue"
            variant="gradient"
            size="lg"
            onPress={handleContinue}
            disabled={selectedGoals.length === 0}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  progress: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: Colors.primary.purple,
    borderColor: Colors.primary.blue,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconSelected: {
    backgroundColor: `${Colors.primary.blue}40`,
  },
  optionText: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary.blue,
    borderColor: Colors.primary.blue,
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  selectedCount: {
    marginBottom: Spacing.md,
  },
});
