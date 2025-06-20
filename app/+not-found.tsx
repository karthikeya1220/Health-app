import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

export default function NotFoundScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
      backgroundColor: colors.background,
    },
    text: {
      ...TextStyles.h2,
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },
    link: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    linkText: {
      ...TextStyles.button,
      color: colors.surface,
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
