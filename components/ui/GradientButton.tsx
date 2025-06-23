import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '@/theme/colors';
import { getTypography } from '@/theme/typography';
import { LAYOUT, TOUCH } from '@/utils/responsive';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  gradient?: keyof typeof Gradients;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outline';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  gradient = 'primary',
  size = 'medium',
  variant = 'filled',
  style,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const gradientColors = Gradients[gradient];

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={1}
      {...props}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
          style,
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.base,
            styles[size],
            variant === 'outline' && styles.outline,
          ]}
        >
          <Text
            style={[
              typography.button,
              styles.text,
              variant === 'outline' && { color: gradientColors[0] },
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: LAYOUT.getBorderRadius(16),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TOUCH.minTarget,
  },
  
  // Sizes
  small: {
    paddingHorizontal: LAYOUT.getPadding(12),
    paddingVertical: LAYOUT.getPadding(8),
  },
  medium: {
    paddingHorizontal: LAYOUT.getPadding(16),
    paddingVertical: LAYOUT.getPadding(12),
  },
  large: {
    paddingHorizontal: LAYOUT.getPadding(20),
    paddingVertical: LAYOUT.getPadding(16),
  },
  
  // Variants
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
    text: {
    color: '#FFFFFF',
  },
});

