import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { LAYOUT, TOUCH } from '@/utils/responsive';

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
      paddingHorizontal: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(12),
      borderRadius: LAYOUT.getBorderRadius(12),
      borderWidth: 1,
      minHeight: TOUCH.getButtonSize('medium'),
    },
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
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