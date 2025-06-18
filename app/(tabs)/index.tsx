import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Play, Timer, Activity, Apple, Dumbbell, Mountain } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { userData } from '@/constants/data';

const { width } = Dimensions.get('window');

// Custom Icons Components
const RunningIcon = ({ size, color }: { size: number; color: string }) => (
  <Timer size={size} color={color} />
);

const WalkingIcon = ({ size, color }: { size: number; color: string }) => (
  <Activity size={size} color={color} />
);

const NutritionIcon = ({ size, color }: { size: number; color: string }) => (
  <Apple size={size} color={color} />
);

const WeightsIcon = ({ size, color }: { size: number; color: string }) => (
  <Dumbbell size={size} color={color} />
);

const MoreIcon = ({ size, color }: { size: number; color: string }) => (
  <Mountain size={size} color={color} />
);

const TrophyIcon = ({ size, color }: { size: number; color: string }) => (
  <Activity size={size} color={color} />
);

// Body Diagram Component
const BodyDiagram = ({ 
  targetMuscle, 
  variant, 
  width: diagramWidth, 
  height: diagramHeight 
}: { 
  targetMuscle: string; 
  variant: 'front' | 'back'; 
  width: number; 
  height: number; 
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={{
      width: diagramWidth,
      height: diagramHeight,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Simple body representation */}
      <View style={{
        width: diagramWidth * 0.7,
        height: diagramHeight * 0.9,
        backgroundColor: colors.textSecondary + '20',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Head */}
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          top: 8,
        }} />
        
        {/* Body */}
        <View style={{
          width: 35,
          height: 45,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          top: 30,
          borderRadius: 8,
        }} />
        
        {/* Muscle highlights */}
        {variant === 'front' && targetMuscle === 'shoulders' && (
          <>
            <View style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: colors.primary,
              position: 'absolute',
              top: 32,
              left: 12,
            }} />
            <View style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: colors.primary,
              position: 'absolute',
              top: 32,
              right: 12,
            }} />
          </>
        )}
        
        {variant === 'back' && targetMuscle === 'back' && (
          <View style={{
            width: 25,
            height: 30,
            backgroundColor: colors.primary,
            position: 'absolute',
            top: 35,
            borderRadius: 5,
          }} />
        )}
        
        {/* Arms */}
        <View style={{
          width: 10,
          height: 30,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          top: 40,
          left: -8,
          borderRadius: 5,
        }} />
        <View style={{
          width: 10,
          height: 30,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          top: 40,
          right: -8,
          borderRadius: 5,
        }} />
        
        {/* Legs */}
        <View style={{
          width: 12,
          height: 25,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          bottom: 8,
          left: 18,
          borderRadius: 4,
        }} />
        <View style={{
          width: 12,
          height: 25,
          backgroundColor: colors.textSecondary + '40',
          position: 'absolute',
          bottom: 8,
          right: 18,
          borderRadius: 4,
        }} />
      </View>
    </View>
  );
};

