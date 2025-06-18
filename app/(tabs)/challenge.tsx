import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Star, 
  Edit, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Square,
  Heart,
  Activity,
  Dumbbell,
  Timer
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Animated Circular Progress Component
const CircularProgress = ({ 
  progress, 
  size = 200, 
  strokeWidth = 12,
  backgroundColor = '#E5E5EA',
  progressColor = '#34C759'
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {/* Background Circle */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: backgroundColor,
          position: 'absolute',
        }}
      />
      
      {/* Progress Arc */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: 'transparent',
          borderTopColor: progressColor,
          position: 'absolute',
          transform: [
            { rotate: '-90deg' },
            {
              rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${360 * (progress / 100)}deg`],
              }),
            },
          ],
        }}
      />
      
      {/* Inner Content */}
      <View
        style={{
          position: 'absolute',
          top: strokeWidth,
          left: strokeWidth,
          right: strokeWidth,
          bottom: strokeWidth,
          borderRadius: (size - strokeWidth * 2) / 2,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          <Activity size={28} color="white" />
        </View>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#666',
          marginBottom: 4,
        }}>
          Running
        </Text>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#000',
        }}>
          10km
        </Text>
      </View>
    </View>
  );
};

// Workout Stats Bar Component
const WorkoutStatsBar = () => {
  const { colors } = useTheme();
  const bars = [40, 80, 60, 90, 45, 70, 85, 30, 95, 50];
  
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 60,
      gap: 4,
    }}>
      {bars.map((height, index) => (
        <Animated.View
          key={index}
          style={{
            width: 6,
            height: height * 0.6,
            borderRadius: 3,
            backgroundColor: index === 4 ? '#8BC34A' : index === 8 ? '#FF9800' : colors.textSecondary + '40',
          }}
        />
      ))}
    </View>
  );
};

// Exercise Card Component
const ExerciseCard = ({ 
  exerciseNumber, 
  totalExercises, 
  exerciseName, 
  reps, 
  percentage, 
  time, 
  isActive = false,
  onPress 
}: {
  exerciseNumber: number;
  totalExercises: number;
  exerciseName: string;
  reps: string;
  percentage: number;
  time: string;
  isActive?: boolean;
  onPress?: () => void;
}) => {
  const { colors } = useTheme();
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
        style={{
          backgroundColor: colors.surface,
          borderRadius: 25,
          padding: 20,
          marginBottom: 16,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
          }}>
            Exercise {exerciseNumber}/{totalExercises}
          </Text>
          <TouchableOpacity>
            <MoreHorizontal size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: colors.primary + '20',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}>
              <Dumbbell size={24} color={colors.primary} />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.textSecondary,
                marginBottom: 4,
              }}>
                {exerciseName}
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.text,
                }}>
                  {reps}
                </Text>
                <View style={{
                  backgroundColor: colors.success + '20',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 12,
                  marginLeft: 8,
                }}>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.success,
                  }}>
                    ▲ {percentage}%
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.textSecondary,
              marginBottom: 4,
            }}>
              Time
            </Text>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: 8,
            }}>
              {time}
            </Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: colors.text,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Play size={16} color={colors.text} fill={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ChallengePage() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [isRunning, setIsRunning] = useState(true);
  const [timer, setTimer] = useState('1:29:59');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    if (isRunning) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [isRunning]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 20,
    },
    headerButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 25,
      paddingHorizontal: 8,
      paddingVertical: 8,
      gap: 8,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    actionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    workoutCard: {
      backgroundColor: colors.surface,
      borderRadius: 30,
      marginHorizontal: 20,
      padding: 24,
      marginBottom: 20,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 12,
    },
    workoutHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    workoutIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    workoutInfo: {
      flex: 1,
      marginLeft: 16,
    },
    workoutTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    workoutDuration: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
    },
    exerciseProgress: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 20,
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
      marginBottom: 24,
    },
    exerciseText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    timerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    progressContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    stopButton: {
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 25,
      overflow: 'hidden',
    },
    stopButtonGradient: {
      paddingVertical: 18,
      alignItems: 'center',
    },
    stopButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.surface,
      marginLeft: 8,
    },
    scrollContent: {
      paddingBottom: insets.bottom + 120,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Star size={18} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={18} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MoreHorizontal size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Workout Summary Card */}
        <View style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <View style={styles.workoutIcon}>
              <Dumbbell size={28} color={colors.primary} />
            </View>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>Workout</Text>
              <Text style={styles.workoutDuration}>90 min</Text>
            </View>
            <WorkoutStatsBar />
          </View>
        </View>

        {/* Exercise Progress */}
        <View style={styles.exerciseProgress}>
          <View style={styles.progressHeader}>
            <Text style={styles.exerciseText}>Exercise 1/8</Text>
            <Text style={styles.timerText}>{timer}</Text>
          </View>

          <View style={styles.progressContainer}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <CircularProgress 
                progress={65} 
                size={220}
                strokeWidth={8}
                backgroundColor={colors.border}
                progressColor="#8BC34A"
              />
            </Animated.View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>VO₂ 29</Text>
            </View>
            
            <View style={{
              width: 40,
              height: 4,
              backgroundColor: colors.text,
              borderRadius: 2,
            }} />
            
            <View style={styles.statItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Heart size={20} color="#FF6B6B" fill="#FF6B6B" />
                <Text style={[styles.statValue, { marginLeft: 8 }]}>98</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stop Button */}
        <View style={styles.stopButton}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.stopButtonGradient}
          >
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setIsRunning(!isRunning)}
            >
              <Square size={20} color={colors.surface} fill={colors.surface} />
              <Text style={styles.stopButtonText}>STOP</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Next Exercise Card */}
        <ExerciseCard
          exerciseNumber={2}
          totalExercises={8}
          exerciseName="Bench Press"
          reps="3/10"
          percentage={6}
          time="4min"
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}