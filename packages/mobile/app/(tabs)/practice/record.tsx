import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { Text } from '../../../src/components/ui/Text';
import { Button } from '../../../src/components/ui/Button';
import { Colors, Spacing } from '../../../src/constants/colors';

const PRACTICE_PROMPTS: Record<string, { title: string; description: string; duration: number }> = {
  '1': { title: 'Self Introduction', description: 'Introduce yourself in 30 seconds', duration: 30 },
  '2': { title: 'Elevator Pitch', description: 'Describe your work or passion project', duration: 60 },
  '3': { title: 'Story Time', description: 'Share a memorable experience', duration: 90 },
  '4': { title: 'Opinion Piece', description: 'Share your view on a topic you care about', duration: 120 },
};

export default function RecordScreen() {
  const router = useRouter();
  const { promptId } = useLocalSearchParams<{ promptId: string }>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const prompt = PRACTICE_PROMPTS[promptId || '1'] || PRACTICE_PROMPTS['1'];

  useEffect(() => {
    requestPermissions();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Clean up recording if component unmounts
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  // Pulsing animation for recording indicator
  useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isRecording, pulseAnim]);

  const requestPermissions = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      setHasPermission(granted);

      if (granted) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      // Create a new recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Stop the recording
      await recording.stopAndUnloadAsync();

      // Get the recording URI
      const uri = recording.getURI();
      console.log('Recording saved at:', uri);

      // Navigate to feedback screen
      router.replace({
        pathname: '/(tabs)/practice/feedback',
        params: {
          duration: recordingTime.toString(),
          promptId: promptId || '1',
          promptTitle: prompt.title,
          audioUri: uri || '',
        },
      });
    } catch (error) {
      console.error('Failed to stop recording:', error);
      alert('Failed to save recording. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancel = async () => {
    if (recording && isRecording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
    router.back();
  };

  // Permission loading state
  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text variant="body">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Permission denied state
  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIcon}>
            <Text style={styles.permissionIconText}>🎤</Text>
          </View>
          <Text variant="h3" align="center">
            Microphone Access Required
          </Text>
          <Text variant="body" color="gray600" align="center" style={styles.permissionText}>
            To practice speaking, we need access to your microphone. Please enable it in your device settings.
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermissions}
            size="lg"
          />
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="ghost"
            size="md"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text variant="body" color="deepIndigo" weight="semibold">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Prompt display */}
        <View style={styles.promptCard}>
          <Text variant="caption" color="gray600" align="center">
            YOUR PROMPT
          </Text>
          <Text variant="h2" align="center" style={styles.promptTitle}>
            {prompt.title}
          </Text>
          <Text variant="body" color="gray600" align="center">
            {prompt.description}
          </Text>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          {isRecording && (
            <Animated.View
              style={[
                styles.recordingIndicator,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
          )}
          <Text variant="h1" style={styles.timerText}>
            {formatTime(recordingTime)}
          </Text>
          <Text variant="caption" color="gray600">
            {isRecording ? 'Recording...' : 'Ready to record'}
          </Text>
        </View>

        {/* Waveform placeholder */}
        {isRecording && (
          <View style={styles.waveformContainer}>
            {[...Array(20)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveformBar,
                  {
                    height: 10 + Math.random() * 40,
                    opacity: 0.3 + Math.random() * 0.7,
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonRecording,
          ]}
          onPress={isRecording ? stopRecording : startRecording}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.recordButtonInner,
              isRecording && styles.recordButtonInnerRecording,
            ]}
          />
        </TouchableOpacity>
        <Text variant="body" color="gray600" align="center" style={styles.hint}>
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: Spacing.lg,
  },
  cancelButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  promptCard: {
    backgroundColor: Colors.neutral.gray100,
    padding: Spacing.xl,
    borderRadius: 16,
    width: '100%',
    marginBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  promptTitle: {
    marginVertical: Spacing.sm,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  recordingIndicator: {
    position: 'absolute',
    top: -40,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.semantic.error,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '200',
    color: Colors.neutral.charcoal,
    fontVariant: ['tabular-nums'],
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 3,
  },
  waveformBar: {
    width: 4,
    backgroundColor: Colors.primary.deepIndigo,
    borderRadius: 2,
  },
  footer: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: Colors.primary.deepIndigo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonRecording: {
    borderColor: Colors.semantic.error,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary.deepIndigo,
  },
  recordButtonInnerRecording: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: Colors.semantic.error,
  },
  hint: {
    marginTop: Spacing.sm,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  permissionIconText: {
    fontSize: 40,
  },
  permissionText: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
});
