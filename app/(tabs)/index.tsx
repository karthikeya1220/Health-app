import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { DSColors } from '@/theme/colors';
import { getTypography, TextStyles } from '@/theme/typography';

const { width } = Dimensions.get('window');

// Enhanced Icon Component
const DashboardIcon = ({ name, size = 24, color = '#fff', style = {} }: {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}) => (
  <View style={[{
    width: size,
    height: size,
    backgroundColor: color + '20',
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color + '30',
  }, style]}>    <Text style={{
      color: color,
      ...TextStyles.button,
      fontSize: size * 0.35,
    }}>
      {name.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// Sparkline Chart Component
const SparklineChart = ({ data, color = DSColors.accent, height = 60 }: {
  data: number[];
  color?: string;
  height?: number;
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <View style={{ height, justifyContent: 'flex-end', paddingHorizontal: 4 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: height - 10,
        justifyContent: 'space-between',
      }}>
        {data.map((value, index) => {
          const normalizedHeight = ((value - min) / range) * (height - 20) + 8;
          return (
            <Animated.View
              key={index}
              style={{
                width: 3,
                height: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, normalizedHeight],
                }),
                backgroundColor: color || colors.primary,
                borderRadius: 2,
                marginHorizontal: 1,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

// Analytics Metric Card Component
const AnalyticsCard = ({ 
  title, 
  primaryValue, 
  unit = '', 
  change, 
  changeType = 'positive',
  chartData = [],
  hasChart = false,
  delay = 0,
  onPress
}: {
  title: string;
  primaryValue: number | string;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  chartData?: number[];
  hasChart?: boolean;
  delay?: number;
  onPress?: () => void;
}) => {
  const { colors, theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const valueAnim = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof primaryValue === 'number') {
      const listener = valueAnim.addListener(({ value }) => {
        setDisplayValue(Math.floor(value));
      });

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(valueAnim, {
            toValue: primaryValue,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]).start();
      }, delay);

      return () => valueAnim.removeListener(listener);
    } else {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    }
  }, [primaryValue]);

  const changeColor = changeType === 'positive' ? colors.success : 
                    changeType === 'negative' ? colors.error : colors.primary;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: 24,
          marginBottom: 16,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
          elevation: 4,
          borderWidth: theme === 'dark' ? 0 : 1,
          borderColor: colors.border,
        }}
      >        {/* Card Title */}
        <Text style={{
          ...TextStyles.overline,
          color: colors.textSecondary,
          marginBottom: 8,
          textTransform: 'uppercase',
        }}>
          {title}
        </Text>

        {/* Primary Metric */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'baseline',
          marginBottom: 4,
        }}>
          <Text style={{
            ...TextStyles.display,
            color: colors.text,
            lineHeight: 52,
          }}>
            {typeof primaryValue === 'number' ? displayValue.toLocaleString() : primaryValue}
          </Text>
          {unit && (
            <Text style={{
              ...TextStyles.h4,
              color: colors.textSecondary,
              marginLeft: 4,
            }}>
              {unit}
            </Text>
          )}
        </View>

        {/* Change Indicator */}
        {change && (
          <Text style={{
            ...TextStyles.bodySmall,
            fontWeight: '500',
            color: changeColor,
            marginBottom: hasChart ? 20 : 0,
          }}>
            {change}
          </Text>
        )}

        {/* Chart */}
        {hasChart && chartData.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <SparklineChart 
              data={chartData} 
              color={changeColor}
              height={60}
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Progress Ring Component
const ProgressRing = ({ 
  progress, 
  size = 80, 
  strokeWidth = 6, 
  color 
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const { colors } = useTheme();
  const ringColor = color || colors.primary;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 100,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      {/* Background Circle */}
      <View style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: ringColor + '20',
      }} />
      
      {/* Progress Circle */}
      <Animated.View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: 'transparent',
        borderTopColor: ringColor,
        transform: [{
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${progress * 3.6}deg`],
          }),
        }],
      }} />
        {/* Center Text */}
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{
          ...TextStyles.h4,
          fontWeight: '700',
          fontSize: size * 0.2,
          color: ringColor,
        }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};

// Active Groups Component
const ActiveGroupsCard = () => {
  const { colors, theme } = useTheme();
  
  const groups = [
    { name: 'Morning Runners', progress: 85, members: 12, color: colors.success },
    { name: 'Weight Warriors', progress: 72, members: 8, color: colors.primary },
    { name: 'Yoga Masters', progress: 94, members: 15, color: colors.info },
  ];

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 4,
    }}>      <Text style={{
        ...TextStyles.overline,
        color: colors.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
      }}>
        Active Groups
      </Text>

      {groups.map((group, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: index < groups.length - 1 ? 1 : 0,
            borderBottomColor: colors.border,
          }}
          activeOpacity={0.7}
        >
          <ProgressRing 
            progress={group.progress} 
            size={50} 
            strokeWidth={4} 
            color={group.color}
          />
          
          <View style={{ flex: 1, marginLeft: 16 }}>            <Text style={{
              ...TextStyles.bodyMedium,
              color: colors.text,
              marginBottom: 4,
            }}>
              {group.name}
            </Text>
            <Text style={{
              ...TextStyles.caption,
              color: colors.textSecondary,
            }}>
              {group.members} members • {group.progress}% complete
            </Text>
          </View>

          <DashboardIcon 
            name=">" 
            size={24} 
            color={group.color}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Quick Actions Component
const QuickActionsCard = () => {
  const { colors, theme } = useTheme();    const actions = [
      { name: 'Discover Groups', icon: 'D', color: colors.success, route: '/discover-groups' as const },
      { name: 'Trending Posts', icon: 'T', color: colors.warning, route: '/trending-posts' as const },
      { name: 'View Profile', icon: 'P', color: colors.primary, route: '/profile' as const },
      { name: 'Workouts', icon: 'W', color: colors.info, route: '/workouts' as const },
      { name: 'Join Challenge', icon: 'C', color: colors.error, route: '/challenge' as const },
      { name: 'Create Post', icon: '+', color: colors.accent, route: '/create-post' as const },
  ];

  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 4,
    }}>      <Text style={{
        ...TextStyles.overline,
        color: colors.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
      }}>
        Quick Actions
      </Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(action.route)}
            style={{
              flex: 1,
              minWidth: (width - 88) / 2 - 6,
              backgroundColor: action.color + '15',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: action.color + '30',
            }}
            activeOpacity={0.8}
          >
            <DashboardIcon 
              name={action.icon} 
              size={32} 
              color={action.color}
              style={{ marginBottom: 8 }}
            />            <Text style={{
              ...TextStyles.caption,
              fontWeight: '600',
              color: colors.text,
              textAlign: 'center',
            }}>
              {action.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Advanced Graph Component
const AdvancedGraphCard = ({ 
  title, 
  primaryValue, 
  unit = '', 
  change, 
  changeType = 'positive',
  graphData = [],
  timeframe = 'Week',
  onTimeframeChange,
  delay = 0
}: {
  title: string;
  primaryValue: number | string;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  graphData?: number[];
  timeframe?: string;
  onTimeframeChange?: (timeframe: string) => void;
  delay?: number;
}) => {
  const { colors, theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const valueAnim = useRef(new Animated.Value(0)).current;
  const chartAnim = useRef(new Animated.Value(1)).current;
  const [displayValue, setDisplayValue] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [currentGraphData, setCurrentGraphData] = useState(graphData);
  const [currentPrimaryValue, setCurrentPrimaryValue] = useState(primaryValue);
  const [currentChange, setCurrentChange] = useState(change);

  const timeframes = ['Day', 'Week', 'Month', 'Year'];

  // Mock data for different timeframes
  const getMockDataForTimeframe = (tf: string, baseData: number[]) => {
    const baseAvg = baseData.reduce((a, b) => a + b, 0) / baseData.length;
    
    switch (tf) {
      case 'Day':
        // Hourly data for today (24 hours)
        return Array.from({ length: 24 }, (_, i) => 
          Math.floor(baseAvg * 0.1 + Math.random() * baseAvg * 0.3)
        );
      case 'Week':
        // Daily data for week (7 days)
        return baseData;
      case 'Month':
        // Weekly data for month (4 weeks)
        return Array.from({ length: 4 }, (_, i) => 
          Math.floor(baseAvg * 5 + Math.random() * baseAvg * 2)
        );
      case 'Year':
        // Monthly data for year (12 months)
        return Array.from({ length: 12 }, (_, i) => 
          Math.floor(baseAvg * 20 + Math.random() * baseAvg * 10)
        );
      default:
        return baseData;
    }
  };

  const getPrimaryValueForTimeframe = (tf: string, baseValue: number | string) => {
    if (typeof baseValue === 'string') return baseValue;
    
    switch (tf) {
      case 'Day':
        return Math.floor(baseValue * 0.15); // Daily portion
      case 'Week':
        return baseValue; // Base value
      case 'Month':
        return Math.floor(baseValue * 4.3); // Monthly total
      case 'Year':
        return Math.floor(baseValue * 52); // Yearly total
      default:
        return baseValue;
    }
  };

  const getChangeTextForTimeframe = (tf: string) => {
    switch (tf) {
      case 'Day':
        return '+5.2% vs yesterday';
      case 'Week':
        return '+12.5% vs last week';
      case 'Month':
        return '+8.7% vs last month';
      case 'Year':
        return '+15.3% vs last year';
      default:
        return change || '';
    }
  };

  useEffect(() => {
    if (typeof primaryValue === 'number') {
      const listener = valueAnim.addListener(({ value }) => {
        setDisplayValue(Math.floor(value));
      });

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(valueAnim, {
            toValue: typeof currentPrimaryValue === 'number' ? currentPrimaryValue : 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]).start();
      }, delay);

      return () => valueAnim.removeListener(listener);
    } else {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    }
  }, [currentPrimaryValue]);

  const changeColor = changeType === 'positive' ? colors.success : 
                    changeType === 'negative' ? colors.error : colors.primary;

  const handleTimeframeChange = (newTimeframe: string) => {
    // Animate chart out
    Animated.timing(chartAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Update data
      setSelectedTimeframe(newTimeframe);
      const newGraphData = getMockDataForTimeframe(newTimeframe, graphData);
      const newPrimaryValue = getPrimaryValueForTimeframe(newTimeframe, primaryValue);
      const newChange = getChangeTextForTimeframe(newTimeframe);
      
      setCurrentGraphData(newGraphData);
      setCurrentPrimaryValue(newPrimaryValue);
      setCurrentChange(newChange);
      
      // Animate value counter
      if (typeof newPrimaryValue === 'number') {
        Animated.timing(valueAnim, {
          toValue: newPrimaryValue,
          duration: 1500,
          useNativeDriver: false,
        }).start();
      }
      
      // Animate chart back in
      Animated.timing(chartAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      
      // Call parent callback
      onTimeframeChange?.(newTimeframe);
    });
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        flex: 1,
      }}
    >
      <View style={{
        backgroundColor: theme === 'dark' ? colors.dashboardCardBg : colors.surface,
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        minHeight: 220,
        shadowColor: theme === 'dark' ? '#000' : colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: theme === 'dark' ? 0.24 : 0.12,
        shadowRadius: 3,
        elevation: 4,
        borderWidth: theme === 'dark' ? 0 : 1,
        borderColor: colors.border,
      }}>
        {/* Header with Timeframe Selector */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 8,
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: theme === 'dark' ? colors.dashboardTextSecondary : colors.textSecondary,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            {title}
          </Text>
          
          {/* Timeframe Pills */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: theme === 'dark' ? colors.dashboardTextMuted + '20' : colors.border + '30',
            borderRadius: 12,
            padding: 2,
          }}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                onPress={() => handleTimeframeChange(tf)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 10,
                  backgroundColor: selectedTimeframe === tf ? colors.primary : 'transparent',
                  transform: selectedTimeframe === tf ? [{ scale: 1.05 }] : [{ scale: 1 }],
                }}
                activeOpacity={0.7}
              >
                <Animated.Text style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: selectedTimeframe === tf 
                    ? colors.surface 
                    : theme === 'dark' ? colors.dashboardTextSecondary : colors.textSecondary,
                  transform: selectedTimeframe === tf ? [{ scale: 1.1 }] : [{ scale: 1 }],
                }}>
                  {tf}
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Primary Metric */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'baseline',
          marginBottom: 4,
        }}>
          <Text style={{
            fontSize: 48,
            fontWeight: '600',
            color: theme === 'dark' ? colors.dashboardTextPrimary : colors.text,
            lineHeight: 52,
          }}>
            {typeof currentPrimaryValue === 'number' ? displayValue.toLocaleString() : currentPrimaryValue}
          </Text>
          {unit && (
            <Text style={{
              fontSize: 18,
              fontWeight: '400',
              color: theme === 'dark' ? colors.dashboardTextSecondary : colors.textSecondary,
              marginLeft: 4,
            }}>
              {unit}
            </Text>
          )}
        </View>

        {/* Change Indicator */}
        {currentChange && (
          <Animated.Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: changeColor,
            marginBottom: 20,
            opacity: chartAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
          }}>
            {currentChange}
          </Animated.Text>
        )}

        {/* Advanced Graph */}
        <Animated.View 
          style={{ 
            marginTop: 20, 
            flex: 1,
            opacity: chartAnim,
            transform: [{
              scale: chartAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              })
            }],
          }}
        >
          <SmoothLineChart 
            data={currentGraphData} 
            color={colors.primary}
            height={80}
            showDataPoints={false}
            showGrid={true}
            animate={true}
            key={`${selectedTimeframe}-${Date.now()}`} // Force re-render for animation
          />
        </Animated.View>

        {/* Timeframe Info */}
        <View style={{
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: theme === 'dark' ? colors.border + '30' : colors.border + '20',
        }}>
          <Text style={{
            fontSize: 11,
            color: theme === 'dark' ? colors.dashboardTextMuted : colors.textSecondary,
            textAlign: 'center',
            fontWeight: '500',
          }}>
            {selectedTimeframe === 'Day' && '24 hours • Updated every hour'}
            {selectedTimeframe === 'Week' && '7 days • Updated daily'}
            {selectedTimeframe === 'Month' && '4 weeks • Updated weekly'}
            {selectedTimeframe === 'Year' && '12 months • Updated monthly'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

// Smooth Line Chart Component (Following graph.json specs)
const SmoothLineChart = ({ 
  data, 
  color, 
  height = 80,
  showDataPoints = false,
  showGrid = false,
  animate = true 
}: {
  data: number[];
  color?: string;
  height?: number;
  showDataPoints?: boolean;
  showGrid?: boolean;
  animate?: boolean;
}) => {
  const { colors, theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
    return '99, 102, 241'; // fallback to indigo
  };
  
  // Dynamic color selection based on theme
  const chartColor = color || colors.primary;
  const gridColor = theme === 'dark' ? colors.border + '30' : colors.border + '20';
  const bgGradient = theme === 'dark' ? 
    `rgba(${hexToRgb(chartColor)}, 0.15)` : 
    `rgba(${hexToRgb(chartColor)}, 0.08)`;

  useEffect(() => {
    if (animate) {
      // Main animation
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();

      // Glow effect animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      animatedValue.setValue(1);
      glowAnim.setValue(0);
    }
  }, [data]);

  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const chartWidth = width - 80; // Account for padding
  const stepX = chartWidth / (data.length - 1);

  // Create smooth curve points using Catmull-Rom spline
  const createSmoothPath = () => {
    const points = data.map((value, index) => ({
      x: index * stepX,
      y: height - ((value - min) / range) * (height - 30) - 15
    }));

    if (points.length < 2) return [];

    const smoothPoints = [];
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      // Create smooth curve segments
      for (let t = 0; t <= 1; t += 0.1) {
        const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
        const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
        smoothPoints.push({ x, y });
      }
    }

    return smoothPoints;
  };

  // Catmull-Rom spline function for smooth curves
  const catmullRom = (p0: number, p1: number, p2: number, p3: number, t: number) => {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
      (2 * p1) +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
  };

  const smoothPoints = createSmoothPath();

  return (
    <View style={{ 
      height, 
      width: '100%',
      position: 'relative',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      borderRadius: 12,
    }}>
      {/* Background with subtle gradient */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
        borderRadius: 12,
      }} />

      {/* Grid Lines - Subtle and Modern */}
      {showGrid && (
        <View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
          {/* Horizontal grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio, index) => (
            <View
              key={`h-${index}`}
              style={{
                position: 'absolute',
                left: 10,
                right: 10,
                top: ratio * height,
                height: 1,
                backgroundColor: gridColor,
                opacity: 0.3,
              }}
            />
          ))}
          {/* Vertical grid lines */}
          {data.filter((_, index) => index % 2 === 0).map((_, index) => (
            <View
              key={`v-${index}`}
              style={{
                position: 'absolute',
                left: (index * 2) * stepX + 10,
                top: 10,
                bottom: 10,
                width: 1,
                backgroundColor: gridColor,
                opacity: 0.2,
              }}
            />
          ))}
        </View>
      )}

      {/* Gradient Fill Area - Gen Z Style */}
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.6,
      }}>
        {data.map((value, index) => {
          if (index === 0) return null;
          
          const prevY = height - ((data[index - 1] - min) / range) * (height - 30) - 15;
          const currentY = height - ((value - min) / range) * (height - 30) - 15;
          const x = index * stepX;
          const prevX = (index - 1) * stepX;
          
          return (
            <Animated.View
              key={`fill-${index}`}
              style={{
                position: 'absolute',
                left: prevX,
                top: Math.min(prevY, currentY),
                width: stepX,
                height: Math.abs(currentY - prevY) + (height - Math.max(prevY, currentY)),
                backgroundColor: bgGradient,
                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.4],
                }),
              }}
            />
          );
        })}
      </View>

      {/* Smooth Animated Line Segments */}
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {smoothPoints.map((point, index) => {
          if (index === 0) return null;
          
          const prevPoint = smoothPoints[index - 1];
          const length = Math.sqrt(
            Math.pow(point.x - prevPoint.x, 2) + 
            Math.pow(point.y - prevPoint.y, 2)
          );
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * 180 / Math.PI;
          
          return (
            <Animated.View
              key={`line-${index}`}
              style={{
                position: 'absolute',
                left: prevPoint.x + 10,
                top: prevPoint.y,
                width: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, length],
                }),
                height: 3,
                backgroundColor: chartColor,
                borderRadius: 2,
                transform: [{ rotate: `${angle}deg` }],
                transformOrigin: 'left center',
                shadowColor: chartColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                shadowRadius: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [4, 12],
                }),
                elevation: 8,
              }}
            />
          );
        })}
      </View>

      {/* Gradient overlay for modern look */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: theme === 'dark' ? 
          'rgba(0,0,0,0.1)' :
          'rgba(255,255,255,0.3)',
        borderRadius: 12,
        pointerEvents: 'none',
      }} />
    </View>
  );
};

// Quick Action Buttons for Graph


// Main Dashboard Component
export default function HealthDashboard() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();

  // Mock data for analytics
  const weeklySteps = [8547, 9123, 7834, 10245, 8756, 9567, 11234];
  const caloriesBurned = [425, 567, 398, 612, 489, 534, 678];
  const workoutMinutes = [32, 45, 28, 52, 38, 41, 58];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 16,
      paddingBottom: Math.max(insets.bottom, 20) + 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
      borderWidth: 2,
      borderColor: colors.primary + '50',
    },
    greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    subGreeting: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    notificationButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    metricsGrid: {
      marginBottom: 24,
    },
    metricsRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={styles.container.backgroundColor} 
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: "https://via.placeholder.com/100x100/6366f1/FFFFFF?text=A" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>Hello, Alex</Text>
              <Text style={styles.subGreeting}>Ready to crush your goals?</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications')}
            activeOpacity={0.7}
          >
            <DashboardIcon name="B" size={24} color={colors.primary} />
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.error,
            }} />
          </TouchableOpacity>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {/* Row 1: Main Metrics */}
          <View style={styles.metricsRow}>
            <View style={{ flex: 1 }}>
              <AnalyticsCard
                title="Daily Steps"
                primaryValue={8547}
                change="+12.5% from yesterday"
                changeType="positive"
                hasChart={true}
                chartData={weeklySteps}
                delay={0}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AnalyticsCard
                title="Calories Burned"
                primaryValue={425}
                change="+8.3% this week"
                changeType="positive"
                hasChart={true}
                chartData={caloriesBurned}
                delay={200}
              />
            </View>
          </View>

          {/* Row 2: Advanced Graph Metrics */}
          <View style={styles.metricsRow}>
            <View style={{ flex: 1 }}>
              <AdvancedGraphCard
                title="Active Minutes"
                primaryValue={32}
                unit="min"
                change="Goal: 45 min"
                changeType="neutral"
                graphData={workoutMinutes}
                timeframe="Week"
                onTimeframeChange={(timeframe) => {
                  console.log('Timeframe changed to:', timeframe);
                  // Handle timeframe change logic here
                }}
                delay={400}
              />
              {/* <GraphQuickActions /> */}
            </View>
            {/* <View style={{ flex: 1 }}>
              <AdvancedGraphCard
                title="Weekly Goal"
                primaryValue="76%"
                change="3 days remaining"
                changeType="positive" 
                graphData={[45, 52, 67, 71, 76, 73, 76]}
                timeframe="Week"
                delay={600}
              />
              <GraphQuickActions />
            </View> */}
          </View>

          {/* Row 3: Additional Metrics */}
          <View style={styles.metricsRow}>
            <View style={{ flex: 1 }}>
              <AnalyticsCard
                title="Water Intake"
                primaryValue="2.1L"
                change="Goal: 3.0L"
                changeType="neutral"
                delay={800}
              />
            </View>
            <View style={{ flex: 1 }}>
              <AnalyticsCard
                title="Sleep Quality"
                primaryValue="8.2"
                unit="/10"
                change="+0.5 vs last week"
                changeType="positive"
                delay={1000}
              />
            </View>
          </View>
        </View>

        {/* Active Groups */}
        <ActiveGroupsCard />

        {/* Quick Actions */}
        <QuickActionsCard />
      </ScrollView>
    </SafeAreaView>
  );
}