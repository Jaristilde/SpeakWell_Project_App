import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, BorderRadius } from '../../constants/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  style?: ViewStyle;
  showGradient?: boolean;
  trackColor?: string;
  fillColor?: string;
  animated?: boolean;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  style,
  showGradient = true,
  trackColor = Colors.progress.track,
  fillColor = Colors.progress.fill,
  animated = true,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animated
        ? withTiming(`${clampedProgress * 100}%`, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        : `${clampedProgress * 100}%`,
    };
  }, [clampedProgress, animated]);

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }, style]}>
      {showGradient ? (
        <AnimatedLinearGradient
          colors={Colors.gradient.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { height }, animatedStyle]}
        />
      ) : (
        <Animated.View
          style={[
            styles.fill,
            { height, backgroundColor: fillColor },
            animatedStyle,
          ]}
        />
      )}
    </View>
  );
};

// Simple step progress for onboarding
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  style,
}) => {
  return (
    <View style={[styles.stepContainer, style]}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            index < currentStep && styles.stepDotActive,
            index === currentStep - 1 && styles.stepDotCurrent,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.progress.track,
  },
  stepDotActive: {
    backgroundColor: Colors.primary.purple,
  },
  stepDotCurrent: {
    width: 24,
    backgroundColor: Colors.primary.blue,
  },
});
