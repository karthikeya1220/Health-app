import { Spacing } from '@/theme/spacing';
import { BorderRadius } from '@/theme/spacing';
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
  Timer,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Calendar,
  Users,
  Flame,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { 
  scale, 
  verticalScale, 
  SCREEN, 
  LAYOUT, 
  TOUCH,
  responsiveValue 
} from '@/utils/responsive';

const { width, height } = Dimensions.get('window');

// Modern Challenge Stats Card Component
const ChallengeStatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  colors, 
  typography,
  gradientColors 
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  colors: any;
  typography: any;
  gradientColors: string[];
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}        style={{
          borderRadius: BorderRadius.xl,
          overflow: 'hidden',
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        }}
      >        <LinearGradient
          colors={gradientColors as any}
          style={{
            padding: Spacing.lg,
            alignItems: 'center',
            minHeight: 120,
            justifyContent: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Spacing.sm,
          }}>
            <Icon size={24} color="#FFFFFF" />
          </View>
          <Text style={[typography.h3, { color: '#FFFFFF', fontWeight: '700', marginBottom: 4 }]}>
            {value}
          </Text>
          <Text style={[typography.caption, { color: '#FFFFFF', opacity: 0.9, textAlign: 'center' }]}>
            {title}
          </Text>
          <Text style={[typography.caption, { color: '#FFFFFF', opacity: 0.7, fontSize: 10, marginTop: 2 }]}>
            {subtitle}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Achievement Badge Component
const AchievementBadge = ({ 
  title, 
  description, 
  icon: Icon, 
  isUnlocked = false,
  colors,
  typography
}: {
  title: string;
  description: string;
  icon: any;
  isUnlocked?: boolean;
  colors: any;
  typography: any;
}) => {
  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginRight: Spacing.md,
      width: 140,
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      opacity: isUnlocked ? 1 : 0.6,
    }}>
      <View style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: isUnlocked ? colors.success + '20' : colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
      }}>
        <Icon size={28} color={isUnlocked ? colors.success : colors.textSecondary} />
      </View>
      <Text style={[typography.bodyMedium, { 
        color: colors.text, 
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4 
      }]}>
        {title}
      </Text>
      <Text style={[typography.caption, { 
        color: colors.textSecondary, 
        textAlign: 'center',
        lineHeight: 16 
      }]}>
        {description}
      </Text>
    </View>
  );
};

// Challenge Progress Ring Component  
const ChallengeProgressRing = ({ 
  progress, 
  size = 180, 
  strokeWidth = 12,
  colors,
  typography
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  colors: any;
  typography: any;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Progress animation
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [progress]);

  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <Animated.View style={{ 
      transform: [{ scale: pulseAnim }],
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{ width: size, height: size, position: 'relative' }}>
        {/* Background Circle */}
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: colors.border,
            position: 'absolute',
          }}
        />
        
        {/* Animated Progress Circle */}
        <Animated.View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: colors.success,
            position: 'absolute',
            transform: [
              { rotate: '-90deg' },
              {
                rotate: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0deg', `${360 * (progress / 100)}deg`],
                }),
              },
            ],
          }}
        />
        
        {/* Center Content */}
        <View
          style={{
            position: 'absolute',
            top: strokeWidth + 10,
            left: strokeWidth + 10,
            right: strokeWidth + 10,
            bottom: strokeWidth + 10,
            borderRadius: (size - strokeWidth * 2 - 20) / 2,
            backgroundColor: colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Activity size={32} color={colors.surface} />
          </View>
          <Text style={[typography.caption, { 
            color: colors.textSecondary, 
            marginBottom: 4,
            fontSize: 12
          }]}>
            Current Challenge
          </Text>
          <Text style={[typography.h2, { 
            color: colors.text, 
            fontWeight: '700',
            marginBottom: 4
          }]}>
            {progress}%
          </Text>
          <Text style={[typography.caption, { 
            color: colors.primary, 
            fontWeight: '600',
            fontSize: 11
          }]}>
            7-Day Streak
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

// Challenge Category Card Component
const ChallengeCategoryCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient,
  participantCount,
  difficulty,
  duration,
  onPress,
  colors,
  typography
}: {
  title: string;
  description: string;
  icon: any;
  gradient: string[];
  participantCount: number;
  difficulty: number;
  duration: string;
  onPress: () => void;
  colors: any;
  typography: any;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View style={{ 
      transform: [{ scale: scaleAnim }],
      marginBottom: Spacing.lg
    }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          borderRadius: BorderRadius.xl,
          overflow: 'hidden',
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 12,
        }}
      >        <LinearGradient
          colors={gradient as any}
          style={{
            padding: Spacing.lg,
            minHeight: 160,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: Spacing.md,
          }}>
            <View style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Icon size={28} color="#FFFFFF" />
            </View>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: Spacing.sm,
              paddingVertical: 4,
              borderRadius: BorderRadius.full,
            }}>
              <Users size={14} color="#FFFFFF" />
              <Text style={[typography.caption, { 
                color: '#FFFFFF', 
                marginLeft: 4,
                fontWeight: '600'
              }]}>
                {participantCount}
              </Text>
            </View>
          </View>
          
          <Text style={[typography.h3, { 
            color: '#FFFFFF', 
            fontWeight: '700',
            marginBottom: 8
          }]}>
            {title}
          </Text>
          
          <Text style={[typography.body, { 
            color: '#FFFFFF', 
            opacity: 0.9,
            marginBottom: Spacing.md,
            lineHeight: 22
          }]}>
            {description}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: Spacing.md,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Clock size={16} color="#FFFFFF" />
                <Text style={[typography.caption, { 
                  color: '#FFFFFF', 
                  marginLeft: 4,
                  fontWeight: '500'
                }]}>
                  {duration}
                </Text>
              </View>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {[...Array(difficulty)].map((_, i) => (
                  <Star key={i} size={12} color="#FFD700" fill="#FFD700" />
                ))}
              </View>
            </View>
            
            <View style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ChevronRight size={18} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Animated Circular Progress Component (Legacy - keeping for reference)
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
    </View>
  );
};



