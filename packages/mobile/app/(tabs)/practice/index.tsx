import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';

const PRACTICE_PROMPTS = [
  {
    id: '1',
    title: 'Self Introduction',
    description: 'Introduce yourself in 30 seconds',
    duration: 30,
  },
  {
    id: '2',
    title: 'Elevator Pitch',
    description: 'Describe your work or passion project',
    duration: 60,
  },
  {
    id: '3',
    title: 'Story Time',
    description: 'Share a memorable experience',
    duration: 90,
  },
  {
    id: '4',
    title: 'Opinion Piece',
    description: 'Share your view on a topic you care about',
    duration: 120,
  },
];

export default function PracticeScreen() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Practice</Text>
        <Text variant="body" color="gray600">
          Choose a prompt and start recording
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="h3" style={styles.sectionTitle}>
          Today's Prompts
        </Text>

        {PRACTICE_PROMPTS.map((prompt) => (
          <TouchableOpacity
            key={prompt.id}
            style={[
              styles.promptCard,
              selectedPrompt === prompt.id && styles.promptCardSelected,
            ]}
            onPress={() => setSelectedPrompt(prompt.id)}
          >
            <View style={styles.promptHeader}>
              <Text
                variant="body"
                weight="semibold"
                color={selectedPrompt === prompt.id ? 'white' : 'charcoal'}
              >
                {prompt.title}
              </Text>
              <View style={styles.durationBadge}>
                <Text variant="caption" color="deepIndigo" weight="semibold">
                  {prompt.duration}s
                </Text>
              </View>
            </View>
            <Text
              variant="bodySmall"
              color={selectedPrompt === prompt.id ? 'gray200' : 'gray600'}
            >
              {prompt.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Recording"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/practice/record',
              params: { promptId: selectedPrompt },
            })
          }
          disabled={!selectedPrompt}
          size="lg"
        />
      </View>
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
    flex: 1,
    padding: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  promptCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  promptCardSelected: {
    backgroundColor: Colors.primary.deepIndigo,
    borderColor: Colors.primary.deepIndigo,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  durationBadge: {
    backgroundColor: Colors.neutral.gray100,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
});
