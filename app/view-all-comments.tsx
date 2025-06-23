import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, TextInput, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MessageSquare, Heart, Share, Bookmark, MoreHorizontal, Send, ThumbsUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  scale, 
  verticalScale, 
  SCREEN, 
  LAYOUT, 
  TOUCH,
  responsiveValue 
} from '@/utils/responsive';

export default function ViewAllCommentsScreen() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

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

  // Mock data for comments
  const comments = [
    {
      id: '1',
      user: {
        name: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=M',
      },
      text: 'Amazing workout! Keep it up! 💪',
      time: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: '1-1',
          user: {
            name: 'Sarah Davis',
            avatar: 'https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=S',
          },
          text: 'Totally agree! Inspiration right here',
          time: '1 hour ago',
          likes: 3,
        }
      ]
    },
    {
      id: '2',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=E',
      },
      text: 'What\'s your workout routine? I need some tips!',
      time: '3 hours ago',
      likes: 8,
      replies: []
    },
    {
      id: '3',
      user: {
        name: 'Alex Brown',
        avatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=A',
      },
      text: 'This is exactly what I needed to see today. Thanks for sharing!',
      time: '4 hours ago',
      likes: 15,
      replies: []
    },
    {
      id: '4',
      user: {
        name: 'Jessica Taylor',
        avatar: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=J',
      },
      text: 'Your progress is incredible! What app are you using to track?',
      time: '5 hours ago',
      likes: 6,
      replies: [
        {
          id: '4-1',
          user: {
            name: 'You',
            avatar: 'https://via.placeholder.com/32x32/6366F1/FFFFFF?text=Y',
          },
          text: 'Thanks! I\'m using this health app. It\'s really helpful for tracking everything.',
          time: '4 hours ago',
          likes: 10,
        }
      ]
    }
  ];

  const renderComment = ({ item, isReply = false }: { item: any; isReply?: boolean }) => (
    <View style={[styles.commentContainer, isReply && styles.replyContainer]}>
      <Image source={{ uri: item.user.avatar }} style={[styles.avatar, isReply && styles.replyAvatar]} />
      
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.commentTime}>{item.time}</Text>
        </View>
        
        <Text style={styles.commentText}>{item.text}</Text>
        
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <ThumbsUp size={14} color={colors.textSecondary} />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          
          {!isReply && (
            <TouchableOpacity style={styles.actionButton}>
              <MessageSquare size={14} color={colors.textSecondary} />
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.actionButton}>
            <MoreHorizontal size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCommentWithReplies = ({ item }: { item: any }) => (
    <View>
      {renderComment({ item })}
      {item.replies.map((reply: any) => (
        <View key={reply.id}>
          {renderComment({ item: reply, isReply: true })}
        </View>
      ))}
    </View>
  );  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getPadding(),
      paddingVertical: LAYOUT.getPadding(12),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    backButton: {
      width: TOUCH.getTouchSize(),
      height: TOUCH.getTouchSize(),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(12),
    },
    headerTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    headerAction: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    postPreview: {
      backgroundColor: colors.surface,
      padding: LAYOUT.getPadding(),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(12),
    },
    postAvatar: {
      width: TOUCH.getTouchSize(),
      height: TOUCH.getTouchSize(),
      borderRadius: LAYOUT.getBorderRadius(20),
      marginRight: LAYOUT.getMargin(12),
    },
    postUserInfo: {
      flex: 1,
    },
    postUserName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    postTime: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    postContent: {
      ...typography.body,
      color: colors.text,
      marginBottom: LAYOUT.getMargin(12),
    },
    postStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: LAYOUT.getPadding(12),
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    postStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    postStatText: {
      ...typography.caption,
      color: colors.textSecondary,
      marginLeft: LAYOUT.getMargin(6),
    },
    commentsContainer: {
      flex: 1,
    },
    commentContainer: {
      flexDirection: 'row',
      padding: LAYOUT.getPadding(),
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    replyContainer: {
      paddingLeft: responsiveValue({ xs: scale(60), sm: scale(64), md: scale(68), default: scale(64) }),
      backgroundColor: colors.background + '50',
    },
    avatar: {
      width: TOUCH.getTouchSize(),
      height: TOUCH.getTouchSize(),
      borderRadius: LAYOUT.getBorderRadius(20),
      marginRight: LAYOUT.getMargin(12),
    },
    replyAvatar: {
      width: responsiveValue({ xs: scale(28), sm: scale(30), md: scale(32), default: scale(30) }),
      height: responsiveValue({ xs: scale(28), sm: scale(30), md: scale(32), default: scale(30) }),
      borderRadius: LAYOUT.getBorderRadius(16),
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(6),
    },
    userName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginRight: LAYOUT.getMargin(8),
    },
    commentTime: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    commentText: {
      ...typography.body,
      color: colors.text,
      marginBottom: LAYOUT.getMargin(8),
    },
    commentActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getMargin(),
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getMargin(6),
    },
    actionText: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    addCommentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getPadding(),
      paddingVertical: LAYOUT.getPadding(12),
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    addCommentAvatar: {
      width: responsiveValue({ xs: scale(28), sm: scale(30), md: scale(32), default: scale(30) }),
      height: responsiveValue({ xs: scale(28), sm: scale(30), md: scale(32), default: scale(30) }),
      borderRadius: LAYOUT.getBorderRadius(16),
      marginRight: LAYOUT.getMargin(12),
    },
    addCommentInput: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: LAYOUT.getBorderRadius(20),
      paddingHorizontal: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(8),
      ...typography.body,
      color: colors.text,
    },
    sendButton: {
      marginLeft: LAYOUT.getMargin(8),
      width: responsiveValue({ xs: scale(32), sm: scale(34), md: scale(36), default: scale(34) }),
      height: responsiveValue({ xs: scale(32), sm: scale(34), md: scale(36), default: scale(34) }),
      borderRadius: LAYOUT.getBorderRadius(18),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonInner: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });return (
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
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Comments</Text>
            
            <TouchableOpacity>
              <Text style={styles.headerAction}>Share</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Post Preview */}
          <View style={styles.postPreview}>
            <View style={styles.postHeader}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40x40/6366F1/FFFFFF?text=A' }}
                style={styles.postAvatar}
              />
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>Alex Thompson</Text>
                <Text style={styles.postTime}>6 hours ago</Text>
              </View>
            </View>
            
            <Text style={styles.postContent}>
              Just completed my 10K marathon training! Feeling stronger every day. 
              The journey has been incredible and I'm grateful for all the support from this amazing community! 🏃‍♂️💪
            </Text>
            
            <View style={styles.postStats}>
              <View style={styles.postStat}>
                <Heart size={16} color={colors.error} />
                <Text style={styles.postStatText}>124 likes</Text>
              </View>
              <View style={styles.postStat}>
                <MessageSquare size={16} color={colors.textSecondary} />
                <Text style={styles.postStatText}>{comments.length} comments</Text>
              </View>
              <View style={styles.postStat}>
                <Share size={16} color={colors.textSecondary} />
                <Text style={styles.postStatText}>18 shares</Text>
              </View>
            </View>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            renderItem={renderCommentWithReplies}
            keyExtractor={(item) => item.id}
            style={styles.commentsContainer}
            showsVerticalScrollIndicator={false}
          />

          {/* Add Comment */}
          <LinearGradient
            colors={[colors.surface, colors.surface + 'F0']}
            style={styles.addCommentContainer}
          >
            <Image 
              source={{ uri: 'https://via.placeholder.com/32x32/6366F1/FFFFFF?text=Y' }}
              style={styles.addCommentAvatar}
            />
            <TextInput
              style={styles.addCommentInput}
              placeholder="Add a comment..."
              placeholderTextColor={colors.textSecondary}
            />
            <LinearGradient
              colors={[colors.primary, colors.primary + 'DD']}
              style={styles.sendButton}
            >
              <TouchableOpacity style={styles.sendButtonInner}>
                <Send size={16} color={colors.surface} />
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
