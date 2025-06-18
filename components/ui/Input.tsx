import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  style,
  ...props
}) => {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

  const styles = StyleSheet.create({
    base: {
      ...typography.body,
      color: colors.text,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
    },
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.backgroundDark,
    },
    filled: {
      backgroundColor: colors.background,
      borderColor: 'transparent',
    },
  });

  return (
    <TextInput
      style={[
        styles.base,
        styles[variant],
        style,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
};