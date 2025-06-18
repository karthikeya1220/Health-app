import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

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
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
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
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    medium: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    large: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.lg,
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