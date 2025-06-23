import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { NavigationService } from '@/utils/navigation';
import { responsiveValue, LAYOUT } from '@/utils/responsive';

interface NavigationButtonProps {
  title: string;
  screen: string;
  icon?: React.ReactNode;
  style?: any;
  params?: any;
  color?: string;
  onPress?: () => void;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  title,
  screen,
  icon,
  style,
  params,
  color,
  onPress,
}) => {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      NavigationService.navigate(screen, params);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || colors.primary }, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color: colors.surface }]}>{title}</Text>
    </TouchableOpacity>
  );
};

interface QuickActionGridProps {
  actions: Array<{
    title: string;
    screen: string;
    icon?: React.ReactNode;
    color?: string;
    params?: any;
    onPress?: () => void;
  }>;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ actions }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.grid}>
      {actions.map((action, index) => (
        <NavigationButton
          key={index}
          title={action.title}
          screen={action.screen}
          icon={action.icon}
          color={action.color}
          params={action.params}
          onPress={action.onPress}
          style={styles.gridItem}
        />
      ))}
    </View>
  );
};

interface NavigationHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: {
    title: string;
    screen: string;
    params?: any;
  };
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  rightAction,
}) => {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => NavigationService.goBack()}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.text }]}>← Back</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {rightAction && (
        <NavigationButton
          title={rightAction.title}
          screen={rightAction.screen}
          params={rightAction.params}
          style={styles.headerAction}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveValue({ xs: 16, sm: 20, default: 24 }),
    paddingVertical: responsiveValue({ xs: 12, sm: 14, default: 16 }),
    borderRadius: LAYOUT.getBorderRadius(12),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: responsiveValue({ xs: 14, sm: 15, default: 16 }),
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveValue({ xs: 8, sm: 12, default: 16 }),
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    minHeight: responsiveValue({ xs: 60, sm: 70, default: 80 }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.getContentPadding(),
    paddingVertical: responsiveValue({ xs: 12, sm: 16, default: 20 }),
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: responsiveValue({ xs: 18, sm: 20, default: 24 }),
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: responsiveValue({ xs: 14, sm: 15, default: 16 }),
    marginTop: 4,
  },
  headerAction: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default NavigationButton;
