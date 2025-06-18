import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Users, Heart, Trophy, MessageCircle, Calendar, Settings } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function NotificationsTab() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

  const notifications = [
    {
      id: '1',
      type: 'friend_request',
      title: 'New Friend Request',
      message: 'Sarah Johnson wants to connect with you',
      time: '2 min ago',
      icon: Users,
      color: colors.primary,
      unread: true,
    },
    {
      id: '2',
      type: 'like',
      title: 'Workout Liked',
      message: '12 people liked your morning run',
      time: '15 min ago',
      icon: Heart,
      color: colors.error,
      unread: true,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed the 10K Marathon challenge',
      time: '1 hour ago',
      icon: Trophy,
      color: colors.accent,
      unread: false,
    },
    {
      id: '4',
      type: 'comment',
      title: 'New Comment',
      message: 'Mike commented on your workout post',
      time: '2 hours ago',
      icon: MessageCircle,
      color: colors.info,
      unread: false,
    },
    {
      id: '5',
      type: 'event',
      title: 'Upcoming Event',
      message: 'Yoga session starts in 30 minutes',
      time: '3 hours ago',
      icon: Calendar,
      color: colors.success,
      unread: false,
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
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    tab: {
      flex: 1,
      paddingVertical: Spacing.md,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: colors.primary,
    },
    tabText: {
      ...typography.body,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '600',
    },
    notificationItem: {
      backgroundColor: colors.surface,
      marginHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    unreadNotification: {
      backgroundColor: colors.primaryLight,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    notificationIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    notificationMessage: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.xs,
    },
    notificationTime: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    unreadDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
      marginLeft: Spacing.sm,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.sm,
    },
    actionButton: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
    },
    acceptButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    declineButton: {
      backgroundColor: 'transparent',
      borderColor: colors.border,
    },
    actionButtonText: {
      ...typography.caption,
      fontWeight: '600',
    },
    acceptButtonText: {
      color: colors.surface,
    },
    declineButtonText: {
      color: colors.textSecondary,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
    },
    emptyIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    emptyTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.sm,
    },
    emptyMessage: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  const renderNotificationItem = ({ item }: { item: typeof notifications[0] }) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          item.unread && styles.unreadNotification,
        ]}
      >
        <View style={[styles.notificationIcon, { backgroundColor: item.color + '20' }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
          
          {item.type === 'friend_request' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                <Text style={[styles.actionButtonText, styles.acceptButtonText]}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                <Text style={[styles.actionButtonText, styles.declineButtonText]}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {item.unread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Mentions</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
      />
    </SafeAreaView>
  );
}