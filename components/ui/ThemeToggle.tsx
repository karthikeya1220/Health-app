import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LightTheme, DarkTheme } from '@/theme/colors';
import { LAYOUT, TOUCH } from '@/utils/responsive';

export const ThemeToggle: React.FC = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const colors = theme === 'dark' ? DarkTheme : LightTheme;
  
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: theme === 'dark' ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [theme, rotateAnim, scaleAnim]);
  const handlePress = () => {
    const newMode = theme === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ rotate: rotation }, { scale: scaleAnim }],
          },
        ]}
      >
        {theme === 'dark' ? (
          <Moon size={24} color={colors.primary} />
        ) : (
          <Sun size={24} color={colors.primary} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: TOUCH.getTouchSize(48),
    height: TOUCH.getTouchSize(48),
    borderRadius: TOUCH.getTouchSize(48) / 2,
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});