import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const { width } = Dimensions.get('window');

// Exercise Type Card Component
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
            size={24} 
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
      paddingBottom: insets.bottom + 20,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      marginBottom: 20,
    },
    headerTitle: {
      ...typography.h1,
      color: colors.text,
      fontWeight: '700',
      marginBottom: 4,
    },
    headerSubtitle: {
      ...typography.bodyMedium,
      color: colors.textSecondary,
      opacity: 0.8,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 24,
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    statValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '700',
      marginBottom: 4,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    exerciseTypesContainer: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      fontWeight: '700',
      marginBottom: 16,
    },
    exerciseTypesScroll: {
      paddingRight: 20,
    },
    exerciseTypeCard: {
      width: 80,
      height: 80,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      borderWidth: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    exerciseTypeIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
    },
    exerciseTypeName: {
      ...typography.caption,
      fontSize: 10,
      fontWeight: '600',
    },
    workoutsContainer: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },
    workoutCard: {
      borderRadius: 20,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    workoutGradient: {
      padding: 20,
      position: 'relative',
    },
    workoutCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    workoutTypeTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    workoutDifficulty: {
      flexDirection: 'row',
      gap: 2,
    },
    workoutContent: {
      marginBottom: 16,
    },
    workoutStats: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 12,
    },
    workoutStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressCard: {
      margin: 20,
      borderRadius: 20,
      padding: 20,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    progressBars: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 80,
    },
    progressBarContainer: {
      alignItems: 'center',
      flex: 1,
    },
    progressBarBg: {
      width: 12,
      height: 60,
      borderRadius: 6,
      justifyContent: 'flex-end',
    },
    progressBarFill: {
      width: 12,
      borderRadius: 6,
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