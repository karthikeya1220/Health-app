import { Dimensions, PixelRatio, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device breakpoints - Enhanced for more mobile devices
export const BREAKPOINTS = {
  xs: 320,   // Very small phones (iPhone 5/SE 1st gen)
  sm: 375,   // Small phones (iPhone SE, iPhone 8, iPhone 12 mini)
  md: 414,   // Standard phones (iPhone 12 Pro, iPhone 14, Pixel 6)
  lg: 428,   // Large phones (iPhone 12 Pro Max, iPhone 14 Plus, Galaxy S21+)
  xl: 480,   // Very large phones, small tablets (Galaxy Note series)
  xxl: 768,  // Tablets (iPad mini, small Android tablets)
  xxxl: 1024, // Large tablets (iPad, iPad Pro)
};

// Device type classification - Enhanced for better mobile categorization
export const getDeviceSize = () => {
  if (SCREEN_WIDTH < BREAKPOINTS.xs) return 'xs';
  if (SCREEN_WIDTH < BREAKPOINTS.sm) return 'sm';
  if (SCREEN_WIDTH < BREAKPOINTS.md) return 'md';
  if (SCREEN_WIDTH < BREAKPOINTS.lg) return 'lg';
  if (SCREEN_WIDTH < BREAKPOINTS.xl) return 'xl';
  if (SCREEN_WIDTH < BREAKPOINTS.xxl) return 'xxl';
  return 'xxxl';
};

// Enhanced device categorization
export const getDeviceCategory = () => {
  const width = SCREEN_WIDTH;
  const height = SCREEN_HEIGHT;
  const aspectRatio = height / width;
  
  if (width < 375) return 'small-phone';
  if (width < 414) return 'standard-phone';
  if (width < 480) return 'large-phone';
  if (width < 768) return 'phablet';
  return 'tablet';
};

// Screen density detection
export const getScreenDensity = () => {
  const pixelRatio = PixelRatio.get();
  if (pixelRatio < 2) return 'low';
  if (pixelRatio < 3) return 'medium';
  return 'high';
};

// Screen information - Enhanced for mobile considerations
export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  // Device size checks
  isSmall: SCREEN_WIDTH < BREAKPOINTS.sm,
  isMedium: SCREEN_WIDTH >= BREAKPOINTS.sm && SCREEN_WIDTH < BREAKPOINTS.lg,
  isLarge: SCREEN_WIDTH >= BREAKPOINTS.lg,
  isTablet: SCREEN_WIDTH >= BREAKPOINTS.xl,
  // Mobile specific
  isMobile: SCREEN_WIDTH < BREAKPOINTS.xl,
  isCompact: SCREEN_WIDTH < BREAKPOINTS.md,
  isWide: SCREEN_WIDTH >= BREAKPOINTS.lg,
  // Orientation
  aspectRatio: SCREEN_HEIGHT / SCREEN_WIDTH,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,
  // Safe area considerations
  hasNotch: SCREEN_HEIGHT > 800 && Platform.OS === 'ios',
  // Content area estimates
  contentHeight: SCREEN_HEIGHT - (Platform.OS === 'ios' ? 94 : 80), // Rough estimate excluding status bar and nav
  usableHeight: SCREEN_HEIGHT * 0.85, // Conservative usable height
  // Thumb reach zones (for one-handed use)
  thumbReachTop: SCREEN_HEIGHT * 0.4, // Comfortable one-handed reach
  thumbReachBottom: SCREEN_HEIGHT * 0.8,
};

// Responsive scaling functions
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone 8 as base
  return PixelRatio.roundToNearestPixel((size * SCREEN_WIDTH) / baseWidth);
};

export const verticalScale = (size: number): number => {
  const baseHeight = 812; // iPhone X as base
  return PixelRatio.roundToNearestPixel((size * SCREEN_HEIGHT) / baseHeight);
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Responsive value based on screen size - Enhanced with new breakpoint
export const responsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
  xxxl?: T;
  default: T;
}): T => {
  const deviceSize = getDeviceSize();
  return values[deviceSize] ?? values.default;
};

