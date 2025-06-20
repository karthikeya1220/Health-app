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
import { TrendingUp, Footprints, Flame, Clock } from 'lucide-react-native';

export default function ActivityPage() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const barAnim = useRef(Array.from({ length: 7 }, () => new Animated.Value(0))).current;

  const barData = [
    { height: 50, calories: 100, label: 'Wed' },
    { height: 60, calories: 120, label: 'Thu' },
    { height: 40, calories: 90, label: 'Fri' },
    { height: 55, calories: 100, label: 'Sat' },
    { height: 30, calories: 70, label: 'Sun' },
    { height: 65, calories: 140, label: 'Mon' },
    { height: 90, calories: 180, label: 'Tue' },
  ];

  useEffect(() => {
    const animations = barAnim.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: barData[index].height,
        duration: 800 + index * 100,
        useNativeDriver: false,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Header */}
        <Text style={[typography.h1, { marginTop: 20, marginLeft: 20, color: colors.text, fontWeight: '700' }]}>
          My Activities
        </Text>

        {/* Calendar Strip */}
        <View style={styles.calendarStrip}>
          {days.map(({ day, date }) => (
            <TouchableOpacity
              key={date}
              onPress={() => setSelectedDay(date)}
              style={[styles.calendarItem, {
                backgroundColor: selectedDay === date ? colors.primary : colors.surface,
              }]}
            >
              <Text style={[typography.bodyMedium, { 
                color: selectedDay === date ? colors.surface : colors.text,
                fontWeight: '700'
              }]}>
                {date}
              </Text>
              <Text style={[typography.caption, { 
                color: selectedDay === date ? colors.surface : colors.textSecondary,
                fontSize: 12,
                fontWeight: '500'
              }]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Activity Cards - Spacious Layout */}
        <View style={styles.activitySection}>
          {/* Steps & Water Row */}
          <View style={styles.activityRow}>
            <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
              <View style={styles.activityHeader}>
                <Footprints size={20} color="#3B82F6" />
                <Text style={[typography.bodyMedium, { color: colors.textSecondary, fontWeight: '600' }]}>
                  Steps
                </Text>
              </View>
              <Text style={[typography.h2, { color: colors.text, fontWeight: 'bold', marginTop: 8 }]}>
                +9000
              </Text>
            </View>
            
            <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
              <View style={styles.activityHeader}>
                <Clock size={20} color="#10B981" />
                <Text style={[typography.bodyMedium, { color: colors.textSecondary, fontWeight: '600' }]}>
                  Moving
                </Text>
              </View>
              <Text style={[typography.h2, { color: colors.text, fontWeight: 'bold', marginTop: 8 }]}>
                +74mins
              </Text>
            </View>
          </View>

          {/* Calories Card - Full Width */}
          <View style={[styles.calorieCard, { backgroundColor: colors.surface }]}>
            <View style={styles.activityHeader}>
              <Flame size={20} color="#F59E0B" />
              <Text style={[typography.bodyMedium, { color: colors.textSecondary, fontWeight: '600' }]}>
                Calories
              </Text>
            </View>
            <Text style={[typography.h1, { color: colors.text, fontWeight: 'bold', marginTop: 12 }]}>
              +500kcal
            </Text>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={[styles.chartContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.chartHeader}>
            <Text style={[typography.h3, { color: colors.text, fontWeight: '600' }]}>
              Statistic
            </Text>
            <View style={[styles.trendIcon, { backgroundColor: colors.primary + '20' }]}>
              <TrendingUp size={16} color={colors.primary} />
            </View>
          </View>
          
          <View style={styles.chartBars}>
            {barData.map((bar, i) => (
              <View key={i} style={{ alignItems: 'center' }}>
                {i === 6 && (
                  <Text style={[styles.tooltip, { 
                    color: colors.surface,
                    backgroundColor: colors.primary 
                  }]}>
                    180 Kcal
                  </Text>
                )}
                <Animated.View style={[styles.bar, { 
                  backgroundColor: i === 6 ? colors.primary : colors.primary + '60',
                  height: barAnim[i] 
                }]} />
                <Text style={[typography.caption, { 
                  color: colors.textSecondary,
                  fontWeight: '600',
                  fontSize: 11
                }]}>
                  {bar.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  calendarItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 40,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  activityCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calorieCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
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
    marginBottom: 20,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
    height: 120,
  },
  bar: {
    width: 14,
    borderRadius: 7,
    marginBottom: 6,
  },
  tooltip: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
    fontWeight: '600',
  },
  trendIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});