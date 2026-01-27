import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, Button, Card } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';

const PRACTICE_PROMPTS = [
  {
    id: '1',
    title: 'Self Introduction',
    description: 'Introduce yourself in 30 seconds',
    duration: 30,
    icon: 'person' as const,
    difficulty: 'Easy',
  },
  {
    id: '2',
    title: 'Elevator Pitch',
    description: 'Describe your work or passion project',
    duration: 60,
    icon: 'rocket' as const,
    difficulty: 'Medium',
  },
  {
    id: '3',
    title: 'Story Time',
    description: 'Share a memorable experience',
    duration: 90,
    icon: 'book' as const,
    difficulty: 'Medium',
  },
  {
    id: '4',
    title: 'Opinion Piece',
    description: 'Share your view on a topic you care about',
    duration: 120,
    icon: 'chatbubble' as const,
    difficulty: 'Hard',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return Colors.primary.blue;
    case 'Medium':
      return Colors.primary.purple;
    case 'Hard':
      return Colors.primary.deepPurple;
    default:
      return Colors.primary.purple;
  }
};

export default function PracticeScreen() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleStartRecording = () => {
    if (selectedPrompt) {
      router.push({
        pathname: '/(tabs)/practice/record',
        params: { promptId: selectedPrompt },
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="h2">Practice</Text>
            <Text variant="bodySmall" color="secondary">
              Record and improve your speaking skills
            </Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h3" color="purple">12</Text>
              <Text variant="caption" color="muted">Recordings</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Tips */}
          <Card variant="gradient" padding="md" style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={20} color={Colors.primary.purple} />
              <Text variant="body" weight="semibold">Quick Tip</Text>
            </View>
            <Text variant="bodySmall" color="secondary">
              Speak at a natural pace. It's better to speak slowly and clearly than to rush.
            </Text>
          </Card>

          {/* Prompts Section */}
          <View style={styles.section}>
            <Text variant="h3" style={styles.sectionTitle}>Choose a Prompt</Text>
            <View style={styles.promptList}>
              {PRACTICE_PROMPTS.map((prompt) => {
                const isSelected = selectedPrompt === prompt.id;
                return (
                  <TouchableOpacity
                    key={prompt.id}
                    style={[styles.promptCard, isSelected && styles.promptCardSelected]}
                    onPress={() => setSelectedPrompt(prompt.id)}
                    activeOpacity={0.8}
                  >
                    {isSelected && (
                      <LinearGradient
                        colors={Colors.gradient.primary as [string, string]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                      />
                    )}
                    <View style={[
                      styles.promptIcon,
                      isSelected && styles.promptIconSelected,
                    ]}>
                      <Ionicons
                        name={prompt.icon}
                        size={24}
                        color={isSelected ? Colors.neutral.white : Colors.primary.purple}
                      />
                    </View>
                    <View style={styles.promptContent}>
                      <View style={styles.promptHeader}>
                        <Text
                          variant="body"
                          weight="semibold"
                          color={isSelected ? 'white' : 'primary'}
                        >
                          {prompt.title}
                        </Text>
                        <View style={[
                          styles.difficultyBadge,
                          { backgroundColor: `${getDifficultyColor(prompt.difficulty)}30` },
                        ]}>
                          <Text
                            variant="caption"
                            style={{ color: getDifficultyColor(prompt.difficulty) }}
                            weight="semibold"
                          >
                            {prompt.difficulty}
                          </Text>
                        </View>
                      </View>
                      <Text
                        variant="bodySmall"
                        color={isSelected ? 'accent' : 'secondary'}
                      >
                        {prompt.description}
                      </Text>
                      <View style={styles.promptMeta}>
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color={isSelected ? Colors.text.accent : Colors.text.muted}
                        />
                        <Text
                          variant="caption"
                          color={isSelected ? 'accent' : 'muted'}
                        >
                          {prompt.duration} seconds
                        </Text>
                      </View>
                    </View>
                    {isSelected && (
                      <View style={styles.selectedCheck}>
                        <Ionicons name="checkmark" size={16} color={Colors.neutral.white} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Start Recording"
            variant="gradient"
            size="lg"
            onPress={handleStartRecording}
            disabled={!selectedPrompt}
            icon={<Ionicons name="mic" size={20} color={Colors.neutral.white} />}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  tipsCard: {
    marginBottom: Spacing.xl,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  promptList: {
    gap: Spacing.md,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  promptCardSelected: {
    borderColor: Colors.primary.blue,
  },
  promptIcon: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  promptIconSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  promptContent: {
    flex: 1,
    zIndex: 1,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  promptMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  selectedCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.muted,
  },
});