// Grid system - Enhanced for mobile-first approach
export const GRID = {
  // Get container width with padding
  getContainerWidth: (padding: number = 16) => SCREEN_WIDTH - (padding * 2),
  
  // Calculate column width for grid layout
  getColumnWidth: (columns: number, gutter: number = 16, containerPadding: number = 16) => {
    const containerWidth = SCREEN_WIDTH - (containerPadding * 2);
    const totalGutter = (columns - 1) * gutter;
    return (containerWidth - totalGutter) / columns;
  },
  
  // Get responsive columns based on screen size - Mobile optimized
  getResponsiveColumns: () => responsiveValue({
    xs: 1,
    sm: 1,     // Single column for small phones
    md: 2,     // Two columns for standard phones
    lg: 2,     // Still two columns for large phones
    xl: 3,     // Three columns for phablets
    xxl: 4,    // Four columns for tablets
    xxxl: 5,   // Five columns for large tablets
    default: 2,
  }),
  
  // Mobile-specific grid helpers
  getMobileColumns: (maxColumns: number = 2) => {
    const baseColumns = GRID.getResponsiveColumns();
    return Math.min(baseColumns, maxColumns);
  },
  
  // Card grid calculations
  getCardColumns: () => responsiveValue({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 3,
    xxxl: 4,
    default: 2,
  }),
  
  // List item columns (for compact lists)
  getListColumns: () => responsiveValue({
    xs: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
    xxl: 3,
    xxxl: 4,
    default: 1,
  }),
};

// Typography scaling - Enhanced for mobile readability
export const TYPOGRAPHY = {
  // Get responsive font size with accessibility considerations
  getFontSize: (baseSize: number) => {
    const scaleFactor = responsiveValue({
      xs: 0.85,   // Slightly smaller for very small screens
      sm: 0.9,    // Small reduction for small phones
      md: 1,      // Base size for standard phones
      lg: 1.02,   // Slight increase for large phones
      xl: 1.05,   // Small increase for phablets
      xxl: 1.1,   // Bigger for tablets
      xxxl: 1.15, // Even bigger for large tablets
      default: 1,
    });
    
    // Apply minimum font size for accessibility
    const scaled = moderateScale(baseSize * scaleFactor, 0.3);
    return Math.max(scaled, 12); // Minimum 12px for readability
  },
  
  // Get responsive line height with mobile optimization
  getLineHeight: (fontSize: number, ratio: number = 1.4) => {
    // Adjust line height for mobile - slightly tighter for small screens
    const mobileRatio = responsiveValue({
      xs: ratio * 0.95,
      sm: ratio * 0.98,
      md: ratio,
      lg: ratio * 1.02,
      xl: ratio * 1.05,
      xxl: ratio * 1.1,
      xxxl: ratio * 1.15,
      default: ratio,
    });
    return Math.round(fontSize * mobileRatio);
  },
  
  // Mobile-specific typography helpers
  getHeaderSize: (level: number) => {
    const baseSizes = [32, 28, 24, 20, 18, 16]; // h1 to h6
    const baseSize = baseSizes[level - 1] || 16;
    return TYPOGRAPHY.getFontSize(baseSize);
  },
  
  getBodySize: (variant: 'large' | 'medium' | 'small' = 'medium') => {
    const sizes = { large: 18, medium: 16, small: 14 };
    return TYPOGRAPHY.getFontSize(sizes[variant]);
  },
  
  getCaptionSize: () => TYPOGRAPHY.getFontSize(12),
};

// Layout helpers - Enhanced for mobile UX
export const LAYOUT = {
  // Get responsive padding with mobile optimization
  getPadding: (base: number = 16) => responsiveValue({
    xs: Math.max(base * 0.75, 8),   // Minimum 8px padding
    sm: Math.max(base * 0.875, 10), // Minimum 10px padding
    md: base,
    lg: base * 1.125,
    xl: base * 1.25,
    xxl: base * 1.5,
    xxxl: base * 1.75,
    default: base,
  }),
  
  // Get responsive margin with mobile optimization
  getMargin: (base: number = 16) => responsiveValue({
    xs: Math.max(base * 0.75, 6),   // Minimum 6px margin
    sm: Math.max(base * 0.875, 8),  // Minimum 8px margin
    md: base,
    lg: base * 1.125,
    xl: base * 1.25,
    xxl: base * 1.5,
    xxxl: base * 1.75,
    default: base,
  }),
  
  // Get responsive border radius
  getBorderRadius: (base: number = 8) => responsiveValue({
    xs: Math.max(base * 0.875, 4),
    sm: Math.max(base * 0.9375, 6),
    md: base,
    lg: base * 1.0625,
    xl: base * 1.125,
    xxl: base * 1.25,
    xxxl: base * 1.375,
    default: base,
  }),
  
  // Get responsive height for components
  getComponentHeight: (base: number = 48) => responsiveValue({
    xs: Math.max(base * 0.875, 40), // Minimum 40px for touch targets
    sm: Math.max(base * 0.9375, 42),
    md: base,
    lg: base * 1.0625,
    xl: base * 1.125,
    xxl: base * 1.25,
    xxxl: base * 1.375,
    default: base,
  }),
  
  // Mobile-specific layout helpers
  getContentPadding: () => responsiveValue({
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 40,
    default: 20,
  }),
  
  getCardPadding: () => responsiveValue({
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36,
    default: 20,
  }),
  
  // Responsive spacing for mobile lists
  getListItemHeight: () => responsiveValue({
    xs: 56,
    sm: 60,
    md: 64,
    lg: 68,
    xl: 72,
    xxl: 76,
    xxxl: 80,
    default: 64,  }),
};

