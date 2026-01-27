import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Shadows } from '../../constants/colors';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'gradient';
  disabled?: boolean;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'md',
  variant = 'default',
  disabled = false,
  style,
}) => {
  const sizeValue = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 72,
  };

  const buttonSize = sizeValue[size];

  // Gradient variant
  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={Colors.gradient.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.base,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            },
            Shadows.glow,
          ]}
        >
          {icon}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: Colors.background.secondary,
  },
  primary: {
    backgroundColor: Colors.primary.blue,
    ...Shadows.md,
  },
  secondary: {
    backgroundColor: Colors.primary.purple,
    ...Shadows.md,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  gradient: {
    // Handled separately
  },
  disabled: {
    opacity: 0.5,
  },
});
