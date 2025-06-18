import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LightTheme, DarkTheme } from '@/theme/colors';

export const useAnimatedTheme = () => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(theme === 'dark' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme === 'dark' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [theme, animatedValue]);

  const interpolateColor = (lightColor: string, darkColor: string) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightColor, darkColor],
    });
  };

  const animatedColors = {
    background: interpolateColor(LightTheme.background, DarkTheme.background),
    surface: interpolateColor(LightTheme.surface, DarkTheme.surface),
    text: interpolateColor(LightTheme.text, DarkTheme.text),
    textSecondary: interpolateColor(LightTheme.textSecondary, DarkTheme.textSecondary),
    border: interpolateColor(LightTheme.border, DarkTheme.border),
  };

  return { animatedColors, animatedValue };
};