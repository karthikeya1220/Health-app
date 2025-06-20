import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Heart, Zap, Target, Dumbbell, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { router } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  // Enhanced animation values
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const subtitleSlideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotsOpacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
    // Floating icons animations
  const icon1Anim = useRef(new Animated.Value(0)).current;
  const icon2Anim = useRef(new Animated.Value(0)).current;
  const icon3Anim = useRef(new Animated.Value(0)).current;
  
  // Particle animations
  const particle1Anim = useRef(new Animated.Value(0)).current;
  const particle2Anim = useRef(new Animated.Value(0)).current;
  const particle3Anim = useRef(new Animated.Value(0)).current;
  
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {    // Hide the default splash screen
    ExpoSplashScreen.hideAsync();
    
    // Set status bar style
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
    
    // Sequential loading states
    const loadingStates = [
      { text: 'Initializing...', progress: 0.2 },
      { text: 'Loading your profile...', progress: 0.4 },
      { text: 'Syncing data...', progress: 0.6 },
      { text: 'Preparing your dashboard...', progress: 0.8 },
      { text: 'Almost ready...', progress: 1.0 }
    ];
    
    // Main animation sequence
    const mainAnimation = Animated.sequence([
      // Phase 1: Logo entrance with scale and glow
      Animated.parallel([
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      
      // Phase 2: Text and subtitle entrance
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(textOpacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleSlideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      
      // Phase 3: Loading dots and progress
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(dotsOpacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ]);

    // Start main animation
    mainAnimation.start();

    // Continuous pulse animation for logo
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Floating icons animation
    const floatingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(icon1Anim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(icon2Anim, {
              toValue: 1,
              duration: 3500,
              useNativeDriver: true,
            }),
            Animated.timing(icon3Anim, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(icon1Anim, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(icon2Anim, {
              toValue: 0,
              duration: 3500,
              useNativeDriver: true,
            }),
            Animated.timing(icon3Anim, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };
      // Start floating animation after delay
    setTimeout(floatingAnimation, 1000);

    // Subtle particle animation
    const particleAnimation = () => {
      Animated.loop(
        Animated.stagger(800, [
          Animated.sequence([
            Animated.timing(particle1Anim, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
            }),
            Animated.timing(particle1Anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle2Anim, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.timing(particle2Anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle3Anim, {
              toValue: 1,
              duration: 4500,
              useNativeDriver: true,
            }),
            Animated.timing(particle3Anim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };
    
    setTimeout(particleAnimation, 1500);

    // Loading text progression
    let currentState = 0;
    const textInterval = setInterval(() => {
      if (currentState < loadingStates.length) {
        setLoadingText(loadingStates[currentState].text);
        setLoadingProgress(loadingStates[currentState].progress);
        currentState++;
      } else {
        clearInterval(textInterval);
      }
    }, 600);

    // Navigate to login after enhanced delay
    const navigationTimer = setTimeout(() => {
      router.replace('/login');
    }, 4000);

    // Cleanup
    return () => {
      pulseAnimation.stop();
      clearInterval(textInterval);
      clearTimeout(navigationTimer);
    };
  }, [theme]);

  // Enhanced dot animation with staggered timing
  const renderLoadingDots = () => {
    return (
      <View style={styles.loadingDots}>
        {[0, 1, 2].map((index) => {
          const dotAnim = useRef(new Animated.Value(0.3)).current;
          
          useEffect(() => {
            const animation = Animated.loop(
              Animated.sequence([
                Animated.delay(index * 200),
                Animated.timing(dotAnim, {
                  toValue: 1,
                  duration: 600,
                  useNativeDriver: true,
                }),
                Animated.timing(dotAnim, {
                  toValue: 0.3,
                  duration: 600,
                  useNativeDriver: true,
                }),
              ])
            );
            animation.start();
            return () => animation.stop();
          }, []);

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  opacity: Animated.multiply(dotsOpacityAnim, dotAnim),
                  transform: [
                    {
                      scale: dotAnim.interpolate({
                        inputRange: [0.3, 1],
                        outputRange: [0.8, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    floatingIconsContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    floatingIcon: {
      position: 'absolute',
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingIcon1: {
      top: height * 0.15,
      left: width * 0.1,
      backgroundColor: colors.primary + '20',
    },
    floatingIcon2: {
      top: height * 0.25,
      right: width * 0.15,
      backgroundColor: colors.success + '20',
    },    floatingIcon3: {
      bottom: height * 0.25,
      left: width * 0.12,
      backgroundColor: colors.warning + '20',
    },
    particle: {
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.primary + '60',
    },
    particle1: {
      top: height * 0.2,
      right: width * 0.25,
    },
    particle2: {
      bottom: height * 0.3,
      right: width * 0.2,
    },
    particle3: {
      top: height * 0.4,
      left: width * 0.25,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
      position: 'relative',
    },
    logoGlow: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: colors.primary,
      opacity: 0.15,
    },
    logoCircle: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 30,
      elevation: 20,
      borderWidth: 6,
      borderColor: colors.surface + '30',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    title: {
      ...TextStyles.h1,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: 36,
      letterSpacing: -1.5,
      fontWeight: '800',
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      ...TextStyles.body,
      color: colors.textSecondary,
      textAlign: 'center',
      fontSize: 19,
      letterSpacing: 0.3,
      lineHeight: 26,
      fontWeight: '500',
    },
    loadingContainer: {
      alignItems: 'center',
      marginTop: 60,
      minHeight: 80,
    },
    loadingText: {
      ...TextStyles.body,
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 20,
      opacity: 0.8,
    },
    progressBarContainer: {
      width: width * 0.6,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      marginBottom: 30,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    loadingDots: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
      marginHorizontal: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    versionText: {
      position: 'absolute',
      bottom: 50,
      ...TextStyles.caption,
      color: colors.textSecondary + '80',
      fontSize: 12,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent={false}
      />
      <LinearGradient
        colors={[
          colors.background,
          colors.primaryLight + '15',
          colors.background,
          colors.primary + '08'
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Floating Background Icons */}
        <View style={styles.floatingIconsContainer}>
          <Animated.View
            style={[
              styles.floatingIcon,
              styles.floatingIcon1,
              {
                opacity: icon1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                transform: [
                  {
                    translateY: icon1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -20],
                    }),
                  },
                  {
                    rotate: icon1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '10deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Dumbbell size={24} color={colors.primary} />
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingIcon,
              styles.floatingIcon2,
              {
                opacity: icon2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                transform: [
                  {
                    translateY: icon2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -15],
                    }),
                  },
                  {
                    rotate: icon2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-8deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <TrendingUp size={24} color={colors.success} />
          </Animated.View>

          <Animated.View
            style={[
              styles.floatingIcon,
              styles.floatingIcon3,
              {
                opacity: icon3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
                transform: [
                  {
                    translateY: icon3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -25],
                    }),
                  },
                  {
                    rotate: icon3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '12deg'],
                    }),
                  },
                ],
              },
            ]}          >
            <Target size={24} color={colors.warning} />
          </Animated.View>

          {/* Subtle Particles */}
          <Animated.View
            style={[
              styles.particle,
              styles.particle1,
              {
                opacity: particle1Anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.8, 0],
                }),
                transform: [
                  {
                    translateY: particle1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.particle,
              styles.particle2,
              {
                opacity: particle2Anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.6, 0],
                }),
                transform: [
                  {
                    translateY: particle2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 80],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.particle,
              styles.particle3,
              {
                opacity: particle3Anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.7, 0],
                }),
                transform: [
                  {
                    translateY: particle3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        {/* Main Logo Section */}
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
          {/* Glow Effect */}
          <Animated.View
            style={[
              styles.logoGlow,
              {
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.6],
                }),
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [1, 1.08],
                      outputRange: [1, 1.15],
                    }),
                  },
                ],
              },
            ]}
          />
          
          {/* Main Logo Circle */}
          <View style={styles.logoCircle}>
            <View style={styles.iconContainer}>
              <Activity size={32} color={colors.surface} strokeWidth={2.5} />
              <Heart size={22} color={colors.surface} style={{ marginLeft: -6 }} strokeWidth={2.5} />
              <Zap size={28} color={colors.surface} style={{ marginLeft: -6 }} strokeWidth={2.5} />
            </View>
          </View>
        </Animated.View>

        {/* Text Section */}
        <Animated.View 
          style={[
            styles.textContainer,
            { 
              opacity: textOpacityAnim,
              transform: [{ translateY: subtitleSlideAnim }],
            }
          ]}
        >
          <Text style={styles.title}>Health App</Text>
          <Text style={styles.subtitle}>
            Your personalized fitness journey starts here.{'\n'}
            Track, achieve, and transform.
          </Text>
        </Animated.View>

        {/* Enhanced Loading Section */}
        <Animated.View 
          style={[
            styles.loadingContainer,
            { opacity: dotsOpacityAnim }
          ]}
        >
          <Text style={styles.loadingText}>{loadingText}</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${loadingProgress * 100}%`],
                  }),
                },
              ]}
            />
          </View>

          {/* Enhanced Loading Dots */}
          {renderLoadingDots()}
        </Animated.View>

        {/* Version Info */}
        <Text style={styles.versionText}>v1.0.0</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}
