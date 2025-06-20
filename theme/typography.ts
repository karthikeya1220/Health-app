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
  
  return {    // Heading styles with responsive scaling
    h1: {
      fontSize: Math.round(32 * fontScale),
      fontWeight: '700' as const,
      fontFamily: 'Poppins_700Bold',
      color: colors.text,
      lineHeight: Math.round(38 * fontScale),
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: Math.round(24 * fontScale),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text,
      lineHeight: Math.round(30 * fontScale),
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: Math.round(20 * fontScale),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text,
      lineHeight: Math.round(26 * fontScale),
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: Math.round(18 * fontScale),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
      // Body text styles
    body: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
    bodyMedium: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.text,
      lineHeight: Math.round(24 * fontScale),
    },
    bodySmall: {
      fontSize: Math.round(14 * fontScale),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.textSecondary,
      lineHeight: Math.round(20 * fontScale),
    },
      // Special text styles
    caption: {
      fontSize: Math.round(12 * fontScale),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.textSecondary,
      lineHeight: Math.round(16 * fontScale),
    },
    button: {
      fontSize: Math.round(16 * fontScale),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      lineHeight: Math.round(20 * fontScale),
    },
    label: {
      fontSize: Math.round(14 * fontScale),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.textSecondary,
      lineHeight: Math.round(18 * fontScale),
    },
  };
};

// Font families
export const FontFamily = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

// Utility function to get the appropriate Poppins font family based on weight
export const getPoppinsFontFamily = (weight: string | number): string => {
  const numWeight = typeof weight === 'string' ? weight : weight.toString();
  
  switch (numWeight) {
    case '700':
    case 'bold':
      return FontFamily.bold;
    case '600':
      return FontFamily.semiBold;
    case '500':
      return FontFamily.medium;
    case '400':
    case 'normal':
    default:
      return FontFamily.regular;
  }
};

// Utility function to create text styles with Poppins font
export const createTextStyle = (options: {
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | 'normal' | 'bold';
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
}) => {
  const { fontSize = 16, fontWeight = '400', color, lineHeight, letterSpacing } = options;
  
  return {
    fontSize: Math.round(fontSize * fontScale),
    fontFamily: getPoppinsFontFamily(fontWeight),
    fontWeight: fontWeight,
    ...(color && { color }),
    ...(lineHeight && { lineHeight: Math.round(lineHeight * fontScale) }),
    ...(letterSpacing && { letterSpacing }),
  };
};

// Pre-defined text styles for common use cases
export const TextStyles = {
  // Large display text
  display: createTextStyle({ fontSize: 48, fontWeight: '700' }),
  
  // Headers
  h1: createTextStyle({ fontSize: 32, fontWeight: '700', lineHeight: 38, letterSpacing: -0.5 }),
  h2: createTextStyle({ fontSize: 24, fontWeight: '600', lineHeight: 30, letterSpacing: -0.3 }),
  h3: createTextStyle({ fontSize: 20, fontWeight: '600', lineHeight: 26, letterSpacing: -0.2 }),
  h4: createTextStyle({ fontSize: 18, fontWeight: '500', lineHeight: 24 }),
  h5: createTextStyle({ fontSize: 16, fontWeight: '500', lineHeight: 22 }),
  
  // Body text
  body: createTextStyle({ fontSize: 16, fontWeight: '400', lineHeight: 24 }),
  bodyMedium: createTextStyle({ fontSize: 16, fontWeight: '500', lineHeight: 24 }),
  bodySmall: createTextStyle({ fontSize: 14, fontWeight: '400', lineHeight: 20 }),
  
  // Small text
  caption: createTextStyle({ fontSize: 12, fontWeight: '400', lineHeight: 16 }),
  overline: createTextStyle({ fontSize: 10, fontWeight: '600', lineHeight: 14, letterSpacing: 1 }),
  
  // Interactive elements
  button: createTextStyle({ fontSize: 16, fontWeight: '600', lineHeight: 20 }),
  buttonSmall: createTextStyle({ fontSize: 14, fontWeight: '600', lineHeight: 18 }),
  link: createTextStyle({ fontSize: 16, fontWeight: '500', lineHeight: 24 }),
  
  // Form elements
  label: createTextStyle({ fontSize: 14, fontWeight: '500', lineHeight: 18 }),
  input: createTextStyle({ fontSize: 16, fontWeight: '400', lineHeight: 24 }),
  
  // Special use cases
  tabBarLabel: createTextStyle({ fontSize: 11, fontWeight: '500', lineHeight: 14 }),
  timestamp: createTextStyle({ fontSize: 11, fontWeight: '400', lineHeight: 14 }),
};