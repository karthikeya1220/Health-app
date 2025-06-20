import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, Crown, Shield, User, Star, ChevronDown, 
  Check, X, MoreHorizontal, UserPlus, UserX 
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ManageMemberRolesScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

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

  const roles = [
    {
      id: 'admin',
      name: 'Admin',
      description: 'Full access to all group features and settings',
      icon: Crown,
      color: colors.error,
      permissions: [
        'Manage members and roles',
        'Edit group settings',
        'Moderate all content',
        'Delete posts and comments',
        'View analytics',
        'Manage events'
      ]
    },
    {
      id: 'moderator',
      name: 'Moderator',
      description: 'Can moderate content and manage members',
      icon: Shield,
      color: colors.warning,
      permissions: [
        'Moderate content',
        'Remove inappropriate posts',
        'Warn members',
        'Approve/reject join requests',
        'Pin important posts'
      ]
    },
    {
      id: 'member',
      name: 'Member',
      description: 'Standard member with basic access',
      icon: User,
      color: colors.primary,
      permissions: [
        'Create posts',
        'Comment on posts',
        'Join events',
        'View group content',
        'Invite new members'
      ]
    }
  ];

  const members = [
    {
      id: '1',
      name: 'Sarah Martinez',
      email: 'sarah.m@email.com',
      avatar: 'https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=S',
      currentRole: 'admin',
      joinDate: '2023-01-15',
      lastActive: '2 minutes ago',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'mike.r@email.com',
      avatar: 'https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=M',
      currentRole: 'moderator',
      joinDate: '2023-02-20',
      lastActive: '1 hour ago',
      isOnline: false,
    },
    {
      id: '3',
      name: 'Emma Johnson',
      email: 'emma.j@email.com',
      avatar: 'https://via.placeholder.com/50x50/A8E6CF/FFFFFF?text=E',
      currentRole: 'member',
      joinDate: '2023-03-10',
      lastActive: '30 minutes ago',
      isOnline: true,
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david.c@email.com',
      avatar: 'https://via.placeholder.com/50x50/FFD93D/FFFFFF?text=D',
      currentRole: 'member',
      joinDate: '2023-03-25',
      lastActive: '2 hours ago',
      isOnline: false,
    },
  ];

  const handleRoleChange = (memberId: string, newRole: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      Alert.alert(
        'Change Role',
        `Change ${member.name}'s role to ${newRole}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Confirm', 
            onPress: () => {
              console.log(`Changed ${member.name} role to ${newRole}`);
              setSelectedMember(null);
            }
          }
        ]
      );
    }
  };

  const getCurrentRole = (roleId: string) => {
    return roles.find(role => role.id === roleId);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.lg,
      borderBottomLeftRadius: BorderRadius.xl,
      borderBottomRightRadius: BorderRadius.xl,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface + 'CC',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    headerIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollContent: {
      padding: Spacing.lg,
    },
    section: {
      marginBottom: Spacing.xl,
    },    sectionTitle: {
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.lg,
    },
    roleCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 0.5,
      borderColor: colors.border + '40',
    },
    roleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    roleIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    roleInfo: {
      flex: 1,
    },
    roleName: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    roleDescription: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    permissionsList: {
      marginTop: Spacing.sm,
    },
    permissionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
    },    permissionText: {
      ...TextStyles.caption,
      color: colors.textSecondary,
      marginLeft: Spacing.xs,
      flex: 1,
    },
    memberCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
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
      marginBottom: Spacing.md,
    },
    memberAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: Spacing.md,
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
    memberMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    memberMetaText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    onlineIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.success,
    },
    offlineIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.textSecondary,
    },
    currentRoleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    currentRoleText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginRight: Spacing.sm,
    },
    roleDropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      left: 0,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 1000,
      marginTop: 4,
    },
    roleOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    roleOptionLast: {
      borderBottomWidth: 0,
    },
    roleOptionIcon: {
      marginRight: Spacing.md,
    },
    roleOptionText: {
      ...typography.body,
      color: colors.text,
      flex: 1,
    },
    selectedRoleOption: {
      backgroundColor: colors.primary + '10',
    },
    memberStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    memberStat: {
      alignItems: 'center',
    },
    memberStatValue: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    memberStatLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
  });

  const renderRoleCard = (role: typeof roles[0]) => {
    const IconComponent = role.icon;
    
    return (
      <View key={role.id} style={styles.roleCard}>
        <View style={styles.roleHeader}>
          <View style={[styles.roleIcon, { backgroundColor: role.color + '20' }]}>
            <IconComponent size={20} color={role.color} />
          </View>
          <View style={styles.roleInfo}>
            <Text style={styles.roleName}>{role.name}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
          </View>
        </View>

        <View style={styles.permissionsList}>
          {role.permissions.map((permission, index) => (
            <View key={index} style={styles.permissionItem}>
              <Check size={12} color={role.color} />
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderMemberCard = (member: typeof members[0]) => {
    const currentRole = getCurrentRole(member.currentRole);
    const isDropdownOpen = selectedMember === member.id;
    
    return (
      <View key={member.id} style={styles.memberCard}>
        <View style={styles.memberHeader}>
          <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberEmail}>{member.email}</Text>
            <View style={styles.memberMeta}>
              <View style={member.isOnline ? styles.onlineIndicator : styles.offlineIndicator} />
              <Text style={styles.memberMetaText}>
                {member.isOnline ? 'Online' : `Last seen ${member.lastActive}`}
              </Text>
            </View>
          </View>

          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              style={styles.currentRoleButton}
              onPress={() => setSelectedMember(isDropdownOpen ? null : member.id)}
            >
              <Text style={styles.currentRoleText}>{currentRole?.name}</Text>
              <ChevronDown size={16} color={colors.textSecondary} />
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.roleDropdown}>
                {roles.map((role, index) => {
                  const IconComponent = role.icon;
                  const isSelected = role.id === member.currentRole;
                  const isLast = index === roles.length - 1;
                  
                  return (
                    <TouchableOpacity
                      key={role.id}
                      style={[
                        styles.roleOption,
                        isLast && styles.roleOptionLast,
                        isSelected && styles.selectedRoleOption
                      ]}
                      onPress={() => handleRoleChange(member.id, role.name)}
                    >
                      <View style={styles.roleOptionIcon}>
                        <IconComponent size={16} color={role.color} />
                      </View>
                      <Text style={styles.roleOptionText}>{role.name}</Text>
                      {isSelected && <Check size={16} color={colors.primary} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        <View style={styles.memberStats}>
          <View style={styles.memberStat}>
            <Text style={styles.memberStatValue}>{member.joinDate}</Text>
            <Text style={styles.memberStatLabel}>Joined</Text>
          </View>
          <View style={styles.memberStat}>
            <Text style={styles.memberStatValue}>2.4k</Text>
            <Text style={styles.memberStatLabel}>Posts</Text>
          </View>
          <View style={styles.memberStat}>
            <Text style={styles.memberStatValue}>5</Text>
            <Text style={styles.memberStatLabel}>Events</Text>
          </View>
        </View>
      </View>
    );
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
            <Text style={[TextStyles.h2, styles.headerTitle]}>Manage Roles</Text>
            <View style={styles.headerIcon}>
              <Shield size={20} color={colors.primary} />
            </View>
          </LinearGradient>

          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Role Explanations */}
            <View style={styles.section}>
              <Text style={[TextStyles.h3, styles.sectionTitle]}>Role Permissions</Text>
              {roles.map(renderRoleCard)}
            </View>

            {/* Members List */}
            <View style={styles.section}>
              <Text style={[TextStyles.h3, styles.sectionTitle]}>Group Members</Text>
              {members.map(renderMemberCard)}
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
