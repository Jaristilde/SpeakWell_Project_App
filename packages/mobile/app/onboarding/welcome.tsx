import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, StepProgress } from '../../src/components/ui';
import { Colors, Spacing } from '../../src/constants/colors';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Progress indicator */}
          <StepProgress currentStep={1} totalSteps={6} style={styles.progress} />

          {/* Logo and branding */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={Colors.gradient.primary as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoCircle}
            >
              <Ionicons name="mic" size={48} color={Colors.neutral.white} />
            </LinearGradient>
            <Text variant="h1" align="center" style={styles.title}>
              SpeakWell
            </Text>
            <Text variant="body" color="secondary" align="center">
              Master the art of communication
            </Text>
          </View>

          {/* Feature highlights */}
          <View style={styles.features}>
            <FeatureItem
              icon="flash"
              title="Daily Micro-Lessons"
              description="15-minute lessons designed for busy schedules"
            />
            <FeatureItem
              icon="trending-up"
              title="Personalized Learning"
              description="Adapt to your goals and skill level"
            />
            <FeatureItem
              icon="trophy"
              title="21-Day Challenges"
              description="Build lasting communication habits"
            />
          </View>

          {/* CTA */}
          <View style={styles.footer}>
            <Button
              title="Get Started"
              variant="gradient"
              size="lg"
              onPress={() => router.push('/onboarding/assessment')}
              style={styles.button}
            />
            <Text variant="caption" color="muted" align="center" style={styles.terms}>
              By continuing, you agree to our Terms of Service
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={24} color={Colors.primary.purple} />
    </View>
    <View style={styles.featureText}>
      <Text variant="body" weight="semibold">{title}</Text>
      <Text variant="bodySmall" color="secondary">{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
  },
  progress: {
    marginTop: Spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  features: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  footer: {
    marginBottom: Spacing.lg,
  },
  button: {
    marginBottom: Spacing.md,
  },
  terms: {
    marginTop: Spacing.sm,
  },
});
