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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Activity as ActivityIcon,
  Heart,
  Clock,
  Footprints,
  Trophy,
  Timer as TimerIcon,
  TrendingUp,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Animated Bar Chart Component
const AnimatedBarChart = () => {
  const { colors, theme } = useTheme();
  const animatedValues = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(0))
  ).current;

  const barData = [
    { height: 40, calories: 320, color: colors.info, label: '2km' },
    { height: 65, calories: 480, color: colors.success, label: '3km' },
    { height: 80, calories: 654, color: colors.warning, label: '4km' },
    { height: 45, calories: 420, color: colors.info, label: '5km' },
    { height: 90, calories: 780, color: colors.primary, label: '6km' },
    { height: 70, calories: 600, color: colors.accent, label: '7km' },
    { height: 85, calories: 720, color: colors.success, label: '8km' },
    { height: 30, calories: 280, color: colors.warning, label: '9km' },
    { height: 95, calories: 1233, color: colors.error, label: '10km' },
    { height: 50, calories: 450, color: colors.info, label: '11km' },
  ];

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: barData[index].height,
        duration: 1500 + index * 100,
        useNativeDriver: false,
      })
    );

    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={{
      height: 200,
      marginVertical: 20,
      position: 'relative',
      paddingHorizontal: 10,
    }}>
      {/* Animated Background Glow */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme === 'dark' ? colors.primary + '10' : colors.primary + '05',
        borderRadius: 20,
      }} />

      {/* Bar Chart Container */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 160,
        paddingHorizontal: 15,
        paddingTop: 20,
      }}>
        {barData.map((bar, index) => (
          <View key={index} style={{ alignItems: 'center', flex: 1 }}>
            {/* Animated Bar with Gradient */}
            <Animated.View
              style={{
                width: 12,
                height: animatedValues[index],
                borderRadius: 6,
                marginBottom: 8,
                overflow: 'hidden',
                shadowColor: bar.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <LinearGradient
                colors={[bar.color, bar.color + '80']}
                style={{ flex: 1 }}
              />
            </Animated.View>

            {/* Calorie Labels with Floating Effect */}
            {(index === 2 || index === 8) && (
              <Animated.View
                style={{
                  position: 'absolute',
                  top: -25,
                  backgroundColor: bar.color + '20',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: bar.color + '40',
                }}
              >
                <Text style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: bar.color,
                }}>
                  {bar.calories}kcal
                </Text>
              </Animated.View>
            )}
          </View>
        ))}
      </View>

      {/* Distance Labels */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 10,
      }}>
        {['2km', '4km', '6km', '8km', '10km'].map((distance, index) => (
          <Text key={index} style={{
            fontSize: 11,
            color: colors.textSecondary,
            fontWeight: '600',
          }}>
            {distance}
          </Text>
        ))}
      </View>

      {/* Floating Trend Icon */}
      <View style={{
        position: 'absolute',
        top: 15,
        right: 20,
        backgroundColor: colors.success + '20',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TrendingUp size={16} color={colors.success} />
      </View>
    </View>
  );
};

