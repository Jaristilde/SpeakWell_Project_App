import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Spacing, FontSizes } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.neutral.white : Colors.primary.deepIndigo}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary.deepIndigo,
  },
  secondary: {
    backgroundColor: Colors.primary.deepTeal,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary.deepIndigo,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  smSize: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  mdSize: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  lgSize: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.neutral.white,
  },
  secondaryText: {
    color: Colors.neutral.white,
  },
  outlineText: {
    color: Colors.primary.deepIndigo,
  },
  ghostText: {
    color: Colors.primary.deepIndigo,
  },
  smText: {
    fontSize: FontSizes.sm,
  },
  mdText: {
    fontSize: FontSizes.md,
  },
  lgText: {
    fontSize: FontSizes.lg,
  },
  disabledText: {
    opacity: 0.7,
  },
});
