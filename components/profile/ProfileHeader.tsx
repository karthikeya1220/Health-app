import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LightTheme, DarkTheme } from '@/theme/colors';
import { getTypography } from '@/theme/typography';
import { Spacing } from '@/theme/spacing';
import { userData } from '@/constants/data';

export const ProfileHeader: React.FC = () => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? DarkTheme : LightTheme;
  const typography = getTypography(theme === 'dark');

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: userData.profileImage }}
          style={styles.avatar}
        />
        <Text style={[typography.h3, styles.greeting]}>Hello, {userData.name}</Text>
      </View>
      
      <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.surface }]}>
        <Bell size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
  },
  greeting: {
    flex: 1,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});