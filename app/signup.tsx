import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';

export default function SignupScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
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
      marginBottom: Spacing.xl,
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
    signupCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: Spacing.xl,
    },
    inputContainer: {
      marginBottom: Spacing.xl,
    },
    inputRow: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginBottom: Spacing.md,
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
      ...typography.body,
      color: colors.text,
    },
    eyeButton: {
      backgroundColor: 'transparent',
      padding: Spacing.xs,
      minHeight: 0,
      borderWidth: 0,
    },
    signupButton: {
      marginBottom: Spacing.lg,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
    },
    signupButtonText: {
      ...typography.body,
      textAlign: 'center',
      color: colors.surface,
      fontWeight: '600',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Spacing.lg,
    },
    footerText: {
      ...typography.body,
      color: colors.textSecondary,
    },
    loginButton: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: Spacing.xs,
      minHeight: 0,
    },
    loginButtonText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    termsText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.md,
      lineHeight: 18,
    },
    linkText: {
      color: colors.primary,
      fontWeight: '600',
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join our fitness community today</Text>
            </View>

            <View style={styles.signupCard}>
              <View style={styles.inputContainer}>
                {/* Name Row */}
                <View style={styles.inputRow}>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <User size={20} color={colors.textSecondary} style={styles.inputIcon} />
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChangeText={(text) => setFormData({...formData, firstName: text})}
                      style={styles.input}
                      placeholderTextColor={colors.textSecondary}
                    />
                  </View>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <User size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  <Phone size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.textSecondary} />
                    ) : (
                      <Eye size={20} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputWrapper}>
                  <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
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
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.textSecondary} />
                    ) : (
                      <Eye size={20} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSignup}
                disabled={isLoading}
                style={[
                  styles.signupButton,
                  { opacity: isLoading ? 0.7 : 1 }
                ]}
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
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
