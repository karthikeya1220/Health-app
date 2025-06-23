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
  const { isMobile, isCompact, contentPadding } = useResponsiveDimensions();
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
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: COMPONENT.getHeaderHeight(),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: TOUCH.getTouchSize(40),
      height: TOUCH.getTouchSize(40),
      borderRadius: TOUCH.getTouchSize(40) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(16),
    },
    headerTitle: {
      fontSize: TYPOGRAPHY.getHeaderSize(2),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getHeaderSize(2)),
      color: colors.text,
      fontWeight: 'bold',
    },
    headerActions: {
      flexDirection: 'row',
      gap: LAYOUT.getPadding(8),
    },
    headerButton: {
      width: TOUCH.getTouchSize(40),
      height: TOUCH.getTouchSize(40),
      borderRadius: TOUCH.getTouchSize(40) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
      backgroundColor: colors.surface,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: LAYOUT.getBorderRadius(12),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(12),
      minHeight: COMPONENT.input.md,
    },
    searchInput: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      color: colors.text,
      flex: 1,
      marginLeft: LAYOUT.getPadding(12),
      paddingVertical: LAYOUT.getPadding(8),
    },
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(12),
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingHorizontal: LAYOUT.getPadding(20),
      paddingVertical: LAYOUT.getPadding(12),
      marginRight: LAYOUT.getPadding(12),
      borderRadius: LAYOUT.getBorderRadius(12),
      minHeight: TOUCH.minTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },    tabText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.surface,
    },
    conversationsList: {
      flex: 1,
      paddingTop: LAYOUT.getPadding(8),
    },
    conversationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
      minHeight: LAYOUT.getListItemHeight(),
    },
    avatarContainer: {
      position: 'relative',
      marginRight: LAYOUT.getPadding(16),
    },
    avatar: {
      width: responsiveValue({ xs: 44, sm: 50, default: 50 }),
      height: responsiveValue({ xs: 44, sm: 50, default: 50 }),
      borderRadius: responsiveValue({ xs: 22, sm: 25, default: 25 }),
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupAvatar: {
      backgroundColor: colors.success + '20',
    },
    avatarText: {
      fontSize: responsiveValue({ xs: 20, sm: 24, default: 24 }),
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: responsiveValue({ xs: 12, sm: 14, default: 14 }),
      height: responsiveValue({ xs: 12, sm: 14, default: 14 }),
      borderRadius: responsiveValue({ xs: 6, sm: 7, default: 7 }),
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
      marginBottom: LAYOUT.getPadding(4),
    },
    conversationName: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      color: colors.text,
      fontWeight: '600',
      flex: 1,
    },
    timestamp: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize()),
      color: colors.textSecondary,
    },
    conversationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getPadding(2),
    },
    lastMessage: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      color: colors.textSecondary,
      flex: 1,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: responsiveValue({ xs: 18, sm: 20, default: 20 }),
      height: responsiveValue({ xs: 18, sm: 20, default: 20 }),      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: responsiveValue({ xs: 4, sm: 6, default: 6 }),
    },
    unreadCount: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.surface,
      fontWeight: 'bold',
    },
    memberCount: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
    },
    fab: {
      position: 'absolute',
      bottom: responsiveValue({ xs: 16, sm: 20, default: 20 }),
      right: responsiveValue({ xs: 16, sm: 20, default: 20 }),
      width: TOUCH.getTouchSize(56),
      height: TOUCH.getTouchSize(56),
      borderRadius: TOUCH.getTouchSize(56) / 2,
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
    <ResponsiveLayout safeArea={true} scrollable={false} padding={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Phone size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Video size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} />
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
            activeOpacity={0.7}
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
      </ScrollView>      
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/new-message')}
        activeOpacity={0.8}
      >
        <Edit size={responsiveValue({ xs: 22, sm: 24, default: 24 })} color={colors.surface} />
      </TouchableOpacity>
    </ResponsiveLayout>
  );
}
