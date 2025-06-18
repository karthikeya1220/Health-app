import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Timer, Dumbbell, Apple, Trophy, Activity } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

const exerciseTypes = [
  { id: 'cardio', name: 'Cardio', icon: Timer },
  { id: 'strength', name: 'Strength', icon: Dumbbell },
  { id: 'flexibility', name: 'Flexibility', icon: Apple },
  { id: 'balance', name: 'Balance', icon: Activity },
  { id: 'sports', name: 'Sports', icon: Trophy },
];

export const ExerciseTypeSelector: React.FC = () => {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const [selectedType, setSelectedType] = useState('cardio');

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.lg,
      marginVertical: Spacing.md,
    },
    title: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.md,
    },
    scrollContent: {
      paddingRight: Spacing.lg,
    },
    exerciseType: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    selectedExerciseType: {
      backgroundColor: colors.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select exercise type</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {exerciseTypes.map((type) => {
          const IconComponent = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.exerciseType,
                isSelected && styles.selectedExerciseType,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <IconComponent
                size={24}
                color={isSelected ? colors.surface : colors.textSecondary}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};