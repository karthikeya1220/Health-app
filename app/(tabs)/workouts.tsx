import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius, Layout, Grid } from '@/theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  scale, 
  verticalScale, 
  moderateScale, 
  SCREEN, 
  GRID, 
  LAYOUT, 
  COMPONENT,
  TOUCH,
  useSafeLayout,
  responsiveValue,
  isTablet
} from '@/utils/responsive';
import { getDeviceType } from '@/theme/spacing';
import { 
  Timer, 
  Dumbbell, 
  Apple, 
  Trophy, 
  Activity, 
  Play, 
  Star, 
  Clock, 
  Flame,
  Target,
  TrendingUp,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Exercise Type Card Component with responsive design
const ExerciseTypeCard = ({ 
  type, 
  isSelected, 
  onPress,
  styles,
  colors,
  typography
}: { 
  type: any; 
  isSelected: boolean; 
  onPress: () => void;
  styles: any;
  colors: any;
  typography: any;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[
          styles.exerciseTypeCard,
          {
            backgroundColor: isSelected ? colors.primary : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
          }
        ]}
      >
        <View style={[
          styles.exerciseTypeIcon,
          {
            backgroundColor: isSelected ? colors.surface : colors.primary + '20',
          }
        ]}>
          <type.icon 
            size={responsiveValue({ xs: scale(20), sm: scale(22), md: scale(24), default: scale(22) })} 
            color={isSelected ? colors.primary : colors.primary} 
          />
        </View>
        <Text style={[
          styles.exerciseTypeName,
          {
            color: isSelected ? colors.surface : colors.text,
            fontWeight: isSelected ? '700' : '600'
          }
        ]}>
          {type.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Workout Card Component
const WorkoutCard = ({ 
  workout, 
  onPress,
  styles,
  colors,
  typography
}: { 
  workout: any; 
  onPress: () => void;
  styles: any;
  colors: any;
  typography: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.workoutCard, { backgroundColor: colors.surface }]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[workout.gradientColors[0], workout.gradientColors[1]]}
        style={styles.workoutGradient}
      >
        <View style={styles.workoutCardHeader}>
          <View style={[styles.workoutTypeTag, { backgroundColor: colors.surface + '90' }]}>
            <Text style={[typography.caption, { color: colors.text, fontWeight: '600' }]}>
              {workout.type}
            </Text>
          </View>
          <View style={styles.workoutDifficulty}>
            {[...Array(workout.difficulty)].map((_, i) => (
              <Star key={i} size={12} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
        </View>
        
        <View style={styles.workoutContent}>
          <Text style={[typography.h3, { color: colors.surface, fontWeight: '700' }]}>
            {workout.name}
          </Text>
          <Text style={[typography.body, { color: colors.surface, opacity: 0.9, marginTop: 4 }]}>
            {workout.description}
          </Text>
          
          <View style={styles.workoutStats}>
            <View style={styles.workoutStat}>
              <Clock size={16} color={colors.surface} />
              <Text style={[typography.caption, { color: colors.surface, marginLeft: 4, fontWeight: '600' }]}>
                {workout.duration}
              </Text>
            </View>
            <View style={styles.workoutStat}>
              <Flame size={16} color={colors.surface} />
              <Text style={[typography.caption, { color: colors.surface, marginLeft: 4, fontWeight: '600' }]}>
                {workout.calories} cal
              </Text>
            </View>
            <View style={styles.workoutStat}>
              <Target size={16} color={colors.surface} />
              <Text style={[typography.caption, { color: colors.surface, marginLeft: 4, fontWeight: '600' }]}>
                {workout.exercises} exercises
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.playButton}>
          <Play size={20} color={colors.surface} fill={colors.surface} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Weekly Progress Component
const WeeklyProgress = ({ 
  styles, 
  colors, 
  typography 
}: { 
  styles: any;
  colors: any;
  typography: any;
}) => {
  const barAnim = useRef(Array.from({ length: 7 }, () => new Animated.Value(0))).current;

  const weekData = [
    { day: 'Mon', progress: 80, workouts: 2 },
    { day: 'Tue', progress: 60, workouts: 1 },
    { day: 'Wed', progress: 90, workouts: 3 },
    { day: 'Thu', progress: 45, workouts: 1 },
    { day: 'Fri', progress: 75, workouts: 2 },
    { day: 'Sat', progress: 100, workouts: 3 },
    { day: 'Sun', progress: 30, workouts: 1 },
  ];

  useEffect(() => {
    const animations = barAnim.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: weekData[index].progress,
        duration: 1000 + index * 100,
        useNativeDriver: false,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={[styles.progressCard, { backgroundColor: colors.surface }]}>
      <View style={styles.progressHeader}>
        <Text style={[typography.h4, { color: colors.text, fontWeight: '700' }]}>
          This Week
        </Text>
        <TouchableOpacity>
          <TrendingUp size={20} color={colors.success} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressBars}>
        {weekData.map((data, index) => (
          <View key={index} style={styles.progressBarContainer}>
            <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: 8 }]}>
              {data.day}
            </Text>
            <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: index === 5 ? colors.success : colors.primary,
                    height: barAnim[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 60],
                    }),
                  }
                ]}
              />
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4, fontSize: 10 }]}>
              {data.workouts}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function WorkoutsTab() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState('cardio');

  const exerciseTypes = [
    { id: 'cardio', name: 'Cardio', icon: Timer },
    { id: 'strength', name: 'Strength', icon: Dumbbell },
    { id: 'flexibility', name: 'Flexibility', icon: Apple },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'balance', name: 'Balance', icon: Activity },
  ];

  const workouts = [
    {
      id: 1,
      name: 'Morning Energy',
      type: 'Cardio',
      description: 'Start your day with high energy cardio workout',
      duration: '25 min',
      calories: 320,
      exercises: 12,
      difficulty: 2,
      gradientColors: ['#FF6B9D', '#FF8E8E'],
    },
    {
      id: 2,
      name: 'Strength Builder',
      type: 'Strength',
      description: 'Build muscle with focused strength training',
      duration: '45 min',
      calories: 450,
      exercises: 8,
      difficulty: 3,
      gradientColors: ['#4FACFE', '#00F2FE'],
    },
    {
      id: 3,
      name: 'Core Power',
      type: 'Strength',
      description: 'Strengthen your core with targeted exercises',
      duration: '20 min',
      calories: 180,
      exercises: 10,
      difficulty: 2,
      gradientColors: ['#A8EDEA', '#FED6E3'],
    },
    {
      id: 4,
      name: 'HIIT Blast',
      type: 'Cardio',
      description: 'High intensity interval training for maximum burn',
      duration: '30 min',
      calories: 480,
      exercises: 15,
      difficulty: 4,
      gradientColors: ['#FF9A8B', '#FF6BA6'],
    },
  ];

  const filteredWorkouts = selectedType === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.type.toLowerCase() === selectedType);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: Math.max(insets.bottom, Spacing.lg) + Spacing.xl,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    headerTitle: {
      ...TextStyles.h1,
      color: colors.text,
      fontWeight: '700',
      marginBottom: scale(4),
      fontSize: responsiveValue({ xs: scale(24), sm: scale(28), md: scale(32), default: scale(28) }),
    },
    headerSubtitle: {
      ...TextStyles.bodyMedium,
      color: colors.textSecondary,
      opacity: 0.8,
      fontSize: responsiveValue({ xs: scale(14), sm: scale(16), md: scale(18), default: scale(16) }),
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
      gap: Spacing.md,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: responsiveValue({ xs: scale(12), sm: scale(16), md: scale(20), default: scale(16) }),
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: verticalScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: scale(8),
      elevation: 4,
      minHeight: responsiveValue({ xs: verticalScale(70), sm: verticalScale(80), md: verticalScale(90), default: verticalScale(80) }),
      justifyContent: 'center',
    },
    statValue: {
      ...TextStyles.h3,
      color: colors.text,
      fontWeight: '700',
      marginBottom: scale(4),
      fontSize: responsiveValue({ xs: scale(18), sm: scale(20), md: scale(24), default: scale(20) }),
    },
    statLabel: {
      ...TextStyles.caption,
      color: colors.textSecondary,
      fontWeight: '500',
      fontSize: responsiveValue({ xs: scale(10), sm: scale(12), md: scale(14), default: scale(12) }),
    },
    exerciseTypesContainer: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    sectionTitle: {
      ...TextStyles.h4,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.lg,
      fontSize: responsiveValue({ xs: scale(16), sm: scale(18), md: scale(20), default: scale(18) }),
    },
    exerciseTypesScroll: {
      paddingRight: Spacing.lg,
    },
    exerciseTypeCard: {
      width: responsiveValue({ xs: scale(70), sm: scale(80), md: scale(90), default: scale(80) }),
      height: responsiveValue({ xs: scale(70), sm: scale(80), md: scale(90), default: scale(80) }),      borderRadius: BorderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(12),
      borderWidth: scale(2),
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: verticalScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: scale(8),
      elevation: 4,
    },
    exerciseTypeIcon: {
      width: responsiveValue({ xs: scale(32), sm: scale(36), md: scale(40), default: scale(36) }),
      height: responsiveValue({ xs: scale(32), sm: scale(36), md: scale(40), default: scale(36) }),
      borderRadius: responsiveValue({ xs: scale(16), sm: scale(18), md: scale(20), default: scale(18) }),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(4),
    },
    exerciseTypeName: {
      ...TextStyles.caption,
      fontSize: responsiveValue({ xs: scale(9), sm: scale(10), md: scale(11), default: scale(10) }),
      fontWeight: '600',
      textAlign: 'center',
    },
    workoutsContainer: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    workoutCard: {
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.lg,
      overflow: 'hidden',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: verticalScale(4) },
      shadowOpacity: 0.15,
      shadowRadius: scale(12),
      elevation: 8,
    },
    workoutGradient: {
      padding: responsiveValue({ xs: scale(16), sm: scale(18), md: scale(20), default: scale(18) }),
      position: 'relative',
      minHeight: responsiveValue({ xs: verticalScale(120), sm: verticalScale(140), md: verticalScale(160), default: verticalScale(140) }),
    },
    workoutCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(12),
    },
    workoutTypeTag: {
      paddingHorizontal: scale(8),
      paddingVertical: scale(4),
      borderRadius: BorderRadius.md,
    },
    workoutDifficulty: {
      flexDirection: 'row',
      gap: scale(2),
    },
    workoutContent: {
      marginBottom: Spacing.lg,
    },
    workoutStats: {
      flexDirection: 'row',
      gap: Spacing.lg,
      marginTop: scale(12),
    },
    workoutStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playButton: {
      position: 'absolute',
      bottom: Spacing.lg,
      right: Spacing.lg,      width: TOUCH.getTouchSize(),
      height: TOUCH.getTouchSize(),
      borderRadius: TOUCH.getTouchSize() / 2,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressCard: {
      margin: Spacing.lg,
      borderRadius: BorderRadius.lg,
      padding: responsiveValue({ xs: scale(16), sm: scale(18), md: scale(20), default: scale(18) }),
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: verticalScale(4) },
      shadowOpacity: 0.1,
      shadowRadius: scale(12),
      elevation: 8,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    progressBars: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: responsiveValue({ xs: verticalScale(60), sm: verticalScale(70), md: verticalScale(80), default: verticalScale(70) }),
    },
    progressBarContainer: {
      alignItems: 'center',
      flex: 1,
    },
    progressBarBg: {
      width: responsiveValue({ xs: scale(10), sm: scale(12), md: scale(14), default: scale(12) }),
      height: responsiveValue({ xs: verticalScale(50), sm: verticalScale(55), md: verticalScale(60), default: verticalScale(55) }),
      borderRadius: responsiveValue({ xs: scale(5), sm: scale(6), md: scale(7), default: scale(6) }),
      justifyContent: 'flex-end',
    },
    progressBarFill: {
      width: responsiveValue({ xs: scale(10), sm: scale(12), md: scale(14), default: scale(12) }),
      borderRadius: responsiveValue({ xs: scale(5), sm: scale(6), md: scale(7), default: scale(6) }),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Workouts</Text>
          <Text style={styles.headerSubtitle}>Let's burn some calories together! 🔥</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12.5K</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>48h</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
        </View>

        {/* Exercise Types */}
        <View style={styles.exerciseTypesContainer}>
          <Text style={styles.sectionTitle}>Exercise Types</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.exerciseTypesScroll}
          >
            <ExerciseTypeCard
              type={{ id: 'all', name: 'All', icon: Target }}
              isSelected={selectedType === 'all'}
              onPress={() => setSelectedType('all')}
              styles={styles}
              colors={colors}
              typography={typography}
            />
            {exerciseTypes.map((type) => (
              <ExerciseTypeCard
                key={type.id}
                type={type}
                isSelected={selectedType === type.id}
                onPress={() => setSelectedType(type.id)}
                styles={styles}
                colors={colors}
                typography={typography}
              />
            ))}
          </ScrollView>
        </View>

        {/* Weekly Progress */}
        <WeeklyProgress 
          styles={styles}
          colors={colors}
          typography={typography}
        />

        {/* Workouts List */}
        <View style={styles.workoutsContainer}>
          <Text style={styles.sectionTitle}>
            {selectedType === 'all' ? 'All Workouts' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Workouts`}
          </Text>
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => {
                console.log('Workout pressed:', workout.name);
              }}
              styles={styles}
              colors={colors}
              typography={typography}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}