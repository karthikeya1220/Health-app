import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Search, 
  Edit, 
  MessageCircle,
  Users,
  Phone,
  Video,
  MoreHorizontal
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  isOnline: boolean;
  members?: number;
}

export default function MessagingScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'groups' | 'direct'>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Morning Runners',
      avatar: '🏃‍♀️',
      lastMessage: 'Sarah: Ready for tomorrow\'s run?',
      timestamp: '2m ago',
      unreadCount: 3,
      isGroup: true,
      isOnline: true,
      members: 12
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '👩‍🦰',
      lastMessage: 'Thanks for the workout tips!',
      timestamp: '1h ago',
      unreadCount: 0,
      isGroup: false,
      isOnline: true
    },
    {
      id: '3',
      name: 'CrossFit Warriors',
      avatar: '💪',
      lastMessage: 'Mike: Who\'s joining today\'s session?',
      timestamp: '3h ago',
      unreadCount: 7,
      isGroup: true,
      isOnline: false,
      members: 23
    },
    {
      id: '4',
      name: 'Alex Chen',
      avatar: '👨‍💼',
      lastMessage: 'Let\'s schedule that gym session',
      timestamp: '1d ago',
      unreadCount: 1,
      isGroup: false,
      isOnline: false
    },
    {
      id: '5',
      name: 'Yoga Masters',
      avatar: '🧘‍♀️',
      lastMessage: 'Emma: New class schedule is up!',
      timestamp: '2d ago',
      unreadCount: 0,
      isGroup: true,
      isOnline: true,
      members: 15
    }
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                     (selectedTab === 'groups' && conv.isGroup) ||
                     (selectedTab === 'direct' && !conv.isGroup);
    return matchesSearch && matchesTab;
  });

  const renderConversation = (conversation: Conversation) => (
    <Animated.View key={conversation.id} style={{ opacity: fadeAnim }}>      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => conversation.isGroup ? router.push('/group-chat') : router.push('/direct-message')}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <View style={[
            styles.avatar,
            conversation.isGroup && styles.groupAvatar
          ]}>
            <Text style={styles.avatarText}>{conversation.avatar}</Text>
          </View>
          {conversation.isOnline && (
            <View style={styles.onlineIndicator} />
          )}
        </View>

        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName} numberOfLines={1}>
              {conversation.name}
            </Text>
            <Text style={styles.timestamp}>{conversation.timestamp}</Text>
          </View>
          
          <View style={styles.conversationFooter}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {conversation.lastMessage}
            </Text>
            {conversation.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>
                  {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                </Text>
              </View>
            )}
          </View>
          
          {conversation.isGroup && conversation.members && (
            <Text style={styles.memberCount}>
              {conversation.members} members
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

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
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
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
    searchContainer: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    searchInput: {
      ...typography.body,
      color: colors.text,
      flex: 1,
      marginLeft: Spacing.sm,
      paddingVertical: Spacing.xs,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      marginRight: Spacing.sm,
      borderRadius: BorderRadius.lg,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      ...typography.body,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.surface,
    },
    conversationsList: {
      flex: 1,
      paddingTop: Spacing.sm,
    },
    conversationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: Spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupAvatar: {
      backgroundColor: colors.success + '20',
    },
    avatarText: {
      fontSize: 24,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.success,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    conversationContent: {
      flex: 1,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    conversationName: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      flex: 1,
    },
    timestamp: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    conversationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    lastMessage: {
      ...typography.body,
      color: colors.textSecondary,
      flex: 1,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
    },
    unreadCount: {
      ...typography.caption,
      color: colors.surface,
      fontSize: 11,
      fontWeight: 'bold',
    },
    memberCount: {
      ...typography.caption,
      color: colors.textSecondary,
      fontSize: 11,
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['all', 'groups', 'direct'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText
            ]}>
              {tab === 'all' ? 'All' : tab === 'groups' ? 'Groups' : 'Direct'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conversations List */}
      <ScrollView 
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredConversations.map(renderConversation)}
      </ScrollView>      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/new-message')}>
        <Edit size={24} color={colors.surface} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
