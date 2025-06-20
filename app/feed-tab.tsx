import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, MessageCircle, Activity, Trophy, Calendar, Plus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function FeedTabScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');

  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: MessageCircle },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  const feedPosts = [
    {
      id: '1',
      author: 'Sarah M.',
      timestamp: '2h ago',
      content: 'Just finished my morning workout! Feeling energized for the day 💪',
      likes: 24,
      comments: 8,
      type: 'text',
    },
    {
      id: '2',
      author: 'Mike R.',
      timestamp: '4h ago',
      content: 'New personal record on deadlifts! 275lbs x 5 reps 🔥',
      likes: 45,
      comments: 12,
      type: 'achievement',
    },
    {
      id: '3',
      author: 'Emma L.',
      timestamp: '6h ago',
      content: 'Does anyone have recommendations for pre-workout snacks? Looking for something light but energizing.',
      likes: 18,
      comments: 15,
      type: 'question',
    },
  ];

  const members = [
    { id: '1', name: 'Sarah Martinez', role: 'Admin', avatar: '👩', status: 'online' },
    { id: '2', name: 'Mike Rodriguez', role: 'Moderator', avatar: '👨', status: 'active' },
    { id: '3', name: 'Emma Johnson', role: 'Member', avatar: '👩‍🦳', status: 'offline' },
    { id: '4', name: 'David Chen', role: 'Member', avatar: '👨‍💼', status: 'online' },
    { id: '5', name: 'Lisa Park', role: 'Member', avatar: '👩‍💻', status: 'active' },
  ];

  const activities = [
    {
      id: '1',
      type: 'workout_completed',
      user: 'Sarah M.',
      activity: 'completed a 45-minute strength training session',
      timestamp: '1h ago',
      icon: '💪',
    },
    {
      id: '2',
      type: 'goal_achieved',
      user: 'Mike R.',
      activity: 'achieved personal best in deadlifts',
      timestamp: '3h ago',
      icon: '🏆',
    },
    {
      id: '3',
      type: 'check_in',
      user: 'Emma L.',
      activity: 'checked in for today\'s workout',
      timestamp: '5h ago',
      icon: '✅',
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Morning Group Run',
      date: 'Tomorrow',
      time: '7:00 AM',
      attendees: 12,
      location: 'Central Park',
    },
    {
      id: '2',
      title: 'Strength Training Workshop',
      date: 'Dec 25',
      time: '10:00 AM',
      attendees: 8,
      location: 'Gym Studio A',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      margin: Spacing.lg,
      padding: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.xs,
      borderRadius: BorderRadius.md,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabIcon: {
      marginRight: 4,
    },
    tabText: {
      ...typography.body,
      color: colors.textSecondary,
      fontWeight: '600',
      fontSize: 12,
    },
    activeTabText: {
      color: colors.surface,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
    },
    postCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    postAuthor: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    postTimestamp: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    postContent: {
      ...typography.body,
      color: colors.text,
      lineHeight: 20,
      marginBottom: Spacing.sm,
    },
    postActions: {
      flexDirection: 'row',
      gap: Spacing.lg,
    },
    postAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    postActionText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    postTypeBadge: {
      position: 'absolute',
      top: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: colors.primary + '20',
      paddingHorizontal: Spacing.xs,
      paddingVertical: 2,
      borderRadius: BorderRadius.xs,
    },
    postTypeBadgeText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      fontSize: 10,
    },
    memberCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    memberAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
      fontSize: 24,
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    memberRole: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginLeft: Spacing.sm,
    },
    statusOnline: {
      backgroundColor: colors.success,
    },
    statusActive: {
      backgroundColor: colors.warning,
    },
    statusOffline: {
      backgroundColor: colors.textSecondary,
    },
    activityCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
      fontSize: 20,
    },
    activityInfo: {
      flex: 1,
    },
    activityText: {
      ...typography.body,
      color: colors.text,
      marginBottom: 2,
    },
    activityUser: {
      fontWeight: '600',
    },
    activityTimestamp: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    eventCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    eventTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    eventDetails: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: Spacing.xs,
    },
    eventAttendees: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    eventAttendeesText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
  });

  const renderFeed = () => (
    <FlatList
      data={feedPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
          </View>
          <Text style={styles.postContent}>{item.content}</Text>
          <View style={styles.postActions}>
            <View style={styles.postAction}>
              <Text>❤️</Text>
              <Text style={styles.postActionText}>{item.likes}</Text>
            </View>
            <View style={styles.postAction}>
              <Text>💬</Text>
              <Text style={styles.postActionText}>{item.comments}</Text>
            </View>
          </View>
          {item.type !== 'text' && (
            <View style={styles.postTypeBadge}>
              <Text style={styles.postTypeBadgeText}>
                {item.type.toUpperCase()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderMembers = () => (
    <FlatList
      data={members}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.memberCard}>
          <View style={styles.memberAvatar}>
            <Text style={{ fontSize: 24 }}>{item.avatar}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberRole}>{item.role}</Text>
          </View>
          <View style={[
            styles.statusDot,
            item.status === 'online' && styles.statusOnline,
            item.status === 'active' && styles.statusActive,
            item.status === 'offline' && styles.statusOffline,
          ]} />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderActivity = () => (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityText}>
              <Text style={styles.activityUser}>{item.user}</Text> {item.activity}
            </Text>
            <Text style={styles.activityTimestamp}>{item.timestamp}</Text>
          </View>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderEvents = () => (
    <FlatList
      data={upcomingEvents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.eventCard}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDetails}>
            {item.date} at {item.time} • {item.location}
          </Text>
          <View style={styles.eventAttendees}>
            <Users size={14} color={colors.primary} />
            <Text style={styles.eventAttendeesText}>
              {item.attendees} attending
            </Text>
          </View>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return renderFeed();
      case 'members':
        return renderMembers();
      case 'activity':
        return renderActivity();
      case 'events':
        return renderEvents();
      default:
        return renderFeed();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>        <Text style={styles.headerTitle}>Morning Runners</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/group-chat')}
        >
          <MessageCircle size={20} color={colors.surface} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.addButton, { marginLeft: Spacing.sm }]}
        >
          <Plus size={20} color={colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <IconComponent 
                size={16} 
                color={isActive ? colors.surface : colors.textSecondary}
                style={styles.tabIcon}
              />
              <Text style={[
                styles.tabText,
                isActive && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}
