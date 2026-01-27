// SpeakWell Purple/Blue Dark Theme
// Design Reference: SmartyMe by ApexTech Ltd

export const Colors = {
  primary: {
    blue: '#3B82F6',       // Primary Blue - main actions, buttons
    purple: '#8B5CF6',     // Primary Purple - accents, highlights
    deepPurple: '#7C3AED', // Deep Purple - gradients, emphasis
    violet: '#6D28D9',     // Violet - secondary accents
    indigo: '#4F46E5',     // Indigo - links, interactive elements
  },
  background: {
    primary: '#0F0D1A',    // Deep dark - main background
    secondary: '#1A1730',  // Card background
    tertiary: '#252142',   // Elevated surfaces
    overlay: 'rgba(15, 13, 26, 0.9)', // Modal overlays
  },
  text: {
    primary: '#FFFFFF',    // White - primary text
    secondary: '#A5B4FC',  // Light purple/blue - secondary text
    muted: '#6B7280',      // Gray - muted/disabled text
    accent: '#C4B5FD',     // Light violet - accent text
  },
  neutral: {
    white: '#FFFFFF',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
  semantic: {
    success: '#10B981',    // Green - ONLY for success checkmarks
    warning: '#F59E0B',    // Amber - warnings
    error: '#EF4444',      // Red - errors
    info: '#3B82F6',       // Blue - info (uses primary blue)
  },
  gradient: {
    // For use with expo-linear-gradient
    primary: ['#8B5CF6', '#3B82F6'],       // Purple to Blue
    secondary: ['#7C3AED', '#8B5CF6'],     // Deep Purple to Purple
    accent: ['#6D28D9', '#4F46E5'],        // Violet to Indigo
    card: ['#252142', '#1A1730'],          // Elevated card gradient
  },
  border: {
    default: '#374151',    // Subtle border
    active: '#8B5CF6',     // Active/focused border (purple)
    muted: '#252142',      // Very subtle border
  },
  // Progress and streak colors
  progress: {
    track: '#252142',      // Progress bar track
    fill: '#8B5CF6',       // Progress bar fill (purple)
    streak: '#F59E0B',     // Streak flame color (amber)
  },
  // Lesson section colors
  lesson: {
    intro: '#3B82F6',      // Blue for introduction
    core: '#8B5CF6',       // Purple for core concept
    exercise: '#7C3AED',   // Deep purple for exercise
    practice: '#6D28D9',   // Violet for practice
    summary: '#4F46E5',    // Indigo for summary
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  display: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // Glow effect for active elements
  glow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
};
