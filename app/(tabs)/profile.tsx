import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, Edit, Share, Bell, Lock, Eye, Moon, Sun, Palette, 
  User, Mail, Phone, MapPin, Calendar, Award, Activity, LogOut,
  ChevronRight, Heart, Star, Trophy, Sparkles, Zap, Coffee, Mountain
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { userData } from '@/constants/data';
import { router } from 'expo-router';

export default function ProfileTab() {
  const { colors, theme, themeMode, setThemeMode, pastelTheme, setPastelTheme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateModeEnabled, setPrivateModeEnabled] = useState(false);

  const stats = [
    { label: 'Workouts', value: '247', icon: Activity, color: colors.primary },
    { label: 'Calories', value: '12.5K', icon: Heart, color: colors.error },
    { label: 'Points', value: '1,544', icon: Star, color: colors.accent },
    { label: 'Rank', value: '#12', icon: Trophy, color: colors.success },
  ];

  const pastelThemes = [
    {
      id: 'default',
      name: 'Default',
      description: 'Classic app theme',
      icon: Settings,
      colors: ['#6366f1', '#10b981', '#ef4444'],
    },
    {
      id: 'softEnergy',
      name: 'Soft Energy',
      description: 'Balanced, fresh, feminine-neutral',
      icon: Sparkles,
      colors: ['#FFD6C0', '#CFFFE5', '#D9C8FF'],
    },
    {
      id: 'calmZenPop',
      name: 'Calm Zen Pop',
      description: 'Chill and soothing with playful touches',
      icon: Coffee,
      colors: ['#C7E9F1', '#F9D6E6', '#E4DAF5'],
    },
    {
      id: 'retroFresh',
      name: 'Retro Fresh',
      description: 'Warm, nostalgic, but modern',
      icon: Zap,
      colors: ['#FFF9C4', '#FFB4A2', '#AEC6CF'],
    },
    {
      id: 'sportyMinimal',
      name: 'Sporty Minimal',
      description: 'Subtle but strong, clean look',
      icon: Mountain,
      colors: ['#C0F0E8', '#FAD4D4', '#C9D1FF'],
    },
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
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
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
      shadowColor: colors.shadow,
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
      shadowColor: colors.shadow,
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
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    themeOptionText: {
      ...typography.body,
      color: colors.text,
      marginLeft: Spacing.sm,
    },
    themeOptionTextActive: {
      color: colors.surface,
    },
    // Pastel Theme Styles
    pastelThemeGrid: {
      gap: Spacing.md,
    },
    pastelThemeCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    pastelThemeCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    pastelThemeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    pastelThemeIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    pastelThemeName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    pastelThemeDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
      lineHeight: 16,
    },
    pastelThemeColors: {
      flexDirection: 'row',
      gap: Spacing.xs,
    },
    pastelThemeColorDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.surface,
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
      activeOpacity={0.7}
    >
      <View style={[styles.settingsIcon, { backgroundColor: colors.primary + '20' }]}>
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
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Edit size={16} color={colors.surface} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={stat.label} style={styles.statCard} activeOpacity={0.8}>
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

        {/* Theme Mode Selector */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Appearance Mode</Text>
          <View style={styles.themeSelector}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                themeMode === 'light' && styles.themeOptionActive,
              ]}
              onPress={() => setThemeMode('light')}
              activeOpacity={0.8}
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
              activeOpacity={0.8}
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
              activeOpacity={0.8}
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

        {/* Pastel Theme Selector */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Color Themes</Text>
          <Text style={{
            ...typography.caption,
            color: colors.textSecondary,
            marginBottom: Spacing.md,
            lineHeight: 18,
          }}>
            Choose your preferred color palette. These themes work beautifully in both light and dark modes.
          </Text>
          
          <View style={styles.pastelThemeGrid}>
            {pastelThemes.map((themeOption) => {
              const IconComponent = themeOption.icon;
              const isActive = pastelTheme === themeOption.id;
              
              return (
                <TouchableOpacity
                  key={themeOption.id}
                  style={[
                    styles.pastelThemeCard,
                    isActive && styles.pastelThemeCardActive,
                  ]}
                  onPress={() => setPastelTheme(themeOption.id as any)}
                  activeOpacity={0.8}
                >
                  <View style={styles.pastelThemeHeader}>
                    <View style={[
                      styles.pastelThemeIconContainer,
                      {
                        backgroundColor: isActive ? colors.primary : colors.primary + '20'
                      }
                    ]}>
                      <IconComponent 
                        size={20} 
                        color={isActive ? colors.surface : colors.primary}
                      />
                    </View>
                    <Text style={[
                      styles.pastelThemeName,
                      isActive && { color: colors.primary }
                    ]}>
                      {themeOption.name}
                    </Text>
                  </View>
                  
                  <Text style={styles.pastelThemeDescription}>
                    {themeOption.description}
                  </Text>
                  
                  <View style={styles.pastelThemeColors}>
                    {themeOption.colors.map((color, index) => (
                      <View
                        key={index}
                        style={[
                          styles.pastelThemeColorDot,
                          { backgroundColor: color }
                        ]}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}