import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { 
  ArrowLeft, 
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Send,
  Bookmark,
  Flag,
  UserPlus,
  Eye,
  ThumbsUp,
  Laugh,
  Frown
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
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

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface Reaction {
  type: 'like' | 'love' | 'laugh' | 'sad';
  icon: string;
  count: number;
  isSelected: boolean;
}

export default function ViewPostScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const dimensions = useResponsiveDimensions();
  const breakpoint = useBreakpoint();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const reactionsAnim = useRef(new Animated.Value(0)).current;

  const postData = {
    id: '1',
    author: 'Sarah Johnson',
    username: '@sarah_runs',
    avatar: '👩‍🦰',
    timestamp: '2 hours ago',
    content: 'Just completed my first half marathon! 13.1 miles in 1:45:32 🎉 The training was tough but so worth it. Feeling incredible and already planning my next race! 🏃‍♀️\n\n#HalfMarathon #Running #FirstTime #Achievement #NeverGiveUp',
    location: 'Central Park, NYC',
    likes: 247,
    comments: 38,
    shares: 12,
    views: 1243,
    isVerified: true
  };

  const [reactions, setReactions] = useState<Reaction[]>([
    { type: 'like', icon: '👍', count: 156, isSelected: false },
    { type: 'love', icon: '❤️', count: 89, isSelected: false },
    { type: 'laugh', icon: '😂', count: 12, isSelected: false },
    { type: 'sad', icon: '😢', count: 2, isSelected: false },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Alex Chen',
      avatar: '👨‍💼',
      content: 'Congratulations! That\'s an amazing achievement! 🎉',
      timestamp: '1 hour ago',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          user: 'Sarah Johnson',
          avatar: '👩‍🦰',
          content: 'Thank you so much! Your support means everything! 🙏',
          timestamp: '45 minutes ago',
          likes: 5,
          isLiked: false,
        }
      ]
    },
    {
      id: '2',
      user: 'Emma Wilson',
      avatar: '👩‍💻',
      content: 'This is so inspiring! I\'ve been thinking about training for my first half marathon too. Any tips?',
      timestamp: '45 minutes ago',
      likes: 8,
      isLiked: false,
    },
    {
      id: '3',
      user: 'Mike Rodriguez',
      avatar: '👨‍🏋️',
      content: 'Sub 1:46 for your first half? That\'s incredible! You\'re a natural runner! 🏃‍♀️⚡',
      timestamp: '30 minutes ago',
      likes: 15,
      isLiked: true,
    }
  ]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReaction = (reactionType: string) => {
    setReactions(prev => prev.map(reaction => 
      reaction.type === reactionType 
        ? { 
            ...reaction, 
            isSelected: !reaction.isSelected,
            count: reaction.isSelected ? reaction.count - 1 : reaction.count + 1
          }
        : { ...reaction, isSelected: false }
    ));
    setShowReactions(false);
  };

  const showReactionPicker = () => {
    setShowReactions(true);
    Animated.spring(reactionsAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const hideReactionPicker = () => {
    Animated.timing(reactionsAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowReactions(false));
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        avatar: '👤',
        content: commentText.trim(),
        timestamp: 'now',
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setReplyingTo(null);
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>{item.avatar}</Text>
      </View>
      
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUser}>{item.user}</Text>
          <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={styles.commentText}>{item.content}</Text>
        
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => handleCommentLike(item.id)}
          >
            <Heart 
              size={14} 
              color={item.isLiked ? colors.error : colors.textSecondary}
              fill={item.isLiked ? colors.error : 'transparent'}
            />
            <Text style={styles.commentActionText}>{item.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => setReplyingTo(item.id)}
          >
            <Text style={styles.commentActionText}>Reply</Text>
          </TouchableOpacity>
        </View>
        
        {/* Replies */}
        {item.replies && item.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {item.replies.map((reply) => (
              <View key={reply.id} style={styles.replyItem}>
                <View style={styles.replyAvatar}>
                  <Text style={styles.replyAvatarText}>{reply.avatar}</Text>
                </View>
                <View style={styles.replyContent}>
                  <Text style={styles.replyUser}>{reply.user}</Text>
                  <Text style={styles.replyText}>{reply.content}</Text>
                  <Text style={styles.replyTimestamp}>{reply.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(12),
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: TYPOGRAPHY.getHeaderSize(3),
      color: colors.text,
      fontWeight: 'bold',
    },
    headerButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    postContainer: {
      backgroundColor: colors.surface,
      borderBottomWidth: responsiveValue({
        xs: 6, sm: 6, md: 8, lg: 8, xl: 10, xxl: 10, xxxl: 12, default: 8
      }),
      borderBottomColor: colors.border + '30',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingTop: LAYOUT.getContentPadding(),
      paddingBottom: LAYOUT.getPadding(12),
    },
    authorAvatar: {
      width: responsiveValue({
        xs: 48, sm: 52, md: 56, lg: 60, xl: 64, xxl: 68, xxxl: 72, default: 56
      }),
      height: responsiveValue({
        xs: 48, sm: 52, md: 56, lg: 60, xl: 64, xxl: 68, xxxl: 72, default: 56
      }),
      borderRadius: responsiveValue({
        xs: 24, sm: 26, md: 28, lg: 30, xl: 32, xxl: 34, xxxl: 36, default: 28
      }),
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(12),
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
      borderWidth: 2,
      borderColor: colors.primary + '30',
    },    authorAvatarText: {
      fontSize: responsiveValue({
        xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 30, xxxl: 32, default: 24
      }),
      fontWeight: '600' as const,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      backgroundColor: colors.success,
      borderRadius: 10,
      padding: 3,
      borderWidth: 2,
      borderColor: colors.surface,
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    authorInfo: {
      flex: 1,
    },    authorName: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      fontWeight: '600' as const,
    },
    authorUsername: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
    },
    postTimestamp: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
    },
    followButton: {
      backgroundColor: colors.primary,
      borderRadius: LAYOUT.getBorderRadius(8),
      paddingHorizontal: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(8),
      minHeight: TOUCH.getButtonSize('small'),
      justifyContent: 'center',
    },
    followingButton: {
      backgroundColor: colors.success,
    },    followButtonText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.surface,
      fontWeight: '600' as const,
    },
    postContent: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingBottom: LAYOUT.getPadding(12),
    },
    postText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      marginBottom: LAYOUT.getPadding(8),
    },    postLocation: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.primary,
      fontWeight: '500' as const,
    },postStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(8),
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      marginLeft: LAYOUT.getPadding(4),
    },
    postActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: LAYOUT.getPadding(12),
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingVertical: LAYOUT.getPadding(8),
      minHeight: TOUCH.getButtonSize('small'),
    },
    likedButton: {
      color: colors.error,
    },    actionText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      marginLeft: LAYOUT.getPadding(4),
      fontWeight: '500' as const,
    },
    likedText: {
      color: colors.error,
    },
    reactionsOverlay: {
      position: 'absolute',
      bottom: 60,
      left: LAYOUT.getContentPadding(),
      right: LAYOUT.getContentPadding(),
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(12),
      flexDirection: 'row',
      justifyContent: 'space-around',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reactionButton: {
      alignItems: 'center',
      padding: LAYOUT.getPadding(8),
      borderRadius: LAYOUT.getBorderRadius(8),
      minWidth: TOUCH.getButtonSize('small'),
      minHeight: TOUCH.getButtonSize('small'),
    },
    selectedReaction: {
      backgroundColor: colors.primary + '20',
    },
    reactionIcon: {
      fontSize: responsiveValue({
        xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 30, xxxl: 32, default: 24
      }),
      marginBottom: 4,
    },    reactionCount: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      fontWeight: '500' as const,
    },
    selectedReactionCount: {
      color: colors.primary,
    },    commentsSection: {
      flex: 1,
      backgroundColor: colors.background,
    },
    commentsSectionHeader: {
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(12),
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    commentsSectionTitle: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      fontWeight: '600',
    },
    commentsList: {
      flex: 1,
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    commentItem: {
      flexDirection: 'row',
      paddingVertical: LAYOUT.getPadding(12),
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    commentAvatar: {
      width: responsiveValue({
        xs: 32, sm: 34, md: 36, lg: 38, xl: 40, xxl: 42, xxxl: 44, default: 36
      }),
      height: responsiveValue({
        xs: 32, sm: 34, md: 36, lg: 38, xl: 40, xxl: 42, xxxl: 44, default: 36
      }),
      borderRadius: responsiveValue({
        xs: 16, sm: 17, md: 18, lg: 19, xl: 20, xxl: 21, xxxl: 22, default: 18
      }),
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(8),
    },
    commentAvatarText: {
      fontSize: responsiveValue({
        xs: 16, sm: 17, md: 18, lg: 19, xl: 20, xxl: 21, xxxl: 22, default: 18
      }),
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    commentUser: {
      fontSize: TYPOGRAPHY.getBodySize('small'),
      color: colors.text,
      fontWeight: '600',
      marginRight: LAYOUT.getPadding(8),
    },
    commentTimestamp: {
      fontSize: TYPOGRAPHY.getCaptionSize() * 0.9,
      color: colors.textSecondary,
    },
    commentText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium'), 1.3),
      marginBottom: LAYOUT.getPadding(4),
    },
    commentActions: {
      flexDirection: 'row',
      gap: LAYOUT.getPadding(12),
    },
    commentAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      minHeight: TOUCH.getButtonSize('small'),
      paddingVertical: LAYOUT.getPadding(4),
    },
    commentActionText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      fontWeight: '500',
    },    repliesContainer: {
      marginTop: LAYOUT.getPadding(8),
      paddingLeft: LAYOUT.getPadding(12),
      borderLeftWidth: 2,
      borderLeftColor: colors.border,
    },
    replyItem: {
      flexDirection: 'row',
      marginBottom: LAYOUT.getPadding(8),
    },
    replyAvatar: {
      width: responsiveValue({
        xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 30, xxxl: 32, default: 24
      }),
      height: responsiveValue({
        xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 30, xxxl: 32, default: 24
      }),
      borderRadius: responsiveValue({
        xs: 10, sm: 11, md: 12, lg: 13, xl: 14, xxl: 15, xxxl: 16, default: 12
      }),
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(4),
    },
    replyAvatarText: {
      fontSize: responsiveValue({
        xs: 10, sm: 11, md: 12, lg: 13, xl: 14, xxl: 15, xxxl: 16, default: 12
      }),
    },
    replyContent: {
      flex: 1,
    },
    replyUser: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.text,
      fontWeight: '600',
    },
    replyText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.text,
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize(), 1.3),
    },
    replyTimestamp: {
      fontSize: TYPOGRAPHY.getCaptionSize() * 0.85,
      color: colors.textSecondary,
      marginTop: 2,
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(12),
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    commentInput: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: LAYOUT.getBorderRadius(16),
      paddingHorizontal: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(8),
      marginRight: LAYOUT.getPadding(8),
      maxHeight: responsiveValue({
        xs: 80, sm: 90, md: 100, lg: 110, xl: 120, xxl: 130, xxxl: 140, default: 100
      }),
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      minHeight: TOUCH.getButtonSize('medium'),
    },
    sendButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    replyingIndicator: {
      backgroundColor: colors.primary + '10',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(8),
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    replyingText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.primary,
      fontWeight: '500',
    },
  });
  return (
    <ResponsiveLayout style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Post</Text>
            <TouchableOpacity style={styles.headerButton}>
              <MoreHorizontal size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
              {/* Post */}
              <View style={styles.postContainer}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <View style={styles.authorAvatar}>
                    <Text style={styles.authorAvatarText}>{postData.avatar}</Text>
                    {postData.isVerified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={{ 
                          color: colors.surface, 
                          fontSize: TYPOGRAPHY.getCaptionSize() * 0.7,
                          fontWeight: '600'
                        }}>✓</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{postData.author}</Text>
                    <Text style={styles.authorUsername}>{postData.username}</Text>
                    <Text style={styles.postTimestamp}>{postData.timestamp}</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={[
                      styles.followButton,
                      isFollowing && styles.followingButton
                    ]}
                    onPress={() => setIsFollowing(!isFollowing)}
                  >
                    <Text style={styles.followButtonText}>
                      {isFollowing ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Post Content */}
                <View style={styles.postContent}>
                  <Text style={styles.postText}>{postData.content}</Text>
                  <Text style={styles.postLocation}>📍 {postData.location}</Text>
                </View>

                {/* Post Stats */}
                <View style={styles.postStats}>
                  <View style={styles.statItem}>
                    <Heart size={14} color={colors.textSecondary} />
                    <Text style={styles.statText}>{postData.likes}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MessageCircle size={14} color={colors.textSecondary} />
                    <Text style={styles.statText}>{postData.comments}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Share size={14} color={colors.textSecondary} />
                    <Text style={styles.statText}>{postData.shares}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Eye size={14} color={colors.textSecondary} />
                    <Text style={styles.statText}>{postData.views}</Text>
                  </View>
                </View>

                {/* Post Actions */}
                <View style={styles.postActions}>
                  <TouchableOpacity 
                    style={styles.actionButton} 
                    onLongPress={showReactionPicker}
                    onPress={handleLike}
                  >
                    <Heart 
                      size={20} 
                      color={isLiked ? colors.error : colors.textSecondary}
                      fill={isLiked ? colors.error : 'transparent'}
                    />
                    <Text style={[styles.actionText, isLiked && styles.likedText]}>
                      Like
                    </Text>
                  </TouchableOpacity>                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/view-all-comments')}
                  >
                    <MessageCircle size={20} color={colors.textSecondary} />
                    <Text style={styles.actionText}>Comment</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => router.push('/share-post')}
                  >
                    <Share size={20} color={colors.textSecondary} />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark 
                      size={20} 
                      color={isBookmarked ? colors.primary : colors.textSecondary}
                      fill={isBookmarked ? colors.primary : 'transparent'}
                    />
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Comments Section */}
              <View style={styles.commentsSection}>                <View style={styles.commentsSectionHeader}>
                  <Text style={styles.commentsSectionTitle}>
                    Comments ({comments.length})
                  </Text>
                  {comments.length > 2 && (
                    <TouchableOpacity onPress={() => router.push('/view-all-comments')}>
                      <Text style={[styles.actionText, { color: colors.primary }]}>
                        View All
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <FlatList
                  data={comments}
                  renderItem={renderComment}
                  keyExtractor={(item) => item.id}
                  style={styles.commentsList}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
            </Animated.View>
          </ScrollView>

          {/* Reactions Overlay */}
          {showReactions && (
            <Animated.View 
              style={[
                styles.reactionsOverlay,
                {
                  opacity: reactionsAnim,
                  transform: [{
                    scale: reactionsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  }],
                }
              ]}
            >
              {reactions.map((reaction) => (
                <TouchableOpacity
                  key={reaction.type}
                  style={[
                    styles.reactionButton,
                    reaction.isSelected && styles.selectedReaction
                  ]}
                  onPress={() => handleReaction(reaction.type)}
                >
                  <Text style={styles.reactionIcon}>{reaction.icon}</Text>
                  <Text style={[
                    styles.reactionCount,
                    reaction.isSelected && styles.selectedReactionCount
                  ]}>
                    {reaction.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          {/* Comment Input */}
          {replyingTo && (
            <View style={styles.replyingIndicator}>
              <Text style={styles.replyingText}>
                Replying to {comments.find(c => c.id === replyingTo)?.user}
              </Text>
            </View>
          )}
          
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              placeholderTextColor={colors.textSecondary}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !commentText.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleAddComment}
              disabled={!commentText.trim()}
            >
              <Send size={18} color={colors.surface} />
            </TouchableOpacity>
          </View>        </Animated.View>
      </KeyboardAvoidingView>
    </ResponsiveLayout>
  );
}
