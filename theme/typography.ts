import { Dimensions, Platform } from 'react-native';
import { LightTheme, DarkTheme } from './colors';
import { moderateScale, ScreenBreakpoints, getDeviceType } from './spacing';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Enhanced responsive font scaling with better mobile support
const getFontScale = () => {
  const deviceType = getDeviceType();
  
  // More granular scaling based on enhanced device type detection
  switch (deviceType) {
    case 'xs':
      return 0.8;   // Very small devices - more compact
    case 'small':
      return 0.875; // Small devices - slightly compact
    case 'medium':
      return 1;     // Standard devices - base size
    case 'large':
      return 1.05;  // Large devices - slightly larger
    case 'xlarge':
      return 1.1;   // Phablets - larger text
    case 'xxlarge':
      return 1.2;   // Tablets - much larger text
    default:
      return 1;
  }
};

const fontScale = getFontScale();

// Enhanced responsive font size calculation with minimum size protection
const responsiveFontSize = (baseSize: number): number => {
  const scaled = moderateScale(baseSize * fontScale, 0.3);
  // Ensure minimum font size for accessibility (12px minimum)
  return Math.max(12, Math.round(scaled));
};

// Enhanced line height calculation with device-specific adjustments
const calculateLineHeight = (fontSize: number): number => {
  const deviceType = getDeviceType();
  let lineHeightRatio = 1.4;
  
  // Adjust line height for mobile readability
  switch (deviceType) {
    case 'xs':
    case 'small':
      lineHeightRatio = 1.35; // Tighter line height for small screens
      break;
    case 'medium':
      lineHeightRatio = 1.4;  // Standard line height
      break;
    case 'large':
    case 'xlarge':
      lineHeightRatio = 1.45; // Slightly looser for larger screens
      break;
    case 'xxlarge':
      lineHeightRatio = 1.5;  // More spacious for tablets
      break;
  }
  
  return Math.round(fontSize * lineHeightRatio);
};

export const getTypography = (isDark: boolean) => {
  const colors = isDark ? DarkTheme : LightTheme;  
  return {
    // Display styles for hero text
    display: {
      fontSize: responsiveFontSize(40),
      fontWeight: '700' as const,
      fontFamily: 'Poppins_700Bold',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(40)),
      letterSpacing: -1,
    },
    
    // Heading styles with responsive scaling
    h1: {
      fontSize: responsiveFontSize(32),
      fontWeight: '700' as const,
      fontFamily: 'Poppins_700Bold',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(32)),
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: responsiveFontSize(24),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(24)),
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: responsiveFontSize(20),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(20)),
      letterSpacing: -0.2,    },
    h4: {
      fontSize: responsiveFontSize(18),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(18)),
    },
    h5: {
      fontSize: responsiveFontSize(16),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(16)),
    },
    
    // Body text styles with responsive sizing
    body: {
      fontSize: responsiveFontSize(16),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(16)),
    },
    bodyLarge: {
      fontSize: responsiveFontSize(18),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(18)),
    },
    bodyMedium: {
      fontSize: responsiveFontSize(16),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(16)),
    },
    bodySmall: {
      fontSize: responsiveFontSize(14),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.text,
      lineHeight: calculateLineHeight(responsiveFontSize(14)),
    },
    
    // Special text styles
    caption: {
      fontSize: responsiveFontSize(12),
      fontWeight: '400' as const,
      fontFamily: 'Poppins_400Regular',
      color: colors.textSecondary,
      lineHeight: calculateLineHeight(responsiveFontSize(12)),
    },
    captionMedium: {
      fontSize: responsiveFontSize(12),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.textSecondary,
      lineHeight: calculateLineHeight(responsiveFontSize(12)),
    },
    button: {
      fontSize: responsiveFontSize(16),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      lineHeight: calculateLineHeight(responsiveFontSize(16)),
    },
    buttonLarge: {
      fontSize: responsiveFontSize(18),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      lineHeight: calculateLineHeight(responsiveFontSize(18)),
    },
    buttonSmall: {
      fontSize: responsiveFontSize(14),
      fontWeight: '600' as const,      fontFamily: 'Poppins_600SemiBold',
      lineHeight: calculateLineHeight(responsiveFontSize(14)),
    },
    label: {
      fontSize: responsiveFontSize(14),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      color: colors.textSecondary,
      lineHeight: calculateLineHeight(responsiveFontSize(14)),
    },
    
    // Navigation and UI text
    tabBarLabel: {
      fontSize: responsiveFontSize(10),
      fontWeight: '500' as const,
      fontFamily: 'Poppins_500Medium',
      textAlign: 'center' as const,
    },
    navigationTitle: {
      fontSize: responsiveFontSize(17),
      fontWeight: '600' as const,
      fontFamily: 'Poppins_600SemiBold',
      color: colors.text,
    },
  };
};

