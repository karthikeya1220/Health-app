import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, Bell, Users, Heart, Trophy, MessageCircle, Calendar, 
  UserPlus, CheckCircle, XCircle, Clock, Star, Activity 
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { responsiveValue, LAYOUT, TOUCH, SCREEN } from '@/utils/responsive';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsCenterScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [activeTab, setActiveTab] = useState('all');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'mentions', label: 'Mentions' },
    { id: 'groups', label: 'Groups' },
    { id: 'requests', label: 'Requests' },
  ];

  const notifications = [
    {
      id: '1',
      type: 'mention',
      title: 'Sarah mentioned you',
      message: 'Sarah mentioned you in a post about morning workouts',
      timestamp: '5 minutes ago',
      isRead: false,
      avatar: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=S',
      icon: MessageCircle,
      actionRequired: false,
    },
    {
      id: '2',
      type: 'group_activity',
      title: 'New activity in Morning Runners',
      message: 'Mike completed a 5km run and shared his progress',
      timestamp: '15 minutes ago',
      isRead: false,
      avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=M',
      icon: Activity,
      actionRequired: false,
    },
    {
      id: '3',
      type: 'join_request',
      title: 'Join request approved',
      message: 'Your request to join Elite Fitness Warriors has been approved!',
      timestamp: '1 hour ago',
      isRead: true,
      avatar: null,
      icon: CheckCircle,
      actionRequired: false,
    },
    {
      id: '4',
      type: 'group_invite',
      title: 'Group invitation',
      message: 'Emma invited you to join Yoga Masters group',
      timestamp: '2 hours ago',
      isRead: false,
      avatar: 'https://via.placeholder.com/40x40/A8E6CF/FFFFFF?text=E',
      icon: UserPlus,
      actionRequired: true,
    },
    {
      id: '5',
      type: 'achievement',
      title: 'New achievement unlocked!',
      message: 'You\'ve completed 30 workouts this month. Great job!',
      timestamp: '3 hours ago',
      isRead: true,
      avatar: null,
      icon: Trophy,
      actionRequired: false,
    },
    {
      id: '6',
      type: 'like',
      title: 'Post liked',
      message: 'David and 12 others liked your workout post',
      timestamp: '4 hours ago',
      isRead: true,
      avatar: 'https://via.placeholder.com/40x40/FFD93D/FFFFFF?text=D',
      icon: Heart,
      actionRequired: false,
    },
    {
      id: '7',
      type: 'event_reminder',
      title: 'Event reminder',
      message: 'Morning Group Run starts in 30 minutes',
      timestamp: '5 hours ago',
      isRead: false,
      avatar: null,
      icon: Calendar,
      actionRequired: false,
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mentions') return notification.type === 'mention';
    if (activeTab === 'groups') return ['group_activity', 'group_invite'].includes(notification.type);
    if (activeTab === 'requests') return notification.actionRequired;
    return true;
  });

  const handleNotificationAction = (notificationId: string, action: 'accept' | 'decline') => {
    console.log(`${action} notification ${notificationId}`);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingTop: LAYOUT.getPadding(24),
      paddingBottom: LAYOUT.getPadding(16),
    },
    backButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    unreadCount: {
      backgroundColor: colors.error,
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: LAYOUT.getPadding(4),
      borderRadius: LAYOUT.getBorderRadius(9999),
      minWidth: responsiveValue({
        xs: 22, sm: 23, md: 24, lg: 25, default: 24
      }),
      alignItems: 'center',
    },
    unreadCountText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '600',
      fontSize: responsiveValue({
        xs: 11, sm: 11.5, md: 12, lg: 12.5, default: 12
      }),
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      margin: LAYOUT.getMargin(24),
      padding: LAYOUT.getPadding(4),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: LAYOUT.getPadding(8),
      borderRadius: LAYOUT.getBorderRadius(8),
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      ...typography.body,
      color: colors.textSecondary,
      fontWeight: '600',
      fontSize: 14,
    },
    activeTabText: {
      color: colors.surface,
    },    notificationsContainer: {
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    notificationCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(16),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: 'transparent',
    },
    unreadNotification: {
      borderLeftColor: colors.primary,
      backgroundColor: colors.primary + '05',
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    notificationIcon: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    notificationAvatar: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      marginRight: LAYOUT.getMargin(16),
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    notificationMessage: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    notificationTimestamp: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: LAYOUT.getMargin(4),
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      marginLeft: LAYOUT.getMargin(8),
    },
    actionButtons: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(8),
      marginTop: LAYOUT.getMargin(16),
    },
    actionButton: {
      flex: 1,
      paddingVertical: LAYOUT.getPadding(8),
      paddingHorizontal: LAYOUT.getPadding(16),
      borderRadius: LAYOUT.getBorderRadius(8),
      alignItems: 'center',
    },
    acceptButton: {
      backgroundColor: colors.success + '20',
    },
    declineButton: {
      backgroundColor: colors.error + '20',
    },
    actionButtonText: {
      ...typography.body,
      fontWeight: '600',
      fontSize: 14,
    },
    acceptButtonText: {
      color: colors.success,
    },
    declineButtonText: {
      color: colors.error,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: LAYOUT.getPadding(64),
    },
    emptyStateIcon: {
      marginBottom: LAYOUT.getMargin(24),
    },
    emptyStateTitle: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: LAYOUT.getMargin(8),
    },
    emptyStateMessage: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        !item.isRead && styles.unreadNotification
      ]}
    >
      <View style={styles.notificationHeader}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.notificationAvatar} />
        ) : (
          <View style={styles.notificationIcon}>
            <item.icon size={20} color={colors.primary} />
          </View>
        )}
        
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
        </View>

        {!item.isRead && <View style={styles.unreadIndicator} />}
      </View>

      {item.actionRequired && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleNotificationAction(item.id, 'accept')}
          >
            <Text style={[styles.actionButtonText, styles.acceptButtonText]}>
              Accept
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.declineButton]}
            onPress={() => handleNotificationAction(item.id, 'decline')}
          >
            <Text style={[styles.actionButtonText, styles.declineButtonText]}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Bell size={48} color={colors.textSecondary} style={styles.emptyStateIcon} />
      <Text style={styles.emptyStateTitle}>No notifications</Text>
      <Text style={styles.emptyStateMessage}>
        You're all caught up! We'll notify you when there's something new.
      </Text>
    </View>
  );
  const unreadCount = notifications.filter(n => !n.isRead).length;return (
    <LinearGradient
      colors={[colors.background, colors.background + 'CC', colors.surface + '66']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Header */}
          <LinearGradient
            colors={[colors.primary + '15', colors.surface]}
            style={styles.header}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <LinearGradient
                colors={[colors.error, colors.error + 'DD']}
                style={styles.unreadCount}
              >
                <Text style={styles.unreadCountText}>{unreadCount}</Text>
              </LinearGradient>
            )}
          </LinearGradient>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notifications List */}
          {filteredNotifications.length > 0 ? (
            <FlatList
              data={filteredNotifications}
              renderItem={renderNotification}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.notificationsContainer}
            />
          ) : (
            renderEmptyState()
          )}
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
