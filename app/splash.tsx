import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Heart, Zap } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Text animation after logo
    setTimeout(() => {
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Navigate to login after delay
    setTimeout(() => {
      router.replace('/login');
    }, 3000);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    logoCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },    title: {
      ...typography.h1,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      fontSize: 16,
    },
    loadingDots: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      marginHorizontal: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.primaryLight + '20']}
        style={styles.gradient}
      >
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScaleAnim },
                { scale: pulseAnim }
              ],
              opacity: logoOpacityAnim,
            }
          ]}
        >
          <View style={styles.logoCircle}>
            <View style={styles.iconContainer}>
              <Activity size={30} color={colors.surface} />
              <Heart size={20} color={colors.surface} style={{ marginLeft: -5 }} />
              <Zap size={25} color={colors.surface} style={{ marginLeft: -5 }} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: textOpacityAnim }}>
          <Text style={styles.title}>Health App</Text>
          <Text style={styles.subtitle}>Your Fitness Journey Starts Here</Text>

          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}
