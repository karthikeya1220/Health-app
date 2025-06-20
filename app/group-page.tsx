import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Users,
  MessageCircle,
  Share,
  Bell,
  BellOff,
  UserPlus,
  Calendar,
  MapPin,
  Star,
  Trophy,
  TrendingUp,
  Activity,
  Heart
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  isOnline: boolean;
}

interface GroupEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

interface GroupPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function GroupPageScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [isJoined, setIsJoined] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'posts' | 'events' | 'members'>('posts');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const groupData = {
    id: '1',
    name: 'Morning Runners',
    description: 'Join us for energizing morning runs in Central Park! We meet every weekday at 7 AM for a refreshing start to the day.',
    image: '🏃‍♀️',
    members: 1234,
    rating: 4.8,
    location: 'Central Park, NYC',
    category: 'Running',
    isVerified: true,
    admins: ['Sarah Johnson', 'Mike Chen'],
    createdDate: 'March 2023'
  };

  const [members] = useState<GroupMember[]>([
    { id: '1', name: 'Sarah Johnson', avatar: '👩‍🦰', role: 'admin', isOnline: true },
    { id: '2', name: 'Mike Chen', avatar: '👨‍💼', role: 'admin', isOnline: true },
    { id: '3', name: 'Emma Wilson', avatar: '👩‍💻', role: 'member', isOnline: false },
    { id: '4', name: 'Alex Rodriguez', avatar: '👨‍🏋️', role: 'member', isOnline: true },
    { id: '5', name: 'Lisa Park', avatar: '👩‍🎨', role: 'member', isOnline: false },
    { id: '6', name: 'Tom Anderson', avatar: '👨‍🍳', role: 'member', isOnline: true },
  ]);

  const [events] = useState<GroupEvent[]>([
    {
      id: '1',
      title: 'Weekly 5K Challenge',
      date: 'Tomorrow',
      time: '7:00 AM',
      location: 'Central Park - Reservoir Loop',
      attendees: 23
    },
    {
      id: '2',
      title: 'Marathon Training Session',
      date: 'Saturday',
      time: '6:30 AM',
      location: 'Central Park - Full Loop',
      attendees: 45
    },
    {
      id: '3',
      title: 'Group Photo & Breakfast',
      date: 'Sunday',
      time: '8:00 AM',
      location: 'The Loeb Boathouse',
      attendees: 67
    }
  ]);

  const [posts] = useState<GroupPost[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: '👩‍🦰',
      content: 'Amazing run this morning! Who\'s ready for tomorrow\'s 5K challenge? 🏃‍♀️💪',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      author: 'Mike Chen',
      avatar: '👨‍💼',
      content: 'New personal record today - 5K in 22:30! Thanks for the motivation everyone! 🎉',
      timestamp: '5 hours ago',
      likes: 18,
      comments: 12
    },
    {
      id: '3',
      author: 'Emma Wilson',
      avatar: '👩‍💻',
      content: 'Weather looks perfect for this weekend\'s long run. Don\'t forget to bring water! 💧☀️',
      timestamp: '1 day ago',
      likes: 15,
      comments: 6
    }
  ]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleJoinGroup = () => {
    setIsJoined(!isJoined);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'posts':
        return (
          <View style={styles.tabContent}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postAuthorInfo}>
                    <View style={styles.postAvatar}>
                      <Text style={styles.postAvatarText}>{post.avatar}</Text>
                    </View>
                    <View>
                      <Text style={styles.postAuthor}>{post.author}</Text>
                      <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.postContent}>{post.content}</Text>
                
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.postAction}>
                    <Heart size={18} color={colors.textSecondary} />
                    <Text style={styles.postActionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <MessageCircle size={18} color={colors.textSecondary} />
                    <Text style={styles.postActionText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <Share size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'events':
        return (
          <View style={styles.tabContent}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Calendar size={20} color={colors.primary} />
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
                
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Text style={styles.eventDetailLabel}>Date:</Text>
                    <Text style={styles.eventDetailValue}>{event.date} at {event.time}</Text>
                  </View>
                  
                  <View style={styles.eventDetail}>
                    <MapPin size={16} color={colors.textSecondary} />
                    <Text style={styles.eventDetailValue}>{event.location}</Text>
                  </View>
                  
                  <View style={styles.eventDetail}>
                    <Users size={16} color={colors.textSecondary} />
                    <Text style={styles.eventDetailValue}>{event.attendees} attending</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.attendButton}>
                  <Text style={styles.attendButtonText}>Attend Event</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
        
      case 'members':
        return (
          <View style={styles.tabContent}>
            <View style={styles.membersGrid}>
              {members.map((member) => (
                <TouchableOpacity key={member.id} style={styles.memberCard}>
                  <View style={styles.memberAvatarContainer}>
                    <View style={styles.memberAvatar}>
                      <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                    </View>
                    {member.isOnline && <View style={styles.onlineIndicator} />}
                  </View>
                  
                  <Text style={styles.memberName} numberOfLines={1}>
                    {member.name}
                  </Text>
                  
                  {member.role === 'admin' && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminBadgeText}>Admin</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerActions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupHero: {
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.xl,
    },
    groupIconContainer: {
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    groupIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    groupIconText: {
      fontSize: 48,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.success,
      borderRadius: 12,
      padding: 4,
    },
    groupName: {
      ...typography.h1,
      color: colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    groupCategory: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: Spacing.md,
    },
    groupStats: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: Spacing.xl,
      marginBottom: Spacing.lg,
    },
    groupStat: {
      alignItems: 'center',
    },
    groupStatValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
    },
    groupStatLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    groupDescription: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: Spacing.lg,
    },
    groupActions: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    joinButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    joinedButton: {
      backgroundColor: colors.success,
    },
    joinButtonText: {
      ...typography.bodyMedium,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    actionButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
    tabContent: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
    },
    postCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    postAuthorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    postAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.sm,
    },
    postAvatarText: {
      fontSize: 20,
    },
    postAuthor: {
      ...typography.bodyMedium,
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
      lineHeight: 22,
      marginBottom: Spacing.md,
    },
    postActions: {
      flexDirection: 'row',
      gap: Spacing.lg,
    },
    postAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    postActionText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    eventCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    eventHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    eventTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    eventDetails: {
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    eventDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    eventDetailLabel: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
    },
    eventDetailValue: {
      ...typography.body,
      color: colors.textSecondary,
    },
    attendButton: {
      backgroundColor: colors.primary + '20',
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.sm,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    attendButtonText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    membersGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
    },
    memberCard: {
      width: (width - Spacing.lg * 2 - Spacing.md) / 2,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    memberAvatarContainer: {
      position: 'relative',
      marginBottom: Spacing.sm,
    },
    memberAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    memberAvatarText: {
      fontSize: 24,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.success,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    memberName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    adminBadge: {
      backgroundColor: colors.warning,
      borderRadius: 8,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
    },
    adminBadgeText: {
      ...typography.caption,
      color: colors.surface,
      fontSize: 10,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setIsNotificationEnabled(!isNotificationEnabled)}
            >
              {isNotificationEnabled ? (
                <Bell size={20} color={colors.primary} />
              ) : (
                <BellOff size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MoreHorizontal size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Group Hero Section */}
          <View style={styles.groupHero}>
            <View style={styles.groupIconContainer}>
              <View style={styles.groupIcon}>
                <Text style={styles.groupIconText}>{groupData.image}</Text>
                {groupData.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Star size={12} color={colors.surface} fill={colors.surface} />
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.groupName}>{groupData.name}</Text>
            <Text style={styles.groupCategory}>{groupData.category}</Text>

            <View style={styles.groupStats}>
              <View style={styles.groupStat}>
                <Text style={styles.groupStatValue}>{groupData.members.toLocaleString()}</Text>
                <Text style={styles.groupStatLabel}>Members</Text>
              </View>
              <View style={styles.groupStat}>
                <Text style={styles.groupStatValue}>{groupData.rating}</Text>
                <Text style={styles.groupStatLabel}>Rating</Text>
              </View>
              <View style={styles.groupStat}>
                <Text style={styles.groupStatValue}>Active</Text>
                <Text style={styles.groupStatLabel}>Status</Text>
              </View>
            </View>

            <Text style={styles.groupDescription}>{groupData.description}</Text>

            <View style={styles.groupActions}>
              <TouchableOpacity
                style={[styles.joinButton, isJoined && styles.joinedButton]}
                onPress={handleJoinGroup}
              >
                {isJoined ? (
                  <Users size={20} color={colors.surface} />
                ) : (
                  <UserPlus size={20} color={colors.surface} />
                )}
                <Text style={styles.joinButtonText}>
                  {isJoined ? 'Joined' : 'Join Group'}
                </Text>
              </TouchableOpacity>              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/feed-tab')}
              >
                <MessageCircle size={20} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/admin-panel')}
              >
                <Users size={20} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Share size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {(['posts', 'events', 'members'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText
                ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {renderTabContent()}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