// Coach Image Component
const CoachImage = ({ 
  variant, 
  width: coachWidth, 
  height: coachHeight 
}: { 
  variant: string; 
  width: number; 
  height: number; 
}) => {
  const { colors } = useTheme();
  
  return (
    <View style={{
      width: coachWidth,
      height: coachHeight,
      backgroundColor: colors.primary + '30',
      borderRadius: coachWidth / 2,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Activity size={coachWidth * 0.4} color={colors.primary} />
    </View>
  );
};

export default function HomeTab() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('Shoulders');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: Spacing.lg,
      paddingTop: Spacing.xl,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: Spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    greeting: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
    },
    notificationButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    challengeCard: {
      backgroundColor: colors.primaryLight,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      marginBottom: Spacing.xl,
    },
    challengeContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    challengeInfo: {
      flex: 1,
    },
    challengeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
      marginBottom: Spacing.md,
      alignSelf: 'flex-start',
    },
    challengeBadgeText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    challengeTitle: {
      ...typography.h2,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: Spacing.lg,
      lineHeight: 32,
    },
    getStartedButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.full,
      alignSelf: 'flex-start',
    },
    getStartedText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    challengeImageContainer: {
      marginLeft: Spacing.lg,
    },
    section: {
      marginBottom: Spacing.xl * 1.5,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.sm,
    },
    sectionSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.lg,
      lineHeight: 20,
    },
    exerciseTypesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    exerciseTypeButton: {
      width: 65,
      height: 65,
      borderRadius: 32.5,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    muscleWorkloadContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.sm,
      gap: Spacing.lg,
    },
    muscleWorkloadCard: {
      flex: 1,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      alignItems: 'center',
      minHeight: 180,
      justifyContent: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    muscleWorkloadImageContainer: {
      marginBottom: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    muscleWorkloadName: {
      ...typography.body,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  const exerciseTypes = [
    { id: 'running', component: RunningIcon, name: 'Run', selected: true },
    { id: 'walking', component: WalkingIcon, name: 'Walk', selected: false },
    { id: 'nutrition', component: NutritionIcon, name: 'Nutrition', selected: false },
    { id: 'weights', component: WeightsIcon, name: 'Weights', selected: false },
    { id: 'more', component: MoreIcon, name: 'More', selected: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: userData.profileImage }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.greeting}>
              Hello, {userData.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Challenge Card */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeContent}>
            <View style={styles.challengeInfo}>
              <View style={styles.challengeBadge}>
                <TrophyIcon size={12} color={colors.surface} />
                <Text style={styles.challengeBadgeText}>Challenge</Text>
              </View>
              <Text style={styles.challengeTitle}>
                Challenge With{'\n'}Pro Coach
              </Text>
              <TouchableOpacity 
                style={styles.getStartedButton}
                activeOpacity={0.9}
              >
                <Play size={16} color={colors.text} fill={colors.text} />
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.challengeImageContainer}>
              <CoachImage
                variant="running"
                width={80}
                height={100}
              />
            </View>
          </View>
        </View>

        {/* Exercise Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Select exercise type
          </Text>
          <View style={styles.exerciseTypesRow}>
            {exerciseTypes.map((type) => (
              <TouchableOpacity 
                key={type.id}
                style={[
                  styles.exerciseTypeButton,
                  { backgroundColor: type.selected ? colors.accent : colors.surface }
                ]}
                activeOpacity={0.85}
              >
                <type.component 
                  size={28} 
                  color={type.selected ? colors.surface : colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Muscles Workload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Muscles workload
          </Text>
          <Text style={styles.sectionSubtitle}>
            Select muscles type you want to make strong
          </Text>
          
          <View style={styles.muscleWorkloadContainer}>
            {/* Shoulders Card */}
            <TouchableOpacity
              style={[
                styles.muscleWorkloadCard,
                { 
                  backgroundColor: selectedMuscleGroup === 'Shoulders' ? colors.primaryLight : colors.surface,
                  borderColor: selectedMuscleGroup === 'Shoulders' ? colors.primary : colors.border,
                  borderWidth: selectedMuscleGroup === 'Shoulders' ? 2 : 1,
                }
              ]}
              onPress={() => setSelectedMuscleGroup('Shoulders')}
              activeOpacity={0.88}
            >
              <View style={styles.muscleWorkloadImageContainer}>
                <BodyDiagram
                  targetMuscle="shoulders"
                  variant="front"
                  width={80}
                  height={100}
                />
              </View>
              <Text style={[
                styles.muscleWorkloadName,
                { 
                  color: selectedMuscleGroup === 'Shoulders' ? colors.primary : colors.text,
                  fontWeight: selectedMuscleGroup === 'Shoulders' ? '600' : '500',
                }
              ]}>
                Shoulders
              </Text>
            </TouchableOpacity>

            {/* Back Card */}
            <TouchableOpacity
              style={[
                styles.muscleWorkloadCard,
                { 
                  backgroundColor: selectedMuscleGroup === 'Back' ? colors.primaryLight : colors.surface,
                  borderColor: selectedMuscleGroup === 'Back' ? colors.primary : colors.border,
                  borderWidth: selectedMuscleGroup === 'Back' ? 2 : 1,
                }
              ]}
              onPress={() => setSelectedMuscleGroup('Back')}
              activeOpacity={0.88}
            >
              <View style={styles.muscleWorkloadImageContainer}>
                <BodyDiagram
                  targetMuscle="back"
                  variant="back"
                  width={80}
                  height={100}
                />
              </View>
              <Text style={[
                styles.muscleWorkloadName,
                { 
                  color: selectedMuscleGroup === 'Back' ? colors.primary : colors.text,
                  fontWeight: selectedMuscleGroup === 'Back' ? '600' : '500',
                }
              ]}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}