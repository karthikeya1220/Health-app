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
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
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
  TrendingUp
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';

const { width, height } = Dimensions.get('window');

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
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
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

  const slideAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const totalSteps = 6;

  const animateStep = (direction: 'next' | 'prev') => {
    const toValue = direction === 'next' ? -width : width;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(direction === 'next' ? width : -width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      animateStep('next');
      setCurrentStep(currentStep + 1);
      Animated.timing(progressAnim, {
        toValue: (currentStep + 1) / totalSteps,
        duration: 300,
        useNativeDriver: false,
      }).start();
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
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const completeOnboarding = () => {
    // Here you would typically save the user data
    console.log('Onboarding data:', userData);
    Alert.alert(
      'Welcome to Your Health Journey!',
      'Your profile has been set up successfully.',
      [
        {
          text: 'Get Started',
          onPress: () => router.replace('/(tabs)'),
        },
      ]
    );
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
      </View>
      <Text style={styles.progressText}>
        {currentStep + 1} of {totalSteps}
      </Text>
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

      case 2:
        return (
          <StepWrapper
            title="What's Your Fitness Level?"
            subtitle="This helps us recommend the right workouts"
            icon={Activity}
          >
            <View style={styles.optionsContainer}>
              {[
                { value: 'beginner', label: 'Beginner', subtitle: 'New to fitness', icon: Heart },
                { value: 'intermediate', label: 'Intermediate', subtitle: 'Some experience', icon: Zap },
                { value: 'advanced', label: 'Advanced', subtitle: 'Regular athlete', icon: Trophy },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    userData.fitnessLevel === option.value && styles.selectedCard,
                  ]}
                  onPress={() => updateUserData('fitnessLevel', option.value)}
                >
                  <View style={styles.optionIcon}>
                    <option.icon
                      size={24}
                      color={userData.fitnessLevel === option.value ? colors.surface : colors.primary}
                    />
                  </View>
                  <Text style={[
                    styles.optionLabel,
                    userData.fitnessLevel === option.value && styles.selectedLabel,
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.optionSubtitle,
                    userData.fitnessLevel === option.value && styles.selectedSubtitle,
                  ]}>
                    {option.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper
            title="What Are Your Goals?"
            subtitle="Select all that apply"
            icon={Target}
          >
            <View style={styles.optionsGrid}>
              {[
                { value: 'weight-loss', label: 'Weight Loss', icon: TrendingUp },
                { value: 'muscle-gain', label: 'Muscle Gain', icon: Trophy },
                { value: 'endurance', label: 'Endurance', icon: Heart },
                { value: 'strength', label: 'Strength', icon: Zap },
                { value: 'flexibility', label: 'Flexibility', icon: Activity },
                { value: 'general-fitness', label: 'General Fitness', icon: Users },
              ].map((goal) => (
                <TouchableOpacity
                  key={goal.value}
                  style={[
                    styles.gridOption,
                    userData.goals.includes(goal.value) && styles.selectedGridOption,
                  ]}
                  onPress={() => toggleArrayItem('goals', goal.value)}
                >
                  <View style={[
                    styles.gridOptionIcon,
                    userData.goals.includes(goal.value) && styles.selectedGridOptionIcon,
                  ]}>
                    <goal.icon
                      size={20}
                      color={userData.goals.includes(goal.value) ? colors.surface : colors.primary}
                    />
                  </View>
                  <Text style={[
                    styles.gridOptionLabel,
                    userData.goals.includes(goal.value) && styles.selectedGridOptionLabel,
                  ]}>
                    {goal.label}
                  </Text>
                  {userData.goals.includes(goal.value) && (
                    <CheckCircle size={16} color={colors.success} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </StepWrapper>
        );

      case 4:
        return (
          <StepWrapper
            title="When Do You Want to Workout?"
            subtitle="Choose your preferred days"
            icon={Calendar}
          >
            <View style={styles.daysContainer}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayOption,
                    userData.workoutDays.includes(day) && styles.selectedDay,
                  ]}
                  onPress={() => toggleArrayItem('workoutDays', day)}
                >
                  <Text style={[
                    styles.dayLabel,
                    userData.workoutDays.includes(day) && styles.selectedDayLabel,
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </StepWrapper>
        );

      case 5:
        return (
          <StepWrapper
            title="Preferred Workout Time"
            subtitle="When do you feel most energetic?"
            icon={Timer}
          >
            <View style={styles.optionsContainer}>
              {[
                { value: 'morning', label: 'Morning', subtitle: '6:00 AM - 11:00 AM' },
                { value: 'afternoon', label: 'Afternoon', subtitle: '12:00 PM - 5:00 PM' },
                { value: 'evening', label: 'Evening', subtitle: '6:00 PM - 10:00 PM' },
              ].map((time) => (
                <TouchableOpacity
                  key={time.value}
                  style={[
                    styles.timeOption,
                    userData.preferredTime === time.value && styles.selectedTimeOption,
                  ]}
                  onPress={() => updateUserData('preferredTime', time.value)}
                >
                  <Text style={[
                    styles.timeLabel,
                    userData.preferredTime === time.value && styles.selectedTimeLabel,
                  ]}>
                    {time.label}
                  </Text>
                  <Text style={[
                    styles.timeSubtitle,
                    userData.preferredTime === time.value && styles.selectedTimeSubtitle,
                  ]}>
                    {time.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </StepWrapper>
        );

      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
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
      padding: Spacing.lg,
    },
    progressContainer: {
      marginTop: Spacing.md,
      marginBottom: Spacing.xl,
    },
    progressBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    progressText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.sm,
    },
    stepContainer: {
      flex: 1,
      transform: [{ translateX: slideAnim }],
    },
    stepHeader: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    stepIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    stepTitle: {
      ...typography.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    stepSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: Spacing.xl,
    },
    input: {
      marginBottom: Spacing.md,
    },
    inputRow: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    halfInput: {
      flex: 1,
    },
    optionsContainer: {
      gap: Spacing.md,
    },
    optionCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    optionLabel: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: Spacing.xs,
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
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
      justifyContent: 'space-between',
    },
    gridOption: {
      width: (width - Spacing.lg * 2 - Spacing.md) / 2,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      position: 'relative',
    },
    selectedGridOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    gridOptionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    selectedGridOptionIcon: {
      backgroundColor: colors.surface + '20',
    },
    gridOptionLabel: {
      ...typography.bodySmall,
      color: colors.text,
      textAlign: 'center',
    },
    selectedGridOptionLabel: {
      color: colors.surface,
    },
    checkIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      justifyContent: 'center',
    },
    dayOption: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedDay: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    dayLabel: {
      ...typography.bodySmall,
      color: colors.text,
      fontWeight: '600',
    },
    selectedDayLabel: {
      color: colors.surface,
    },
    timeOption: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 2,
      borderColor: colors.border,
    },
    selectedTimeOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    timeLabel: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: Spacing.xs,
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
      paddingTop: Spacing.lg,
    },
    backButton: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    backButtonText: {
      ...typography.body,
      color: colors.text,
    },
    nextButton: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
    },
    skipButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    skipButtonText: {
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primaryLight, colors.background]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderProgressBar()}
            
            <Animated.View style={styles.stepContainer}>
              {renderStep()}
            </Animated.View>

            <View style={styles.navigationContainer}>
              {currentStep > 0 ? (
                <TouchableOpacity onPress={prevStep} style={styles.backButton}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ArrowLeft size={16} color={colors.text} />
                    <Text style={[styles.backButtonText, { marginLeft: Spacing.xs }]}>
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
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

              <GradientButton
                title={currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
                onPress={nextStep}
                disabled={!canProceed()}
                style={[
                  styles.nextButton,
                  { opacity: canProceed() ? 1 : 0.5 }
                ]}
                gradient="primary"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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

  const styles = StyleSheet.create({
    stepContainer: {
      flex: 1,
    },
    stepHeader: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    stepIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    stepTitle: {
      ...typography.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    stepSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepIcon}>
          <Icon size={32} color={colors.primary} />
        </View>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepSubtitle}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
};

export default OnboardingScreen;
