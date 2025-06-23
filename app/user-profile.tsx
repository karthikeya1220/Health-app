import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  UserPlus,
  MessageCircle,
  Share,
  MapPin,
  Calendar,
  Trophy,
  Activity,
  Heart,
  Users,
  Star,
  Award,
  Zap,
  Target
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ResponsiveLayout, ResponsiveCard, useResponsiveDimensions } from '@/components/ui/ResponsiveLayout';
import { 
  SCREEN, 
  LAYOUT, 
  TOUCH,
  COMPONENT,
  TYPOGRAPHY,
  responsiveValue,
  useBreakpoint
} from '@/utils/responsive';

interface UserStats {
  label: string;
  value: string;
  icon: any;
  color: string;
}

interface UserPost {
  id: string;
  type: 'workout' | 'achievement' | 'photo';
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

export default function UserProfileScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const dimensions = useResponsiveDimensions();
  const breakpoint = useBreakpoint();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'posts' | 'stats' | 'groups'>('posts');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const userData = {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarah_runs',
    avatar: '👩‍🦰',
    bio: 'Marathon runner 🏃‍♀️ | Fitness enthusiast | Love early morning workouts | NYC',
    location: 'New York City',
    joinDate: 'March 2022',
    isVerified: true,
    followers: 2845,
    following: 186,
    posts: 342
  };

  const [userStats] = useState<UserStats[]>([
    { label: 'Workouts', value: '127', icon: Activity, color: colors.primary },
    { label: 'Calories', value: '45.2K', icon: Zap, color: colors.warning },
    { label: 'Distance', value: '892mi', icon: Target, color: colors.success },
    { label: 'Awards', value: '23', icon: Trophy, color: colors.info },
  ]);

  const [userPosts] = useState<UserPost[]>([
    {
      id: '1',
      type: 'achievement',
      content: 'Just completed my first half marathon! 13.1 miles in 1:45:32 🎉 Feeling incredible!',
      timestamp: '2 hours ago',
      likes: 47,
      comments: 12
    },
    {
      id: '2',
      type: 'workout',
      content: 'Morning 5K run in Central Park. Perfect weather for running! Who else was out there today?',
      timestamp: '1 day ago',
      likes: 23,
      comments: 8
    },
    {
      id: '3',
      type: 'photo',
      content: 'Sunrise view from today\'s run 🌅 These moments make early mornings worth it!',
      timestamp: '3 days ago',
      likes: 56,
      comments: 15,
      image: 'sunset'
    }
  ]);

