import { Dimensions } from 'react-native';
import { LightTheme, DarkTheme } from './colors';

const { width: screenWidth } = Dimensions.get('window');

// Responsive font scaling
const getFontScale = () => {
  if (screenWidth < 375) return 0.9;   // Small devices
  if (screenWidth > 414) return 1.1;   // Large devices
  return 1; // Default
};

const fontScale = getFontScale();

export const getTypography = (isDark: boolean) => {
  const colors = isDark ? DarkTheme : LightTheme;
  
  return {
    // Heading styles with responsive scaling
    h1: {
      fontSize: Math.round(32 * fontScale),
      fontWeight: '700' as const,
      color: colors.text,
      lineHeight: Math.round(38 * fontScale),
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: Math.round(24 * fontScale),
      fontWeight: '600' as const,
      color: colors.text,
      lineHeight: Math.round(30 * fontScale),
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: Math.round(20 * fontScale),
      fontWeight: '600' as const,
      color: colors.text,
      lineHeight: Math.round(26 * fontScale),
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: Math.round(18 * fontScale),
      fontWeight: '500' as const,
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
    
    // Body text styles
    body: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '400' as const,
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
    bodyMedium: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '500' as const,
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
    bodySmall: {
      fontSize: Math.round(14 * fontScale),
      fontWeight: '400' as const,
      color: colors.textSecondary,
      lineHeight: Math.round(20 * fontScale),
    },
    
    // Special text styles
    caption: {
      fontSize: Math.round(12 * fontScale),
      fontWeight: '400' as const,
      color: colors.textSecondary,
      lineHeight: Math.round(16 * fontScale),
    },
    button: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '600' as const,
      lineHeight: Math.round(20 * fontScale),
    },
    label: {
      fontSize: Math.round(14 * fontScale),
      fontWeight: '500' as const,
      color: colors.textSecondary,
      lineHeight: Math.round(18 * fontScale),
    },
  };
};

// Font families
export const FontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;