// Touch target helpers (accessibility) - Enhanced for mobile
export const TOUCH = {
  // Minimum touch target size (44px per Apple/Google guidelines)
  minTarget: Math.max(44, scale(44)),
  
  // Get touch-friendly size with device considerations
  getTouchSize: (base: number = 44) => {
    const minSize = Platform.OS === 'ios' ? 44 : 48; // Android prefers 48px
    return Math.max(minSize, scale(base));
  },
  
  // Get button sizes based on context
  getButtonSize: (variant: 'small' | 'medium' | 'large' = 'medium') => {
    const sizes = {
      small: responsiveValue({
        xs: 36, sm: 38, md: 40, lg: 42, xl: 44, xxl: 46, xxxl: 48,
        default: 40
      }),
      medium: responsiveValue({
        xs: 44, sm: 46, md: 48, lg: 50, xl: 52, xxl: 54, xxxl: 56,
        default: 48
      }),
      large: responsiveValue({
        xs: 52, sm: 54, md: 56, lg: 58, xl: 60, xxl: 62, xxxl: 64,
        default: 56
      })
    };
    return sizes[variant];
  },
  
  // Get spacing for touch targets
  getTouchSpacing: () => responsiveValue({
    xs: 8, sm: 10, md: 12, lg: 14, xl: 16, xxl: 18, xxxl: 20,
    default: 12
  }),
};

// Safe area helpers
export const useSafeLayout = () => {
  const insets = useSafeAreaInsets();
  
  return {
    // Get content height excluding safe areas and status bar
    getContentHeight: (excludeTabBar: boolean = false) => {
      const tabBarHeight = excludeTabBar ? 70 : 0;
      return SCREEN_HEIGHT - insets.top - insets.bottom - tabBarHeight;
    },
    
    // Get container styles with safe area padding
    getContainerStyle: (horizontalPadding: number = 16) => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: Math.max(insets.left, horizontalPadding),
      paddingRight: Math.max(insets.right, horizontalPadding),
    }),
    
    // Safe area insets
    insets,
  };
};

// Component sizing helpers - Enhanced for mobile optimization
export const COMPONENT = {
  // Avatar sizes - Mobile optimized
  avatar: {
    xs: scale(20),
    sm: scale(28),
    md: scale(36),
    lg: scale(48),
    xl: scale(64),
    xxl: scale(80),
    xxxl: scale(96),
  },
  
  // Icon sizes - Mobile optimized
  icon: {
    xs: scale(12),
    sm: scale(16),
    md: scale(20),
    lg: scale(24),
    xl: scale(28),
    xxl: scale(32),
    xxxl: scale(40),
  },
  
  // Button heights - Mobile optimized with touch targets
  button: {
    sm: TOUCH.getButtonSize('small'),
    md: TOUCH.getButtonSize('medium'),
    lg: TOUCH.getButtonSize('large'),
  },
  
  // Input heights - Mobile optimized
  input: {
    sm: LAYOUT.getComponentHeight(36),
    md: LAYOUT.getComponentHeight(44),
    lg: LAYOUT.getComponentHeight(52),
  },
  
  // Card dimensions - Mobile optimized
  card: {
    minHeight: verticalScale(100),
    maxWidth: responsiveValue({
      xs: SCREEN_WIDTH - 32,
      sm: SCREEN_WIDTH - 32,
      md: SCREEN_WIDTH - 40,
      lg: scale(380),
      xl: scale(400),
      xxl: scale(420),
      xxxl: scale(480),
      default: scale(400),
    }),
    padding: LAYOUT.getCardPadding(),
  },
  
  // Mobile-specific component helpers
  getTabBarHeight: () => responsiveValue({
    xs: 60, sm: 65, md: 70, lg: 75, xl: 80, xxl: 85, xxxl: 90,
    default: 70
  }),
  
  getHeaderHeight: () => responsiveValue({
    xs: 50, sm: 55, md: 60, lg: 65, xl: 70, xxl: 75, xxxl: 80,
    default: 60
  }),
  
  getModalHeight: () => responsiveValue({
    xs: SCREEN_HEIGHT * 0.9,
    sm: SCREEN_HEIGHT * 0.85,
    md: SCREEN_HEIGHT * 0.8,
    lg: SCREEN_HEIGHT * 0.75,
    xl: SCREEN_HEIGHT * 0.7,
    xxl: SCREEN_HEIGHT * 0.65,
    xxxl: SCREEN_HEIGHT * 0.6,
    default: SCREEN_HEIGHT * 0.8,
  }),
};

