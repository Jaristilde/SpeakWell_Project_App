import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, StepProgress } from '../../src/components/ui';
import { Colors, Spacing, BorderRadius } from '../../src/constants/colors';
import { useAuthStore } from '../../src/store/authStore';

const ageGroups = [
  {
    id: '18-24',
    label: '18-24',
    description: 'Starting career & social life',
    icon: 'school' as const,
  },
  {
    id: '25-34',
    label: '25-34',
    description: 'Growing professionally',
    icon: 'briefcase' as const,
  },
  {
    id: '35-44',
    label: '35-44',
    description: 'Leadership & management',
    icon: 'people' as const,
  },
  {
    id: '45+',
    label: '45+',
    description: 'Experienced professional',
    icon: 'star' as const,
  },
];

export default function AgeGroupScreen() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const { user, setUser } = useAuthStore();

  const handleContinue = () => {
    if (selectedAge && user) {
      setUser({ ...user, ageGroup: selectedAge });
      router.push('/onboarding/goals');
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
          <StepProgress currentStep={3} totalSteps={6} style={styles.progress} />

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
              What's your age range?
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
              This helps us tailor content to your life stage
            </Text>
          </View>

          {/* Age group options */}
          <View style={styles.options}>
            {ageGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.option,
                  selectedAge === group.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedAge(group.id)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.optionIcon,
                  selectedAge === group.id && styles.optionIconSelected,
                ]}>
                  <Ionicons
                    name={group.icon}
                    size={28}
                    color={selectedAge === group.id ? Colors.neutral.white : Colors.primary.purple}
                  />
                </View>
                <View style={styles.optionText}>
                  <Text
                    variant="h3"
                    color={selectedAge === group.id ? 'white' : 'primary'}
                  >
                    {group.label}
                  </Text>
                  <Text
                    variant="bodySmall"
                    color={selectedAge === group.id ? 'accent' : 'secondary'}
                  >
                    {group.description}
                  </Text>
                </View>
                {selectedAge === group.id && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={20} color={Colors.neutral.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="gradient"
            size="lg"
            onPress={handleContinue}
            disabled={!selectedAge}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
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
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
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
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
});
