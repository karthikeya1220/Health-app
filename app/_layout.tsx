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
  return (
    <ThemeProvider>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}>
        {/* Authentication & Onboarding Flow */}
        <Stack.Screen 
          name="splash" 
          options={{ 
            animation: 'fade',
            animationDuration: 500 
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_bottom' 
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_bottom' 
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            gestureEnabled: false,
            animation: 'fade' 
          }} 
        />
        <Stack.Screen 
          name="profile-setup" 
          options={{ 
            gestureEnabled: false,
            animation: 'slide_from_right' 
          }} 
        />

        {/* Main Tab Navigation */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            animation: 'fade',
            animationDuration: 400 
          }} 
        />

        {/* Social & Community Screens */}
        <Stack.Screen 
          name="messaging" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="chat" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="direct-message" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="group-chat" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="new-message" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom' 
          }} 
        />

        {/* Group & Community Management */}
        <Stack.Screen 
          name="discover-groups" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="group-page" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="feed-tab" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="request-group-access" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom' 
          }} 
        />

        {/* Admin & Management */}
        <Stack.Screen 
          name="admin-panel" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="manage-member-roles" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />

        {/* Content & Posts */}
        <Stack.Screen 
          name="create-post" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom' 
          }} 
        />
        <Stack.Screen 
          name="view-post" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="live-post" 
          options={{ 
            presentation: 'fullScreenModal',
            animation: 'fade',
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="trending-posts" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />
        <Stack.Screen 
          name="view-all-comments" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom' 
          }} 
        />
        <Stack.Screen 
          name="share-post" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom' 
          }} 
        />

        {/* User Profiles */}
        <Stack.Screen 
          name="user-profile" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />

        {/* Notifications */}
        <Stack.Screen 
          name="notifications-center" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right' 
          }} 
        />

        {/* Error Handling */}
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            presentation: 'modal',
            animation: 'fade' 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}