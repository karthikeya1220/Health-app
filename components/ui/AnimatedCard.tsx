import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LAYOUT } from '@/utils/responsive';

interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
  onPress?: () => void;
  animationDelay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  elevated = true,
  onPress,
  animationDelay = 0,
  style,
  ...props
}) => {
  const { colors, theme } = useTheme();
  
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(animationDelay),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]),
    ]).start();
  }, [scaleAnim, opacityAnim, translateYAnim, animationDelay]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const cardStyle = [
    styles.base,
    {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
    },
    elevated && styles.elevated,
    style,
  ];

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { translateY: translateYAnim },
    ],
    opacity: opacityAnim,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
        {...props}
      >
        <Animated.View style={[cardStyle, animatedStyle]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={[cardStyle, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: LAYOUT.getBorderRadius(16),
    padding: LAYOUT.getPadding(16),
  },
  elevated: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
});