// Pre-defined text styles for common use cases (responsive)
export const TextStyles = {
  // Large display text
  display: {
    fontSize: responsiveFontSize(48),
    fontWeight: '700' as const,
    fontFamily: 'Poppins_700Bold',
    lineHeight: calculateLineHeight(responsiveFontSize(48)),
  },
  
  // Headers
  h1: {
    fontSize: responsiveFontSize(32),
    fontWeight: '700' as const,
    fontFamily: 'Poppins_700Bold',
    lineHeight: calculateLineHeight(responsiveFontSize(32)),
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: responsiveFontSize(24),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(24)),
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(20)),
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(18)),
  },
  h5: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(16)),
  },
  
  // Body text
  body: {
    fontSize: responsiveFontSize(16),
    fontWeight: '400' as const,
    fontFamily: 'Poppins_400Regular',
    lineHeight: calculateLineHeight(responsiveFontSize(16)),
  },
  bodyLarge: {
    fontSize: responsiveFontSize(18),
    fontWeight: '400' as const,
    fontFamily: 'Poppins_400Regular',
    lineHeight: calculateLineHeight(responsiveFontSize(18)),
  },
  bodyMedium: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(16)),
  },
  bodySmall: {
    fontSize: responsiveFontSize(14),
    fontWeight: '400' as const,
    fontFamily: 'Poppins_400Regular',
    lineHeight: calculateLineHeight(responsiveFontSize(14)),
  },
  
  // Small text
  caption: {
    fontSize: responsiveFontSize(12),
    fontWeight: '400' as const,
    fontFamily: 'Poppins_400Regular',
    lineHeight: calculateLineHeight(responsiveFontSize(12)),
  },
  captionMedium: {
    fontSize: responsiveFontSize(12),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(12)),
  },
  overline: {
    fontSize: responsiveFontSize(10),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(10)),
    letterSpacing: 1,
  },
  
  // Interactive elements
  button: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(16)),
  },
  buttonLarge: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(18)),
  },
  buttonSmall: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: calculateLineHeight(responsiveFontSize(14)),
  },
  link: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(16)),
  },
  
  // Navigation and UI
  tabBarLabel: {
    fontSize: responsiveFontSize(10),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center' as const,
  },
  navigationTitle: {
    fontSize: responsiveFontSize(17),
    fontWeight: '600' as const,
    fontFamily: 'Poppins_600SemiBold',
  },
  label: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500' as const,
    fontFamily: 'Poppins_500Medium',
    lineHeight: calculateLineHeight(responsiveFontSize(14)),
  },
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

// Utility function to create text styles with Poppins font (updated for responsive)
export const createTextStyle = (options: {
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | 'normal' | 'bold';
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
}) => {
  const { fontSize = 16, fontWeight = '400', color, lineHeight, letterSpacing } = options;
  
  return {
    fontSize: responsiveFontSize(fontSize),
    fontFamily: getPoppinsFontFamily(fontWeight),
    fontWeight: fontWeight,
    ...(color && { color }),
    ...(lineHeight && { lineHeight: calculateLineHeight(responsiveFontSize(fontSize)) }),
    ...(letterSpacing && { letterSpacing }),
  };
};