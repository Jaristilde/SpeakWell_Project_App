import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';
import { useSpeech } from '../../../src/hooks/useSpeech';

const SAMPLE_LESSON = {
  id: '1',
  title: 'Introduction to Confident Speaking',
  category: 'Fundamentals',
  duration: 5,
  content: {
    introduction:
      'Confident speaking is a skill that can be learned and improved with practice. In this lesson, we will cover the foundational elements that make a speaker appear confident and credible.',
    tips: [
      'Maintain eye contact with your audience',
      'Speak at a measured pace, avoid rushing',
      'Use pauses effectively for emphasis',
      'Keep your body language open and relaxed',
    ],
    exercise:
      'Record yourself introducing yourself in 30 seconds. Focus on maintaining steady eye contact with the camera and speaking clearly.',
  },
};

// Speaker Icon Component
const SpeakerIcon = ({ isPlaying }: { isPlaying: boolean }) => (
  <View style= { styles.speakerIconContainer } >
  {
    isPlaying?(
      // Stop icon (square)
      <View style = { styles.stopIcon } />
    ): (
        // Speaker icon
        <View style = {styles.speakerIcon} >
  <View style={ styles.speakerBody } />
    < View style = { styles.speakerWave1 } />
      <View style={ styles.speakerWave2 } />
        </View>
    )}
</View>
);

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { speak, stop, isSpeaking, toggle } = useSpeech({ rate: 0.85 });

  // Combine all text content for TTS
  const fullLessonText = `
    ${SAMPLE_LESSON.title}. 
    ${SAMPLE_LESSON.content.introduction}
    Key Tips: ${SAMPLE_LESSON.content.tips.join('. ')}.
    Practice Exercise: ${SAMPLE_LESSON.content.exercise}
  `;

  const handleSpeakerPress = () => {
    toggle(fullLessonText);
  };

  return (
    <SafeAreaView style= { styles.container } >
    <ScrollView contentContainerStyle={ styles.content }>
      <View style={ styles.header }>
        <View style={ styles.headerRow }>
          <View style={ styles.headerLeft }>
            <Text variant="caption" color = "deepTeal" weight = "semibold" >
              { SAMPLE_LESSON.category }
              </Text>
              < Text variant = "h2" style = { styles.title } >
                { SAMPLE_LESSON.title }
                </Text>
                < Text variant = "bodySmall" color = "gray600" >
                  { SAMPLE_LESSON.duration } minutes
                    </Text>
                    </View>

  {/* Speaker Button */ }
  <TouchableOpacity
              style={
    [
      styles.speakerButton,
      isSpeaking && styles.speakerButtonActive,
    ]
  }
  onPress = { handleSpeakerPress }
  activeOpacity = { 0.7}
    >
    <SpeakerIcon isPlaying={ isSpeaking } />
      < Text
  variant = "caption"
  color = { isSpeaking? 'white': 'deepIndigo' }
  weight = "semibold"
    >
    { isSpeaking? 'Stop': 'Listen' }
    </Text>
    </TouchableOpacity>
    </View>
    </View>

    < View style = { styles.section } >
      <View style={ styles.sectionHeader }>
        <Text variant="h3" style = { styles.sectionTitle } >
          Introduction
          </Text>
          < TouchableOpacity
  style = { styles.miniSpeakerButton }
  onPress = {() => speak(SAMPLE_LESSON.content.introduction)
}
            >
  <Text variant="caption" color = "deepIndigo" >🔊</Text>
    </TouchableOpacity>
    </View>
    < Text variant = "body" color = "gray600" >
      { SAMPLE_LESSON.content.introduction }
      </Text>
      </View>

      < View style = { styles.section } >
        <Text variant="h3" style = { styles.sectionTitle } >
          Key Tips
            </Text>
{
  SAMPLE_LESSON.content.tips.map((tip, index) => (
    <TouchableOpacity 
              key= { index } 
              style = { styles.tipItem }
              onPress = {() => speak(tip)}
activeOpacity = { 0.7}
  >
  <View style={ styles.tipNumber }>
    <Text variant="bodySmall" color = "white" weight = "semibold" >
      { index + 1}
</Text>
  </View>
  < Text variant = "body" style = { styles.tipText } >
    { tip }
    </Text>
    < Text style = { styles.tipSpeaker } >🔊</Text>
      </TouchableOpacity>
          ))}
</View>

  < View style = { styles.section } >
    <Text variant="h3" style = { styles.sectionTitle } >
      Practice Exercise
        </Text>
        < TouchableOpacity
style = { styles.exerciseCard }
onPress = {() => speak(SAMPLE_LESSON.content.exercise)}
activeOpacity = { 0.8}
  >
  <View style={ styles.exerciseHeader }>
    <Text variant="body" > { SAMPLE_LESSON.content.exercise } </Text>
      < Text style = { styles.exerciseSpeaker } >🔊</Text>
        </View>
        </TouchableOpacity>
        </View>
        </ScrollView>

        < View style = { styles.footer } >
          <Button
          title="Start Practice"
onPress = {() => router.push('/(tabs)/practice')}
size = "lg"
  />
  <Button
          title="Mark as Complete"
onPress = {() => {
  stop(); // Stop any ongoing speech when leaving
  router.back();
}}
variant = "outline"
size = "lg"
  />
  </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    marginVertical: Spacing.sm,
  },
  speakerButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.deepIndigo + '15',
    borderRadius: 16,
    padding: Spacing.md,
    minWidth: 70,
    gap: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  speakerButtonActive: {
    backgroundColor: Colors.primary.deepIndigo,
    borderColor: Colors.primary.deepTeal,
  },
  speakerIconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIcon: {
    width: 16,
    height: 16,
    backgroundColor: Colors.neutral.white,
    borderRadius: 2,
  },
  speakerIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  speakerBody: {
    width: 12,
    height: 10,
    backgroundColor: Colors.primary.deepIndigo,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  speakerWave1: {
    width: 4,
    height: 8,
    borderRightWidth: 2,
    borderRightColor: Colors.primary.deepIndigo,
    borderRadius: 4,
    position: 'absolute',
    right: 4,
  },
  speakerWave2: {
    width: 6,
    height: 14,
    borderRightWidth: 2,
    borderRightColor: Colors.primary.deepIndigo,
    borderRadius: 6,
    position: 'absolute',
    right: 0,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  miniSpeakerButton: {
    padding: Spacing.xs,
    borderRadius: 8,
    backgroundColor: Colors.primary.deepIndigo + '10',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    backgroundColor: Colors.neutral.gray100,
    padding: Spacing.sm,
    borderRadius: 12,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.deepIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  tipText: {
    flex: 1,
  },
  tipSpeaker: {
    fontSize: 16,
    marginLeft: Spacing.sm,
    opacity: 0.6,
  },
  exerciseCard: {
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 12,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.emerald,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exerciseSpeaker: {
    fontSize: 18,
    marginLeft: Spacing.sm,
    opacity: 0.6,
  },
  footer: {
    padding: Spacing.lg,
    gap: Spacing.sm,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray200,
  },
});
