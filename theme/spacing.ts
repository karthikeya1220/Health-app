import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Enhanced screen size breakpoints - aligned with responsive.ts
export const ScreenBreakpoints = {
  xs: 320,     // Very small phones (iPhone 5/SE 1st gen)
  small: 375,  // Small phones (iPhone SE, iPhone 8, iPhone 12 mini)
  medium: 414, // Standard phones (iPhone 12 Pro, iPhone 14, Pixel 6)
  large: 428,  // Large phones (iPhone 12 Pro Max, iPhone 14 Plus)
  xlarge: 480, // Very large phones, phablets (Galaxy Note series)
  xxlarge: 768, // Tablets (iPad mini, small Android tablets)
};

// Enhanced device type detection
export const getDeviceType = () => {
  if (width < ScreenBreakpoints.xs) return 'xs';
  if (width < ScreenBreakpoints.small) return 'small';
  if (width < ScreenBreakpoints.medium) return 'medium';
  if (width < ScreenBreakpoints.large) return 'large';
  if (width < ScreenBreakpoints.xlarge) return 'xlarge';
  return 'xxlarge';
};

// Responsive scale functions
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone 8 as base
  return PixelRatio.roundToNearestPixel((size * width) / baseWidth);
};

export const verticalScale = (size: number): number => {
  const baseHeight = 812; // iPhone X as base
  return PixelRatio.roundToNearestPixel((size * height) / baseHeight);
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Enhanced responsive spacing with mobile-first approach
const getResponsiveSpacing = () => {
  const deviceType = getDeviceType();
  
  // More granular multipliers for better mobile experience
  let multiplier = 1;
  switch (deviceType) {
    case 'xs':
      multiplier = 0.75;     // Tighter spacing for very small screens
      break;
    case 'small':
      multiplier = 0.875;    // Slightly reduced spacing for small screens
      break;
    case 'medium':
      multiplier = 1;        // Base spacing for standard phones
      break;
    case 'large':
      multiplier = 1.125;    // Slightly increased spacing for large phones
      break;
    case 'xlarge':
      multiplier = 1.25;     // More spacing for phablets
      break;
    case 'xxlarge':
      multiplier = 1.5;      // Much more spacing for tablets
      break;
  }
  
  return {
    xs: Math.max(3, Math.round(4 * multiplier)),     // Minimum 3px
    sm: Math.max(6, Math.round(8 * multiplier)),     // Minimum 6px
    md: Math.max(12, Math.round(16 * multiplier)),   // Minimum 12px
    lg: Math.max(18, Math.round(24 * multiplier)),   // Minimum 18px
    xl: Math.max(24, Math.round(32 * multiplier)),   // Minimum 24px
    xxl: Math.max(36, Math.round(48 * multiplier)),  // Minimum 36px
  };
};

export const Spacing = getResponsiveSpacing();

// Enhanced border radius values - mobile optimized
const getResponsiveBorderRadius = () => {
  const deviceType = getDeviceType();
  
  let multiplier = 1;
  switch (deviceType) {
    case 'xs':
      multiplier = 0.875;
      break;
    case 'small':
      multiplier = 0.9375;
      break;
    case 'medium':
      multiplier = 1;
      break;
    case 'large':
      multiplier = 1.0625;
      break;
    case 'xlarge':
      multiplier = 1.125;
      break;
    case 'xxlarge':
      multiplier = 1.25;
      break;
  }
  
  return {
    xs: Math.max(3, Math.round(4 * multiplier)),
    sm: Math.max(6, Math.round(8 * multiplier)),
    md: Math.max(10, Math.round(12 * multiplier)),
    lg: Math.max(14, Math.round(16 * multiplier)),
    xl: Math.max(18, Math.round(20 * multiplier)),
    xxl: Math.max(24, Math.round(28 * multiplier)),
    full: 9999,
  };
};

export const BorderRadius = getResponsiveBorderRadius();

// Enhanced layout spacing - mobile-first approach
const getResponsiveLayout = () => {
  const deviceType = getDeviceType();
  
  let multiplier = 1;
  switch (deviceType) {
    case 'xs':
      multiplier = 0.8;      // Tighter layout for very small screens
      break;
    case 'small':
      multiplier = 0.9;      // Slightly reduced layout for small screens
      break;
    case 'medium':
      multiplier = 1;        // Base layout for standard phones
      break;
    case 'large':
      multiplier = 1.1;      // Slightly expanded layout for large phones
      break;
    case 'xlarge':
      multiplier = 1.2;      // More spacious layout for phablets
      break;
    case 'xxlarge':
      multiplier = 1.4;      // Much more spacious layout for tablets
      break;
  }
  
  return {
    containerPadding: Math.max(12, Math.round(16 * multiplier)),
    sectionSpacing: Math.max(16, Math.round(24 * multiplier)),
    cardPadding: Math.max(12, Math.round(16 * multiplier)),
    buttonHeight: Math.max(44, Math.round(48 * multiplier)), // iOS minimum 44px
    headerHeight: Math.max(50, Math.round(60 * multiplier)),
    tabBarHeight: Math.max(60, Math.round(70 * multiplier)),
    inputHeight: Math.max(44, Math.round(48 * multiplier)),
    minTouchTarget: Math.max(44, Math.round(44 * multiplier)), // Accessibility minimum
    listItemHeight: Math.max(56, Math.round(64 * multiplier)),
    avatarSize: Math.max(32, Math.round(40 * multiplier)),
    iconSize: Math.max(16, Math.round(20 * multiplier)),  };
};

export const Layout = getResponsiveLayout();

// Enhanced grid system - mobile optimized
export const Grid = {
  container: width - (Layout.containerPadding * 2),
  columns: (columns: number, spacing: number = Spacing.md) => {
    const totalSpacing = (columns - 1) * spacing;
    return (Grid.container - totalSpacing) / columns;
  },
  gutter: Spacing.md,
  
  // Mobile-specific grid helpers
  getMobileColumns: () => {
    if (width < ScreenBreakpoints.small) return 1;
    if (width < ScreenBreakpoints.large) return 2;
    if (width < ScreenBreakpoints.xlarge) return 3;
    return 4;
  },
  
  getCardColumns: () => {
    if (width < ScreenBreakpoints.medium) return 1;
    if (width < ScreenBreakpoints.xlarge) return 2;
    return 3;
  },
};

// Enhanced screen dimensions with mobile considerations
export const Screen = {
  width,
  height,
  // Device size checks
  isSmall: width < ScreenBreakpoints.small,
  isMedium: width >= ScreenBreakpoints.small && width < ScreenBreakpoints.large,
  isLarge: width >= ScreenBreakpoints.large,
  isTablet: width >= ScreenBreakpoints.xlarge,
  // Mobile specific
  isMobile: width < ScreenBreakpoints.xlarge,
  isCompact: width < ScreenBreakpoints.medium,
  // Orientation
  isLandscape: width > height,
  isPortrait: height > width,
  aspectRatio: height / width,
  // Safe area estimates
  hasNotch: height > 800 && Platform.OS === 'ios',
  usableHeight: height * 0.85, // Conservative estimate for content area
};

export default Spacing;