import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreHorizontal, Activity, Trophy, Heart, Clock, Play } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TimerTab() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

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
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
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
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
    },
    marathonSection: {
      marginBottom: Spacing.xl,
    },
    marathonHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    marathonIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    marathonTitle: {
      ...typography.h1,
      color: colors.text,
      fontWeight: 'bold',
      lineHeight: 48,
    },
    marathonSubtitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      marginTop: -8,
    },
    caloriesBadge: {
      position: 'absolute',
      right: 0,
      top: 0,
      backgroundColor: colors.error + '20',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
    },
    caloriesText: {
      ...typography.caption,
      color: colors.error,
      fontWeight: '600',
    },
    chartContainer: {
      height: 120,
      marginBottom: Spacing.xl,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      position: 'relative',
    },
    chartLine: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      height: 60,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    chartPoint: {
      width: 4,
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    chartLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.sm,
      marginTop: Spacing.xs,
    },
    chartLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    statsCard: {
      backgroundColor: colors.primaryLight,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      position: 'relative',
      overflow: 'hidden',
    },
    statsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    statsTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
    },
    proBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
      flexDirection: 'row',
      alignItems: 'center',
    },
    proBadgeText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    statsRow: {
      marginBottom: Spacing.lg,
    },
    statItem: {
      marginBottom: Spacing.md,
    },
    statLabel: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    statValue: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
    },
    statDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: Spacing.sm,
    },
    runnerIllustration: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 120,
      height: 100,
      backgroundColor: colors.primary + '30',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const chartData = [30, 45, 60, 40, 80, 65, 90, 75, 95];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Timer</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Marathon Section */}
          <View style={styles.marathonSection}>
            <View style={styles.marathonHeader}>
              <View style={styles.marathonIcon}>
                <Activity size={30} color={colors.surface} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.marathonTitle}>10km</Text>
                <Text style={styles.marathonSubtitle}>Marathon</Text>
              </View>
              <View style={styles.caloriesBadge}>
                <Text style={styles.caloriesText}>1,233kcal</Text>
              </View>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.chartLine}>
                {chartData.map((height, index) => (
                  <View
                    key={index}
                    style={[
                      styles.chartPoint,
                      { 
                        height: height / 2,
                        backgroundColor: index < 3 ? colors.info : index < 6 ? colors.textSecondary : colors.error
                      }
                    ]}
                  />
                ))}
              </View>
              <View style={styles.chartLabels}>
                <Text style={styles.chartLabel}>2km</Text>
                <Text style={styles.chartLabel}>4km</Text>
                <Text style={styles.chartLabel}>6km</Text>
                <Text style={styles.chartLabel}>8km</Text>
                <Text style={styles.chartLabel}>10km</Text>
              </View>
              {/* Calorie labels on chart */}
              <Text style={[styles.caloriesText, { position: 'absolute', top: 10, left: 20 }]}>320kcal</Text>
              <Text style={[styles.caloriesText, { position: 'absolute', top: 20, left: '40%' }]}>654kcal</Text>
            </View>
          </View>

          {/* Stats Card */}
          <Card style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Steps</Text>
              <View style={styles.proBadge}>
                <Trophy size={12} color={colors.surface} />
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>🦶 Steps</Text>
                <Text style={styles.statValue}>14,233</Text>
              </View>
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: colors.error }]}>❤️ HR</Text>
                <Text style={styles.statValue}>112</Text>
              </View>
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: colors.info }]}>⏱️ Time</Text>
                <Text style={styles.statValue}>00:32</Text>
              </View>
            </View>

            {/* Runner Illustration */}
            <View style={styles.runnerIllustration}>
              <Activity size={40} color={colors.primary} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}