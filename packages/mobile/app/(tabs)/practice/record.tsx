import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Text, Button, Card } from '../../../src/components/ui';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/colors';
import { useResponsive } from '../../../src/hooks/useResponsive';

const PRACTICE_PROMPTS: Record<string, { title: string; description: string; duration: number }> = {
  '1': { title: 'Self Introduction', description: 'Introduce yourself in 30 seconds', duration: 30 },
  '2': { title: 'Elevator Pitch', description: 'Describe your work or passion project', duration: 60 },
  '3': { title: 'Story Time', description: 'Share a memorable experience', duration: 90 },
  '4': { title: 'Opinion Piece', description: 'Share your view on a topic you care about', duration: 120 },
};

export default function RecordScreen() {
  const { promptId } = useLocalSearchParams<{ promptId: string }>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveformAnims = useRef([...Array(20)].map(() => new Animated.Value(0.3))).current;
  const { moderateScale, fontScale, isTablet } = useResponsive();

  const prompt = PRACTICE_PROMPTS[promptId || '1'] || PRACTICE_PROMPTS['1'];

  // Responsive sizes
  const timerFontSize = fontScale(72);
  const recordButtonOuter = moderateScale(88);
  const recordButtonInner = moderateScale(72);
  const cancelButtonSize = moderateScale(44);
  const waveformHeight = moderateScale(60);
  const waveformBarHeight = moderateScale(40);
  const permissionIconSize = moderateScale(80);

  useEffect(() => {
    requestPermissions();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recording) recording.stopAndUnloadAsync();
    };
  }, []);

  // Pulsing animation for recording indicator
  useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      pulse.start();

      // Waveform animation
      const waveAnimations = waveformAnims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.3 + Math.random() * 0.7,
              duration: 200 + Math.random() * 300,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 200 + Math.random() * 300,
              useNativeDriver: true,
            }),
          ])
        )
      );
      waveAnimations.forEach(a => a.start());

      return () => {
        pulse.stop();
        waveAnimations.forEach(a => a.stop());
      };
    }
  }, [isRecording]);

  const requestPermissions = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      setHasPermission(granted);
      if (granted) {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      }
    } catch (error) {
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      router.replace({
        pathname: '/(tabs)/practice/feedback',
        params: { duration: recordingTime.toString(), promptId: promptId || '1', promptTitle: prompt.title, audioUri: uri || '' },
      });
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancel = async () => {
    if (recording && isRecording) {
      try { await recording.stopAndUnloadAsync(); } catch {}
    }
    router.back();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.permissionContainer}>
            <Text variant="body" color="secondary">Loading...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.permissionContainer}>
            <View style={[styles.permissionIcon, { width: permissionIconSize, height: permissionIconSize, borderRadius: permissionIconSize / 2 }]}>
              <Ionicons name="mic-off" size={moderateScale(40)} color={Colors.primary.purple} />
            </View>
            <Text variant="h3" align="center">Microphone Access Required</Text>
            <Text variant="body" color="secondary" align="center" style={styles.permissionText}>
              To practice speaking, we need access to your microphone.
            </Text>
            <Button title="Grant Permission" variant="gradient" onPress={requestPermissions} size="lg" />
            <Button title="Go Back" variant="ghost" onPress={() => router.back()} size="md" />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.cancelButton, { width: cancelButtonSize, height: cancelButtonSize, borderRadius: cancelButtonSize / 2 }]}
            onPress={handleCancel}
          >
            <Ionicons name="close" size={moderateScale(24)} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text variant="body" weight="semibold">Recording</Text>
          <View style={{ width: cancelButtonSize }} />
        </View>

        <View style={styles.content}>
          {/* Prompt Card */}
          <Card variant="gradient" padding="lg" style={styles.promptCard}>
            <Text variant="label" color="accent" align="center">YOUR PROMPT</Text>
            <Text variant="h2" align="center" style={styles.promptTitle}>{prompt.title}</Text>
            <Text variant="body" color="secondary" align="center">{prompt.description}</Text>
          </Card>

          {/* Timer */}
          <View style={styles.timerContainer}>
            {isRecording && (
              <Animated.View style={[styles.recordingIndicator, { transform: [{ scale: pulseAnim }] }]}>
                <View style={styles.recordingDot} />
              </Animated.View>
            )}
            <Text variant="display" style={[styles.timerText, { fontSize: timerFontSize }]}>{formatTime(recordingTime)}</Text>
            <Text variant="bodySmall" color="muted">
              {isRecording ? 'Recording...' : 'Ready to record'}
            </Text>
          </View>

          {/* Waveform */}
          {isRecording && (
            <View style={[styles.waveformContainer, { height: waveformHeight }]}>
              {waveformAnims.map((anim, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.waveformBar,
                    { height: waveformBarHeight, transform: [{ scaleY: anim }] },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Footer with Record Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.recordButtonContainer}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isRecording ? [Colors.semantic.error, '#DC2626'] : Colors.gradient.primary as [string, string]}
              style={[styles.recordButtonOuter, { width: recordButtonOuter, height: recordButtonOuter, borderRadius: recordButtonOuter / 2 }]}
            >
              <View style={[styles.recordButtonInner, { width: recordButtonInner, height: recordButtonInner, borderRadius: recordButtonInner / 2 }, isRecording && styles.recordButtonInnerRecording]}>
                {isRecording ? (
                  <Ionicons name="stop" size={moderateScale(32)} color={Colors.neutral.white} />
                ) : (
                  <Ionicons name="mic" size={moderateScale(32)} color={Colors.neutral.white} />
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <Text variant="bodySmall" color="muted" align="center" style={styles.hint}>
            {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
          </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  cancelButton: {
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  promptCard: {
    width: '100%',
    marginBottom: Spacing.xxl,
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
    top: -30,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${Colors.semantic.error}30`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.semantic.error,
  },
  timerText: {
    fontWeight: '200',
    color: Colors.text.primary,
    fontVariant: ['tabular-nums'],
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  waveformBar: {
    width: 4,
    backgroundColor: Colors.primary.purple,
    borderRadius: 2,
  },
  footer: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  recordButtonContainer: {
    ...Shadows.glow,
  },
  recordButtonOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonInner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonInnerRecording: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    backgroundColor: `${Colors.primary.purple}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  permissionText: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
});
