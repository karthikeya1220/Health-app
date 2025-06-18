// Light theme colors
export const lightColors = {
  // Primary colors
  primary: '#007AFF',
  primaryLight: '#B9E2F0',
  primaryDark: '#005BB5',

  // Secondary colors
  secondary: '#5856D6',
  accent: '#FF9500',

  // Background colors
  background: '#F2F2F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text colors
  text: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',

  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',

  // Border and divider colors
  border: '#C6C6C8',
  divider: '#E5E5EA',

  // Utility colors
  overlay: 'rgba(0, 0, 0, 0.4)',
  shadow: 'rgba(0, 0, 0, 0.1)',

  // Custom app colors
  cardShadow: 'rgba(0, 0, 0, 0.05)',
  tabBarShadow: 'rgba(0, 0, 0, 0.1)',
} as const;

// Dark theme colors
export const darkColors = {
  // Primary colors
  primary: '#0A84FF',
  primaryLight: '#48CAE4',
  primaryDark: '#0066CC',

  // Secondary colors
  secondary: '#5E5CE6',
  accent: '#FF9F0A',

  // Background colors
  background: '#000000',
  surface: '#1C1C1E',
  card: '#2C2C2E',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#48484A',

  // Status colors
  success: '#30D158',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#64D2FF',

  // Border and divider colors
  border: '#38383A',
  divider: '#48484A',

  // Utility colors
  overlay: 'rgba(0, 0, 0, 0.6)',
  shadow: 'rgba(0, 0, 0, 0.3)',

  // Custom app colors
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  tabBarShadow: 'rgba(0, 0, 0, 0.4)',
} as const;

// Theme type
export type Theme = typeof lightColors;

// Named exports for compatibility
export const LightTheme = lightColors;
export const DarkTheme = darkColors;

// Export color types
export type ColorScheme = typeof lightColors;
export type ColorKey = keyof ColorScheme;

// Default export
export default {
  light: lightColors,
  dark: darkColors,
};