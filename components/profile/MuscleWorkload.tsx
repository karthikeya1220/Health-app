import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

const muscleGroups = [
  { id: 'shoulders', name: 'Shoulders', frontView: true },
  { id: 'back', name: 'Back', frontView: false },
];

export const MuscleWorkload: React.FC = () => {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const [selectedMuscle, setSelectedMuscle] = useState('shoulders');

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.lg,
      marginVertical: Spacing.md,
    },
    title: {
      ...typography.h3,
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    subtitle: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginBottom: Spacing.lg,
    },
    muscleOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    muscleOption: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginHorizontal: Spacing.xs,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedMuscleOption: {
      borderColor: colors.accent,
    },
    bodyDiagram: {
      width: 80,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    bodyShape: {
      width: 60,
      height: 100,
      borderRadius: 30,
      backgroundColor: colors.background,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    frontView: {
      // Base styling for front view
    },
    backView: {
      // Base styling for back view
    },
    selectedBodyShape: {
      backgroundColor: colors.primaryLight,
    },
    shoulderHighlight: {
      position: 'absolute',
      top: 10,
      width: 40,
      height: 20,
      backgroundColor: 'transparent',
      borderRadius: 10,
    },
    backHighlight: {
      position: 'absolute',
      top: 15,
      width: 35,
      height: 30,
      backgroundColor: 'transparent',
      borderRadius: 8,
    },
    activeHighlight: {
      backgroundColor: colors.secondary,
    },
    muscleName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    selectedMuscleName: {
      color: colors.accent,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muscles workload</Text>
      <Text style={styles.subtitle}>Select muscles type you want to make strong</Text>
      
      <View style={styles.muscleOptions}>
        {muscleGroups.map((muscle) => {
          const isSelected = selectedMuscle === muscle.id;
          
          return (
            <TouchableOpacity
              key={muscle.id}
              style={[
                styles.muscleOption,
                isSelected && styles.selectedMuscleOption,
              ]}
              onPress={() => setSelectedMuscle(muscle.id)}
            >
              <View style={styles.bodyDiagram}>
                {/* Simplified body diagram representation */}
                <View style={[
                  styles.bodyShape,
                  muscle.frontView ? styles.frontView : styles.backView,
                  isSelected && styles.selectedBodyShape,
                ]}>
                  {muscle.frontView && (
                    <>
                      {/* Shoulders highlight for front view */}
                      <View style={[
                        styles.shoulderHighlight,
                        isSelected && muscle.id === 'shoulders' && styles.activeHighlight,
                      ]} />
                    </>
                  )}
                  {!muscle.frontView && (
                    <>
                      {/* Back highlight for back view */}
                      <View style={[
                        styles.backHighlight,
                        isSelected && muscle.id === 'back' && styles.activeHighlight,
                      ]} />
                    </>
                  )}
                </View>
              </View>
              <Text style={[
                styles.muscleName,
                isSelected && styles.selectedMuscleName,
              ]}>
                {muscle.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};