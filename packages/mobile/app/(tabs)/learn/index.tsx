import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, Card, ProgressBar } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';

const SAMPLE_LESSONS = [
  {
    id: '1',
    title: 'Active Listening Techniques',
    category: 'Communication Skills',
    duration: 15,
    completed: false,
    progress: 0,
    icon: 'ear' as const,
  },
  {
    id: '2',
    title: 'Body Language Mastery',
    category: 'Non-Verbal Communication',
    duration: 12,
    completed: false,
    progress: 0,
    icon: 'body' as const,
  },
  {
    id: '3',
    title: 'Voice Projection Techniques',
    category: 'Voice & Delivery',
    duration: 10,
    completed: true,
    progress: 100,
    icon: 'volume-high' as const,
  },
  {
    id: '4',
    title: 'Managing Speaking Anxiety',
    category: 'Mindset & Confidence',
    duration: 15,
    completed: true,
    progress: 100,
    icon: 'heart' as const,
  },
];

export default function LearnScreen() {
  const todayLesson = SAMPLE_LESSONS[0];
  const completedCount = SAMPLE_LESSONS.filter(l => l.completed).length;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="h2">Learn</Text>
            <Text variant="bodySmall" color="secondary">
              Daily micro-lessons to build your skills
            </Text>
          </View>
          <View style={styles.progressBadge}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.primary.purple} />
            <Text variant="bodySmall" color="purple" weight="semibold">
              {completedCount}/{SAMPLE_LESSONS.length}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Today's Lesson */}
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>Today's Lesson</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push(`/(tabs)/learn/${todayLesson.id}`)}
            >
              <LinearGradient
                colors={Colors.gradient.primary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.todayCard}
              >
                <View style={styles.todayBadge}>
                  <Text variant="caption" color="white" weight="semibold">NEW</Text>
                </View>
                <View style={styles.todayContent}>
                  <Text variant="caption" style={styles.todayCategory}>
                    {todayLesson.category}
                  </Text>
                  <Text variant="h3" color="white" style={styles.todayTitle}>
                    {todayLesson.title}
                  </Text>
                  <View style={styles.todayMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={14} color={Colors.text.accent} />
                      <Text variant="caption" color="accent">{todayLesson.duration} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="layers-outline" size={14} color={Colors.text.accent} />
                      <Text variant="caption" color="accent">5 sections</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.playButton}>
                  <Ionicons name="play" size={24} color={Colors.primary.purple} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* All Lessons */}
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>All Lessons</Text>
            <View style={styles.lessonList}>
              {SAMPLE_LESSONS.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  onPress={() => router.push(`/(tabs)/learn/${lesson.id}`)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.lessonIcon,
                    lesson.completed && styles.lessonIconCompleted,
                  ]}>
                    {lesson.completed ? (
                      <Ionicons name="checkmark" size={20} color={Colors.neutral.white} />
                    ) : (
                      <Ionicons name={lesson.icon} size={20} color={Colors.primary.purple} />
                    )}
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text variant="body" weight="semibold">{lesson.title}</Text>
                    <Text variant="caption" color="muted">
                      {lesson.category} • {lesson.duration} min
                    </Text>
                    {!lesson.completed && lesson.progress > 0 && (
                      <ProgressBar
                        progress={lesson.progress / 100}
                        height={4}
                        style={styles.lessonProgress}
                      />
                    )}
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.text.muted}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.primary.purple}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  todayCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.lg,
  },
  todayBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  todayContent: {
    flex: 1,
  },
  todayCategory: {
    color: Colors.text.accent,
    marginBottom: Spacing.xs,
  },
  todayTitle: {
    marginBottom: Spacing.sm,
  },
  todayMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
    ...Shadows.md,
  },
  lessonList: {
    gap: Spacing.sm,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  lessonIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIconCompleted: {
    backgroundColor: Colors.semantic.success,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonProgress: {
    marginTop: Spacing.xs,
  },
});
