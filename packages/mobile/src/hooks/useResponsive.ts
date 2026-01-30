/**
 * Responsive utilities hook for SpeakWell Mobile App
 * Handles screen dimensions, orientation, and responsive scaling
 */

import { useWindowDimensions, ScaledSize, PixelRatio } from 'react-native';
import { useMemo } from 'react';

// Base dimensions (iPhone 14 Pro as reference)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Breakpoints for device types
export const Breakpoints = {
  smallPhone: 320,   // iPhone SE, older phones
  phone: 375,        // Standard phones
  largePhone: 428,   // Plus/Max phones
  tablet: 768,       // iPad Mini, small tablets
  largeTablet: 1024, // iPad Air, standard tablets
  desktop: 1366,     // iPad Pro, large tablets
} as const;

export type DeviceType = 'smallPhone' | 'phone' | 'largePhone' | 'tablet' | 'largeTablet';
export type Orientation = 'portrait' | 'landscape';

interface ResponsiveInfo {
  // Dimensions
  width: number;
  height: number;

  // Device info
  deviceType: DeviceType;
  isSmallPhone: boolean;
  isPhone: boolean;
  isLargePhone: boolean;
  isTablet: boolean;
  isLargeTablet: boolean;

  // Orientation
  orientation: Orientation;
  isPortrait: boolean;
  isLandscape: boolean;

  // Scaling functions
  wp: (percentage: number) => number;  // Width percentage
  hp: (percentage: number) => number;  // Height percentage
  scale: (size: number) => number;     // Scale based on width
  verticalScale: (size: number) => number; // Scale based on height
  moderateScale: (size: number, factor?: number) => number; // Moderate scaling
  fontScale: (size: number) => number; // Font scaling with pixel ratio consideration

  // Responsive values helper
  responsive: <T>(values: { default: T; tablet?: T; largeTablet?: T; landscape?: T }) => T;

  // Grid helpers
  columns: (count: number, gap?: number) => number; // Calculate column width
}

export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const orientation: Orientation = width > height ? 'landscape' : 'portrait';
    const isPortrait = orientation === 'portrait';
    const isLandscape = orientation === 'landscape';

    // Determine device type based on the shorter dimension (to handle rotation)
    const shortDimension = Math.min(width, height);
    const longDimension = Math.max(width, height);

    let deviceType: DeviceType = 'phone';
    if (shortDimension < Breakpoints.smallPhone) {
      deviceType = 'smallPhone';
    } else if (shortDimension >= Breakpoints.tablet) {
      deviceType = shortDimension >= Breakpoints.largeTablet ? 'largeTablet' : 'tablet';
    } else if (shortDimension >= Breakpoints.largePhone) {
      deviceType = 'largePhone';
    }

    const isSmallPhone = deviceType === 'smallPhone';
    const isPhone = deviceType === 'phone' || deviceType === 'smallPhone' || deviceType === 'largePhone';
    const isLargePhone = deviceType === 'largePhone';
    const isTablet = deviceType === 'tablet' || deviceType === 'largeTablet';
    const isLargeTablet = deviceType === 'largeTablet';

    // Width percentage
    const wp = (percentage: number): number => {
      return Math.round((percentage / 100) * width);
    };

    // Height percentage
    const hp = (percentage: number): number => {
      return Math.round((percentage / 100) * height);
    };

    // Scale based on width (linear scaling)
    const scale = (size: number): number => {
      return Math.round((width / BASE_WIDTH) * size);
    };

    // Scale based on height
    const verticalScale = (size: number): number => {
      return Math.round((height / BASE_HEIGHT) * size);
    };

    // Moderate scaling - less aggressive, better for most UI elements
    const moderateScale = (size: number, factor: number = 0.5): number => {
      return Math.round(size + (scale(size) - size) * factor);
    };

    // Font scaling with pixel ratio consideration
    const fontScale = (size: number): number => {
      const scaledSize = moderateScale(size, 0.3);
      // Ensure minimum readability and maximum size limits
      const minSize = size * 0.85;
      const maxSize = size * 1.4;
      return Math.round(Math.min(Math.max(scaledSize, minSize), maxSize));
    };

    // Responsive value selector
    const responsive = <T,>(values: {
      default: T;
      tablet?: T;
      largeTablet?: T;
      landscape?: T;
    }): T => {
      if (isLandscape && values.landscape !== undefined) {
        return values.landscape;
      }
      if (isLargeTablet && values.largeTablet !== undefined) {
        return values.largeTablet;
      }
      if (isTablet && values.tablet !== undefined) {
        return values.tablet;
      }
      return values.default;
    };

    // Calculate column width for grid layouts
    const columns = (count: number, gap: number = 16): number => {
      const totalGaps = (count - 1) * gap;
      const availableWidth = width - (gap * 2); // Account for container padding
      return Math.floor((availableWidth - totalGaps) / count);
    };

    return {
      width,
      height,
      deviceType,
      isSmallPhone,
      isPhone,
      isLargePhone,
      isTablet,
      isLargeTablet,
      orientation,
      isPortrait,
      isLandscape,
      wp,
      hp,
      scale,
      verticalScale,
      moderateScale,
      fontScale,
      responsive,
      columns,
    };
  }, [width, height]);
}

// Export convenience sizes that can be used with the hook
export const ResponsiveSizes = {
  // Icon sizes
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 44,

  // Avatar sizes
  avatarSmall: 32,
  avatarMedium: 48,
  avatarLarge: 80,
  avatarXLarge: 100,

  // Button sizes
  buttonSmall: 36,
  buttonMedium: 44,
  buttonLarge: 56,
  buttonXLarge: 72,

  // Touch targets (minimum 44pt for accessibility)
  touchTarget: 44,
  touchTargetLarge: 56,
} as const;

export default useResponsive;
