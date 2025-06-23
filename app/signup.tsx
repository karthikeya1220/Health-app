import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Input } from '@/components/ui/Input';
import { GradientButton } from '@/components/ui/GradientButton';
import { router } from 'expo-router';
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

export default function SignupScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const { isMobile, isCompact, contentPadding } = useResponsiveDimensions();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/profile-setup' as any) }
      ]);
    }, 1500);
  };  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: contentPadding,
      paddingTop: LAYOUT.getPadding(16),
      paddingBottom: LAYOUT.getPadding(20),
    },
    backButton: {
      width: TOUCH.getTouchSize(40),
      height: TOUCH.getTouchSize(40),
      borderRadius: TOUCH.getTouchSize(40) / 2,
      backgroundColor: colors.surface + 'CC',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    topHeaderTitle: {
      color: colors.text,
      fontWeight: '600',
      fontSize: TYPOGRAPHY.getHeaderSize(3),
    },
    gradient: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
    },
    header: {
      alignItems: 'center',
      marginBottom: LAYOUT.getPadding(32),
    },
    title: {
      color: colors.text,
      textAlign: 'center',
      marginBottom: LAYOUT.getPadding(12),
      fontWeight: 'bold',
      fontSize: TYPOGRAPHY.getHeaderSize(1),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getHeaderSize(1)),
    },
    subtitle: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
    },
    signupCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: responsiveValue({
        xs: LAYOUT.getPadding(20),
        sm: LAYOUT.getPadding(24),
        md: LAYOUT.getPadding(28),
        default: LAYOUT.getPadding(24)
      }),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: responsiveValue({ xs: 2, sm: 4, default: 4 }) },
      shadowOpacity: responsiveValue({ xs: 0.08, sm: 0.1, default: 0.1 }),
      shadowRadius: responsiveValue({ xs: 4, sm: 8, default: 8 }),
      elevation: responsiveValue({ xs: 2, sm: 4, default: 4 }),
      marginBottom: LAYOUT.getPadding(24),
      maxWidth: COMPONENT.card.maxWidth,
      alignSelf: 'center',
      width: '100%',
    },
    inputContainer: {
      marginBottom: LAYOUT.getPadding(24),
    },
    inputRow: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: LAYOUT.getPadding(16),
      marginBottom: LAYOUT.getPadding(16),
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: LAYOUT.getBorderRadius(12),
      marginBottom: LAYOUT.getPadding(16),
      paddingHorizontal: LAYOUT.getPadding(16),
      borderWidth: 1,
      borderColor: colors.border,
      minHeight: COMPONENT.input.md,
    },
    inputIcon: {
      marginRight: LAYOUT.getPadding(12),
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
      paddingVertical: isCompact ? LAYOUT.getPadding(8) : LAYOUT.getPadding(12),
    },
    eyeButton: {
      backgroundColor: 'transparent',
      padding: LAYOUT.getPadding(8),
      minHeight: TOUCH.minTarget,
      width: TOUCH.minTarget,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
    },
    signupButton: {
      marginBottom: LAYOUT.getPadding(20),
      backgroundColor: colors.primary,
      borderRadius: LAYOUT.getBorderRadius(12),
      paddingVertical: LAYOUT.getPadding(16),
      minHeight: COMPONENT.button.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupButtonText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      textAlign: 'center',
      color: colors.surface,
      fontWeight: '600',
    },
    footer: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: LAYOUT.getPadding(20),
      gap: isMobile ? LAYOUT.getPadding(8) : 0,
    },
    footerText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.textSecondary,
    },
    loginButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: LAYOUT.getPadding(8),
      minHeight: TOUCH.minTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButtonText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.primary,
      fontWeight: '600',
    },
    termsText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: LAYOUT.getPadding(16),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize(), 1.5),
    },
    linkText: {
      color: colors.primary,
      fontWeight: '600',
    },
  });  return (
    <LinearGradient
      colors={[colors.primary + '20', colors.background, colors.surface + '80']}
      style={styles.container}
    >
      <ResponsiveLayout safeArea={true} scrollable={false} padding={false}>
        <Animated.View style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }],
          flex: 1 
        }}>
          {/* Header with Back Button */}
          <View style={styles.topHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeft size={responsiveValue({ xs: 20, sm: 24, default: 24 })} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.topHeaderTitle}>Sign Up</Text>
            <View style={{ width: TOUCH.getTouchSize(40) }} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join our fitness community today</Text>
              </View>

            <ResponsiveCard padding={false} style={styles.signupCard}>
              <View style={styles.inputContainer}>
                {/* Name Row */}
                <View style={styles.inputRow}>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <User size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChangeText={(text) => setFormData({...formData, firstName: text})}
                      style={styles.input}
                      placeholderTextColor={colors.textSecondary}
                    />
                  </View>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <User size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                    <Input
                      placeholder="Last name"
                      value={formData.lastName}
                      onChangeText={(text) => setFormData({...formData, lastName: text})}
                      style={styles.input}
                      placeholderTextColor={colors.textSecondary}
                    />
                  </View>
                </View>

                {/* Email */}
                <View style={styles.inputWrapper}>
                  <Mail size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Email address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                {/* Phone */}
                <View style={styles.inputWrapper}>
                  <Phone size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Phone number (optional)"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({...formData, phone: text})}
                    keyboardType="phone-pad"
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                  <Lock size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    {showPassword ? (
                      <EyeOff size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} />
                    ) : (
                      <Eye size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputWrapper}>
                  <Lock size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                    secureTextEntry={!showConfirmPassword}
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} />
                    ) : (
                      <Eye size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>              

              <TouchableOpacity
                onPress={handleSignup}
                disabled={isLoading}
                style={[styles.signupButton, { opacity: isLoading ? 0.7 : 1 }]}
                activeOpacity={0.8}
              >
                <Text style={styles.signupButtonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                By creating an account, you agree to our{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </ResponsiveCard>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.loginButton}
                activeOpacity={0.7}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        </Animated.View>
      </ResponsiveLayout>
    </LinearGradient>
  );
}
