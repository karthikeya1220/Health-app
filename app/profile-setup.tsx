import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Upload, User, Target, Calendar, MapPin, Edit } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function ProfileSetupScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    dateOfBirth: '',
    location: '',
    fitnessGoal: '',
    profileImage: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const fitnessGoals = [
    { id: 'weight_loss', label: 'Weight Loss', icon: '🔥' },
    { id: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'endurance', label: 'Endurance', icon: '🏃' },
    { id: 'flexibility', label: 'Flexibility', icon: '🧘' },
    { id: 'general_health', label: 'General Health', icon: '❤️' },
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Profile Setup Complete!', 'Welcome to your fitness journey!', [
        { text: 'Get Started', onPress: () => router.replace('/(tabs)') }
      ]);
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: Spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    progressDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 4,
    },
    progressDotActive: {
      backgroundColor: colors.primary,
    },
    progressDotInactive: {
      backgroundColor: colors.border,
    },
    title: {
      ...typography.h1,
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.md,
      fontWeight: 'bold',
    },
    subtitle: {
      ...typography.body,
      textAlign: 'center',
      color: colors.textSecondary,
      marginBottom: Spacing.xl,
    },
    stepContainer: {
      flex: 1,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    profileImageWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.md,
      borderWidth: 3,
      borderColor: colors.primary,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 57,
    },
    uploadButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    uploadButtonText: {
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    inputContainer: {
      marginBottom: Spacing.xl,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.md,
      paddingHorizontal: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputIcon: {
      marginRight: Spacing.sm,
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
      ...typography.body,
      color: colors.text,
    },
    goalContainer: {
      marginBottom: Spacing.xl,
    },
    goalGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.md,
      justifyContent: 'space-between',
    },
    goalCard: {
      width: '48%',
      backgroundColor: colors.surface,
      padding: Spacing.lg,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    goalCardActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    goalIcon: {
      fontSize: 32,
      marginBottom: Spacing.sm,
    },
    goalText: {
      ...typography.body,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginTop: 'auto',
      paddingTop: Spacing.xl,
    },
    button: {
      flex: 1,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      ...typography.body,
      fontWeight: '600',
    },
    primaryButtonText: {
      color: colors.surface,
    },
    secondaryButtonText: {
      color: colors.text,
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View 
            style={[
              styles.stepContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.title}>Set Up Your Profile</Text>
            <Text style={styles.subtitle}>Add a photo and tell us about yourself</Text>

            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageWrapper}>
                {profileData.profileImage ? (
                  <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
                ) : (
                  <User size={50} color={colors.textSecondary} />
                )}
              </View>
              <TouchableOpacity style={styles.uploadButton}>
                <Camera size={20} color={colors.surface} />
                <Text style={styles.uploadButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <Input
                  placeholder="Display name"
                  value={profileData.displayName}
                  onChangeText={(text) => setProfileData({...profileData, displayName: text})}
                  style={styles.input}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Edit size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <Input
                  placeholder="Bio (optional)"
                  value={profileData.bio}
                  onChangeText={(text) => setProfileData({...profileData, bio: text})}
                  style={styles.input}
                  placeholderTextColor={colors.textSecondary}
                  multiline
                />
              </View>
            </View>
          </Animated.View>
        );

      case 1:
        return (
          <Animated.View 
            style={[
              styles.stepContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.title}>Personal Information</Text>
            <Text style={styles.subtitle}>Help us personalize your experience</Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Calendar size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <Input
                  placeholder="Date of Birth (MM/DD/YYYY)"
                  value={profileData.dateOfBirth}
                  onChangeText={(text) => setProfileData({...profileData, dateOfBirth: text})}
                  style={styles.input}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MapPin size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <Input
                  placeholder="Location (City, State)"
                  value={profileData.location}
                  onChangeText={(text) => setProfileData({...profileData, location: text})}
                  style={styles.input}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View 
            style={[
              styles.stepContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.title}>Fitness Goals</Text>
            <Text style={styles.subtitle}>What do you want to achieve?</Text>

            <View style={styles.goalContainer}>
              <View style={styles.goalGrid}>
                {fitnessGoals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    style={[
                      styles.goalCard,
                      profileData.fitnessGoal === goal.id && styles.goalCardActive
                    ]}
                    onPress={() => setProfileData({...profileData, fitnessGoal: goal.id})}
                  >
                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                    <Text style={styles.goalText}>{goal.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primaryLight, colors.background]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              {[0, 1, 2].map((step) => (
                <View
                  key={step}
                  style={[
                    styles.progressDot,
                    step <= currentStep ? styles.progressDotActive : styles.progressDotInactive
                  ]}
                />
              ))}
            </View>
          </View>

          {renderStep()}

          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleNext}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                {currentStep === 2 ? (isLoading ? 'Completing...' : 'Complete Setup') : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
