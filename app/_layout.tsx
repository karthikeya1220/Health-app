import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useFrameworkReady();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="messaging" />
        <Stack.Screen name="new-message" />
        <Stack.Screen name="group-page" />
        <Stack.Screen name="user-profile" />
        <Stack.Screen name="live-post" />
        <Stack.Screen name="create-post" />
        <Stack.Screen name="view-post" />
        <Stack.Screen name="discover-groups" />
        <Stack.Screen name="trending-posts" />
        <Stack.Screen name="request-group-access" />        <Stack.Screen name="feed-tab" />        <Stack.Screen name="admin-panel" />
        <Stack.Screen name="notifications-center" />
        <Stack.Screen name="manage-member-roles" />        <Stack.Screen name="direct-message" />
        <Stack.Screen name="view-all-comments" />
        <Stack.Screen name="share-post" />
        <Stack.Screen name="group-chat" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}