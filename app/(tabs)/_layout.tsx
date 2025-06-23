import { Tabs } from 'expo-router';
import { Home, User, Activity, Trophy, Timer, Bell, Compass, BarChart3, Dumbbell } from 'lucide-react-native';
import { View, Platform, Animated, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useRef, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { TextStyles } from '@/theme/typography';

// Clean Tab Bar Icon Component for the new design
const CleanTabIcon = ({ 
  IconComponent, 
  color, 
  size, 
  focused,
  label 
}: { 
  IconComponent: any; 
  color: string; 
  size: number; 
  focused: boolean;
  label: string;
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >        {/* Glow effect for active state */}
        {focused && (
          <Animated.View
            style={{
              position: 'absolute',
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.primary,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2],
              }),
            }}
          />
        )}
        
        <IconComponent 
          size={size} 
          color={focused ? colors.primary : colors.textSecondary} 
          strokeWidth={focused ? 2.5 : 2}
        />
      </Animated.View>
      
      <Text style={{
        ...TextStyles.tabBarLabel,
        color: focused ? colors.primary : colors.textSecondary,
        marginTop: 4,
      }}>
        {label}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Math.max(65 + insets.bottom, 85),
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 8,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <CleanTabIcon
              IconComponent={Home}
              color={color}
              size={22}
              focused={focused}
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size, focused }) => (
            <CleanTabIcon
              IconComponent={Activity}
              color={color}
              size={22}
              focused={focused}
              label="Activity"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, size, focused }) => (
            <CleanTabIcon
              IconComponent={Trophy}
              color={color}
              size={22}
              focused={focused}
              label="Challenges"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size, focused }) => (
            <CleanTabIcon
              IconComponent={Dumbbell}
              color={color}
              size={22}
              focused={focused}
              label="Workouts"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <CleanTabIcon
              IconComponent={User}
              color={color}
              size={22}
              focused={focused}
              label="Profile"
            />
          ),
        }}
      />
        {/* Hidden tabs - accessible through navigation */}
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          title: 'Notifications',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: 'Settings',
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          href: null,
          title: 'Timer',
        }}
      />
    </Tabs>
  );
}
