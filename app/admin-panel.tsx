import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, Settings, MoreVertical, UserPlus, UserX, Shield, 
  Crown, Edit, MessageCircle, Phone, Mail, MapPin, Calendar,
  Star, Trophy, Award, Lock, Unlock, Ban, Eye, ChevronRight
} from 'lucide-react-native';
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

export default function AdminPanelScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [activeTab, setActiveTab] = useState('members');
  const [groupSettings, setGroupSettings] = useState({
    isPrivate: true,
    allowInvites: true,
    moderateContent: true,
    autoApprove: false,
  });

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

  const tabs = [
    { id: 'members', label: 'Members' },
    { id: 'posts', label: 'Posts' },
    { id: 'settings', label: 'Settings' },
  ];

  const members = [
    {
      id: '1',
      name: 'Sarah Martinez',
      email: 'sarah.m@email.com',
      role: 'admin',
      joinDate: '2023-01-15',
      avatar: 'https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=S',
      status: 'active',
      warnings: 0,
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'mike.r@email.com',
      role: 'moderator',
      joinDate: '2023-02-20',
      avatar: 'https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=M',
      status: 'active',
      warnings: 0,
    },
    {
      id: '3',
      name: 'Emma Johnson',
      email: 'emma.j@email.com',
      role: 'member',
      joinDate: '2023-03-10',
      avatar: 'https://via.placeholder.com/50x50/A8E6CF/FFFFFF?text=E',
      status: 'active',
      warnings: 1,
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david.c@email.com',
      role: 'member',
      joinDate: '2023-03-25',
      avatar: 'https://via.placeholder.com/50x50/FFD93D/FFFFFF?text=D',
      status: 'suspended',
      warnings: 3,
    },
  ];

  const pendingPosts = [
    {
      id: '1',
      author: 'Emma Johnson',
      content: 'New workout routine I\'ve been trying. Thoughts?',
      timestamp: '2 hours ago',
      flagged: false,
      reports: 0,
    },
    {
      id: '2',
      author: 'John Smith',
      content: 'Anyone interested in selling/buying fitness equipment?',
      timestamp: '4 hours ago',
      flagged: true,
      reports: 2,
      reason: 'Commercial content',
    },
  ];

  const handleMemberAction = (memberId: string, action: string) => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} this member?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log(`${action} member ${memberId}`) }
      ]
    );
  };

  const handlePostAction = (postId: string, action: string) => {
    Alert.alert(
      'Post Action',
      `Post has been ${action}`,
      [{ text: 'OK' }]
    );
  };  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingTop: LAYOUT.getContentPadding(),
      paddingBottom: LAYOUT.getContentPadding(),
      borderBottomLeftRadius: LAYOUT.getBorderRadius(24),
      borderBottomRightRadius: LAYOUT.getBorderRadius(24),
    },
    backButton: {
      width: TOUCH.getTouchSize(),
      height: TOUCH.getTouchSize(),
      borderRadius: TOUCH.getTouchSize() / 2,
      backgroundColor: colors.surface + 'CC',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    adminBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(4),
      borderRadius: LAYOUT.getBorderRadius(50),
      gap: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    adminBadgeText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '700',
      fontSize: 11,
      letterSpacing: 0.5,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(24),
      margin: LAYOUT.getMargin(24),
      padding: 6,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: LAYOUT.getPadding(16),
      borderRadius: LAYOUT.getBorderRadius(16),
    },
    activeTab: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    tabText: {
      ...typography.body,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    activeTabText: {
      color: colors.surface,
      fontWeight: '700',
    },
    content: {
      flex: 1,
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    memberCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(24),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(16),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 0.5,
      borderColor: colors.border + '40',
    },
    memberHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(16),
    },
    memberAvatar: {
      width: responsiveValue({ xs: 44, sm: 48, md: 50, default: 50 }),
      height: responsiveValue({ xs: 44, sm: 48, md: 50, default: 50 }),
      borderRadius: responsiveValue({ xs: 22, sm: 24, md: 25, default: 25 }),
      marginRight: LAYOUT.getMargin(16),
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    memberEmail: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    memberRole: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    roleIcon: {
      marginRight: 4,
    },
    roleText: {
      ...typography.caption,
      fontWeight: '600',
    },
    adminRole: {
      color: colors.error,
    },
    moderatorRole: {
      color: colors.warning,
    },
    memberRoleText: {
      color: colors.primary,
    },
    statusBadge: {
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: 2,
      borderRadius: LAYOUT.getBorderRadius(4),
      marginLeft: LAYOUT.getMargin(8),
    },
    activeStatus: {
      backgroundColor: colors.success + '20',
    },
    suspendedStatus: {
      backgroundColor: colors.error + '20',
    },
    statusText: {
      ...typography.caption,
      fontWeight: '600',
      fontSize: 10,
    },
    activeStatusText: {
      color: colors.success,
    },
    suspendedStatusText: {
      color: colors.error,
    },
    memberDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: LAYOUT.getMargin(16),
    },
    memberDetail: {
      alignItems: 'center',
    },
    memberDetailValue: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    memberDetailLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    warningText: {
      color: colors.warning,
    },
    memberActions: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(8),
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: LAYOUT.getPadding(8),
      paddingHorizontal: LAYOUT.getPadding(16),
      borderRadius: LAYOUT.getBorderRadius(12),
      gap: 4,
    },
    promoteButton: {
      backgroundColor: colors.success + '20',
    },
    suspendButton: {
      backgroundColor: colors.error + '20',
    },
    messageButton: {
      backgroundColor: colors.primary + '20',
    },
    actionButtonText: {
      ...typography.caption,
      fontWeight: '600',
    },
    promoteButtonText: {
      color: colors.success,
    },
    suspendButtonText: {
      color: colors.error,
    },
    messageButtonText: {
      color: colors.primary,
    },
    postCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(16),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    postAuthor: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    postTimestamp: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    postContent: {
      ...typography.body,
      color: colors.text,
      lineHeight: 20,
      marginBottom: LAYOUT.getMargin(16),
    },
    flaggedBadge: {
      backgroundColor: colors.error + '20',
      paddingHorizontal: LAYOUT.getPadding(8),
      paddingVertical: 2,
      borderRadius: LAYOUT.getBorderRadius(4),
      alignSelf: 'flex-start',
      marginBottom: LAYOUT.getMargin(8),
    },
    flaggedBadgeText: {
      ...typography.caption,
      color: colors.error,
      fontWeight: '600',
      fontSize: 10,
    },
    reportInfo: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginBottom: LAYOUT.getMargin(8),
    },
    postActions: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(8),
    },
    approveButton: {
      backgroundColor: colors.success + '20',
    },
    rejectButton: {
      backgroundColor: colors.error + '20',
    },
    approveButtonText: {
      color: colors.success,
    },
    rejectButtonText: {
      color: colors.error,
    },
    settingsSection: {
      marginBottom: LAYOUT.getMargin(32),
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: LAYOUT.getMargin(16),
    },
    settingItem: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingInfo: {
      flex: 1,
      marginRight: LAYOUT.getMargin(16),
    },
    settingTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    settingDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      lineHeight: 16,
    },
  });

  const renderMembers = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {members.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberEmail}>{member.email}</Text>
              <View style={styles.memberRole}>
                {member.role === 'admin' && <Crown size={14} color={colors.error} />}
                {member.role === 'moderator' && <Shield size={14} color={colors.warning} />}
                {member.role === 'member' && <Star size={14} color={colors.primary} />}
                <Text style={[
                  styles.roleText,
                  member.role === 'admin' && styles.adminRole,
                  member.role === 'moderator' && styles.moderatorRole,
                  member.role === 'member' && styles.memberRoleText,
                ]}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </Text>
                <View style={[
                  styles.statusBadge,
                  member.status === 'active' ? styles.activeStatus : styles.suspendedStatus
                ]}>
                  <Text style={[
                    styles.statusText,
                    member.status === 'active' ? styles.activeStatusText : styles.suspendedStatusText
                  ]}>
                    {member.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.memberDetails}>
            <View style={styles.memberDetail}>
              <Text style={styles.memberDetailValue}>{member.joinDate}</Text>
              <Text style={styles.memberDetailLabel}>Joined</Text>
            </View>
            <View style={styles.memberDetail}>
              <Text style={[
                styles.memberDetailValue,
                member.warnings > 0 && styles.warningText
              ]}>
                {member.warnings}
              </Text>
              <Text style={styles.memberDetailLabel}>Warnings</Text>
            </View>
          </View>

          <View style={styles.memberActions}>
            {member.role !== 'admin' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.promoteButton]}
                onPress={() => handleMemberAction(member.id, 'promote')}
              >
                <Crown size={16} color={colors.success} />
                <Text style={[styles.actionButtonText, styles.promoteButtonText]}>
                  Promote
                </Text>
              </TouchableOpacity>
            )}
            
            {member.status === 'active' ? (
              <TouchableOpacity 
                style={[styles.actionButton, styles.suspendButton]}
                onPress={() => handleMemberAction(member.id, 'suspend')}
              >
                <Ban size={16} color={colors.error} />
                <Text style={[styles.actionButtonText, styles.suspendButtonText]}>
                  Suspend
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.actionButton, styles.promoteButton]}
                onPress={() => handleMemberAction(member.id, 'unsuspend')}
              >
                <Unlock size={16} color={colors.success} />
                <Text style={[styles.actionButtonText, styles.promoteButtonText]}>
                  Restore
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]}
              onPress={() => router.push('/new-message')}
            >
              <MessageCircle size={16} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.messageButtonText]}>
                Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderPosts = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {pendingPosts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postAuthor}>{post.author}</Text>
            <Text style={styles.postTimestamp}>{post.timestamp}</Text>
          </View>

          {post.flagged && (
            <View style={styles.flaggedBadge}>
              <Text style={styles.flaggedBadgeText}>FLAGGED</Text>
            </View>
          )}

          <Text style={styles.postContent}>{post.content}</Text>

          {post.reports > 0 && (
            <Text style={styles.reportInfo}>
              {post.reports} report{post.reports !== 1 ? 's' : ''} • {post.reason}
            </Text>
          )}

          <View style={styles.postActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.approveButton]}
              onPress={() => handlePostAction(post.id, 'approved')}
            >
              <Text style={[styles.actionButtonText, styles.approveButtonText]}>
                Approve
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handlePostAction(post.id, 'rejected')}
            >
              <Text style={[styles.actionButtonText, styles.rejectButtonText]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Private Group</Text>
            <Text style={styles.settingDescription}>
              Only approved members can join and see group content
            </Text>
          </View>
          <Switch
            value={groupSettings.isPrivate}
            onValueChange={(value) => setGroupSettings({...groupSettings, isPrivate: value})}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Allow Member Invites</Text>
            <Text style={styles.settingDescription}>
              Let members invite others to join the group
            </Text>
          </View>
          <Switch
            value={groupSettings.allowInvites}
            onValueChange={(value) => setGroupSettings({...groupSettings, allowInvites: value})}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Moderation</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Content Moderation</Text>
            <Text style={styles.settingDescription}>
              Review posts before they appear in the group
            </Text>
          </View>
          <Switch
            value={groupSettings.moderateContent}
            onValueChange={(value) => setGroupSettings({...groupSettings, moderateContent: value})}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Auto-approve Members</Text>
            <Text style={styles.settingDescription}>
              Automatically approve join requests without review
            </Text>
          </View>
          <Switch
            value={groupSettings.autoApprove}
            onValueChange={(value) => setGroupSettings({...groupSettings, autoApprove: value})}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'members':
        return renderMembers();
      case 'posts':
        return renderPosts();
      case 'settings':
        return renderSettings();
      default:
        return renderMembers();
    }
  };
  return (
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
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Admin Panel</Text>
            <LinearGradient
              colors={[colors.error, colors.error + 'DD']}
              style={styles.adminBadge}
            >
              <Crown size={12} color={colors.surface} />
              <Text style={styles.adminBadgeText}>ADMIN</Text>
            </LinearGradient>
          </LinearGradient>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {renderContent()}
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
