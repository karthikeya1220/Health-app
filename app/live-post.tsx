import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Eye,
  Users,
  Zap,
  Gift
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface LiveComment {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
}

interface LiveViewer {
  id: string;
  name: string;
  avatar: string;
}

export default function LivePostScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(124);
  const [viewersCount, setViewersCount] = useState(89);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;

  const [comments] = useState<LiveComment[]>([
    {
      id: '1',
      user: 'Alex Chen',
      avatar: '👨‍💼',
      message: 'Amazing workout! Keep it up! 💪',
      timestamp: 'now'
    },
    {
      id: '2',
      user: 'Emma Wilson',
      avatar: '👩‍💻',
      message: 'This is so motivating! 🔥',
      timestamp: '2s ago'
    },
    {
      id: '3',
      user: 'Mike Rodriguez',
      avatar: '👨‍🏋️',
      message: 'What\'s your rep count?',
      timestamp: '5s ago'
    },
    {
      id: '4',
      user: 'Lisa Park',
      avatar: '👩‍🎨',
      message: 'You\'re crushing it! 🙌',
      timestamp: '8s ago'
    },
    {
      id: '5',
      user: 'Tom Anderson',
      avatar: '👨‍🍳',
      message: 'Joined the live! Hey everyone!',
      timestamp: '12s ago'
    }
  ]);

  const [viewers] = useState<LiveViewer[]>([
    { id: '1', name: 'Alex', avatar: '👨‍💼' },
    { id: '2', name: 'Emma', avatar: '👩‍💻' },
    { id: '3', name: 'Mike', avatar: '👨‍🏋️' },
    { id: '4', name: 'Lisa', avatar: '👩‍🎨' },
    { id: '5', name: 'Tom', avatar: '👨‍🍳' },
  ]);

  useEffect(() => {
    // Entrance animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Live indicator pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Heart animation
    Animated.sequence([
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const renderComment = ({ item }: { item: LiveComment }) => (
    <Animated.View style={[styles.commentItem, { opacity: fadeAnim }]}>
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentUser}>{item.user}</Text>
        <Text style={styles.commentMessage}>{item.message}</Text>
      </View>
      <Text style={styles.commentTime}>{item.timestamp}</Text>
    </Animated.View>
  );

  const renderViewer = ({ item, index }: { item: LiveViewer; index: number }) => (
    <Animated.View 
      style={[
        styles.viewerAvatar,
        { 
          marginLeft: index > 0 ? -8 : 0,
          zIndex: viewers.length - index,
          opacity: fadeAnim 
        }
      ]}
    >
      <Text style={styles.viewerAvatarText}>{item.avatar}</Text>
    </Animated.View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    backgroundGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    liveVideo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    liveVideoPlaceholder: {
      width: width * 0.8,
      height: width * 0.8,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    liveVideoIcon: {
      fontSize: 80,
      marginBottom: Spacing.lg,
    },
    liveVideoText: {
      ...typography.h3,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingTop: 60,
      paddingBottom: 100,
      paddingHorizontal: Spacing.lg,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.lg,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.error,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      marginRight: Spacing.md,
    },
    liveIndicatorDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
      marginRight: Spacing.xs,
    },
    liveText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
    },
    viewersInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
    },
    viewersIcon: {
      marginRight: Spacing.xs,
    },
    viewersCount: {
      ...typography.caption,
      color: '#fff',
      fontWeight: '600',
    },
    headerRight: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    streamerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.lg,
    },
    streamerAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
      borderWidth: 2,
      borderColor: '#fff',
    },
    streamerAvatarText: {
      fontSize: 24,
    },
    streamerDetails: {
      flex: 1,
    },
    streamerName: {
      ...typography.bodyMedium,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 2,
    },
    streamerTitle: {
      ...typography.caption,
      color: '#fff',
      opacity: 0.8,
    },
    followButton: {
      backgroundColor: isFollowing ? 'rgba(255,255,255,0.2)' : colors.primary,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderWidth: 1,
      borderColor: '#fff',
    },
    followButtonText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
    },
    viewersContainer: {
      marginBottom: Spacing.lg,
    },
    viewersHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    viewersTitle: {
      ...typography.caption,
      color: '#fff',
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    viewersList: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewerAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
    },
    viewerAvatarText: {
      fontSize: 16,
    },
    moreViewers: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -8,
    },
    moreViewersText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 10,
    },
    commentsContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    commentsList: {
      maxHeight: 200,
    },
    commentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: BorderRadius.lg,
      padding: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    commentAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.sm,
    },
    commentAvatarText: {
      fontSize: 12,
    },
    commentContent: {
      flex: 1,
    },
    commentUser: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 2,
    },
    commentMessage: {
      ...typography.caption,
      color: '#fff',
      opacity: 0.9,
    },
    commentTime: {
      ...typography.caption,
      color: '#fff',
      opacity: 0.6,
      fontSize: 10,
    },
    bottomActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: Spacing.lg,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: Spacing.lg,
    },
    actionButton: {
      alignItems: 'center',
    },
    actionIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
    },
    likedIcon: {
      backgroundColor: colors.error + '40',
    },
    actionText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: '600',
    },
    giftButton: {
      backgroundColor: colors.warning + '40',
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    giftButtonText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: Spacing.xs,
    },
    heartAnimation: {
      position: 'absolute',
      right: 50,
      bottom: 200,
    },
    animatedHeart: {
      fontSize: 30,
      color: colors.error,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#8B5CF6', '#EC4899', '#F59E0B']}
        style={styles.backgroundGradient}
      />
      
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color="#fff" />
            </TouchableOpacity>
            
            <Animated.View style={[styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.liveIndicatorDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </Animated.View>
            
            <View style={styles.viewersInfo}>
              <Eye size={14} color="#fff" style={styles.viewersIcon} />
              <Text style={styles.viewersCount}>{viewersCount}</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <MoreHorizontal size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Video Placeholder */}
        <View style={styles.liveVideo}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)']}
            style={styles.liveVideoPlaceholder}
          >
            <Text style={styles.liveVideoIcon}>🏃‍♀️</Text>
            <Text style={styles.liveVideoText}>Live Workout Session</Text>
          </LinearGradient>
        </View>

        {/* Streamer Info */}
        <View style={styles.streamerInfo}>
          <View style={styles.streamerAvatar}>
            <Text style={styles.streamerAvatarText}>👩‍🦰</Text>
          </View>
          <View style={styles.streamerDetails}>
            <Text style={styles.streamerName}>Sarah Johnson</Text>
            <Text style={styles.streamerTitle}>Morning Cardio Blast 💪</Text>
          </View>
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={styles.followButtonText}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Viewers */}
        <View style={styles.viewersContainer}>
          <View style={styles.viewersHeader}>
            <Users size={16} color="#fff" />
            <Text style={styles.viewersTitle}>Watching now</Text>
          </View>
          <View style={styles.viewersList}>
            <FlatList
              data={viewers.slice(0, 5)}
              renderItem={renderViewer}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
            {viewers.length > 5 && (
              <View style={styles.moreViewers}>
                <Text style={styles.moreViewersText}>+{viewers.length - 5}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Comments */}
        <View style={styles.commentsContainer}>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <View style={[styles.actionIcon, isLiked && styles.likedIcon]}>
                <Heart 
                  size={24} 
                  color="#fff" 
                  fill={isLiked ? colors.error : 'transparent'}
                />
              </View>
              <Text style={styles.actionText}>{likesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MessageCircle size={24} color="#fff" />
              </View>
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Share size={24} color="#fff" />
              </View>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.giftButton}>
            <Gift size={16} color="#fff" />
            <Text style={styles.giftButtonText}>Send Gift</Text>
          </TouchableOpacity>
        </View>

        {/* Heart Animation */}
        <Animated.View 
          style={[
            styles.heartAnimation,
            {
              opacity: heartAnim,
              transform: [
                {
                  scale: heartAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1.5],
                  }),
                },
                {
                  translateY: heartAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                  }),
                },
              ],
            }
          ]}
        >
          <Text style={styles.animatedHeart}>❤️</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
