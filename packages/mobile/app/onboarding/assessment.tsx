import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, StepProgress, Card } from '../../src/components/ui';
import { Colors, Spacing, BorderRadius } from '../../src/constants/colors';

const assessmentAreas = [
  {
    icon: 'people' as const,
    title: 'Social Confidence',
    description: 'Navigate conversations with ease',
    color: Colors.primary.blue,
  },
  {
    icon: 'briefcase' as const,
    title: 'Professional Speaking',
    description: 'Excel in meetings and presentations',
    color: Colors.primary.purple,
  },
  {
    icon: 'mic' as const,
    title: 'Public Speaking',
    description: 'Captivate any audience',
    color: Colors.primary.deepPurple,
  },
  {
    icon: 'heart' as const,
    title: 'Emotional Expression',
    description: 'Communicate feelings effectively',
    color: Colors.primary.violet,
  },
];

export default function AssessmentScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress indicator */}
          <StepProgress currentStep={2} totalSteps={6} style={styles.progress} />

          {/* Header */}
          <View style={styles.header}>
            <Text variant="h2" align="center">
              We'll help you{'\n'}communicate better
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
              Our personalized approach focuses on areas that matter to you
            </Text>
          </View>

          {/* Assessment areas */}
          <View style={styles.areas}>
            {assessmentAreas.map((area, index) => (
              <Card key={index} variant="default" padding="md" style={styles.areaCard}>
                <View style={styles.areaContent}>
                  <View style={[styles.areaIcon, { backgroundColor: `${area.color}20` }]}>
                    <Ionicons name={area.icon} size={24} color={area.color} />
                  </View>
                  <View style={styles.areaText}>
                    <Text variant="body" weight="semibold">{area.title}</Text>
                    <Text variant="bodySmall" color="secondary">{area.description}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.primary.purple} />
                </View>
              </Card>
            ))}
          </View>

          {/* Info box */}
          <LinearGradient
            colors={[`${Colors.primary.purple}20`, `${Colors.primary.blue}20`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.infoBox}
          >
            <Ionicons name="sparkles" size={24} color={Colors.primary.purple} />
            <Text variant="bodySmall" color="secondary" style={styles.infoText}>
              Your learning path adapts based on your progress and feedback
            </Text>
          </LinearGradient>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            variant="gradient"
            size="lg"
            onPress={() => router.push('/onboarding/age-group')}
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
    marginBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  areas: {
    gap: Spacing.md,
  },
  areaCard: {
    marginBottom: 0,
  },
  areaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  areaIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaText: {
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  infoText: {
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
});