export default function ChallengePage() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('active');
  const [currentProgress, setCurrentProgress] = useState(68);
  // Challenge data
  const challengeStats = [
    {
      title: 'Current Streak',
      value: '7',
      subtitle: 'Days',
      icon: Flame,
      gradientColors: ['#FF6B6B', '#FF8E8E'],
    },
    {
      title: 'Completed',
      value: '24',
      subtitle: 'Challenges',
      icon: Trophy,
      gradientColors: ['#4FACFE', '#00F2FE'],
    },
    {
      title: 'Points Earned',
      value: '1,250',
      subtitle: 'Total',
      icon: Award,
      gradientColors: ['#43E97B', '#38F9D7'],
    },
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first challenge',
      icon: Target,
      isUnlocked: true,
    },
    {
      title: 'Week Warrior',
      description: '7-day streak',
      icon: Flame,
      isUnlocked: true,
    },
    {
      title: 'Marathon',
      description: '30-day streak',
      icon: Trophy,
      isUnlocked: false,
    },
    {
      title: 'Champion',
      description: 'Complete 50 challenges',
      icon: Award,
      isUnlocked: false,
    },
  ];

  const activeChallenge = {
    title: 'Morning Warrior',
    description: 'Complete 5 morning workouts this week',
    icon: Activity,
    gradient: ['#667eea', '#764ba2'],
    participantCount: 1247,
    difficulty: 3,
    duration: '7 days',
    progress: 68,
  };

  const availableChallenges = [
    {
      title: 'Cardio Crusher',
      description: 'Complete 10 cardio sessions in 2 weeks',
      icon: Heart,
      gradient: ['#f093fb', '#f5576c'],
      participantCount: 856,
      difficulty: 4,
      duration: '14 days',
    },
    {
      title: 'Strength Builder',
      description: 'Complete strength training 3x per week',
      icon: Dumbbell,
      gradient: ['#4facfe', '#00f2fe'],
      participantCount: 692,
      difficulty: 3,
      duration: '21 days',
    },
    {
      title: 'Flexibility Focus',
      description: 'Daily stretching for better mobility',
      icon: Activity,
      gradient: ['#43e97b', '#38f9d7'],
      participantCount: 423,
      difficulty: 2,
      duration: '14 days',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
    },
    headerButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: '700',
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.full,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    inactiveTab: {
      backgroundColor: colors.surface,
    },
    tabText: {
      ...typography.bodyMedium,
      fontWeight: '600',
    },
    activeTabText: {
      color: colors.surface,
    },
    inactiveTabText: {
      color: colors.textSecondary,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '700',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    currentChallengeCard: {
      marginHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    progressContainer: {
      alignItems: 'center',
      marginVertical: Spacing.xl,
    },
    achievementsContainer: {
      paddingLeft: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    achievementsScroll: {
      paddingRight: Spacing.lg,
    },
    challengesContainer: {
      paddingHorizontal: Spacing.lg,
    },
    scrollContent: {
      paddingBottom: insets.bottom + 20,
    },
  });

  const renderTabContent = () => {
    if (selectedTab === 'active') {
      return (
        <>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {challengeStats.map((stat, index) => (
              <ChallengeStatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                colors={colors}
                typography={typography}
                gradientColors={stat.gradientColors}
              />
            ))}
          </View>

          {/* Current Challenge Progress */}
          <View style={styles.progressContainer}>
            <ChallengeProgressRing
              progress={currentProgress}
              colors={colors}
              typography={typography}
            />
          </View>

          {/* Current Challenge Details */}
          <AnimatedCard style={styles.currentChallengeCard}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: Spacing.md,
            }}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.h4, { 
                  color: colors.text, 
                  fontWeight: '700',
                  marginBottom: 4 
                }]}>
                  {activeChallenge.title}
                </Text>
                <Text style={[typography.body, { 
                  color: colors.textSecondary,
                  marginBottom: Spacing.md 
                }]}>
                  {activeChallenge.description}
                </Text>
                
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: Spacing.lg,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Users size={16} color={colors.textSecondary} />
                    <Text style={[typography.caption, { 
                      color: colors.textSecondary, 
                      marginLeft: 4 
                    }]}>
                      {activeChallenge.participantCount} joined
                    </Text>
                  </View>
                  
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Clock size={16} color={colors.textSecondary} />
                    <Text style={[typography.caption, { 
                      color: colors.textSecondary, 
                      marginLeft: 4 
                    }]}>
                      {activeChallenge.duration}
                    </Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.primary + '20',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <MoreHorizontal size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            {/* Progress Bar */}
            <View style={{
              backgroundColor: colors.border,
              height: 8,
              borderRadius: 4,
              marginBottom: Spacing.sm,
            }}>
              <View style={{
                backgroundColor: colors.success,
                height: 8,
                borderRadius: 4,
                width: `${currentProgress}%`,
              }} />
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {currentProgress}% Complete
              </Text>
              <Text style={[typography.caption, { 
                color: colors.success,
                fontWeight: '600' 
              }]}>
                3/5 workouts done
              </Text>
            </View>
          </AnimatedCard>

          {/* Action Buttons */}
          <View style={{
            paddingHorizontal: Spacing.lg,
            marginBottom: Spacing.xl,
            gap: Spacing.md,
          }}>
            <GradientButton
              title="Continue Challenge"
              gradient="primary"
              size="large"
              onPress={() => {}}
            />
            <TouchableOpacity style={{
              paddingVertical: Spacing.md,
              alignItems: 'center',
            }}>
              <Text style={[typography.bodyMedium, { 
                color: colors.textSecondary,
                fontWeight: '500' 
              }]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>

          {/* Achievements */}
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsScroll}
            >
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  title={achievement.title}
                  description={achievement.description}
                  icon={achievement.icon}
                  isUnlocked={achievement.isUnlocked}
                  colors={colors}
                  typography={typography}
                />
              ))}
            </ScrollView>
          </View>
        </>
      );
    }

    // Available Challenges Tab
    return (
      <>
        <Text style={styles.sectionTitle}>Available Challenges</Text>
        <View style={styles.challengesContainer}>
          {availableChallenges.map((challenge, index) => (
            <ChallengeCategoryCard
              key={index}
              title={challenge.title}
              description={challenge.description}
              icon={challenge.icon}
              gradient={challenge.gradient}
              participantCount={challenge.participantCount}
              difficulty={challenge.difficulty}
              duration={challenge.duration}
              onPress={() => {}}
              colors={colors}
              typography={typography}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Challenges</Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <Trophy size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'active' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Active
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'available' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setSelectedTab('available')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'available' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Available
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}