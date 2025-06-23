import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  TrendingUp, 
  Footprints, 
  Flame, 
  Clock, 
  Target, 
  Trophy, 
  Activity, 
  Heart, 
  Zap, 
  Calendar, 
  Award, 
  Play, 
  Plus,
  ChevronRight,
  Star,
  MapPin
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

// Goal Progress Component with responsive design
const GoalProgressCard = ({
  title,
  current,
  target,
  icon: Icon,
  color,
  unit,
  colors,
  typography,
}: {
  title: string;
  current: number;
  target: number;
  icon: any;
  color: string;
  unit: string;
  colors: any;
  typography: any;
}) => {
  const progress = (current / target) * 100;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={[goalStyles.goalCard, { backgroundColor: colors.surface }]}>
      <View style={goalStyles.goalHeader}>
        <View style={[goalStyles.goalIcon, { backgroundColor: color + '20' }]}>
          <Icon size={20} color={color} />
        </View>
        <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>
          {title}
        </Text>
      </View>
      
      <View style={goalStyles.goalProgress}>
        <Text style={[typography.h2, { color: colors.text, fontWeight: '700' }]}>
          {current}{unit}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          of {target}{unit}
        </Text>
      </View>
      
      <View style={[goalStyles.progressBar, { backgroundColor: colors.border }]}>
        <Animated.View
          style={[
            goalStyles.progressFill,
            { 
              backgroundColor: color,
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }
          ]}
        />
      </View>
      
      <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'right' }]}>
        {Math.round(progress)}% complete
      </Text>
    </View>
  );
};