// Wavy Progress Chart Component
const WavyProgressChart = () => {
  const { colors, theme } = useTheme();
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    waveAnimation.start();
  }, []);

  const progressData = [
    { progress: 0.3, color: colors.info, label: '320kcal' },
    { progress: 0.6, color: colors.warning, label: '654kcal' },
    { progress: 0.9, color: colors.error, label: '1,233kcal' },
  ];

  return (
    <View style={{
      height: 200,
      marginVertical: 20,
      backgroundColor: theme === 'dark' ? colors.surface : colors.background,
      borderRadius: 25,
      padding: 20,
      overflow: 'hidden',
    }}>
      {/* Animated Background Waves */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          transform: [
            {
              translateX: waveAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 50],
              }),
            },
          ],
        }}
      >
        <LinearGradient
          colors={[colors.primary + '20', colors.accent + '20', colors.info + '20']}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Progress Rings */}
      {progressData.map((item, index) => (
        <View key={index} style={{
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Progress Bar */}
          <View style={{
            flex: 1,
            height: 12,
            backgroundColor: colors.border,
            borderRadius: 6,
            marginRight: 15,
            overflow: 'hidden',
          }}>
            <Animated.View
              style={{
                height: '100%',
                width: `${item.progress * 100}%`,
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <LinearGradient
                colors={[item.color, item.color + '80']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          </View>

          {/* Calorie Label */}
          <Text style={{
            fontSize: 14,
            fontWeight: '700',
            color: item.color,
            minWidth: 70,
            textAlign: 'right',
          }}>
            {item.label}
          </Text>
        </View>
      ))}

      {/* Distance Progress */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 10,
      }}>
        {['Start', '2.5km', '5km', '7.5km', '10km'].map((point, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index <= 3 ? colors.primary : colors.border,
              marginBottom: 5,
            }} />
            <Text style={{
              fontSize: 10,
              color: colors.textSecondary,
              fontWeight: '500',
            }}>
              {point}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Circular Progress Rings Component
const CircularProgressRings = () => {
  const { colors } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
  }, []);

  const rings = [
    { size: 120, progress: 0.9, color: colors.error, strokeWidth: 8 },
    { size: 90, progress: 0.6, color: colors.warning, strokeWidth: 6 },
    { size: 60, progress: 0.3, color: colors.info, strokeWidth: 4 },
  ];

  return (
    <View style={{
      height: 200,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        {rings.map((ring, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              width: ring.size,
              height: ring.size,
              borderRadius: ring.size / 2,
              borderWidth: ring.strokeWidth,
              borderColor: ring.color + '30',
              borderTopColor: ring.color,
              borderRightColor: ring.color,
            }}
          />
        ))}
      </Animated.View>

      {/* Center Content */}
      <View style={{
        position: 'absolute',
        alignItems: 'center',
      }}>
        <Zap size={24} color={colors.primary} />
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: colors.text,
          marginTop: 5,
        }}>
          1,233
        </Text>
        <Text style={{
          fontSize: 12,
          color: colors.textSecondary,
          fontWeight: '500',
        }}>
          kcal burned
        </Text>
      </View>

      {/* Floating Labels */}
      <View style={{
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: colors.info + '20',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
      }}>
        <Text style={{
          fontSize: 11,
          fontWeight: '600',
          color: colors.info,
        }}>
          320kcal
        </Text>
      </View>

      <View style={{
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: colors.warning + '20',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
      }}>
        <Text style={{
          fontSize: 11,
          fontWeight: '600',
          color: colors.warning,
        }}>
          654kcal
        </Text>
      </View>
    </View>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  duration = 2000,
  textColor 
}: {
  value: number;
  suffix?: string;
  duration?: number;
  textColor: string;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value]);

  return (
    <Text style={{
      fontSize: 32,
      fontWeight: 'bold',
      color: textColor,
    }}>
      {displayValue.toLocaleString()}{suffix}
    </Text>
  );
};

