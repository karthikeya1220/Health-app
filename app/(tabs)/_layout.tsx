import { Tabs } from 'expo-router';
import { Home, User, Activity, Trophy, Timer, Bell, Compass, BarChart3 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { View, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useRef, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Properly centered Tab Bar Icon Component
const TabIcon = ({ 
  IconComponent, 
  color, 
  size, 
  focused 
}: { 
  IconComponent: any; 
  color: string; 
  size: number; 
  focused: boolean; 
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (focused) {
      // Scale up animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Bounce animation for the background
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);
  
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15, // Add padding to center icons properly
    }}>
      {/* Background glow for active tab */}
      {focused && (
        <Animated.View style={{
          position: 'absolute',
          width: 50,
          height: 50,
          backgroundColor: colors.primary + '20',
          borderRadius: 25,
          transform: [{ scale: bounceAnim }],
        }} />
      )}
      
      {/* Icon container with scale animation */}
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        width: focused ? 50 : 40,
        height: focused ? 50 : 40,
        borderRadius: focused ? 25 : 20,
        backgroundColor: focused ? colors.primary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: focused ? colors.primary : 'transparent',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: focused ? 0.4 : 0,
        shadowRadius: 12,
        elevation: focused ? 12 : 0,
      }}>
        <IconComponent 
          size={focused ? 26 : 24} 
          color={focused ? colors.surface : color}
          strokeWidth={focused ? 2.5 : 2}
        />
      </Animated.View>
    </View>
  );
};

export default function TabLayout() {
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: false, // Keep tab bar visible when keyboard is open
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom + 10, // Stick to actual bottom with safe area
          left: 20,
          right: 20,
          backgroundColor: 'transparent',
          borderRadius: 30,
          height: 80, // Increased height for better centering
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderTopWidth: 0,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: theme === 'dark' ? 0.4 : 0.15,
          shadowRadius: 25,
          elevation: 25,
        },
        tabBarBackground: () => (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 30,
            overflow: 'hidden',
          }}>
            {Platform.OS === 'ios' ? (
              <BlurView
                intensity={120}
                tint={theme}
                style={{
                  flex: 1,
                  backgroundColor: theme === 'dark' 
                    ? 'rgba(28, 28, 30, 0.85)' 
                    : 'rgba(255, 255, 255, 0.85)',
                }}
              />
            ) : (
              <View style={{
                flex: 1,
                backgroundColor: theme === 'dark' 
                  ? 'rgba(28, 28, 30, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
              }} />
            )}
            
            {/* Gradient border */}
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: colors.primary + '30',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }} />
            
            {/* Inner glow effect */}
            <View style={{
              position: 'absolute',
              top: 2,
              left: 2,
              right: 2,
              bottom: 2,
              borderRadius: 28,
              borderWidth: 1,
              borderColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)',
            }} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Home}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Compass}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Trophy}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={BarChart3}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={User}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Timer}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Bell}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Activity}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              IconComponent={Bell}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}