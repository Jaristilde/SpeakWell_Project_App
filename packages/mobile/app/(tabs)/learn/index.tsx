import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { Colors, Spacing } from '../../../src/constants/colors';

const SAMPLE_LESSONS = [
  {
    id: '1',
    title: 'Introduction to Confident Speaking',
    category: 'Fundamentals',
    duration: 5,
    completed: false,
  },
  {
    id: '2',
    title: 'Body Language Basics',
    category: 'Fundamentals',
    duration: 7,
    completed: false,
  },
  {
    id: '3',
    title: 'Voice Projection Techniques',
    category: 'Voice',
    duration: 6,
    completed: false,
  },
  {
    id: '4',
    title: 'Managing Speaking Anxiety',
    category: 'Mindset',
    duration: 8,
    completed: false,
  },
];

export default function LearnScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Learn</Text>
        <Text variant="body" color="gray600">
          Daily lessons to build your skills
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.todaySection}>
          <Text variant="h3" style={styles.sectionTitle}>
            Today's Lesson
          </Text>
          <TouchableOpacity
            style={styles.todayCard}
            onPress={() => router.push('/(tabs)/learn/1')}
          >
            <View style={styles.todayBadge}>
              <Text variant="caption" color="white" weight="semibold">
                NEW
              </Text>
            </View>
            <Text variant="h3">{SAMPLE_LESSONS[0].title}</Text>
            <Text variant="bodySmall" color="gray600" style={styles.lessonMeta}>
              {SAMPLE_LESSONS[0].category} - {SAMPLE_LESSONS[0].duration} min
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.allLessons}>
          <Text variant="h3" style={styles.sectionTitle}>
            All Lessons
          </Text>
          {SAMPLE_LESSONS.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => router.push(`/(tabs)/learn/${lesson.id}`)}
            >
              <View style={styles.lessonIcon}>
                <Text variant="body" color="white">
                  {lesson.id}
                </Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text variant="body" weight="semibold">
                  {lesson.title}
                </Text>
                <Text variant="caption" color="gray600">
                  {lesson.category} - {lesson.duration} min
                </Text>
              </View>
              <View
                style={[
                  styles.statusDot,
                  lesson.completed && styles.statusCompleted,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
  },
  content: {
    padding: Spacing.lg,
  },
  todaySection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  todayCard: {
    backgroundColor: Colors.primary.deepIndigo,
    borderRadius: 16,
    padding: Spacing.lg,
  },
  todayBadge: {
    backgroundColor: Colors.primary.emerald,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  lessonMeta: {
    marginTop: Spacing.xs,
    color: Colors.neutral.gray200,
  },
  allLessons: {},
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.primary.deepTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  lessonInfo: {
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.neutral.gray200,
  },
  statusCompleted: {
    backgroundColor: Colors.primary.emerald,
  },
});