// Runner Image Component
const RunnerImage = ({ textColor }: { textColor: string }) => {
  const { colors } = useTheme();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, []);

  return (
    <Animated.View style={{
      transform: [{ translateY: bounceAnim }],
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 120,
      height: 140,
    }}>
      {/* Runner silhouette placeholder */}
      <View style={{
        width: 120,
        height: 140,
        backgroundColor: textColor + '20',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIcon size={60} color={textColor + '60'} />
      </View>
      
      {/* Shadow/reflection effect */}
      <View style={{
        position: 'absolute',
        bottom: -10,
        left: 20,
        right: 20,
        height: 20,
        backgroundColor: textColor + '15',
        borderRadius: 10,
        transform: [{ scaleX: 0.8 }],
      }} />
    </Animated.View>
  );
};

export default function ActivityPage() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [selectedChart, setSelectedChart] = useState(0);

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

  // Chart selection
  const charts = [
    { component: AnimatedBarChart, name: 'Bars' },
    { component: WavyProgressChart, name: 'Waves' },
    { component: CircularProgressRings, name: 'Rings' },
  ];

  const CurrentChart = charts[selectedChart].component;

  // Theme-aware colors for stats card
  const statsCardColors = theme === 'dark' 
    ? {
        gradientColors: [colors.surface, colors.primaryDark, colors.surface],
        textColor: colors.text,
        labelColor: colors.textSecondary,
        badgeBackground: colors.primary + '40',
        badgeText: colors.surface,
      }
    : {
        gradientColors: [colors.primary + '30', colors.accent + '25', colors.info + '20'],
        textColor: colors.text,
        labelColor: colors.textSecondary,
        badgeBackground: colors.surface + '90',
        badgeText: colors.text,
      };

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
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    mainCard: {
      backgroundColor: colors.surface,
      borderRadius: 40,
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 24,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 16,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    runnerIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.text,
      lineHeight: 42,
    },
    calorieLabel: {
      fontSize: 16,
      color: colors.error,
      fontWeight: '600',
    },
    chartSelector: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
      gap: 10,
    },
    chartButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.border,
    },
    chartButtonActive: {
      backgroundColor: colors.primary,
    },
    chartButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    chartButtonTextActive: {
      color: colors.surface,
    },
    statsCard: {
      borderRadius: 30,
      marginHorizontal: 20,
      marginBottom: 20,
      overflow: 'hidden',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 16,
    },
    statsGradient: {
      padding: 24,
      minHeight: 280,
      position: 'relative',
    },
    probadge: {
      position: 'absolute',
      top: 24,
      right: 24,
      backgroundColor: statsCardColors.badgeBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    proBadgeText: {
      color: statsCardColors.badgeText,
      fontWeight: 'bold',
      fontSize: 14,
      marginLeft: 6,
    },
    statItem: {
      marginBottom: 24,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    statIcon: {
      marginRight: 12,
    },
    statLabel: {
      fontSize: 16,
      color: statsCardColors.labelColor,
      fontWeight: '500',
    },
    statValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: statsCardColors.textColor,
    },
    scrollContent: {
      paddingBottom: insets.bottom + 120,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
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
          
          <Text style={styles.headerTitle}>Set Timer</Text>
          
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Main Marathon Card */}
        <Animated.View 
          style={[styles.mainCard, { transform: [{ scale: scaleAnim }] }]}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <View style={styles.iconContainer}>
              <View style={styles.runnerIcon}>
                <ActivityIcon size={28} color={colors.surface} />
              </View>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>10km{'\n'}Marathon</Text>
              <Text style={styles.calorieLabel}>1,233kcal</Text>
            </View>

            {/* Chart Selector */}
            <View style={styles.chartSelector}>
              {charts.map((chart, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.chartButton,
                    selectedChart === index && styles.chartButtonActive,
                  ]}
                  onPress={() => setSelectedChart(index)}
                >
                  <Text style={[
                    styles.chartButtonText,
                    selectedChart === index && styles.chartButtonTextActive,
                  ]}>
                    {chart.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dynamic Chart Component */}
            <CurrentChart />
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <LinearGradient
            colors={statsCardColors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsGradient}
          >
            {/* PRO Badge */}
            <View style={styles.probadge}>
              <Trophy size={16} color={statsCardColors.badgeText} />
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>

            {/* Steps */}
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Footprints 
                  size={20} 
                  color={statsCardColors.labelColor} 
                  style={styles.statIcon} 
                />
                <Text style={styles.statLabel}>Steps</Text>
              </View>
              <AnimatedCounter 
                value={14233} 
                textColor={statsCardColors.textColor}
              />
            </View>

            {/* Heart Rate */}
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Heart 
                  size={20} 
                  color={colors.error} 
                  fill={colors.error} 
                  style={styles.statIcon} 
                />
                <Text style={styles.statLabel}>HR</Text>
              </View>
              <AnimatedCounter 
                value={112} 
                textColor={statsCardColors.textColor}
              />
            </View>

            {/* Timer */}
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <TimerIcon 
                  size={20} 
                  color={statsCardColors.labelColor} 
                  style={styles.statIcon} 
                />
                <Text style={styles.statLabel}>Time</Text>
              </View>
              <Text style={styles.statValue}>00:32</Text>
            </View>

            {/* Animated Runner */}
            <RunnerImage textColor={statsCardColors.textColor} />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}