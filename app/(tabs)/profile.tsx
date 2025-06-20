import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Switch, 
  Animated,
  Pressable,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, Edit, Share, Bell, Lock, Eye, Moon, Sun, Palette, 
  User, Mail, Phone, MapPin, Calendar, Award, Activity, LogOut,
  ChevronRight, Heart, Star, Trophy, Sparkles, Zap, Coffee, Mountain,
  Camera, Shield, HelpCircle, Gift, Crown, Bookmark, Clock,
  TrendingUp, Target, BarChart3, Users, MessageSquare, Globe
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { userData } from '@/constants/data';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileTab() {
  const { colors, theme, themeMode, setThemeMode, pastelTheme, setPastelTheme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateModeEnabled, setPrivateModeEnabled] = useState(false);
  
  // Animation refs
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const stats = [
    { label: 'Workouts', value: '247', icon: Activity, color: colors.primary, change: '+12%' },
    { label: 'Calories', value: '12.5K', icon: Heart, color: colors.error, change: '+8%' },
    { label: 'Points', value: '1,544', icon: Star, color: colors.accent, change: '+24%' },
    { label: 'Rank', value: '#12', icon: Trophy, color: colors.success, change: '↑3' },
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', description: 'Workout consistency', icon: '🔥', earned: true },
    { id: 2, title: 'Early Bird', description: '5 AM workouts', icon: '🌅', earned: true },
    { id: 3, title: 'Marathon Ready', description: '26.2 miles target', icon: '🏃‍♂️', earned: false },
    { id: 4, title: 'Social Butterfly', description: 'Join 10 groups', icon: '🦋', earned: true },
  ];

  const quickActions = [
    { id: 1, title: 'Workout History', icon: BarChart3, color: colors.primary, onPress: () => {} },
    { id: 2, title: 'Friends', icon: Users, color: colors.success, onPress: () => {} },
    { id: 3, title: 'Messages', icon: MessageSquare, color: colors.accent, onPress: () => {} },
    { id: 4, title: 'Bookmarks', icon: Bookmark, color: colors.warning, onPress: () => {} },
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
      id: 'neonVibes',
      name: 'Neon Vibes',
      description: 'Hot pink & electric blue energy',
      icon: Zap,
      colors: ['#FF6B9D', '#12D8FA', '#06FFA5'],
    },
    {
      id: 'cyberpunkGlow',
      name: 'Cyberpunk Glow',
      description: 'Futuristic cyber aesthetics',
      icon: Sparkles,
      colors: ['#00D9FF', '#FF0080', '#39FF14'],
    },
    {
      id: 'sunsetDream',
      name: 'Sunset Dream',
      description: 'Warm orange & coral vibes',
      icon: Coffee,
      colors: ['#FF6B35', '#FF9A9E', '#A8E6CF'],
    },
    {
      id: 'galaxyPop',
      name: 'Galaxy Pop',
      description: 'Purple space & cosmic colors',
      icon: Star,
      colors: ['#7B68EE', '#FF69B4', '#00CED1'],
    },
    {
      id: 'retroWave',
      name: 'Retro Wave',
      description: 'Synthwave magenta & cyan',
      icon: Mountain,
      colors: ['#FF0080', '#00FFFF', '#FFFF00'],
    },
  ];
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: Edit, label: 'Edit Profile', action: () => {}, hasArrow: true },
        { icon: Shield, label: 'Privacy & Security', action: () => {}, hasArrow: true },
        { icon: Bell, label: 'Notifications', toggle: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { icon: Eye, label: 'Private Mode', toggle: true, value: privateModeEnabled, onToggle: setPrivateModeEnabled },
      ]
    },
    {
      title: 'Fitness',
      items: [
        { icon: Target, label: 'Goals & Targets', action: () => {}, hasArrow: true },
        { icon: Clock, label: 'Workout Reminders', action: () => {}, hasArrow: true },
        { icon: Award, label: 'Achievements', action: () => {}, hasArrow: true },
        { icon: TrendingUp, label: 'Progress Reports', action: () => {}, hasArrow: true },
      ]
    },
    {
      title: 'Social',
      items: [
        { icon: Users, label: 'Friends & Following', action: () => {}, hasArrow: true },
        { icon: Globe, label: 'Community Groups', action: () => {}, hasArrow: true },
        { icon: Share, label: 'Share App', action: () => {}, hasArrow: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', action: () => {}, hasArrow: true },
        { icon: Gift, label: 'Invite Friends', action: () => {}, hasArrow: true },
        { icon: Settings, label: 'Advanced Settings', action: () => {}, hasArrow: true },
      ]
    }
  ];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    heroSection: {
      position: 'relative',
      overflow: 'hidden',
    },
    heroGradient: {
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.xl,
      paddingHorizontal: Spacing.lg,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: Spacing.lg,
      position: 'relative',
    },
    profileImageWrapper: {
      position: 'relative',
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
    },
    cameraButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.surface,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
    profileInfo: {
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    profileName: {
      ...typography.h1,
      color: colors.surface,
      fontWeight: '700',
      marginBottom: 4,
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.3)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    profileEmail: {
      ...typography.body,
      color: colors.surface,
      opacity: 0.9,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    profileBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success,
      paddingHorizontal: Spacing.md,
      paddingVertical: 6,
      borderRadius: BorderRadius.full,
      marginBottom: Spacing.lg,
    },
    badgeText: {
      ...typography.caption,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: 4,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.full,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    editButtonText: {
      ...typography.bodyMedium,
      color: colors.primary,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    contentSection: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -24,
      paddingTop: Spacing.xl,
      paddingHorizontal: Spacing.lg,
      flex: 1,
    },
    quickActionsContainer: {
      marginBottom: Spacing.xl,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.lg,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
    },
    quickActionCard: {
      width: '22%',
      aspectRatio: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      marginBottom: 6,
    },
    quickActionText: {
      ...typography.caption,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 10,
    },
    statsContainer: {
      marginBottom: Spacing.xl,
    },
    statsGrid: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    statIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statChange: {
      ...typography.caption,
      fontWeight: '600',
      fontSize: 10,
    },
    statValue: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '700',
      marginBottom: 2,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    achievementsContainer: {
      marginBottom: Spacing.xl,
    },
    achievementsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
    },
    achievementCard: {
      width: '47%',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    achievementCardEarned: {
      borderColor: colors.success,
      backgroundColor: colors.success + '10',
    },
    achievementIcon: {
      fontSize: 32,
      marginBottom: Spacing.sm,
    },
    achievementTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 4,
    },
    achievementDescription: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    achievementBadge: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.success,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.surface,
    },
    settingsSection: {
      marginBottom: Spacing.xl,
    },
    settingsCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      overflow: 'hidden',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
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
      ...typography.bodyMedium,
      color: colors.text,
      flex: 1,
      fontWeight: '500',
    },
    themeSection: {
      marginBottom: Spacing.xl,
    },
    themeSelector: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
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
      backgroundColor: colors.surface,
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
      ...typography.bodyMedium,
      color: colors.text,
      marginLeft: Spacing.sm,
      fontWeight: '500',
    },
    themeOptionTextActive: {
      color: colors.surface,
      fontWeight: '600',
    },
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
      elevation: 3,
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
      ...typography.bodyMedium,
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
    logoutSection: {
      marginTop: Spacing.lg,
      marginBottom: Spacing.xl,
    },
    logoutButton: {
      backgroundColor: colors.error + '15',
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.error + '30',
    },
    logoutText: {
      ...typography.bodyMedium,
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
      <View style={[styles.settingsIcon, { backgroundColor: colors.primary + '15' }]}>
        <item.icon size={20} color={colors.primary} />
      </View>
      <Text style={styles.settingsLabel}>{item.label}</Text>
      {item.toggle ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
          ios_backgroundColor={colors.border}
        />
      ) : item.hasArrow ? (
        <ChevronRight size={20} color={colors.textSecondary} />
      ) : null}
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.id}
            style={({ pressed }) => [
              styles.quickActionCard,
              pressed && { transform: [{ scale: 0.95 }], opacity: 0.8 }
            ]}
            onPress={action.onPress}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
              <action.icon size={20} color={action.color} />
            </View>
            <Text style={styles.quickActionText}>{action.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Your Progress</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Pressable
            key={stat.label}
            style={({ pressed }) => [
              styles.statCard,
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
          >
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <stat.icon size={18} color={stat.color} />
              </View>
              <Text style={[styles.statChange, { color: stat.color }]}>
                {stat.change}
              </Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <Pressable
            key={achievement.id}
            style={({ pressed }) => [
              styles.achievementCard,
              achievement.earned && styles.achievementCardEarned,
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
          >
            {achievement.earned && (
              <View style={styles.achievementBadge}>
                <Star size={12} color={colors.surface} fill={colors.surface} />
              </View>
            )}
            <Text style={[styles.achievementIcon, { opacity: achievement.earned ? 1 : 0.4 }]}>
              {achievement.icon}
            </Text>
            <Text style={[styles.achievementTitle, { opacity: achievement.earned ? 1 : 0.6 }]}>
              {achievement.title}
            </Text>
            <Text style={[styles.achievementDescription, { opacity: achievement.earned ? 1 : 0.5 }]}>
              {achievement.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section with Gradient */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            style={styles.heroGradient}
          >
            {/* Profile Image with Camera Button */}
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageWrapper}>
                <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
                <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                  <Camera size={20} color={colors.surface} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.name}</Text>
              <Text style={styles.profileEmail}>{userData.email}</Text>
              
              {/* Premium Badge */}
              <View style={styles.profileBadge}>
                <Crown size={16} color={colors.surface} />
                <Text style={styles.badgeText}>Premium Member</Text>
              </View>

              {/* Edit Profile Button */}
              <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                <Edit size={16} color={colors.primary} />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Quick Actions */}
          {renderQuickActions()}

          {/* Stats */}
          {renderStats()}

          {/* Achievements */}
          {renderAchievements()}

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
          <View style={styles.themeSection}>
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

          {/* Color Theme Selector */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Color Themes</Text>
            <Text style={{
              ...typography.caption,
              color: colors.textSecondary,
              marginBottom: Spacing.lg,
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
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
              <LogOut size={20} color={colors.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}