import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Heart, Zap, Target } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(textOpacityAnim, {        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Enhanced pulse and rotation animations
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
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
      marginBottom: 60,
    },
    logoCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.4,
      shadowRadius: 25,
      elevation: 15,
      borderWidth: 4,
      borderColor: colors.surface + '20',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },    title: {
      ...TextStyles.h1,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 12,
      fontSize: 32,
      letterSpacing: -1,
    },
    subtitle: {
      ...TextStyles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      fontSize: 18,
      letterSpacing: 0.5,
    },
    loadingDots: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
      marginHorizontal: 6,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
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
