import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Edit, Star, Clock, Award, TrendingUp, Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ActivityTab() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');

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
    titleSection: {
      marginBottom: Spacing.xl,
    },
    mainTitle: {
      ...typography.h1,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.xs,
    },
    dateText: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.lg,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    statBadge: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.full,
      alignItems: 'center',
      minWidth: 120,
      marginRight: Spacing.md,
    },
    statBadgeGreen: {
      backgroundColor: colors.success + '30',
    },
    statBadgeBlue: {
      backgroundColor: colors.info + '30',
    },
    statBadgeOrange: {
      backgroundColor: colors.accent + '30',
    },
    statBadgeIcon: {
      marginBottom: Spacing.xs,
    },
    statBadgeValue: {
      ...typography.h3,
      fontWeight: 'bold',
      color: colors.text,
    },
    statBadgeLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      flex: 1,
    },
    progressSection: {
      marginBottom: Spacing.xl,
    },
    progressCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      marginBottom: Spacing.lg,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    progressIcon: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: Spacing.sm,
    },
    progressTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
    },
    progressSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.lg,
    },
    progressValue: {
      ...typography.h1,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.xs,
    },
    progressChange: {
      ...typography.body,
      fontWeight: '600',
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressChangeUp: {
      color: colors.success,
    },
    progressChangeDown: {
      color: colors.error,
    },
    circularProgress: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -30 }],
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressRing: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 4,
      borderColor: colors.border,
    },
    progressRingFill: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 4,
      borderColor: 'transparent',
      borderTopColor: colors.primary,
      transform: [{ rotate: '-90deg' }],
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Challenge</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Edit size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Today's Activity</Text>
            <Text style={styles.dateText}>24 February, 2024</Text>

            {/* Stats Badges */}
            <View style={styles.statsRow}>
              <View style={[styles.statBadge, styles.statBadgeGreen]}>
                <View style={styles.statBadgeIcon}>
                  <Star size={20} color={colors.success} />
                </View>
                <Text style={styles.statBadgeValue}>10 th</Text>
              </View>
              <Text style={styles.statBadgeLabel}>Time in General</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={[styles.statBadge, styles.statBadgeBlue]}>
                <View style={styles.statBadgeIcon}>
                  <Clock size={20} color={colors.info} />
                </View>
                <Text style={styles.statBadgeValue}>28m 45s</Text>
              </View>
              <Text style={styles.statBadgeLabel}>Today's routine</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={[styles.statBadge, styles.statBadgeOrange]}>
                <View style={styles.statBadgeIcon}>
                  <Award size={20} color={colors.accent} />
                </View>
                <Text style={styles.statBadgeValue}>10 min</Text>
              </View>
              <Text style={styles.statBadgeLabel}>Points earned</Text>
            </View>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            {/* Level Activity */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <View style={[styles.progressIcon, { backgroundColor: colors.info }]} />
                <Text style={styles.progressTitle}>Level Activity</Text>
              </View>
              <Text style={styles.progressSubtitle}>Your general goal achievements</Text>
              <Text style={styles.progressValue}>38%</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TrendingUp size={16} color={colors.success} />
                <Text style={[styles.progressChange, styles.progressChangeUp]}> 5%</Text>
              </View>
              
              {/* Circular Progress */}
              <View style={styles.circularProgress}>
                <View style={styles.progressRing} />
                <View style={[styles.progressRingFill, { transform: [{ rotate: '-90deg' }, { rotate: '137deg' }] }]} />
                <Text style={{ ...typography.caption, color: colors.text, fontWeight: 'bold' }}>38%</Text>
              </View>
            </View>

            {/* Success Endurance */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <View style={[styles.progressIcon, { backgroundColor: colors.error }]} />
                <Text style={styles.progressTitle}>Success endurance</Text>
              </View>
              <Text style={styles.progressSubtitle}>Your general endurance success</Text>
              <Text style={styles.progressValue}>54%</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TrendingUp size={16} color={colors.error} style={{ transform: [{ rotate: '180deg' }] }} />
                <Text style={[styles.progressChange, styles.progressChangeDown]}> 5%</Text>
              </View>
              
              {/* Circular Progress */}
              <View style={styles.circularProgress}>
                <View style={styles.progressRing} />
                <View style={[styles.progressRingFill, { 
                  borderTopColor: colors.error,
                  transform: [{ rotate: '-90deg' }, { rotate: '194deg' }] 
                }]} />
                <Text style={{ ...typography.caption, color: colors.text, fontWeight: 'bold' }}>54%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}