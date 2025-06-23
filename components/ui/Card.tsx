import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LAYOUT } from '@/utils/responsive';

interface CardProps extends ViewProps {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    base: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(16),
    },
    elevated: {
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
  });

  return (
    <View
      style={[
        styles.base,
        elevated && styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};