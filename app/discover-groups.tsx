import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, TrendingUp, MapPin, Users, Star, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function DiscoverGroupsScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Running', 'Weightlifting', 'Yoga', 'Cycling', 'Swimming', 'CrossFit'];

  const trendingGroups = [
    {
      id: '1',
      name: 'Morning Runners Club',
      category: 'Running',
      members: 1247,
      location: 'San Francisco, CA',
      rating: 4.8,
      isNew: false,
      isTrending: true,
      description: 'Join us for daily morning runs around the city',
      image: '🏃',
      color: '#FF6B6B',
      nextEvent: 'Tomorrow at 6:00 AM',
    },
    {
      id: '2',
      name: 'Strength Warriors',
      category: 'Weightlifting',
      members: 892,
      location: 'New York, NY',
      rating: 4.9,
      isNew: true,
      isTrending: true,
      description: 'Heavy lifting, strong community',
      image: '💪',
      color: '#4ECDC4',
      nextEvent: 'Today at 7:00 PM',
    },
    {
      id: '3',
      name: 'Zen Yoga Masters',
      category: 'Yoga',
      members: 654,
      location: 'Los Angeles, CA',
      rating: 4.7,
      isNew: false,
      isTrending: true,
      description: 'Find your inner peace through yoga',
      image: '🧘',
      color: '#A8E6CF',
      nextEvent: 'Wednesday at 9:00 AM',
    },
    {
      id: '4',
      name: 'Cycling Enthusiasts',
      category: 'Cycling',
      members: 1156,
      location: 'Austin, TX',
      rating: 4.6,
      isNew: false,
      isTrending: false,
      description: 'Exploring trails on two wheels',
      image: '🚴',
      color: '#FFD93D',
      nextEvent: 'Saturday at 8:00 AM',
    },
  ];

  const filteredGroups = trendingGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    searchContainer: {
      flexDirection: 'row',
      gap: Spacing.md,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    searchBox: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      ...typography.body,
      color: colors.text,
      marginLeft: Spacing.sm,
      flex: 1,
    },
    filterButton: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
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
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendingIcon: {
      marginRight: Spacing.sm,
    },
    groupsContainer: {
      paddingHorizontal: Spacing.lg,
    },
    groupCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    groupHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: Spacing.md,
    },
    groupIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    groupIconText: {
      fontSize: 28,
    },
    groupInfo: {
      flex: 1,
    },
    groupName: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    groupCategory: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    groupDescription: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    badges: {
      flexDirection: 'row',
      gap: Spacing.xs,
      marginTop: Spacing.xs,
    },
    badge: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: BorderRadius.sm,
      backgroundColor: colors.error + '20',
    },
    badgeText: {
      ...typography.caption,
      color: colors.error,
      fontWeight: '600',
      fontSize: 10,
    },
    newBadge: {
      backgroundColor: colors.success + '20',
    },
    newBadgeText: {
      color: colors.success,
    },
    groupStats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
      gap: Spacing.lg,
    },
    groupStat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    groupStatText: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    nextEvent: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary + '10',
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.md,
    },
    nextEventText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      alignItems: 'center',
    },
    joinButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
    },
  });

  const renderGroupCard = ({ item }: { item: typeof trendingGroups[0] }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => router.push('/group-page')}
    >
      <View style={styles.groupHeader}>
        <View style={[styles.groupIcon, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.groupIconText}>{item.image}</Text>
        </View>
        
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupCategory}>{item.category}</Text>
          <Text style={styles.groupDescription}>{item.description}</Text>
          
          <View style={styles.badges}>
            {item.isTrending && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>TRENDING</Text>
              </View>
            )}
            {item.isNew && (
              <View style={[styles.badge, styles.newBadge]}>
                <Text style={[styles.badgeText, styles.newBadgeText]}>NEW</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.nextEvent}>
        <Clock size={14} color={colors.primary} />
        <Text style={styles.nextEventText}>Next: {item.nextEvent}</Text>
      </View>

      <View style={styles.groupStats}>
        <View style={styles.groupStat}>
          <Users size={16} color={colors.textSecondary} />
          <Text style={styles.groupStatText}>{item.members.toLocaleString()}</Text>
        </View>
        <View style={styles.groupStat}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.groupStatText}>{item.location}</Text>
        </View>
        <View style={styles.groupStat}>
          <Star size={16} color={colors.accent} />
          <Text style={styles.groupStatText}>{item.rating}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Group</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Discover Groups</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groups..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
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

      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <TrendingUp size={24} color={colors.primary} style={styles.trendingIcon} />
        <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginBottom: 0 }]}>
          {selectedCategory === 'All' ? 'Trending Groups' : `${selectedCategory} Groups`}
        </Text>
      </View>

      {/* Groups List */}
      <FlatList
        data={filteredGroups}
        renderItem={renderGroupCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.groupsContainer}
      />
    </SafeAreaView>
  );
}
