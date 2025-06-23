import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
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

export default function LoginScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const { isMobile, isCompact, contentPadding } = useResponsiveDimensions();
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll assume new users need onboarding
      // In a real app, you'd check if this is a new user from your backend
      const isNewUser = email.includes('new') || email.includes('first'); // Simple demo logic
      
      if (isNewUser) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    }, 1500);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      paddingVertical: LAYOUT.getPadding(24),
    },
    header: {
      alignItems: 'center',
      marginBottom: responsiveValue({
        xs: LAYOUT.getPadding(32),
        sm: LAYOUT.getPadding(40),
        md: LAYOUT.getPadding(48),
        lg: LAYOUT.getPadding(56),
        default: LAYOUT.getPadding(48)
      }),
    },    
    title: {
      fontSize: TYPOGRAPHY.getHeaderSize(1),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getHeaderSize(1)),
      color: colors.text,
      textAlign: 'center',
      marginBottom: LAYOUT.getPadding(16),
      fontWeight: '700',
    },
    subtitle: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    loginCard: {
      marginBottom: LAYOUT.getPadding(24),
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
      maxWidth: COMPONENT.card.maxWidth,
      alignSelf: 'center',
      width: '100%',
    },
    inputContainer: {
      marginBottom: LAYOUT.getPadding(24),
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
    loginButton: {
      marginBottom: LAYOUT.getPadding(20),
      backgroundColor: colors.primary,
      borderRadius: LAYOUT.getBorderRadius(12),
      paddingVertical: LAYOUT.getPadding(16),
      minHeight: COMPONENT.button.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButtonText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      fontWeight: '600',
      textAlign: 'center',
      color: colors.surface,
    },
    footer: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? LAYOUT.getPadding(8) : 0,
    },
    footerText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.text,
    },
    signUpButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: LAYOUT.getPadding(8),
      minHeight: TOUCH.minTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },    
    signUpButtonText: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      color: colors.primary,
      fontWeight: '600',
    },    demoInfo: {
      alignItems: 'center',
      marginTop: LAYOUT.getPadding(20),
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(16),
      maxWidth: COMPONENT.card.maxWidth,
      alignSelf: 'center',
      width: '100%',
    },
    demoText: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize()),
    },
  });
  return (
    <ResponsiveLayout safeArea={true} scrollable={false} padding={false}>
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
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>
            </View>

            <ResponsiveCard padding={false} style={styles.loginCard}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Mail size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Lock size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.textSecondary} style={styles.inputIcon} />
                  <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
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
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                style={[
                  styles.loginButton,
                  { opacity: isLoading ? 0.7 : 1 }
                ]}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>                
                <TouchableOpacity
                  onPress={() => router.push('/signup')}
                  style={styles.signUpButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </ResponsiveCard>            

            <ResponsiveCard padding={false} style={styles.demoInfo}>
              <Text style={styles.demoText}>
                Demo App - Use any email and password to login{'\n'}
                Use email with "new" or "first" to see onboarding flow
              </Text>
            </ResponsiveCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ResponsiveLayout>
  );
}