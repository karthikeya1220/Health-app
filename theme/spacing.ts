import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');

// Static spacing values - this avoids key conflicts
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius values
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Layout spacing
export const Layout = {
  containerPadding: 16,
  sectionSpacing: 24,
  cardPadding: 16,
  buttonHeight: 48,
  headerHeight: 60,
  tabBarHeight: 70,
};

// Optional responsive spacing function (only use if needed)
export const getResponsiveSpacing = () => {
  const screenScale = width > 375 ? 1.1 : width < 350 ? 0.9 : 1;
  
  return {
    extraSmall: Math.round(4 * screenScale),      // 4px
    small: Math.round(8 * screenScale),           // 8px
    medium: Math.round(16 * screenScale),         // 16px
    large: Math.round(24 * screenScale),          // 24px
    extraLarge: Math.round(32 * screenScale),     // 32px
    doubleXLarge: Math.round(48 * screenScale),   // 48px
  };
};

export default Spacing;