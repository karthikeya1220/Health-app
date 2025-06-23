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
import { responsiveValue, LAYOUT, TOUCH, SCREEN } from '@/utils/responsive';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
    },    liveVideoPlaceholder: {
      width: responsiveValue({
        xs: SCREEN.width * 0.75,
        sm: SCREEN.width * 0.8,
        md: SCREEN.width * 0.82,
        lg: SCREEN.width * 0.85,
        default: SCREEN.width * 0.8
      }),
      height: responsiveValue({
        xs: SCREEN.width * 0.75,
        sm: SCREEN.width * 0.8,
        md: SCREEN.width * 0.82,
        lg: SCREEN.width * 0.85,
        default: SCREEN.width * 0.8
      }),
      borderRadius: LAYOUT.getBorderRadius(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    liveVideoIcon: {
      fontSize: responsiveValue({
        xs: 70, sm: 75, md: 80, lg: 85, xl: 90, default: 80
      }),
      marginBottom: LAYOUT.getMargin(24),
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
      paddingTop: responsiveValue({
        xs: 50, sm: 55, md: 60, lg: 65, default: 60
      }),
      paddingBottom: responsiveValue({
        xs: 90, sm: 95, md: 100, lg: 105, default: 100
      }),
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: LAYOUT.getMargin(24),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    liveIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.error,
      borderRadius: LAYOUT.getBorderRadius(8),
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: LAYOUT.getPadding(4),
      marginRight: LAYOUT.getMargin(16),
    },
    liveIndicatorDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
      marginRight: LAYOUT.getMargin(4),
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
      borderRadius: LAYOUT.getBorderRadius(16),
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: LAYOUT.getPadding(4),
    },
    viewersIcon: {
      marginRight: LAYOUT.getMargin(4),
    },
    viewersCount: {
      ...typography.caption,
      color: '#fff',
      fontWeight: '600',
    },
    headerRight: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(8),
    },
    headerButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    streamerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(16),
      marginBottom: LAYOUT.getMargin(24),
    },
    streamerAvatar: {
      width: responsiveValue({
        xs: 45, sm: 48, md: 50, lg: 52, default: 50
      }),
      height: responsiveValue({
        xs: 45, sm: 48, md: 50, lg: 52, default: 50
      }),
      borderRadius: responsiveValue({
        xs: 22.5, sm: 24, md: 25, lg: 26, default: 25
      }),
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
      borderWidth: 2,
      borderColor: '#fff',
    },
    streamerAvatarText: {
      fontSize: responsiveValue({
        xs: 20, sm: 22, md: 24, lg: 26, default: 24
      }),
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
      borderRadius: LAYOUT.getBorderRadius(8),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(8),
      borderWidth: 1,
      borderColor: '#fff',
    },
    followButtonText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
    },
    viewersContainer: {
      marginBottom: LAYOUT.getMargin(24),
    },
    viewersHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    viewersTitle: {
      ...typography.caption,
      color: '#fff',
      fontWeight: '600',
      marginLeft: LAYOUT.getMargin(4),
    },    viewersList: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewerAvatar: {
      width: responsiveValue({
        xs: 28, sm: 30, md: 32, lg: 34, default: 32
      }),
      height: responsiveValue({
        xs: 28, sm: 30, md: 32, lg: 34, default: 32
      }),
      borderRadius: responsiveValue({
        xs: 14, sm: 15, md: 16, lg: 17, default: 16
      }),
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
    },
    viewerAvatarText: {
      fontSize: responsiveValue({
        xs: 14, sm: 15, md: 16, lg: 17, default: 16
      }),
    },
    moreViewers: {
      width: responsiveValue({
        xs: 28, sm: 30, md: 32, lg: 34, default: 32
      }),
      height: responsiveValue({
        xs: 28, sm: 30, md: 32, lg: 34, default: 32
      }),
      borderRadius: responsiveValue({
        xs: 14, sm: 15, md: 16, lg: 17, default: 16
      }),
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
      maxHeight: responsiveValue({
        xs: 180, sm: 190, md: 200, lg: 210, default: 200
      }),
    },
    commentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(8),
      marginBottom: LAYOUT.getMargin(4),
    },
    commentAvatar: {
      width: responsiveValue({
        xs: 22, sm: 23, md: 24, lg: 25, default: 24
      }),
      height: responsiveValue({
        xs: 22, sm: 23, md: 24, lg: 25, default: 24
      }),
      borderRadius: responsiveValue({
        xs: 11, sm: 11.5, md: 12, lg: 12.5, default: 12
      }),
      backgroundColor: colors.primary + '40',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(8),
    },
    commentAvatarText: {
      fontSize: responsiveValue({
        xs: 11, sm: 11.5, md: 12, lg: 12.5, default: 12
      }),
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
      paddingTop: LAYOUT.getPadding(24),
    },
    actionButtons: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(24),
    },
    actionButton: {
      alignItems: 'center',
    },
    actionIcon: {
      width: responsiveValue({
        xs: 45, sm: 47, md: 50, lg: 52, default: 50
      }),
      height: responsiveValue({
        xs: 45, sm: 47, md: 50, lg: 52, default: 50
      }),
      borderRadius: responsiveValue({
        xs: 22.5, sm: 23.5, md: 25, lg: 26, default: 25
      }),
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
      borderRadius: LAYOUT.getBorderRadius(16),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
    giftButtonText: {
      ...typography.caption,
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: LAYOUT.getMargin(4),
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
