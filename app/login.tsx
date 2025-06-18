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

export default function LoginScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // Navigate to main app
      router.replace('/(tabs)');
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
      padding: Spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: Spacing.xl * 2,
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
    },
    loginCard: {
      marginBottom: Spacing.xl,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    inputContainer: {
      marginBottom: Spacing.xl,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
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
      color: colors.text,
      ...typography.body,
    },
    eyeButton: {
      backgroundColor: 'transparent',
      padding: Spacing.xs,
      minHeight: 0,
      borderWidth: 0,
    },
    loginButton: {
      marginBottom: Spacing.lg,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
    },
    loginButtonText: {
      color: colors.surface,
      fontWeight: '600',
      textAlign: 'center',
      ...typography.body,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      ...typography.body,
      color: colors.text,
    },
    signUpButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: Spacing.xs,
      minHeight: 0,
    },
    signUpButtonText: {
      color: colors.primary,
      fontWeight: '600',
      ...typography.body,
    },
    demoInfo: {
      alignItems: 'center',
      marginTop: Spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
    },
    demoText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
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
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>
            </View>

            <View style={styles.loginCard}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.textSecondary} />
                    ) : (
                      <Eye size={20} color={colors.textSecondary} />
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
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => Alert.alert('Sign Up', 'Sign up functionality not implemented yet')}
                  style={styles.signUpButton}
                >
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.demoInfo}>
              <Text style={styles.demoText}>Demo App - Use any email and password to login</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}