// Animation helpers
export const ANIMATION = {
  // Duration based on device performance
  duration: {
    fast: Platform.select({ ios: 200, android: 250 }),
    normal: Platform.select({ ios: 300, android: 350 }),
    slow: Platform.select({ ios: 500, android: 600 }),
  },
  
  // Easing curves
  easing: {
    easeInOut: Platform.select({
      ios: 'easeInEaseOut',
      android: 'easeInEaseOut',
    }),
    spring: Platform.select({
      ios: 'spring',
      android: 'easeOut',
    }),
  },
};

// Utility functions - Enhanced with mobile-specific helpers
export const isSmallScreen = () => SCREEN.width < BREAKPOINTS.sm;
export const isMediumScreen = () => SCREEN.width >= BREAKPOINTS.sm && SCREEN.width < BREAKPOINTS.lg;
export const isLargeScreen = () => SCREEN.width >= BREAKPOINTS.lg;
export const isTablet = () => SCREEN.width >= BREAKPOINTS.xl;

// Mobile-specific utility functions
export const isMobileDevice = () => SCREEN.width < BREAKPOINTS.xl;
export const isCompactDevice = () => SCREEN.width < BREAKPOINTS.md;
export const requiresCompactLayout = () => SCREEN.width < BREAKPOINTS.sm || SCREEN.height < 700;
export const supportsLandscape = () => SCREEN.width > BREAKPOINTS.sm;
export const hasLimitedVerticalSpace = () => SCREEN.height < 700;

// Layout calculation helpers
export const getOptimalColumnCount = (itemWidth: number, minSpacing: number = 16) => {
  const availableWidth = SCREEN.width - (LAYOUT.getContentPadding() * 2);
  const itemWidthWithSpacing = itemWidth + minSpacing;
  return Math.floor(availableWidth / itemWidthWithSpacing) || 1;
};

export const getOptimalItemWidth = (desiredColumns: number, spacing: number = 16) => {
  return GRID.getColumnWidth(desiredColumns, spacing, LAYOUT.getContentPadding());
};

// Responsive breakpoint checks
export const useBreakpoint = () => {
  const deviceSize = getDeviceSize();
  return {
    isXs: deviceSize === 'xs',
    isSm: deviceSize === 'sm',
    isMd: deviceSize === 'md',
    isLg: deviceSize === 'lg',
    isXl: deviceSize === 'xl',
    isXxl: deviceSize === 'xxl',
    isXxxl: deviceSize === 'xxxl',
    isMobile: isMobileDevice(),
    isCompact: isCompactDevice(),
    deviceSize,
    category: getDeviceCategory(),
  };
};

export default {
  SCREEN,
  BREAKPOINTS,
  GRID,
  TYPOGRAPHY,
  LAYOUT,
  TOUCH,
  COMPONENT,
  ANIMATION,
  scale,
  verticalScale,
  moderateScale,
  responsiveValue,
  getDeviceSize,
  getDeviceCategory,
  getScreenDensity,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  isTablet,
  isMobileDevice,
  isCompactDevice,
  requiresCompactLayout,
  supportsLandscape,
  hasLimitedVerticalSpace,
  getOptimalColumnCount,
  getOptimalItemWidth,
  useBreakpoint,
  useSafeLayout,
};
