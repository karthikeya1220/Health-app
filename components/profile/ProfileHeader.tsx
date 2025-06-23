import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { userData } from '@/constants/data';
import { COMPONENT, LAYOUT, TOUCH } from '@/utils/responsive';

export const ProfileHeader: React.FC = () => {
  const { colors, theme } = useTheme();
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
        <Bell size={COMPONENT.icon.md} color={colors.text} />
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
    width: COMPONENT.avatar.md,
    height: COMPONENT.avatar.md,
    borderRadius: COMPONENT.avatar.md / 2,
    marginRight: LAYOUT.getMargin(12),
  },
  greeting: {
    flex: 1,
  },
  notificationButton: {
    width: TOUCH.getTouchSize(),
    height: TOUCH.getTouchSize(),
    borderRadius: TOUCH.getTouchSize() / 2,
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