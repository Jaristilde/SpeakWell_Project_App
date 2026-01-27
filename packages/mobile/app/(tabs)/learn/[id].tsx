import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, Card, ProgressBar } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';
import { useSpeech } from '../../../src/hooks/useSpeech';

// 5-Section Lesson Structure
const SAMPLE_LESSON = {
  id: '1',
  title: 'Active Listening Techniques',
  category: 'Communication Skills',
  totalDuration: 15,
  sections: [
    {
      id: 'intro',
      type: 'introduction',
      title: 'Introduction',
      duration: 1,
      icon: 'play-circle' as const,
      color: Colors.lesson.intro,
      content: 'Active listening is more than just hearing words—it\'s about fully engaging with the speaker, understanding their message, and responding thoughtfully. In this lesson, you\'ll learn techniques to become a more effective listener.',
    },
    {
      id: 'core',
      type: 'core_concept',
      title: 'Core Concept',
      duration: 4,
      icon: 'bulb' as const,
      color: Colors.lesson.core,
      content: 'The HEAR method is a powerful framework for active listening:\n\n• Halt: Stop what you\'re doing and give full attention\n• Engage: Show interest through body language and eye contact\n• Anticipate: Look forward to what the speaker will say next\n• Replay: Summarize what you heard to confirm understanding',
      keyPoints: [
        'Active listening requires intentional focus',
        'Non-verbal cues show engagement',
        'Summarizing prevents misunderstandings',
        'Asking clarifying questions demonstrates interest',
      ],
    },
    {
      id: 'exercise',
      type: 'exercise',
      title: 'Exercise',
      duration: 5,
      icon: 'fitness' as const,
      color: Colors.lesson.exercise,
      exerciseType: 'reflection',
      prompt: 'Think about a recent conversation where you felt truly heard. What made that experience positive?',
      options: [
        'The person maintained eye contact',
        'They asked follow-up questions',
        'They summarized what I said',
        'They didn\'t interrupt',
      ],
    },
    {
      id: 'practice',
      type: 'practice',
      title: 'Practice',
      duration: 4,
      icon: 'mic' as const,
      color: Colors.lesson.practice,
      content: 'Record yourself explaining the HEAR method in your own words. Focus on speaking clearly and organizing your thoughts.',
      practiceType: 'recording',
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary',
      duration: 1,
      icon: 'checkmark-circle' as const,
      color: Colors.lesson.summary,
      content: 'Today you learned the HEAR method for active listening: Halt, Engage, Anticipate, and Replay. Remember, being a great listener makes you a better communicator overall.',
      takeaways: [
        'Use the HEAR method in your next conversation',
        'Practice paraphrasing what others say',
        'Notice your body language when listening',
      ],
    },
  ],
};

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const { speak, stop, isSpeaking, toggle } = useSpeech({ rate: 0.85 });
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentSection = SAMPLE_LESSON.sections[currentSectionIndex];
  const progress = (currentSectionIndex + 1) / SAMPLE_LESSON.sections.length;

  const handleNextSection = () => {
    if (!completedSections.includes(currentSection.id)) {
      setCompletedSections([...completedSections, currentSection.id]);
    }
    if (currentSectionIndex < SAMPLE_LESSON.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      stop();
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      stop();
    }
  };

  const handleComplete = () => {
    stop();
    router.back();
  };

  const isLastSection = currentSectionIndex === SAMPLE_LESSON.sections.length - 1;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              stop();
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text variant="caption" color="purple">{SAMPLE_LESSON.category}</Text>
            <Text variant="body" weight="semibold" numberOfLines={1}>
              {SAMPLE_LESSON.title}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.speakerButton, isSpeaking && styles.speakerButtonActive]}
            onPress={() => toggle(currentSection.content || '')}
          >
            <Ionicons
              name={isSpeaking ? 'stop' : 'volume-high'}
              size={20}
              color={isSpeaking ? Colors.neutral.white : Colors.primary.purple}
            />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} height={4} />
          <View style={styles.sectionIndicators}>
            {SAMPLE_LESSON.sections.map((section, index) => (
              <TouchableOpacity
                key={section.id}
                onPress={() => {
                  setCurrentSectionIndex(index);
                  stop();
                }}
                style={[
                  styles.sectionDot,
                  index === currentSectionIndex && styles.sectionDotActive,
                  completedSections.includes(section.id) && styles.sectionDotCompleted,
                ]}
              >
                {completedSections.includes(section.id) && (
                  <Ionicons name="checkmark" size={10} color={Colors.neutral.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={[currentSection.color, `${currentSection.color}80`]}
              style={styles.sectionIcon}
            >
              <Ionicons name={currentSection.icon} size={28} color={Colors.neutral.white} />
            </LinearGradient>
            <View style={styles.sectionTitleContainer}>
              <Text variant="h2">{currentSection.title}</Text>
              <Text variant="caption" color="muted">
                {currentSection.duration} min • Section {currentSectionIndex + 1} of {SAMPLE_LESSON.sections.length}
              </Text>
            </View>
          </View>

          {/* Section Body - varies by type */}
          {currentSection.type === 'introduction' && (
            <Card variant="default" padding="lg" style={styles.contentCard}>
              <Text variant="body" color="secondary" style={styles.contentText}>
                {currentSection.content}
              </Text>
            </Card>
          )}

          {currentSection.type === 'core_concept' && (
            <>
              <Card variant="default" padding="lg" style={styles.contentCard}>
                <Text variant="body" color="secondary" style={styles.contentText}>
                  {currentSection.content}
                </Text>
              </Card>
              {currentSection.keyPoints && (
                <View style={styles.keyPointsSection}>
                  <Text variant="h3" style={styles.keyPointsTitle}>Key Points</Text>
                  {currentSection.keyPoints.map((point, index) => (
                    <View key={index} style={styles.keyPoint}>
                      <View style={styles.keyPointBullet}>
                        <Ionicons name="checkmark" size={14} color={Colors.primary.purple} />
                      </View>
                      <Text variant="body" color="secondary" style={styles.keyPointText}>
                        {point}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}

          {currentSection.type === 'exercise' && (
            <>
              <Card variant="gradient" padding="lg" style={styles.contentCard}>
                <Text variant="body" style={styles.exercisePrompt}>
                  {currentSection.prompt}
                </Text>
              </Card>
              {currentSection.options && (
                <View style={styles.optionsContainer}>
                  {currentSection.options.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.optionCard} activeOpacity={0.8}>
                      <View style={styles.optionCheckbox}>
                        <View style={styles.optionCheckboxInner} />
                      </View>
                      <Text variant="body" style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}

          {currentSection.type === 'practice' && (
            <Card variant="default" padding="lg" style={styles.contentCard}>
              <View style={styles.practiceHeader}>
                <Ionicons name="mic" size={32} color={Colors.primary.purple} />
                <Text variant="h3" style={styles.practiceTitle}>Recording Practice</Text>
              </View>
              <Text variant="body" color="secondary" style={styles.contentText}>
                {currentSection.content}
              </Text>
              <Button
                title="Start Recording"
                variant="gradient"
                size="lg"
                onPress={() => router.push('/(tabs)/practice/record')}
                icon={<Ionicons name="mic" size={20} color={Colors.neutral.white} />}
                style={styles.recordButton}
              />
            </Card>
          )}

          {currentSection.type === 'summary' && (
            <>
              <Card variant="default" padding="lg" style={styles.contentCard}>
                <Text variant="body" color="secondary" style={styles.contentText}>
                  {currentSection.content}
                </Text>
              </Card>
              {currentSection.takeaways && (
                <View style={styles.takeawaysSection}>
                  <Text variant="h3" style={styles.takeawaysTitle}>Your Takeaways</Text>
                  {currentSection.takeaways.map((takeaway, index) => (
                    <View key={index} style={styles.takeaway}>
                      <LinearGradient
                        colors={Colors.gradient.primary as [string, string]}
                        style={styles.takeawayNumber}
                      >
                        <Text variant="caption" color="white" weight="bold">
                          {index + 1}
                        </Text>
                      </LinearGradient>
                      <Text variant="body" color="secondary" style={styles.takeawayText}>
                        {takeaway}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.navButton, currentSectionIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePrevSection}
            disabled={currentSectionIndex === 0}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={currentSectionIndex === 0 ? Colors.text.muted : Colors.text.primary}
            />
          </TouchableOpacity>
          <Button
            title={isLastSection ? 'Complete Lesson' : 'Next Section'}
            variant="gradient"
            size="lg"
            onPress={isLastSection ? handleComplete : handleNextSection}
            style={styles.nextButton}
            icon={
              isLastSection
                ? <Ionicons name="checkmark-circle" size={20} color={Colors.neutral.white} />
                : <Ionicons name="arrow-forward" size={20} color={Colors.neutral.white} />
            }
            iconPosition="right"
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
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  speakerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerButtonActive: {
    backgroundColor: Colors.primary.purple,
  },
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  sectionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.progress.track,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDotActive: {
    backgroundColor: Colors.primary.purple,
    ...Shadows.glow,
  },
  sectionDotCompleted: {
    backgroundColor: Colors.primary.blue,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  sectionIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  contentCard: {
    marginBottom: Spacing.lg,
  },
  contentText: {
    lineHeight: 26,
  },
  keyPointsSection: {
    marginBottom: Spacing.lg,
  },
  keyPointsTitle: {
    marginBottom: Spacing.md,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  keyPointBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${Colors.primary.purple}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  keyPointText: {
    flex: 1,
  },
  exercisePrompt: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  optionCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCheckboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  optionText: {
    flex: 1,
  },
  practiceHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  practiceTitle: {
    textAlign: 'center',
  },
  recordButton: {
    marginTop: Spacing.lg,
  },
  takeawaysSection: {
    marginBottom: Spacing.lg,
  },
  takeawaysTitle: {
    marginBottom: Spacing.md,
  },
  takeaway: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  takeawayNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  takeawayText: {
    flex: 1,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.muted,
    gap: Spacing.md,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  nextButton: {
    flex: 1,
  },
});
