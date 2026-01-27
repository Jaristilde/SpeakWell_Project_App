import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps } from 'react-native';
import { Colors, FontSizes } from '../../constants/colors';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption';
  color?: keyof typeof Colors.neutral | keyof typeof Colors.primary;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  color,
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
  ];

  if (color) {
    const colorValue =
      (Colors.neutral as Record<string, string>)[color] ||
      (Colors.primary as Record<string, string>)[color];
    if (colorValue) {
      textStyles.push({ color: colorValue });
    }
  }

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
    color: Colors.neutral.charcoal,
  },
  h1: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    lineHeight: FontSizes.xxxl * 1.2,
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
