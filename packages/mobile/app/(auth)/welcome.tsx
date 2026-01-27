import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text variant="h1" color="white" align="center">
              C
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text variant="h1" align="center">
            Confidently
          </Text>
          <Text
            variant="body"
            color="gray600"
            align="center"
            style={styles.subtitle}
          >
            Master the art of communication with personalized coaching and daily practice
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            title="Daily Lessons"
            description="Bite-sized lessons tailored to your goals"
          />
          <FeatureItem
            title="Practice Sessions"
            description="Record yourself and track your progress"
          />
          <FeatureItem
            title="AI Feedback"
            description="Get personalized tips to improve"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/(auth)/signup')}
          size="lg"
        />
        <Button
          title="I already have an account"
          onPress={() => router.push('/(auth)/login')}
          variant="ghost"
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureDot} />
      <View style={styles.featureText}>
        <Text variant="body" weight="semibold">
          {title}
        </Text>
        <Text variant="bodySmall" color="gray600">
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: Colors.primary.deepIndigo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  features: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.emerald,
    marginTop: 6,
  },
  featureText: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
});
