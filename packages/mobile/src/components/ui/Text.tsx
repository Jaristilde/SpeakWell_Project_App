import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps } from 'react-native';
import { Colors, FontSizes } from '../../constants/colors';

interface CustomTextProps extends TextProps {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'white' | 'purple' | 'blue' | 'success' | 'error' | 'warning';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const colorMap: Record<string, string> = {
  primary: Colors.text.primary,      // White
  secondary: Colors.text.secondary,  // Light purple/blue
  muted: Colors.text.muted,          // Gray
  accent: Colors.text.accent,        // Light violet
  white: Colors.neutral.white,
  purple: Colors.primary.purple,
  blue: Colors.primary.blue,
  success: Colors.semantic.success,
  error: Colors.semantic.error,
  warning: Colors.semantic.warning,
};

export const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  ...props
}) => {
  const textStyles: TextStyle[] = [
    styles.base,
    styles[variant],
    weight && styles[weight],
    align && { textAlign: align },
    { color: colorMap[color] || Colors.text.primary },
  ];

  if (style) {
    textStyles.push(style as TextStyle);
  }

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Colors.text.primary, // White by default for dark theme
  },
  display: {
    fontSize: FontSizes.display,
    fontWeight: '700',
    lineHeight: FontSizes.display * 1.1,
    letterSpacing: -1,
  },
  h1: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    lineHeight: FontSizes.xxxl * 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    lineHeight: FontSizes.xxl * 1.2,
  },
  h3: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    lineHeight: FontSizes.xl * 1.3,
  },
  body: {
    fontSize: FontSizes.md,
    fontWeight: '400',
    lineHeight: FontSizes.md * 1.5,
  },
  bodySmall: {
    fontSize: FontSizes.sm,
    fontWeight: '400',
    lineHeight: FontSizes.sm * 1.5,
  },
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: '400',
    lineHeight: FontSizes.xs * 1.4,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    lineHeight: FontSizes.sm * 1.4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});
