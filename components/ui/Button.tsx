import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { LAYOUT, TOUCH } from '@/utils/responsive';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  children,
  ...props
}) => {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const styles = StyleSheet.create({
    base: {
      borderRadius: LAYOUT.getBorderRadius(16),
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: TOUCH.getButtonSize(size),
    },
    
    // Variants
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    
    // Sizes
    small: {
      paddingHorizontal: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(8),
    },
    medium: {
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(12),
    },
    large: {
      paddingHorizontal: LAYOUT.getPadding(20),
      paddingVertical: LAYOUT.getPadding(16),
    },
    
    // Text styles
    text: {
      ...typography.button,
    },
    primaryText: {
      color: colors.surface,
    },
    secondaryText: {
      color: colors.surface,
    },
    outlineText: {
      color: colors.primary,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        style,
      ]}
      {...props}
    >
      {children || <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>}
    </TouchableOpacity>
  );
};