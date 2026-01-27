import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button, StepProgress } from '../../src/components/ui';
import { Colors, Spacing, BorderRadius } from '../../src/constants/colors';

const skillLevels = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'I often feel nervous or unsure when speaking',
    icon: 'leaf' as const,
    details: ['New to public speaking', 'Building basic confidence', 'Learning foundations'],
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'I can communicate but want to improve',
    icon: 'fitness' as const,
    details: ['Some experience', 'Ready for challenges', 'Refining techniques'],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: 'I'm confident but want to master my skills',
    icon: 'rocket' as const,
    details: ['Experienced speaker', 'Seeking mastery', 'Advanced techniques'],
  },
];

export default function SkillLevelScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLevel) {
      router.push('/onboarding/complete');
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
          <StepProgress currentStep={5} totalSteps={6} style={styles.progress} />

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
              What's your skill level?
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
              We'll customize your learning pace accordingly
            </Text>
          </View>

          {/* Skill level options */}
          <View style={styles.options}>
            {skillLevels.map((level) => {
              const isSelected = selectedLevel === level.id;
              return (
                <TouchableOpacity
                  key={level.id}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => setSelectedLevel(level.id)}
                  activeOpacity={0.8}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={Colors.gradient.primary as [string, string]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.optionGradient}
                    >
                      <View style={styles.optionHeader}>
                        <View style={styles.optionIconSelected}>
                          <Ionicons
                            name={level.icon}
                            size={28}
                            color={Colors.neutral.white}
                          />
                        </View>
                        <View style={styles.optionTitleContainer}>
                          <Text variant="h3" color="white">
                            {level.label}
                          </Text>
                          <Text variant="bodySmall" color="accent">
                            {level.description}
                          </Text>
                        </View>
                        <View style={styles.checkmark}>
                          <Ionicons name="checkmark" size={20} color={Colors.neutral.white} />
                        </View>
                      </View>
                      <View style={styles.detailsList}>
                        {level.details.map((detail, index) => (
                          <View key={index} style={styles.detailItem}>
                            <Ionicons name="checkmark-circle" size={16} color={Colors.text.accent} />
                            <Text variant="bodySmall" color="accent">{detail}</Text>
                          </View>
                        ))}
                      </View>
                    </LinearGradient>
                  ) : (
                    <>
                      <View style={styles.optionHeader}>
                        <View style={styles.optionIcon}>
                          <Ionicons
                            name={level.icon}
                            size={28}
                            color={Colors.primary.purple}
                          />
                        </View>
                        <View style={styles.optionTitleContainer}>
                          <Text variant="h3" color="primary">
                            {level.label}
                          </Text>
                          <Text variant="bodySmall" color="secondary">
                            {level.description}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="gradient"
            size="lg"
            onPress={handleContinue}
            disabled={!selectedLevel}
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
    gap: Spacing.md,
  },
  option: {
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: Colors.primary.blue,
  },
  optionGradient: {
    padding: Spacing.md,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconSelected: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.neutral.white}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitleContainer: {
    flex: 1,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
});
