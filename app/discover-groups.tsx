import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, TrendingUp, MapPin, Users, Star, Clock, ChevronRight, Zap } from 'lucide-react-native';
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

const { width } = Dimensions.get('window');

export default function DiscoverGroupsScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const categories = ['All', 'Running', 'Weightlifting', 'Yoga', 'Cycling', 'Swimming', 'CrossFit'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

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
    },    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      paddingTop: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      paddingBottom: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
    },    headerTitle: {
      ...typography.h2,
      color: colors.text,
      marginBottom: 2,
    },
    headerContent: {
      flex: 1,
    },
    headerSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },    searchContainer: {
      flexDirection: 'row',
      gap: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      paddingHorizontal: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      marginBottom: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
    },    searchBox: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      paddingHorizontal: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      paddingVertical: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      ...typography.body,
      color: colors.text,
      marginLeft: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
      flex: 1,
    },
    filterButton: {
      backgroundColor: colors.surface,
      borderRadius: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      padding: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },    categoriesContainer: {
      paddingLeft: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      marginBottom: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
    },
    categoriesScroll: {
      flexDirection: 'row',
      gap: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
    },
    categoryChip: {
      paddingHorizontal: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      paddingVertical: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
      borderRadius: responsiveValue({ default: 50, sm: 40, md: 50, lg: 60 }),
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
    },    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      paddingHorizontal: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      marginBottom: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      flexDirection: 'row',
      alignItems: 'center',
    },
    trendingIcon: {
      marginRight: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
    },
    groupsContainer: {
      paddingHorizontal: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
    },
    groupCard: {
      backgroundColor: colors.surface,
      borderRadius: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      padding: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
      marginBottom: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
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
      marginBottom: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
    },
    groupIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
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
    },    badges: {
      flexDirection: 'row',
      gap: responsiveValue({ default: 4, sm: 3, md: 4, lg: 5 }),
      marginTop: responsiveValue({ default: 4, sm: 3, md: 4, lg: 5 }),
    },
    badge: {
      paddingHorizontal: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
      paddingVertical: 2,
      borderRadius: responsiveValue({ default: 6, sm: 4, md: 6, lg: 8 }),
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
    },    newBadgeText: {
      color: colors.success,
    },
    trendingBadge: {
      backgroundColor: colors.warning + '20',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    trendingBadgeText: {
      color: colors.warning,
    },
    groupTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },    groupStats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      gap: responsiveValue({ default: 24, sm: 18, md: 24, lg: 30 }),
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
    },    nextEvent: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary + '10',
      padding: responsiveValue({ default: 8, sm: 6, md: 8, lg: 10 }),
      borderRadius: responsiveValue({ default: 12, sm: 8, md: 12, lg: 16 }),
      marginBottom: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
    },
    nextEventText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginLeft: responsiveValue({ default: 4, sm: 3, md: 4, lg: 5 }),
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      paddingVertical: responsiveValue({ default: 16, sm: 12, md: 16, lg: 20 }),
      alignItems: 'center',
    },
    joinButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
    },
  });
  const renderGroupCard = ({ item, index }: { item: typeof trendingGroups[0]; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <TouchableOpacity 
        style={[styles.groupCard, { 
          shadowColor: item.color,
          shadowOpacity: 0.15,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        }]}
        onPress={() => router.push('/group-page')}
        activeOpacity={0.95}
      >
        <LinearGradient
          colors={[item.color + '08', item.color + '03']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <View style={styles.groupHeader}>
          <View style={[styles.groupIcon, { backgroundColor: item.color + '20' }]}>
            <Text style={styles.groupIconText}>{item.image}</Text>
          </View>
          
          <View style={styles.groupInfo}>
            <View style={styles.groupTitleRow}>
              <Text style={styles.groupName}>{item.name}</Text>
              <ChevronRight size={18} color={colors.textSecondary} />
            </View>
            <Text style={styles.groupCategory}>{item.category}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
            
            <View style={styles.badges}>
              {item.isTrending && (
                <View style={[styles.badge, styles.trendingBadge]}>
                  <Zap size={10} color={colors.warning} />
                  <Text style={[styles.badgeText, styles.trendingBadgeText]}>TRENDING</Text>
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

        <LinearGradient
          colors={[item.color, item.color + 'CC']}
          style={styles.joinButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.joinButtonText}>Join Group</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {/* Enhanced Header */}
        <LinearGradient
          colors={[colors.surface, colors.background]}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Discover Groups</Text>
            <Text style={styles.headerSubtitle}>Find your fitness community</Text>
          </View>
        </LinearGradient>

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
        renderItem={renderGroupCard}        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.groupsContainer}
      />
      </Animated.View>
    </SafeAreaView>
  );
}
