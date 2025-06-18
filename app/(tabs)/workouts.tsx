import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';

export default function WorkoutsTab() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workouts Page</Text>
      <Text style={{ color: colors.textSecondary, marginTop: 10 }}>
        Coming soon...
      </Text>
    </SafeAreaView>
  );
}