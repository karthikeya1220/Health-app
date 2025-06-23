import React from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  SCREEN, 
  LAYOUT, 
  COMPONENT, 
  useSafeLayout, 
  responsiveValue,
  useBreakpoint 
} from '@/utils/responsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  padding?: boolean;
  safeArea?: boolean;
  scrollable?: boolean;
  style?: ViewStyle;
}

/**
 * ResponsiveLayout - A container component that automatically adapts to different screen sizes
 * This component ensures proper spacing, safe area handling, and mobile-optimized layouts
 */
export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  padding = true,
  safeArea = true,
  scrollable = false,
  style,
}) => {
  const { getContainerStyle } = useSafeLayout();
  const { isMobile, isCompact, deviceSize } = useBreakpoint();

  const containerStyle: ViewStyle = {
    flex: 1,
    ...(padding && {
      paddingHorizontal: LAYOUT.getContentPadding(),
    }),
    ...(safeArea && getContainerStyle()),
    ...style,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    // Add extra padding for very small screens
    ...(isCompact && {
      paddingVertical: LAYOUT.getPadding(8),
    }),
  };

  const Container = safeArea ? SafeAreaView : View;
  const Content = scrollable ? ScrollView : View;

  if (scrollable) {
    return (
      <Container style={containerStyle}>
        <ScrollView
          style={contentStyle}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: LAYOUT.getPadding(20), // Extra bottom padding for mobile
          }}
          showsVerticalScrollIndicator={!isMobile} // Hide on mobile for cleaner look
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container style={containerStyle}>
      <View style={contentStyle}>
        {children}
      </View>
    </Container>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  style?: ViewStyle;
}

/**
 * ResponsiveGrid - A grid component that automatically adjusts columns based on screen size
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns,
  spacing = LAYOUT.getPadding(16),
  style,
}) => {
  const { isMobile, isCompact } = useBreakpoint();
  
  // Auto-calculate columns if not provided
  const autoColumns = responsiveValue({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 4,
    xxxl: 5,
    default: 2,
  });

  const finalColumns = columns || autoColumns;
  
  // Reduce spacing on smaller screens
  const finalSpacing = isCompact ? spacing * 0.75 : spacing;

  return (
    <View 
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -finalSpacing / 2,
        },
        style
      ]}
    >
      {React.Children.map(children, (child, index) => (
        <View
          style={{
            width: `${100 / finalColumns}%`,
            paddingHorizontal: finalSpacing / 2,
            marginBottom: finalSpacing,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

interface ResponsiveCardProps {
  children: React.ReactNode;
  padding?: boolean;
  style?: ViewStyle;
}

/**
 * ResponsiveCard - A card component with mobile-optimized spacing and dimensions
 */
export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  padding = true,
  style,
}) => {
  const { isCompact } = useBreakpoint();

  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          borderRadius: LAYOUT.getBorderRadius(12),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: isCompact ? 1 : 2,
          },
          shadowOpacity: isCompact ? 0.1 : 0.15,
          shadowRadius: isCompact ? 2 : 4,
          elevation: isCompact ? 2 : 4,
          ...(padding && {
            padding: COMPONENT.card.padding,
          }),
          // Ensure cards don't get too wide on large screens
          maxWidth: COMPONENT.card.maxWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

/**
 * Utility hook for getting responsive dimensions in components
 */
export const useResponsiveDimensions = () => {
  const { isMobile, isCompact, deviceSize } = useBreakpoint();

  return {
    // Common responsive values
    contentPadding: LAYOUT.getContentPadding(),
    cardPadding: COMPONENT.card.padding,
    buttonHeight: COMPONENT.button.md,
    headerHeight: COMPONENT.getHeaderHeight(),
    tabBarHeight: COMPONENT.getTabBarHeight(),
    
    // Screen info
    screenWidth: SCREEN.width,
    screenHeight: SCREEN.height,
    usableHeight: SCREEN.usableHeight,
    
    // Device info
    isMobile,
    isCompact,
    deviceSize,
    
    // Layout helpers
    getOptimalColumns: (itemWidth: number) => {
      const availableWidth = SCREEN.width - (LAYOUT.getContentPadding() * 2);
      return Math.max(1, Math.floor(availableWidth / itemWidth));
    },
    
    getItemWidth: (columns: number) => {
      const spacing = LAYOUT.getPadding(16);
      const availableWidth = SCREEN.width - (LAYOUT.getContentPadding() * 2);
      return (availableWidth - (spacing * (columns - 1))) / columns;
    },
  };
};

export default {
  ResponsiveLayout,
  ResponsiveGrid,
  ResponsiveCard,
  useResponsiveDimensions,
};