  const groups = [
    { id: '1', name: 'Morning Runners', members: 1234, avatar: '🏃‍♀️' },
    { id: '2', name: 'Marathon Training', members: 856, avatar: '🏃‍♂️' },
    { id: '3', name: 'NYC Fitness', members: 2341, avatar: '🏋️‍♀️' }
  ];

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

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'posts':
        return (
          <View style={styles.tabContent}>
            {userPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postType}>
                    {post.type === 'achievement' && <Trophy size={16} color={colors.warning} />}
                    {post.type === 'workout' && <Activity size={16} color={colors.primary} />}
                    {post.type === 'photo' && <Star size={16} color={colors.success} />}
                    <Text style={styles.postTypeText}>
                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </Text>
                  </View>
                  <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                </View>
                
                <Text style={styles.postContent}>{post.content}</Text>
                
                {post.image && (
                  <View style={styles.postImage}>
                    <LinearGradient
                      colors={[colors.primary, colors.accent]}
                      style={styles.imagePlaceholder}
                    >
                      <Text style={styles.imagePlaceholderText}>📸</Text>
                    </LinearGradient>
                  </View>
                )}
                
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
        
      case 'stats':
        return (
          <View style={styles.tabContent}>
            <View style={styles.statsGrid}>
              {userStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <stat.icon size={24} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              <View style={styles.achievementsList}>
                <View style={styles.achievementItem}>
                  <View style={[styles.achievementIcon, { backgroundColor: colors.warning + '20' }]}>
                    <Trophy size={20} color={colors.warning} />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>Half Marathon Finisher</Text>
                    <Text style={styles.achievementDate}>Completed today</Text>
                  </View>
                </View>
                
                <View style={styles.achievementItem}>
                  <View style={[styles.achievementIcon, { backgroundColor: colors.success + '20' }]}>
                    <Target size={20} color={colors.success} />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>100 Mile Month</Text>
                    <Text style={styles.achievementDate}>3 days ago</Text>
                  </View>
                </View>
                
                <View style={styles.achievementItem}>
                  <View style={[styles.achievementIcon, { backgroundColor: colors.primary + '20' }]}>
                    <Zap size={20} color={colors.primary} />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>7-Day Streak</Text>
                    <Text style={styles.achievementDate}>1 week ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 'groups':
        return (
          <View style={styles.tabContent}>
            {groups.map((group) => (
              <TouchableOpacity key={group.id} style={styles.groupItem}>
                <View style={styles.groupAvatar}>
                  <Text style={styles.groupAvatarText}>{group.avatar}</Text>
                </View>
                
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupMembers}>
                    {group.members.toLocaleString()} members
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.groupJoinButton}>
                  <Text style={styles.groupJoinButtonText}>View</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
      paddingHorizontal: LAYOUT.getPadding(24),
      paddingVertical: LAYOUT.getPadding(16),
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
      gap: LAYOUT.getMargin(8),
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHero: {
      backgroundColor: colors.surface,
      paddingHorizontal: LAYOUT.getPadding(24),
      paddingBottom: LAYOUT.getPadding(32),
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(24),
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: LAYOUT.getMargin(16),
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: colors.primary + '30',
    },
    avatarText: {
      fontSize: 48,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.success,
      borderRadius: 12,
      padding: 4,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    userName: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    userHandle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: LAYOUT.getMargin(16),
    },
    userStats: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: LAYOUT.getMargin(32),
      marginBottom: LAYOUT.getMargin(24),
    },
    userStat: {
      alignItems: 'center',
    },
    userStatValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
    },
    userStatLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    userBio: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: LAYOUT.getMargin(24),
    },
    userLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: LAYOUT.getMargin(24),
    },
    locationText: {
      ...typography.body,
      color: colors.textSecondary,
      marginLeft: LAYOUT.getMargin(4),
    },
    profileActions: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(16),
    },
    followButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: LAYOUT.getBorderRadius(12),
      paddingVertical: LAYOUT.getPadding(16),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    followingButton: {
      backgroundColor: colors.success,
    },
    followButtonText: {
      ...typography.bodyMedium,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: LAYOUT.getMargin(8),
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
      paddingVertical: LAYOUT.getPadding(16),
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
      paddingHorizontal: LAYOUT.getPadding(24),
      paddingTop: LAYOUT.getPadding(24),
    },
    postCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(16),
    },
    postType: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getMargin(4),
    },
    postTypeText: {
      ...typography.caption,
      color: colors.textSecondary,
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
      marginBottom: LAYOUT.getMargin(16),
    },
    postImage: {
      marginBottom: LAYOUT.getMargin(16),
    },
    imagePlaceholder: {
      height: 200,
      borderRadius: LAYOUT.getBorderRadius(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePlaceholderText: {
      fontSize: 48,
    },
    postActions: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(24),
    },
    postAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getMargin(4),
    },
    postActionText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: LAYOUT.getMargin(16),
      marginBottom: LAYOUT.getMargin(32),
    },
    statCard: {
      width: responsiveValue({
        xs: dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12),
        sm: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        md: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        lg: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        xl: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        xxl: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        xxxl: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2,
        default: (dimensions.screenWidth - (LAYOUT.getContentPadding() * 2) - LAYOUT.getPadding(12)) / 2
      }),
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(24),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    statIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    statValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    achievementsSection: {
      marginTop: LAYOUT.getMargin(24),
    },
    sectionTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: LAYOUT.getMargin(16),
    },
    achievementsList: {
      gap: LAYOUT.getMargin(16),
    },
    achievementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    achievementIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    achievementInfo: {
      flex: 1,
    },
    achievementTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    achievementDate: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    groupItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(16),
      marginBottom: LAYOUT.getMargin(16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    groupAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.success + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    groupAvatarText: {
      fontSize: 24,
    },
    groupInfo: {
      flex: 1,
    },
    groupName: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    groupMembers: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    groupJoinButton: {
      backgroundColor: colors.primary + '20',
      borderRadius: LAYOUT.getBorderRadius(8),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(8),
    },
    groupJoinButtonText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
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
            <TouchableOpacity style={styles.headerButton}>
              <MoreHorizontal size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Hero Section */}
          <View style={styles.profileHero}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{userData.avatar}</Text>
                </View>
                {userData.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Star size={12} color={colors.surface} fill={colors.surface} />
                  </View>
                )}
              </View>

              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userHandle}>{userData.username}</Text>

              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatValue}>{userData.posts}</Text>
                  <Text style={styles.userStatLabel}>Posts</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatValue}>{userData.followers.toLocaleString()}</Text>
                  <Text style={styles.userStatLabel}>Followers</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatValue}>{userData.following}</Text>
                  <Text style={styles.userStatLabel}>Following</Text>
                </View>
              </View>
            </View>

            <Text style={styles.userBio}>{userData.bio}</Text>

            <View style={styles.userLocation}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.locationText}>{userData.location}</Text>
            </View>

            <View style={styles.profileActions}>
              <TouchableOpacity
                style={[styles.followButton, isFollowing && styles.followingButton]}
                onPress={handleFollowPress}
              >
                <UserPlus size={20} color={colors.surface} />
                <Text style={styles.followButtonText}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/chat')}
              >
                <MessageCircle size={20} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Share size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {(['posts', 'stats', 'groups'] as const).map((tab) => (
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
