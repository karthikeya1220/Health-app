import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  User, 
  Calendar, 
  Target, 
  Activity, 
  Heart, 
  Zap, 
  Trophy,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Users,
  Timer,
  TrendingUp,
  Star,
  Sparkles,
  Rocket,
  Crown,
  Medal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';
import { ResponsiveLayout, ResponsiveCard, useResponsiveDimensions } from '@/components/ui/ResponsiveLayout';
import { 
  SCREEN, 
  LAYOUT, 
  TOUCH,
  COMPONENT,
  TYPOGRAPHY,
  responsiveValue,
  useBreakpoint
} from '@/utils/responsive';

interface OnboardingData {
  name: string;
  age: string;
  height: string;
  weight: string;
  fitnessLevel: string;
  goals: string[];
  workoutDays: string[];
  preferredTime: string;
}

const OnboardingScreen: React.FC = () => {
  const { colors, theme } = useTheme();  const typography = getTypography(theme === 'dark');
  const dimensions = useResponsiveDimensions();
  const { width, height } = Dimensions.get('window');
  const breakpoint = useBreakpoint();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<OnboardingData>({
    name: '',
    age: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goals: [],
    workoutDays: [],
    preferredTime: '',
  });

  // Enhanced animation refs
  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Floating elements animations
  const particle1Anim = useRef(new Animated.Value(0)).current;
  const particle2Anim = useRef(new Animated.Value(0)).current;
  const particle3Anim = useRef(new Animated.Value(0)).current;
  const floatingIcon1 = useRef(new Animated.Value(0)).current;
  const floatingIcon2 = useRef(new Animated.Value(0)).current;
  
  // Achievement animations
  const achievementScale = useRef(new Animated.Value(0)).current;
  const achievementOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  const totalSteps = 6;

  React.useEffect(() => {
    // Start ambient animations
    startAmbientAnimations();
    
    // Trigger achievement for first step
    if (currentStep === 0) {
      triggerAchievement();
    }
  }, []);

  const startAmbientAnimations = () => {
    // Floating particles
    const particleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(particle1Anim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(particle1Anim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    
    // Floating icons
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingIcon1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingIcon1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    
    // Pulsing effect
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    particleAnimation.start();
    floatingAnimation.start();
    pulseAnimation.start();
  };

  const triggerAchievement = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(achievementScale, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(achievementOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(achievementScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(achievementOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  const animateStep = (direction: 'next' | 'prev') => {
    const toValue = direction === 'next' ? -dimensions.screenWidth : dimensions.screenWidth;
    
    // Enhanced transition with multiple animations
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(direction === 'next' ? dimensions.screenWidth : -dimensions.screenWidth);
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: currentStep + (direction === 'next' ? 1 : -1),
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      animateStep('next');
      setCurrentStep(currentStep + 1);
      Animated.timing(progressAnim, {
        toValue: (currentStep + 1) / totalSteps,
        duration: 500,
        useNativeDriver: false,
      }).start();
      
      // Trigger achievement for major milestones
      if ((currentStep + 1) % 2 === 0) {
        triggerAchievement();
      }
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      animateStep('prev');
      setCurrentStep(currentStep - 1);
      Animated.timing(progressAnim, {
        toValue: (currentStep - 1) / totalSteps,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };
  const completeOnboarding = () => {
    // Enhanced completion animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Alert.alert(
        '🎉 Welcome to Your Health Journey!',
        'Your profile has been set up successfully. Time to start achieving your goals!',
        [
          {
            text: 'Let\'s Get Started!',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    });
  };

  const updateUserData = (field: keyof OnboardingData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'goals' | 'workoutDays', item: string) => {
    const currentArray = userData[field];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateUserData(field, newArray);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return userData.name.trim().length > 0;
      case 1: return userData.age && userData.height && userData.weight;
      case 2: return userData.fitnessLevel;
      case 3: return userData.goals.length > 0;
      case 4: return userData.workoutDays.length > 0;
      case 5: return userData.preferredTime;
      default: return true;
    }
  };
  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        {/* Animated progress glow */}
        <Animated.View
          style={[
            styles.progressGlow,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              opacity: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
              }),
            },
          ]}
        />
      </View>
      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {totalSteps}
        </Text>
        <View style={styles.stepIndicators}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.stepDot,
                {
                  backgroundColor: index <= currentStep ? colors.primary : colors.border,
                  transform: [{
                    scale: index === currentStep ? pulseAnim : 1,
                  }],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepWrapper
            title="Let's Get Acquainted"
            subtitle="What should we call you?"
            icon={User}
          >
            <View style={styles.inputContainer}>
              <Input
                placeholder="Enter your full name"
                value={userData.name}
                onChangeText={(text) => updateUserData('name', text)}
                style={styles.input}
              />
            </View>
          </StepWrapper>
        );

      case 1:
        return (
          <StepWrapper
            title="Tell Us About Yourself"
            subtitle="Help us personalize your experience"
            icon={Calendar}
          >
            <View style={styles.inputContainer}>
              <Input
                placeholder="Age"
                value={userData.age}
                onChangeText={(text) => updateUserData('age', text)}
                keyboardType="numeric"
                style={styles.input}
              />
              <View style={styles.inputRow}>
                <Input
                  placeholder="Height (cm)"
                  value={userData.height}
                  onChangeText={(text) => updateUserData('height', text)}
                  keyboardType="numeric"
                  style={[styles.input, styles.halfInput]}
                />
                <Input
                  placeholder="Weight (kg)"
                  value={userData.weight}
                  onChangeText={(text) => updateUserData('weight', text)}
                  keyboardType="numeric"
                  style={[styles.input, styles.halfInput]}
                />
              </View>
            </View>
          </StepWrapper>
        );

      case 2:        return (
          <StepWrapper
            title="What's Your Fitness Level?"
            subtitle="This helps us recommend the right workouts"
            icon={Activity}
          >
            <View style={styles.optionsContainer}>
              {[
                { value: 'beginner', label: 'Beginner', subtitle: 'New to fitness', icon: Heart, gradient: ['#FF6B6B', '#FF8E8E'] },
                { value: 'intermediate', label: 'Intermediate', subtitle: 'Some experience', icon: Zap, gradient: ['#4ECDC4', '#7FDBDA'] },
                { value: 'advanced', label: 'Advanced', subtitle: 'Regular athlete', icon: Trophy, gradient: ['#45B7D1', '#6CC6E0'] },
              ].map((option) => {
                const isSelected = userData.fitnessLevel === option.value;
                const scaleAnim = useRef(new Animated.Value(1)).current;
                
                const handlePressIn = () => {
                  Animated.spring(scaleAnim, {
                    toValue: 0.96,
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
                
                return (
                  <Animated.View 
                    key={option.value}
                    style={{ transform: [{ scale: scaleAnim }] }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.optionCard,
                        isSelected && styles.selectedCard,
                      ]}
                      onPress={() => updateUserData('fitnessLevel', option.value)}
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                      activeOpacity={1}
                    >                      {isSelected && (
                        <LinearGradient
                          colors={option.gradient as any}
                          style={styles.optionCardGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        />
                      )}
                      <View style={[styles.optionIcon, isSelected && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                        <option.icon
                          size={28}
                          color={isSelected ? colors.surface : colors.primary}
                          strokeWidth={2.5}
                        />
                      </View>
                      <Text style={[
                        styles.optionLabel,
                        isSelected && styles.selectedLabel,
                      ]}>
                        {option.label}
                      </Text>
                      <Text style={[
                        styles.optionSubtitle,
                        isSelected && styles.selectedSubtitle,
                      ]}>
                        {option.subtitle}
                      </Text>
                      {isSelected && (
                        <Animated.View 
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            transform: [{ scale: pulseAnim }],
                          }}
                        >
                          <CheckCircle size={20} color={colors.surface} />
                        </Animated.View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </StepWrapper>
        );      case 3:
        return (
          <StepWrapper
            title="What Are Your Goals?"
            subtitle="Select all that apply - the more specific, the better!"
            icon={Target}
          >
            <View style={styles.optionsGrid}>
              {[
                { value: 'weight-loss', label: 'Weight Loss', icon: TrendingUp, gradient: ['#FF6B6B', '#FF8E8E'] },
                { value: 'muscle-gain', label: 'Muscle Gain', icon: Trophy, gradient: ['#4ECDC4', '#7FDBDA'] },
                { value: 'endurance', label: 'Endurance', icon: Heart, gradient: ['#45B7D1', '#6CC6E0'] },
                { value: 'strength', label: 'Strength', icon: Zap, gradient: ['#F7B731', '#F2C94C'] },
                { value: 'flexibility', label: 'Flexibility', icon: Activity, gradient: ['#A8E6CF', '#88D8A3'] },
                { value: 'general-fitness', label: 'Wellness', icon: Users, gradient: ['#D63384', '#F06292'] },
              ].map((goal) => {
                const isSelected = userData.goals.includes(goal.value);
                const scaleAnim = useRef(new Animated.Value(1)).current;
                const glowAnim = useRef(new Animated.Value(0)).current;
                
                React.useEffect(() => {
                  if (isSelected) {
                    Animated.timing(glowAnim, {
                      toValue: 1,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  } else {
                    Animated.timing(glowAnim, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  }
                }, [isSelected]);
                
                const handlePress = () => {
                  toggleArrayItem('goals', goal.value);
                  Animated.sequence([
                    Animated.timing(scaleAnim, {
                      toValue: 0.95,
                      duration: 100,
                      useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                      toValue: 1,
                      tension: 300,
                      friction: 10,
                      useNativeDriver: true,
                    }),
                  ]).start();
                };
                
                return (
                  <Animated.View 
                    key={goal.value}
                    style={{ 
                      transform: [{ scale: scaleAnim }],
                      opacity: fadeAnim,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.gridOption,
                        isSelected && styles.selectedGridOption,
                      ]}
                      onPress={handlePress}
                      activeOpacity={0.8}
                    >
                      {isSelected && (
                        <LinearGradient
                          colors={goal.gradient as any}
                          style={StyleSheet.absoluteFillObject}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        />
                      )}
                      <View style={[
                        styles.gridOptionIcon,
                        isSelected && styles.selectedGridOptionIcon,
                      ]}>
                        <goal.icon
                          size={24}
                          color={isSelected ? colors.surface : colors.primary}
                          strokeWidth={2.5}
                        />
                      </View>
                      <Text style={[
                        styles.gridOptionLabel,
                        isSelected && styles.selectedGridOptionLabel,
                      ]}>
                        {goal.label}
                      </Text>
                      {isSelected && (
                        <Animated.View 
                          style={[
                            styles.checkIcon,
                            { 
                              transform: [{ scale: glowAnim }],
                              opacity: glowAnim,
                            }
                          ]}
                        >
                          <CheckCircle size={18} color={colors.surface} />
                        </Animated.View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          </StepWrapper>
        );      case 4:
        return (
          <StepWrapper
            title="When Do You Want to Workout?"
            subtitle="Choose your preferred days - consistency is key!"
            icon={Calendar}
          >
            <View style={styles.daysContainer}>
              {[
                { short: 'Mon', full: 'Monday', emoji: '💪' },
                { short: 'Tue', full: 'Tuesday', emoji: '🔥' },
                { short: 'Wed', full: 'Wednesday', emoji: '⚡' },
                { short: 'Thu', full: 'Thursday', emoji: '🎯' },
                { short: 'Fri', full: 'Friday', emoji: '🚀' },
                { short: 'Sat', full: 'Saturday', emoji: '🏆' },
                { short: 'Sun', full: 'Sunday', emoji: '🌟' },
              ].map((day) => {
                const isSelected = userData.workoutDays.includes(day.short);
                const scaleAnim = useRef(new Animated.Value(1)).current;
                const pulseAnim = useRef(new Animated.Value(1)).current;
                
                React.useEffect(() => {
                  if (isSelected) {
                    const pulse = Animated.loop(
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
                    pulse.start();
                    return () => pulse.stop();
                  }
                }, [isSelected]);
                
                const handlePress = () => {
                  toggleArrayItem('workoutDays', day.short);
                  Animated.sequence([
                    Animated.timing(scaleAnim, {
                      toValue: 0.9,
                      duration: 100,
                      useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                      toValue: 1,
                      tension: 300,
                      friction: 8,
                      useNativeDriver: true,
                    }),
                  ]).start();
                };
                
                return (
                  <Animated.View 
                    key={day.short}
                    style={{ 
                      transform: [
                        { scale: Animated.multiply(scaleAnim, isSelected ? pulseAnim : 1) }
                      ] 
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.dayOption,
                        isSelected && styles.selectedDay,
                      ]}
                      onPress={handlePress}
                      activeOpacity={0.7}
                    >
                      <Text style={{ fontSize: 16, marginBottom: 2 }}>
                        {isSelected ? day.emoji : '📅'}
                      </Text>
                      <Text style={[
                        styles.dayLabel,
                        isSelected && styles.selectedDayLabel,
                      ]}>
                        {day.short}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
            {userData.workoutDays.length > 0 && (
              <Animated.View style={{ 
                marginTop: LAYOUT.getPadding(24),
                opacity: fadeAnim,
                transform: [{ translateY: 10 }],
              }}>
                <Text style={{
                  ...typography.caption,
                  color: colors.success,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                  Great! {userData.workoutDays.length} days selected 🎉
                </Text>
              </Animated.View>
            )}
          </StepWrapper>
        );      case 5:
        return (
          <StepWrapper
            title="Perfect Timing!"
            subtitle="When do you feel most energetic for workouts?"
            icon={Timer}
          >
            <View style={styles.optionsContainer}>
              {[
                { 
                  value: 'morning', 
                  label: 'Early Bird', 
                  subtitle: '6:00 AM - 11:00 AM',
                  emoji: '🌅',
                  benefit: 'Boost metabolism all day',
                  gradient: ['#FF9A8B', '#A8E6CF']
                },
                { 
                  value: 'afternoon', 
                  label: 'Midday Warrior', 
                  subtitle: '12:00 PM - 5:00 PM',
                  emoji: '☀️',
                  benefit: 'Peak energy levels',
                  gradient: ['#FFD93D', '#FF9A8B']
                },
                { 
                  value: 'evening', 
                  label: 'Night Owl', 
                  subtitle: '6:00 PM - 10:00 PM',
                  emoji: '🌙',
                  benefit: 'Stress relief & better sleep',
                  gradient: ['#A8E6CF', '#88D8A3']
                },
              ].map((time) => {
                const isSelected = userData.preferredTime === time.value;
                const scaleAnim = useRef(new Animated.Value(1)).current;
                const glowAnim = useRef(new Animated.Value(0)).current;
                
                React.useEffect(() => {
                  if (isSelected) {
                    Animated.timing(glowAnim, {
                      toValue: 1,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  } else {
                    Animated.timing(glowAnim, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  }
                }, [isSelected]);
                
                const handlePress = () => {
                  updateUserData('preferredTime', time.value);
                  Animated.sequence([
                    Animated.timing(scaleAnim, {
                      toValue: 0.96,
                      duration: 100,
                      useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                      toValue: 1,
                      tension: 300,
                      friction: 10,
                      useNativeDriver: true,
                    }),
                  ]).start();
                };
                
                return (
                  <Animated.View
                    key={time.value}
                    style={{ transform: [{ scale: scaleAnim }] }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.timeOption,
                        isSelected && styles.selectedTimeOption,
                      ]}
                      onPress={handlePress}
                      activeOpacity={0.8}
                    >
                      {isSelected && (
                        <LinearGradient
                          colors={time.gradient as any}
                          style={StyleSheet.absoluteFillObject}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        />
                      )}
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: LAYOUT.getPadding(8) }}>
                        <Text style={{ fontSize: responsiveValue({xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 30, xxxl: 32, default: 24}), marginRight: LAYOUT.getPadding(8) }}>
                          {time.emoji}
                        </Text>
                        <View style={{ flex: 1 }}>
                          <Text style={[
                            styles.timeLabel,
                            isSelected && styles.selectedTimeLabel,
                          ]}>
                            {time.label}
                          </Text>
                          <Text style={[
                            styles.timeSubtitle,
                            isSelected && styles.selectedTimeSubtitle,
                          ]}>
                            {time.subtitle}
                          </Text>
                        </View>
                        {isSelected && (
                          <Animated.View style={{ opacity: glowAnim }}>
                            <Medal size={20} color={isSelected ? colors.surface : colors.primary} />
                          </Animated.View>
                        )}
                      </View>
                      {isSelected && (
                        <Animated.View style={{ opacity: glowAnim }}>
                          <Text style={{
                            ...typography.caption,
                            color: colors.surface + '90',
                            fontStyle: 'italic',
                            textAlign: 'center',
                          }}>
                            ✨ {time.benefit}
                          </Text>
                        </Animated.View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
            {userData.preferredTime && (
              <Animated.View style={{ 
                marginTop: LAYOUT.getPadding(32),
                opacity: fadeAnim,
                alignItems: 'center',
              }}>
                <View style={{
                  backgroundColor: colors.success + '20',                  borderRadius: LAYOUT.getBorderRadius(16),
                  padding: LAYOUT.getPadding(12),
                  alignItems: 'center',
                }}>
                  <Rocket size={24} color={colors.success} />
                  <Text style={{
                    ...typography.bodyMedium,
                    color: colors.success,
                    fontWeight: '600',
                    marginTop: LAYOUT.getPadding(4),
                  }}>
                    Ready to start your journey! 🚀
                  </Text>
                </View>
              </Animated.View>
            )}
          </StepWrapper>
        );

      default:
        return null;
    }
  };  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradient: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: LAYOUT.getContentPadding(),
      position: 'relative',
    },
    // Floating background elements
    floatingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
    },
    floatingParticle: {
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.primary + '60',
    },
    floatingIcon: {
      position: 'absolute',
      width: responsiveValue({
        xs: 32, sm: 36, md: 40, lg: 44, xl: 48, xxl: 52, xxxl: 56, default: 40
      }),
      height: responsiveValue({
        xs: 32, sm: 36, md: 40, lg: 44, xl: 48, xxl: 52, xxxl: 56, default: 40
      }),
      borderRadius: responsiveValue({
        xs: 16, sm: 18, md: 20, lg: 22, xl: 24, xxl: 26, xxxl: 28, default: 20
      }),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary + '15',
    },
    // Enhanced progress bar
    progressContainer: {
      marginTop: LAYOUT.getPadding(12),
      marginBottom: LAYOUT.getPadding(32),
    },
    progressBar: {
      height: responsiveValue({
        xs: 4, sm: 5, md: 6, lg: 7, xl: 8, xxl: 9, xxxl: 10, default: 6
      }),
      backgroundColor: colors.border,
      borderRadius: 3,
      overflow: 'hidden',
      position: 'relative',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    progressGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 4,
    },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: LAYOUT.getPadding(8),
    },
    progressText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      fontWeight: '600',
    },
    stepIndicators: {
      flexDirection: 'row',
      gap: LAYOUT.getPadding(4),
    },
    stepDot: {
      width: responsiveValue({
        xs: 6, sm: 7, md: 8, lg: 9, xl: 10, xxl: 11, xxxl: 12, default: 8
      }),
      height: responsiveValue({
        xs: 6, sm: 7, md: 8, lg: 9, xl: 10, xxl: 11, xxxl: 12, default: 8
      }),
      borderRadius: 4,
    },    // Achievement overlay
    achievementOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
    },
    achievementCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(24),
      padding: LAYOUT.getPadding(32),
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
      borderWidth: 2,
      borderColor: colors.primary + '30',
    },
    achievementIcon: {
      marginBottom: LAYOUT.getPadding(12),
    },
    achievementTitle: {
      fontSize: TYPOGRAPHY.getHeaderSize(3),
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: LAYOUT.getPadding(8),
      textAlign: 'center',
    },
    achievementSubtitle: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.textSecondary,
      textAlign: 'center',
    },
    confetti: {
      position: 'absolute',
      width: 8,
      height: 8,
      backgroundColor: colors.primary,
    },    stepContainer: {
      flex: 1,
      transform: [{ translateX: slideAnim }],
    },
    stepHeader: {
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(32),
      position: 'relative',
    },
    stepIconContainer: {
      position: 'relative',
      marginBottom: LAYOUT.getMargin(24),
    },
    stepIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 3,
      borderColor: colors.primary + '30',
    },
    stepIconGlow: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary + '10',      top: -10,
      left: -10,
    },
    stepTitle: {
      ...typography.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: LAYOUT.getMargin(8),
      fontWeight: 'bold',
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    stepSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    inputContainer: {
      marginBottom: LAYOUT.getMargin(32),
    },
    input: {
      marginBottom: LAYOUT.getMargin(16),      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: LAYOUT.getBorderRadius(12),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    inputRow: {
      flexDirection: 'row',
      gap: LAYOUT.getMargin(16),
    },
    halfInput: {
      flex: 1,
    },    optionsContainer: {
      gap: LAYOUT.getMargin(16),
    },
    optionCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(24),
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      position: 'relative',
      overflow: 'hidden',
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
    },
    optionCardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    optionIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',      marginBottom: LAYOUT.getMargin(8),
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    optionLabel: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: LAYOUT.getMargin(4),
      fontWeight: '600',
    },
    selectedLabel: {
      color: colors.surface,
    },
    optionSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    selectedSubtitle: {
      color: colors.surface + '80',
    },    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: LAYOUT.getMargin(16),
      justifyContent: 'space-between',
    },
    gridOption: {
      width: (width - LAYOUT.getPadding(24) * 2 - LAYOUT.getMargin(16)) / 2,
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(24),
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      position: 'relative',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      minHeight: 120,
      justifyContent: 'center',
    },
    selectedGridOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
    },
    gridOptionIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    selectedGridOptionIcon: {
      backgroundColor: colors.surface + '20',
    },
    gridOptionLabel: {
      ...typography.bodySmall,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    selectedGridOptionLabel: {
      color: colors.surface,
    },
    checkIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
    },    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: LAYOUT.getMargin(8),
      justifyContent: 'center',
    },
    dayOption: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    selectedDay: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
    },
    dayLabel: {
      ...typography.bodySmall,
      color: colors.text,
      fontWeight: '600',
    },
    selectedDayLabel: {
      color: colors.surface,
    },    timeOption: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(20),
      padding: LAYOUT.getPadding(24),
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    selectedTimeOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
      shadowColor: colors.primary,
      shadowOpacity: 0.3,
    },    timeLabel: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: LAYOUT.getMargin(4),
      fontWeight: '600',
    },
    selectedTimeLabel: {
      color: colors.primary,
    },
    timeSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    selectedTimeSubtitle: {
      color: colors.primary + '80',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: LAYOUT.getPadding(24),
      position: 'relative',
    },
    backButton: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(20),
      paddingHorizontal: LAYOUT.getPadding(24),
      paddingVertical: LAYOUT.getPadding(16),
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    backButtonText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },    nextButton: {
      paddingHorizontal: LAYOUT.getPadding(32),
      paddingVertical: LAYOUT.getPadding(16),
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    skipButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    skipButtonText: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          colors.background,
          colors.primaryLight + '10', 
          colors.background,
          colors.primary + '05'
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Floating Background Elements */}
        <View style={styles.floatingContainer}>
          {/* Floating Particles */}
          <Animated.View
            style={[
              styles.floatingParticle,
              {
                top: height * 0.2,
                left: width * 0.15,
                opacity: particle1Anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.8, 0],
                }),
                transform: [{
                  translateY: particle1Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                }],
              },
            ]}
          />
          
          {/* Floating Icons */}
          <Animated.View
            style={[
              styles.floatingIcon,
              {
                top: height * 0.15,
                right: width * 0.1,
                opacity: floatingIcon1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
                transform: [{
                  translateY: floatingIcon1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                }, {
                  rotate: floatingIcon1.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '5deg'],
                  }),
                }],
              },
            ]}
          >
            <Sparkles size={20} color={colors.primary} />
          </Animated.View>
          
          <Animated.View
            style={[
              styles.floatingIcon,
              {
                bottom: height * 0.2,
                left: width * 0.08,
                opacity: floatingIcon2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 0.8],
                }),
              },
            ]}
          >
            <Star size={18} color={colors.success} />
          </Animated.View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderProgressBar()}
            
            <Animated.View 
              style={[
                styles.stepContainer,
                {
                  transform: [
                    { translateX: slideAnim },
                    { scale: scaleAnim },
                  ],
                  opacity: fadeAnim,
                }
              ]}
            >
              {renderStep()}
            </Animated.View>

            <View style={styles.navigationContainer}>
              {currentStep > 0 ? (
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity onPress={prevStep} style={styles.backButton}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <ChevronLeft size={18} color={colors.text} />                      <Text style={[styles.backButtonText, { marginLeft: LAYOUT.getMargin(4) }]}>
                        Back
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <TouchableOpacity
                  onPress={() => router.replace('/(tabs)')}
                  style={[styles.backButton, styles.skipButton]}
                >
                  <Text style={[styles.backButtonText, styles.skipButtonText]}>
                    Skip
                  </Text>
                </TouchableOpacity>
              )}

              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <GradientButton
                  title={currentStep === totalSteps - 1 ? '🚀 Complete' : 'Next'}
                  onPress={nextStep}
                  disabled={!canProceed()}
                  style={[
                    styles.nextButton,
                    { opacity: canProceed() ? 1 : 0.5 }
                  ]}
                  gradient="primary"
                />
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Achievement Overlay */}
        <Animated.View 
          style={[
            styles.achievementOverlay,
            {
              opacity: achievementOpacity,
              transform: [{ scale: achievementScale }],
            }
          ]}
          pointerEvents="none"
        >
          <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
          <Animated.View style={[styles.achievementCard, { transform: [{ scale: achievementScale }] }]}>
            <View style={styles.achievementIcon}>
              <Crown size={40} color={colors.primary} />
            </View>
            <Text style={styles.achievementTitle}>
              Great Progress! 🎉
            </Text>
            <Text style={styles.achievementSubtitle}>
              You're building an amazing fitness journey
            </Text>
          </Animated.View>
          
          {/* Confetti Effect */}
          {Array.from({ length: 20 }, (_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.confetti,
                {
                  left: (index * 40) % width,
                  top: (index * 30) % height,
                  opacity: confettiAnim,
                  transform: [{
                    translateY: confettiAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  }],
                },
              ]}
            />
          ))}
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

interface StepWrapperProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ title, subtitle, icon: Icon, children }) => {
  const { colors } = useTheme();
  const typography = getTypography(colors.text === '#000000' ? false : true);
  
  const iconScaleAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(30)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(iconScaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(titleSlideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(contentFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    stepContainer: {
      flex: 1,
    },    stepHeader: {
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(32),
      position: 'relative',
    },
    stepIconContainer: {
      position: 'relative',
      marginBottom: LAYOUT.getMargin(24),
    },
    stepIconGlow: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary + '10',
      top: -10,
      left: -10,
    },
    stepIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 3,
      borderColor: colors.primary + '30',
    },    stepTitle: {
      ...typography.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: LAYOUT.getMargin(8),
      fontWeight: 'bold',
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    stepSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIconContainer}>
          <Animated.View style={[styles.stepIconGlow, { opacity: iconScaleAnim }]} />
          <Animated.View 
            style={[
              styles.stepIcon,
              { 
                transform: [{ scale: iconScaleAnim }] 
              }
            ]}
          >
            <Icon size={36} color={colors.primary} strokeWidth={2.5} />
          </Animated.View>
        </View>
        <Animated.View style={{ transform: [{ translateY: titleSlideAnim }] }}>
          <Text style={styles.stepTitle}>{title}</Text>
          <Text style={styles.stepSubtitle}>{subtitle}</Text>
        </Animated.View>
      </View>
      <Animated.View style={{ opacity: contentFadeAnim }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;