// Achievement Card Component
const AchievementCard = ({
  title,
  description,
  icon: Icon,
  isCompleted,
  progress,
  colors,
  typography,
}: {
  title: string;
  description: string;
  icon: any;
  isCompleted: boolean;
  progress: number;
  colors: any;
  typography: any;
}) => {
  return (
    <View style={[achievementStyles.achievementCard, { backgroundColor: colors.surface }]}>
      <LinearGradient
        colors={isCompleted ? ['#10B981', '#34D399'] : [colors.border, colors.border]}
        style={achievementStyles.achievementIcon}
      >
        <Icon size={24} color={isCompleted ? '#FFFFFF' : colors.textSecondary} />
      </LinearGradient>
      
      <View style={achievementStyles.achievementContent}>
        <Text style={[typography.bodyMedium, { color: colors.text, fontWeight: '600' }]}>
          {title}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
          {description}
        </Text>
        
        {!isCompleted && (
          <View style={achievementStyles.progressContainer}>
            <View style={[achievementStyles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  achievementStyles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${progress}%`,
                  }
                ]}
              />
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary, fontSize: 10 }]}>
              {progress}%
            </Text>
          </View>
        )}
      </View>
      
      {isCompleted && (
        <View style={achievementStyles.completedBadge}>
          <Star size={12} color="#10B981" fill="#10B981" />
        </View>
      )}
    </View>
  );
};

// Quick Action Button Component
const QuickActionButton = ({
  title,
  icon: Icon,
  color,
  onPress,
  colors,
  typography,
}: {
  title: string;
  icon: any;
  color: string;
  onPress: () => void;
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
        style={[quickActionStyles.actionButton, { backgroundColor: colors.surface }]}
        activeOpacity={1}
      >
        <LinearGradient
          colors={[color, color + 'CC']}
          style={quickActionStyles.actionIcon}
        >
          <Icon size={20} color="#FFFFFF" />
        </LinearGradient>
        <Text style={[typography.caption, { color: colors.text, fontWeight: '600', marginTop: 8 }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ActivityPage() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [barAnim] = useState(() => Array.from({ length: 7 }, () => new Animated.Value(0)));

  const barData = [
    { height: 50, calories: 100, label: 'Wed' },
    { height: 60, calories: 120, label: 'Thu' },
    { height: 40, calories: 90, label: 'Fri' },
    { height: 55, calories: 100, label: 'Sat' },
    { height: 30, calories: 70, label: 'Sun' },
    { height: 65, calories: 140, label: 'Mon' },
    { height: 90, calories: 180, label: 'Tue' },
  ];

  // New data for enhanced components
  const dailyGoals = [
    { title: 'Steps', current: 9000, target: 10000, icon: Footprints, color: '#3B82F6', unit: '' },
    { title: 'Calories', current: 500, target: 600, icon: Flame, color: '#F59E0B', unit: 'kcal' },
    { title: 'Active Minutes', current: 74, target: 90, icon: Clock, color: '#10B981', unit: 'min' },
    { title: 'Distance', current: 4.2, target: 5.0, icon: MapPin, color: '#8B5CF6', unit: 'km' },
  ];

  const achievements = [
    { title: 'First 10K Steps', description: 'Complete 10,000 steps in a day', icon: Trophy, isCompleted: true, progress: 100 },
    { title: 'Calorie Crusher', description: 'Burn 500 calories in a day', icon: Flame, isCompleted: true, progress: 100 },
    { title: 'Weekly Warrior', description: 'Exercise 5 days this week', icon: Target, isCompleted: false, progress: 60 },
    { title: 'Early Bird', description: 'Exercise before 8 AM', icon: Award, isCompleted: false, progress: 25 },
  ];

  const quickActions = [
    { title: 'Start Workout', icon: Play, color: '#3B82F6', onPress: () => router.push('/(tabs)/workouts') },
    { title: 'Log Activity', icon: Plus, color: '#10B981', onPress: () => router.push('/(tabs)/activity') },
    { title: 'View History', icon: Calendar, color: '#F59E0B', onPress: () => router.push('/(tabs)/activity') },
    { title: 'Heart Rate', icon: Heart, color: '#EF4444', onPress: () => router.push('/(tabs)/activity') },
  ];

  useEffect(() => {
    const animations = barAnim.map((animValue: Animated.Value, index: number) =>
      Animated.timing(animValue, {
        toValue: barData[index].height,
        duration: 800 + index * 100,
        useNativeDriver: false,
      })
    );
    Animated.stagger(100, animations).start();
  }, [barAnim, barData]);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'start_workout':
        router.push('/(tabs)/workouts');
        break;
      case 'log_meal':
        router.push('/(tabs)/activity');
        break;
      case 'join_challenge':
        router.push('/(tabs)/challenge');
        break;
      case 'view_progress':
        // Stay on current screen
        break;
      case 'social_feed':
        router.push('/(tabs)/explore');
        break;
      case 'timer':
        router.push('/(tabs)/timer');
        break;
      default:
        break;
    }
  };

  const [selectedDay, setSelectedDay] = useState('06');
  const days = [
    { day: 'Wed', date: '30' },
    { day: 'Thu', date: '01' },
    { day: 'Fri', date: '02' },
    { day: 'Sat', date: '03' },
    { day: 'Sun', date: '04' },
    { day: 'Mon', date: '05' },
    { day: 'Tue', date: '06' },
  ];

  const styles = StyleSheet.create({
    calendarStrip: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: LAYOUT.getContentPadding(),
      marginVertical: LAYOUT.getMargin(20),
    },
    calendarItem: {
      alignItems: 'center',
      paddingVertical: LAYOUT.getPadding(12),
      paddingHorizontal: LAYOUT.getPadding(12),
      borderRadius: LAYOUT.getBorderRadius(12),
      minWidth: responsiveValue({ xs: 36, sm: 38, md: 40, default: 40 }),
    },
    activitySection: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      marginBottom: LAYOUT.getMargin(20),
    },
    activityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: LAYOUT.getMargin(16),
      gap: LAYOUT.getMargin(12),
    },
    activityCard: {
      flex: 1,
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(20),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    calorieCard: {
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(20),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    activityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getMargin(8),
    },
    chartContainer: {
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(20),
      marginHorizontal: LAYOUT.getContentPadding(),
      marginTop: LAYOUT.getMargin(20),
      marginBottom: LAYOUT.getMargin(20),
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(20),
    },
    chartBars: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: LAYOUT.getMargin(16),
      height: responsiveValue({ xs: 100, sm: 110, md: 120, default: 120 }),
    },
    bar: {
      width: responsiveValue({ xs: 12, sm: 13, md: 14, default: 14 }),
      borderRadius: responsiveValue({ xs: 6, sm: 6.5, md: 7, default: 7 }),
      marginBottom: LAYOUT.getMargin(6),
    },
    tooltip: {
      fontSize: responsiveValue({ xs: 9, sm: 10, md: 11, default: 11 }),
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: LAYOUT.getPadding(4),
      borderRadius: LAYOUT.getBorderRadius(10),
      marginBottom: LAYOUT.getMargin(6),
      fontWeight: '600',
    },
    trendIcon: {
      width: responsiveValue({ xs: 28, sm: 30, md: 32, default: 32 }),
      height: responsiveValue({ xs: 28, sm: 30, md: 32, default: 32 }),
      borderRadius: responsiveValue({ xs: 14, sm: 15, md: 16, default: 16 }),
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      marginHorizontal: LAYOUT.getContentPadding(),
      marginTop: LAYOUT.getMargin(24),
      marginBottom: LAYOUT.getMargin(16),
    },
    goalSection: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      marginBottom: LAYOUT.getMargin(24),
    },
    goalGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: LAYOUT.getMargin(12),
    },
    achievementSection: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      marginBottom: LAYOUT.getMargin(24),
    },
    achievementScroll: {
      paddingRight: LAYOUT.getContentPadding(),
    },
    quickActionSection: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      marginBottom: LAYOUT.getMargin(24),
    },
    quickActionGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: LAYOUT.getMargin(12),
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={{ 
        paddingBottom: insets.bottom + LAYOUT.getMargin(20) 
      }}>
        {/* Header */}
        <Text style={[typography.h1, { 
          marginTop: LAYOUT.getMargin(20), 
          marginLeft: LAYOUT.getContentPadding(), 
          color: colors.text, 
          fontWeight: '700' 
        }]}>
          My Activities
        </Text>

        {/* Calendar Strip */}
        <View style={styles.calendarStrip}>
          {days.map(({ day, date }) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.calendarItem,
                {
                  backgroundColor: selectedDay === date ? colors.primary : colors.surface,
                },
              ]}
              onPress={() => setSelectedDay(date)}
            >
              <Text style={[
                typography.caption,
                {
                  color: selectedDay === date ? colors.surface : colors.textSecondary,
                  fontWeight: '500',
                  fontSize: responsiveValue({ xs: 11, sm: 12, md: 13, default: 13 }),
                },
              ]}>
                {day}
              </Text>
              <Text style={[
                typography.bodyMedium,
                {
                  color: selectedDay === date ? colors.surface : colors.text,
                  fontWeight: '600',
                  marginTop: 2,
                  fontSize: responsiveValue({ xs: 14, sm: 15, md: 16, default: 16 }),
                },
              ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Activity Chart */}
        <View style={[styles.chartContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.chartHeader}>
            <Text style={[typography.h3, { color: colors.text, fontWeight: '700' }]}>
              Weekly Calories
            </Text>
            <View style={[styles.trendIcon, { backgroundColor: colors.success + '20' }]}>
              <TrendingUp size={16} color={colors.success} />
            </View>
          </View>
          
          <View style={styles.chartBars}>
            {barData.map((item, index) => (
              <View key={index} style={{ alignItems: 'center' }}>
                <Text style={[
                  styles.tooltip,
                  {
                    backgroundColor: colors.primary,
                    color: colors.surface,
                  }
                ]}>
                  {item.calories}
                </Text>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      height: barAnim[index],
                      backgroundColor: colors.primary,
                    }
                  ]}
                />
                <Text style={[
                  typography.caption,
                  {
                    color: colors.textSecondary,
                    marginTop: 8,
                    fontSize: responsiveValue({ xs: 10, sm: 11, md: 12, default: 12 }),
                  }
                ]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Goals Section */}
        <View style={styles.sectionTitle}>
          <Text style={[typography.h3, { color: colors.text, fontWeight: '700' }]}>
            Daily Goals
          </Text>
        </View>
        <View style={styles.goalSection}>
          <View style={styles.goalGrid}>
            {dailyGoals.map((goal, index) => (
              <GoalProgressCard
                key={index}
                title={goal.title}
                current={goal.current}
                target={goal.target}
                icon={goal.icon}
                color={goal.color}
                unit={goal.unit}
                colors={colors}
                typography={typography}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.sectionTitle}>
          <Text style={[typography.h3, { color: colors.text, fontWeight: '700' }]}>
            Quick Actions
          </Text>
        </View>
        <View style={styles.quickActionSection}>
          <View style={styles.quickActionGrid}>
            {quickActions.map((action, index) => (
              <QuickActionButton
                key={index}
                title={action.title}
                icon={action.icon}
                color={action.color}
                onPress={action.onPress}
                colors={colors}
                typography={typography}
              />
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.sectionTitle}>
          <Text style={[typography.h3, { color: colors.text, fontWeight: '700' }]}>
            Achievements
          </Text>
        </View>
        <View style={styles.achievementSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementScroll}
          >
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                isCompleted={achievement.isCompleted}
                progress={achievement.progress}
                colors={colors}
                typography={typography}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for Goal Progress Cards
const goalStyles = StyleSheet.create({
  goalCard: {
    width: responsiveValue({
      xs: (SCREEN.width - LAYOUT.getContentPadding() * 2 - LAYOUT.getMargin(12)) / 2,
      sm: (SCREEN.width - LAYOUT.getContentPadding() * 2 - LAYOUT.getMargin(12)) / 2,
      md: (SCREEN.width - LAYOUT.getContentPadding() * 2 - LAYOUT.getMargin(12)) / 2,
      default: (SCREEN.width - LAYOUT.getContentPadding() * 2 - LAYOUT.getMargin(12)) / 2
    }),
    borderRadius: LAYOUT.getBorderRadius(16),
    padding: LAYOUT.getPadding(16),
    marginBottom: LAYOUT.getMargin(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.getMargin(12),
    gap: LAYOUT.getMargin(8),
  },
  goalIcon: {
    width: responsiveValue({ xs: 32, sm: 34, md: 36, default: 36 }),
    height: responsiveValue({ xs: 32, sm: 34, md: 36, default: 36 }),
    borderRadius: responsiveValue({ xs: 16, sm: 17, md: 18, default: 18 }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalProgress: {
    marginBottom: LAYOUT.getMargin(12),
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: LAYOUT.getMargin(8),
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

// Styles for Achievement Cards
const achievementStyles = StyleSheet.create({
  achievementCard: {
    width: responsiveValue({ xs: 240, sm: 260, md: 280, default: 280 }),
    borderRadius: LAYOUT.getBorderRadius(16),
    padding: LAYOUT.getPadding(16),
    marginRight: LAYOUT.getMargin(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  achievementIcon: {
    width: responsiveValue({ xs: 48, sm: 52, md: 56, default: 56 }),
    height: responsiveValue({ xs: 48, sm: 52, md: 56, default: 56 }),
    borderRadius: responsiveValue({ xs: 24, sm: 26, md: 28, default: 28 }),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: LAYOUT.getMargin(12),
  },
  achievementContent: {
    flex: 1,
  },
  progressContainer: {
    marginTop: LAYOUT.getMargin(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: LAYOUT.getMargin(8),
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  completedBadge: {
    position: 'absolute',
    top: LAYOUT.getPadding(12),
    right: LAYOUT.getPadding(12),
    width: responsiveValue({ xs: 24, sm: 26, md: 28, default: 28 }),
    height: responsiveValue({ xs: 24, sm: 26, md: 28, default: 28 }),
    borderRadius: responsiveValue({ xs: 12, sm: 13, md: 14, default: 14 }),
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Styles for Quick Action Buttons
const quickActionStyles = StyleSheet.create({
  actionButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: LAYOUT.getBorderRadius(16),
    padding: LAYOUT.getPadding(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: responsiveValue({ xs: 40, sm: 44, md: 48, default: 48 }),
    height: responsiveValue({ xs: 40, sm: 44, md: 48, default: 48 }),
    borderRadius: responsiveValue({ xs: 20, sm: 22, md: 24, default: 24 }),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
