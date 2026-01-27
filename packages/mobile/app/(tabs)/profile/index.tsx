import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';
import { useAuthStore } from '../../../src/store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text variant="h1" color="white">
              {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text variant="h3" style={styles.name}>
            {user?.fullName || 'User'}
          </Text>
          <Text variant="body" color="gray600">
            {user?.email || 'No email'}
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text variant="h3" style={styles.sectionTitle}>
            Your Progress
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="h2" color="deepIndigo">
                0
              </Text>
              <Text variant="caption" color="gray600">
                Day Streak
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2" color="deepTeal">
                0
              </Text>
              <Text variant="caption" color="gray600">
                Lessons Done
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2" color="emerald">
                0
              </Text>
              <Text variant="caption" color="gray600">
                Recordings
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2" color="deepIndigo">
                0
              </Text>
              <Text variant="caption" color="gray600">
                Minutes
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text variant="h3" style={styles.sectionTitle}>
            Settings
          </Text>

          <SettingsItem title="Edit Profile" onPress={() => {}} />
          <SettingsItem title="Notification Preferences" onPress={() => {}} />
          <SettingsItem title="Learning Goals" onPress={() => {}} />
          <SettingsItem title="Privacy Settings" onPress={() => {}} />
          <SettingsItem title="Help & Support" onPress={() => {}} />
        </View>

        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="lg"
          />
        </View>

        <Text variant="caption" color="gray400" align="center" style={styles.version}>
          Confidently v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsItem({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <Text variant="body">{title}</Text>
      <Text variant="body" color="gray400">
        {'>'}
      </Text>
    </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.deepIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  name: {
    marginBottom: Spacing.xs,
  },
  statsSection: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  settingsSection: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  logoutSection: {
    marginBottom: Spacing.lg,
  },
  version: {
    marginTop: Spacing.md,
  },
});
