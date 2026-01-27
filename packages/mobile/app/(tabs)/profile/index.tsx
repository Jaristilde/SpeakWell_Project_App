import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, Button, Card } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';
import { useAuthStore } from '../../../src/store/authStore';

const SETTINGS_ITEMS = [
  { id: 'edit', title: 'Edit Profile', icon: 'person-outline' as const },
  { id: 'notifications', title: 'Notifications', icon: 'notifications-outline' as const },
  { id: 'goals', title: 'Learning Goals', icon: 'flag-outline' as const },
  { id: 'privacy', title: 'Privacy Settings', icon: 'shield-outline' as const },
  { id: 'help', title: 'Help & Support', icon: 'help-circle-outline' as const },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const firstName = user?.fullName?.split(' ')[0] || 'User';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/welcome');
        },
      },
    ]);
  };

  // Mock stats
  const stats = [
    { label: 'Day Streak', value: 7, icon: 'flame' as const, color: Colors.progress.streak },
    { label: 'Lessons', value: 12, icon: 'book' as const, color: Colors.primary.blue },
    { label: 'Recordings', value: 23, icon: 'mic' as const, color: Colors.primary.purple },
    { label: 'Minutes', value: 180, icon: 'time' as const, color: Colors.primary.deepPurple },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={Colors.gradient.primary as [string, string]}
              style={styles.avatar}
            >
              <Text variant="display" color="white">
                {firstName.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>
            <Text variant="h2" style={styles.name}>{user?.fullName || 'User'}</Text>
            <Text variant="body" color="secondary">{user?.email || 'No email'}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color={Colors.primary.purple} />
              <Text variant="bodySmall" color="purple">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsSection}>
            <Text variant="h3" style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                  </View>
                  <Text variant="h3">{stat.value}</Text>
                  <Text variant="caption" color="muted">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements Preview */}
          <Card variant="gradient" padding="lg" style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <Ionicons name="trophy" size={24} color={Colors.progress.streak} />
              <View style={styles.achievementInfo}>
                <Text variant="body" weight="semibold">Weekly Champion</Text>
                <Text variant="caption" color="secondary">
                  Complete 7 days in a row
                </Text>
              </View>
              <View style={styles.achievementBadge}>
                <Text variant="caption" color="white" weight="bold">5/7</Text>
              </View>
            </View>
          </Card>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <Text variant="h3" style={styles.sectionTitle}>Settings</Text>
            <Card variant="default" padding="none">
              {SETTINGS_ITEMS.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingsItem,
                    index < SETTINGS_ITEMS.length - 1 && styles.settingsItemBorder,
                  ]}
                  onPress={() => {}}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={styles.settingsIcon}>
                      <Ionicons name={item.icon} size={20} color={Colors.primary.purple} />
                    </View>
                    <Text variant="body">{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.text.muted} />
                </TouchableOpacity>
              ))}
            </Card>
          </View>

          {/* Logout Button */}
          <Button
            title="Logout"
            variant="outline"
            size="lg"
            onPress={handleLogout}
            icon={<Ionicons name="log-out-outline" size={20} color={Colors.primary.purple} />}
            style={styles.logoutButton}
          />

          {/* App Version */}
          <Text variant="caption" color="muted" align="center" style={styles.version}>
            SpeakWell v1.0.0
          </Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.glow,
  },
  name: {
    marginBottom: Spacing.xs,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: `${Colors.primary.purple}20`,
    borderRadius: BorderRadius.full,
  },
  statsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  achievementCard: {
    marginBottom: Spacing.xl,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementBadge: {
    backgroundColor: Colors.primary.purple,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  settingsSection: {
    marginBottom: Spacing.xl,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  settingsItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.muted,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: `${Colors.primary.purple}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginBottom: Spacing.lg,
  },
  version: {
    marginTop: Spacing.md,
  },
});
