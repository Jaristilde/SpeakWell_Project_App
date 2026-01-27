import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';
import { useAuthStore } from '../../../src/store/authStore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="h3">
            Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}!
          </Text>
          <Text variant="body" color="gray600">
            Ready to practice today?
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <StatCard title="Streak" value="0" subtitle="days" />
          <StatCard title="Lessons" value="0" subtitle="completed" />
          <StatCard title="Practice" value="0" subtitle="minutes" />
        </View>

        <View style={styles.todaySection}>
          <Text variant="h3" style={styles.sectionTitle}>
            Today's Focus
          </Text>
          <View style={styles.todayCard}>
            <Text variant="body" weight="semibold">
              Introduction to Confident Speaking
            </Text>
            <Text variant="bodySmall" color="gray600" style={styles.cardSubtitle}>
              Learn the basics of confident communication
            </Text>
            <Button
              title="Start Lesson"
              onPress={() => router.push('/(tabs)/learn')}
              size="md"
              style={styles.cardButton}
            />
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text variant="h3" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.actionButtons}>
            <Button
              title="Practice Now"
              onPress={() => router.push('/(tabs)/practice')}
              variant="secondary"
              size="md"
            />
            <Button
              title="View Progress"
              onPress={() => router.push('/(tabs)/profile')}
              variant="outline"
              size="md"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text variant="caption" color="gray600">
        {title}
      </Text>
      <Text variant="h2" color="deepIndigo">
        {value}
      </Text>
      <Text variant="caption" color="gray400">
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  todaySection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  todayCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: Spacing.lg,
  },
  cardSubtitle: {
    marginTop: Spacing.xs,
  },
  cardButton: {
    marginTop: Spacing.md,
  },
  quickActions: {},
  actionButtons: {
    gap: Spacing.sm,
  },
});
