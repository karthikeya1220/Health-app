import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function TrendingPostsScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Workouts', 'Nutrition', 'Progress', 'Motivation', 'Tips'];

  const trendingPosts = [
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=S',
        verified: true,
      },
      timestamp: '2 hours ago',
      content: 'Just completed my first marathon! 🏃‍♀️ The feeling is incredible. Here are my top 5 tips for first-time marathoners...',
      image: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Marathon',
      category: 'Progress',
      likes: 342,
      comments: 56,
      shares: 23,
      isLiked: false,
      isBookmarked: true,
      hashtags: ['#marathon', '#running', '#firsttime', '#achievement'],
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        avatar: 'https://via.placeholder.com/40x40/A8E6CF/FFFFFF?text=M',
        verified: false,
      },
      timestamp: '4 hours ago',
      content: 'Pre-workout meal that changed my game! 💪 Simple ingredients, maximum energy. Recipe in comments!',
      image: 'https://via.placeholder.com/300x200/FFD93D/FFFFFF?text=Meal',
      category: 'Nutrition',
      likes: 198,
      comments: 34,
      shares: 12,
      isLiked: true,
      isBookmarked: false,
      hashtags: ['#preworkout', '#nutrition', '#energy', '#recipe'],
    },
    {
      id: '3',
      author: {
        name: 'Emma Rodriguez',
        avatar: 'https://via.placeholder.com/40x40/FF8C42/FFFFFF?text=E',
        verified: true,
      },
      timestamp: '6 hours ago',
      content: 'Transformation Tuesday! 6 months of consistent training. The key was finding a routine I actually enjoyed. Your journey is unique - embrace it! ✨',
      image: 'https://via.placeholder.com/300x200/B19CD9/FFFFFF?text=Transform',
      category: 'Progress',
      likes: 567,
      comments: 89,
      shares: 45,
      isLiked: false,
      isBookmarked: true,
      hashtags: ['#transformation', '#consistency', '#motivation', '#journey'],
    },
    {
      id: '4',
      author: {
        name: 'David Kim',
        avatar: 'https://via.placeholder.com/40x40/6C5CE7/FFFFFF?text=D',
        verified: false,
      },
      timestamp: '8 hours ago',
      content: 'Morning yoga routine that takes only 15 minutes but makes all the difference! Perfect for busy schedules 🧘‍♂️',
      image: null,
      category: 'Workouts',
      likes: 145,
      comments: 28,
      shares: 19,
      isLiked: true,
      isBookmarked: false,
      hashtags: ['#yoga', '#morning', '#routine', '#mindfulness'],
    },
  ];

  const filteredPosts = trendingPosts.filter(post => 
    selectedCategory === 'All' || post.category === selectedCategory
  );

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
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendingIcon: {
      marginRight: Spacing.sm,
    },
    categoriesContainer: {
      paddingLeft: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    categoriesScroll: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    categoryChip: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryChipText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
    },
    categoryChipTextActive: {
      color: colors.surface,
    },
    postsContainer: {
      paddingHorizontal: Spacing.lg,
    },
    postCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      marginBottom: Spacing.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      marginRight: Spacing.md,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    timestamp: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    verifiedBadge: {
      marginLeft: 4,
      color: colors.primary,
    },
    moreButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    postContent: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    contentText: {
      ...typography.body,
      color: colors.text,
      lineHeight: 22,
      marginBottom: Spacing.sm,
    },
    hashtags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.xs,
    },
    hashtag: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    postImage: {
      width: '100%',
      height: 200,
      backgroundColor: colors.border,
    },
    categoryBadge: {
      position: 'absolute',
      top: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: BorderRadius.sm,
    },
    categoryBadgeText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '600',
      fontSize: 10,
    },
    postActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.lg,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    actionGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    actionCount: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    actionCountActive: {
      color: colors.primary,
    },
  });

  const renderPost = ({ item }: { item: typeof trendingPosts[0] }) => (
    <View style={styles.postCard}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.authorName}>{item.author.name}</Text>
            {item.author.verified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.postContent}>
        <Text style={styles.contentText}>{item.content}</Text>
        <View style={styles.hashtags}>
          {item.hashtags.map((hashtag, index) => (
            <Text key={index} style={styles.hashtag}>{hashtag}</Text>
          ))}
        </View>
      </View>

      {/* Image */}
      {item.image && (
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category.toUpperCase()}</Text>
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.postActions}>
        <View style={styles.actionGroup}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart 
              size={20} 
              color={item.isLiked ? colors.error : colors.textSecondary}
              fill={item.isLiked ? colors.error : 'none'}
            />
            <Text style={[
              styles.actionCount,
              item.isLiked && styles.actionCountActive
            ]}>
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color={colors.textSecondary} />
            <Text style={styles.actionCount}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share size={20} color={colors.textSecondary} />
            <Text style={styles.actionCount}>{item.shares}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Bookmark 
            size={20} 
            color={item.isBookmarked ? colors.primary : colors.textSecondary}
            fill={item.isBookmarked ? colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <TrendingUp size={24} color={colors.primary} style={styles.trendingIcon} />
          <Text style={[styles.headerTitle, { flex: 0 }]}>Trending Posts</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts List */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
      />
    </SafeAreaView>
  );
}
