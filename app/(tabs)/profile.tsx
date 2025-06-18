import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, Edit, Share, Bell, Lock, Eye, Moon, Sun, Palette, 
  User, Mail, Phone, MapPin, Calendar, Award, Activity, LogOut,
  ChevronRight, Heart, Star, Trophy
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { userData } from '@/constants/data';
import { router } from 'expo-router';

export default function ProfileTab() {
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateModeEnabled, setPrivateModeEnabled] = useState(false);

  const stats = [
    { label: 'Workouts', value: '247', icon: Activity, color: colors.primary },
    { label: 'Calories', value: '12.5K', icon: Heart, color: colors.error },
    { label: 'Points', value: '1,544', icon: Star, color: colors.accent },
    { label: 'Rank', value: '#12', icon: Trophy, color: colors.success },
  ];

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: Edit, label: 'Edit Profile', action: () => {} },
        { icon: Mail, label: 'Email Settings', action: () => {} },
        { icon: Lock, label: 'Privacy & Security', action: () => {} },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
        { 
          icon: Eye, 
          label: 'Private Mode', 
          toggle: true,
          value: privateModeEnabled,
          onToggle: setPrivateModeEnabled
        },
        { icon: Palette, label: 'Theme', action: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: Share, label: 'Share App', action: () => {} },
        { icon: Settings, label: 'Help & Support', action: () => {} },
      ]
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xl,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: Spacing.md,
      borderWidth: 4,
      borderColor: colors.primary + '30',
    },
    profileName: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.xs,
    },
    profileEmail: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: Spacing.lg,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.full,
    },
    editButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.xl,
      gap: Spacing.sm,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    statValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.xs,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    settingsSection: {
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.md,
    },
    settingsCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      overflow: 'hidden',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingsItemLast: {
      borderBottomWidth: 0,
    },
    settingsIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    settingsLabel: {
      ...typography.body,
      color: colors.text,
      flex: 1,
    },
    themeSelector: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.md,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    themeOptionText: {
      ...typography.body,
      color: colors.text,
      marginLeft: Spacing.sm,
    },
    themeOptionTextActive: {
      color: colors.surface,
    },
    logoutButton: {
      backgroundColor: colors.error + '20',
      margin: Spacing.lg,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutText: {
      ...typography.body,
      color: colors.error,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
  });

  const renderSettingsItem = (item: any, isLast: boolean) => (
    <TouchableOpacity
      key={item.label}
      style={[styles.settingsItem, isLast && styles.settingsItemLast]}
      onPress={item.action}
    >
      <View style={[styles.settingsIcon, { backgroundColor: colors.primaryLight }]}>
        <item.icon size={20} color={colors.primary} />
      </View>
      <Text style={styles.settingsLabel}>{item.label}</Text>
      {item.toggle ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />
      ) : (
        <ChevronRight size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color={colors.surface} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={stat.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Sections */}
        {settingsGroups.map((group) => (
          <View key={group.title} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.settingsCard}>
              {group.items.map((item, index) => 
                renderSettingsItem(item, index === group.items.length - 1)
              )}
            </View>
          </View>
        ))}

        {/* Theme Selector */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.themeSelector}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'light' && styles.themeOptionActive,
              ]}
              onPress={() => setThemeMode('light')}
            >
              <Sun size={16} color={themeMode === 'light' ? colors.surface : colors.text} />
              <Text
                style={[
                  styles.themeOptionText,
                  themeMode === 'light' && styles.themeOptionTextActive,
                ]}
              >
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'dark' && styles.themeOptionActive,
              ]}
              onPress={() => setThemeMode('dark')}
            >
              <Moon size={16} color={themeMode === 'dark' ? colors.surface : colors.text} />
              <Text
                style={[
                  styles.themeOptionText,
                  themeMode === 'dark' && styles.themeOptionTextActive,
                ]}
              >
                Dark
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'system' && styles.themeOptionActive,
              ]}
              onPress={() => setThemeMode('system')}
            >
              <Settings size={16} color={themeMode === 'system' ? colors.surface : colors.text} />
              <Text
                style={[
                  styles.themeOptionText,
                  themeMode === 'system' && styles.themeOptionTextActive,
                ]}
              >
                Auto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}