import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Users, Star } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function ExploreTab() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Trending', 'Nearby', 'Featured', 'New'];

  const groups = [
    {
      id: '1',
      name: 'Morning Runners',
      category: 'Running',
      members: 1234,
      location: 'Central Park',
      rating: 4.8,
      image: '🏃‍♀️',
      color: colors.primary,
      description: 'Join us for energizing morning runs!',
      trending: true,
    },
    {
      id: '2',
      name: 'Yoga Masters',
      category: 'Yoga',
      members: 856,
      location: 'Downtown Studio',
      rating: 4.9,
      image: '🧘‍♀️',
      color: colors.success,
      description: 'Find your inner peace and flexibility',
      trending: false,
    },
    {
      id: '3',
      name: 'CrossFit Warriors',
      category: 'CrossFit',
      members: 2341,
      location: 'Fitness Center',
      rating: 4.7,
      image: '💪',
      color: colors.accent,
      description: 'High-intensity workouts for champions',
      trending: true,
    },
    {
      id: '4',
      name: 'Cycling Club',
      category: 'Cycling',
      members: 987,
      location: 'City Trails',
      rating: 4.6,
      image: '🚴‍♂️',
      color: colors.info,
      description: 'Explore the city on two wheels',
      trending: false,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.lg,
    },
    discoverButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
      alignSelf: 'flex-end',
      marginBottom: Spacing.md,
    },
    discoverButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
      fontSize: 14,
    },
    searchContainer: {
      flexDirection: 'row',
      gap: Spacing.md,
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
    },
    filterContainer: {
      paddingLeft: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    filterScroll: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    filterChip: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface,
    },
    filterChipActive: {
      backgroundColor: colors.primary,
    },
    filterChipText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
    },
    filterChipTextActive: {
      color: colors.surface,
    },
    groupsContainer: {
      paddingHorizontal: Spacing.lg,
    },
    groupCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    groupHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: Spacing.md,
    },
    groupInfo: {
      flex: 1,
    },
    groupIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: Spacing.md,
    },
    groupIconText: {
      fontSize: 24,
    },
    groupName: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.xs,
    },
    groupCategory: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.xs,
    },
    groupDescription: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },
    groupStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    groupStat: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    groupStatText: {
      ...typography.caption,
      color: colors.textSecondary,
      marginLeft: Spacing.xs,
    },
    trendingBadge: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: colors.error,
      borderRadius: 12,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
    },
    trendingText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: 'bold',
      fontSize: 10,
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      marginTop: Spacing.md,
    },
    joinButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  const renderGroupCard = ({ item }: { item: typeof groups[0] }) => (
    <TouchableOpacity style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.groupCategory}>{item.category}</Text>
          <Text style={styles.groupDescription}>{item.description}</Text>
        </View>
        <View style={[styles.groupIcon, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.groupIconText}>{item.image}</Text>
          {item.trending && (
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingText}>HOT</Text>
            </View>
          )}
        </View>
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
    <SafeAreaView style={styles.container}>      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Groups</Text>
        
        <TouchableOpacity 
          style={styles.discoverButton}
          onPress={() => router.push('/discover-groups')}
        >
          <Text style={styles.discoverButtonText}>Discover More</Text>
        </TouchableOpacity>
        
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.textSecondary }]}
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
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Groups List */}
      <FlatList
        data={groups}
        renderItem={renderGroupCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.groupsContainer}
      />
    </SafeAreaView>
  );
}