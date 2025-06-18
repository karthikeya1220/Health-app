import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Bell, Shield, CircleHelp as HelpCircle, Info, Palette } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';

const settingsOptions = [
  {
    id: 'theme',
    title: 'Theme',
    icon: Palette,
    subtitle: 'Choose your preferred theme',
    isTheme: true,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    subtitle: 'Manage your notification preferences',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Shield,
    subtitle: 'Control your privacy settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    subtitle: 'Get help or contact support',
  },
  {
    id: 'about',
    title: 'About',
    icon: Info,
    subtitle: 'App version and information',
  },
];

export default function SettingsTab() {
  const { colors, themeMode, setThemeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');

  const handleThemePress = () => {
    const modes = ['system', 'light', 'dark'] as const;
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'system':
        return 'System';
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      padding: Spacing.lg,
    },
    title: {
      ...typography.h2,
      color: colors.text,
      marginBottom: Spacing.xl,
    },
    settingsContainer: {
      gap: Spacing.md,
    },
    settingCard: {
      padding: 0,
    },
    settingOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.lg,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    settingText: {
      flex: 1,
    },
    settingTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    settingSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    themeValue: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
      marginRight: Spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.settingsContainer}>
          {settingsOptions.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <Card key={option.id} style={styles.settingCard}>
                <TouchableOpacity 
                  style={styles.settingOption}
                  onPress={option.isTheme ? handleThemePress : undefined}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <IconComponent size={20} color={colors.primary} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{option.title}</Text>
                      <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                    </View>
                  </View>
                  {option.isTheme ? (
                    <Text style={styles.themeValue}>{getThemeLabel()}</Text>
                  ) : (
                    <ChevronRight size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}