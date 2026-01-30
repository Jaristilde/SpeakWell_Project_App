import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, Button, Card, ProgressBar } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';
import { useAuthStore } from '../../../src/store/authStore';
import { useResponsive } from '../../../src/hooks/useResponsive';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.fullName?.split(' ')[0] || 'Learner';
  const { moderateScale, responsive, isTablet, isLandscape } = useResponsive();

  // Responsive sizes
  const avatarSize = moderateScale(48);
  const statIconSize = moderateScale(40);
  const playButtonSize = moderateScale(48);
  const challengeIconSize = moderateScale(48);
  const dayDotSize = moderateScale(28);
  const quickActionIconSize = moderateScale(56);

  // Mock data for today's lesson
  const todayLesson = {
    title: 'Active Listening Techniques',
    category: 'Communication Skills',
    duration: '15 min',
    progress: 0,
    sections: 5,
  };

  // Mock data for challenge
  const challenge = {
    name: '21-Day Confidence',
    currentDay: 3,
    totalDays: 21,
    streak: 3,
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text variant="bodySmall" color="secondary">
                Good morning,
              </Text>
              <Text variant="h2">{firstName}</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <LinearGradient
                colors={Colors.gradient.primary as [string, string]}
                style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
              >
                <Text variant="h3" color="white">
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={[styles.statsRow, isLandscape && styles.statsRowLandscape]}>
            <StatCard
              icon="flame"
              value={challenge.streak}
              label="Day Streak"
              color={Colors.progress.streak}
              iconSize={statIconSize}
            />
            <StatCard
              icon="book"
              value={7}
              label="Lessons"
              color={Colors.primary.blue}
              iconSize={statIconSize}
            />
            <StatCard
              icon="time"
              value={45}
              label="Minutes"
              color={Colors.primary.purple}
              iconSize={statIconSize}
            />
          </View>

          {/* Today's Lesson Card */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="h3">Today's Lesson</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/learn')}>
                <Text variant="bodySmall" color="purple">See all</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/(tabs)/learn/1')}
            >
              <LinearGradient
                colors={Colors.gradient.primary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.lessonCard}
              >
                <View style={styles.lessonBadge}>
                  <Text variant="caption" color="white" weight="semibold">
                    NEW
                  </Text>
                </View>
                <View style={styles.lessonContent}>
                  <Text variant="caption" style={styles.lessonCategory}>
                    {todayLesson.category}
                  </Text>
                  <Text variant="h3" color="white" style={styles.lessonTitle}>
                    {todayLesson.title}
                  </Text>
                  <View style={styles.lessonMeta}>
                    <View style={styles.lessonMetaItem}>
                      <Ionicons name="time-outline" size={16} color={Colors.text.accent} />
                      <Text variant="bodySmall" color="accent">{todayLesson.duration}</Text>
                    </View>
                    <View style={styles.lessonMetaItem}>
                      <Ionicons name="layers-outline" size={16} color={Colors.text.accent} />
                      <Text variant="bodySmall" color="accent">{todayLesson.sections} sections</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.lessonAction}>
                  <View style={[styles.playButton, { width: playButtonSize, height: playButtonSize, borderRadius: playButtonSize / 2 }]}>
                    <Ionicons name="play" size={moderateScale(24)} color={Colors.primary.purple} />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 21-Day Challenge Card */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="h3">21-Day Challenge</Text>
              <TouchableOpacity>
                <Text variant="bodySmall" color="purple">View all</Text>
              </TouchableOpacity>
            </View>
            <Card variant="default" padding="lg">
              <View style={styles.challengeHeader}>
                <View style={[styles.challengeIcon, { width: challengeIconSize, height: challengeIconSize }]}>
                  <Ionicons name="trophy" size={moderateScale(24)} color={Colors.progress.streak} />
                </View>
                <View style={styles.challengeInfo}>
                  <Text variant="body" weight="semibold">{challenge.name}</Text>
                  <Text variant="caption" color="secondary">
                    Day {challenge.currentDay} of {challenge.totalDays}
                  </Text>
                </View>
                <View style={styles.challengeStreak}>
                  <Ionicons name="flame" size={20} color={Colors.progress.streak} />
                  <Text variant="body" weight="bold" color="warning">
                    {challenge.streak}
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={challenge.currentDay / challenge.totalDays}
                height={8}
                style={styles.challengeProgress}
              />
              <View style={styles.challengeDays}>
                {[...Array(7)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dayDot,
                      { width: dayDotSize, height: dayDotSize, borderRadius: dayDotSize / 2 },
                      i < challenge.currentDay && styles.dayDotComplete,
                      i === challenge.currentDay - 1 && styles.dayDotCurrent,
                    ]}
                  >
                    {i < challenge.currentDay && (
                      <Ionicons name="checkmark" size={moderateScale(12)} color={Colors.neutral.white} />
                    )}
                  </View>
                ))}
              </View>
            </Card>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>Quick Actions</Text>
            <View style={[styles.quickActions, isLandscape && styles.quickActionsLandscape]}>
              <QuickActionCard
                icon="mic"
                title="Practice"
                subtitle="Record & improve"
                onPress={() => router.push('/(tabs)/practice')}
                iconSize={quickActionIconSize}
              />
              <QuickActionCard
                icon="analytics"
                title="Progress"
                subtitle="View stats"
                onPress={() => router.push('/(tabs)/profile')}
                iconSize={quickActionIconSize}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
  color: string;
  iconSize?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color, iconSize = 40 }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: `${color}20`, width: iconSize, height: iconSize, borderRadius: iconSize / 2 }]}>
      <Ionicons name={icon} size={iconSize * 0.5} color={color} />
    </View>
    <Text variant="h3">{value}</Text>
    <Text variant="caption" color="muted">{label}</Text>
  </View>
);

interface QuickActionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconSize?: number;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  iconSize = 56,
}) => (
  <TouchableOpacity style={styles.quickActionCard} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.quickActionIcon, { width: iconSize, height: iconSize, borderRadius: iconSize / 2 }]}>
      <Ionicons name={icon} size={iconSize * 0.43} color={Colors.primary.purple} />
    </View>
    <Text variant="body" weight="semibold">{title}</Text>
    <Text variant="caption" color="muted">{subtitle}</Text>
  </TouchableOpacity>
);

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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  profileButton: {
    ...Shadows.md,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statsRowLandscape: {
    maxWidth: '80%',
    alignSelf: 'center',
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  lessonCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.lg,
  },
  lessonBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  lessonContent: {
    flex: 1,
  },
  lessonCategory: {
    color: Colors.text.accent,
    marginBottom: Spacing.xs,
  },
  lessonTitle: {
    marginBottom: Spacing.sm,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  lessonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  lessonAction: {
    marginLeft: Spacing.md,
  },
  playButton: {
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  challengeIcon: {
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.progress.streak}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.progress.streak}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  challengeProgress: {
    marginBottom: Spacing.md,
  },
  challengeDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayDot: {
    backgroundColor: Colors.progress.track,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotComplete: {
    backgroundColor: Colors.primary.purple,
  },
  dayDotCurrent: {
    backgroundColor: Colors.primary.blue,
    ...Shadows.glow,
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickActionsLandscape: {
    maxWidth: '60%',
    alignSelf: 'center',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionIcon: {
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
});
