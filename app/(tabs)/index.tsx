import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

// Remove all external icon imports and LinearGradient for now
const { width } = Dimensions.get('window');

// Simple Icon Component (fallback)
const SimpleIcon = ({ name, size = 24, color = '#000' }: {
  name: string;
  size?: number;
  color?: string;
}) => (
  <View style={{
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Text style={{
      color: '#fff',
      fontSize: size * 0.4,
      fontWeight: 'bold',
    }}>
      {name.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// Mock user data
const userData = {
  name: "Alex",
  profileImage: "https://via.placeholder.com/100x100/007AFF/FFFFFF?text=A"
};

// Simple Stats Card Component
const SimpleStatsCard = ({ 
  title, 
  value, 
  unit, 
  iconName,
  color, 
  delay = 0 
}: {
  title: string;
  value: number;
  unit: string;
  iconName: string;
  color: string;
  delay?: number;
}) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const valueAnim = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listener = valueAnim.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(valueAnim, {
          toValue: value,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    }, delay);

    return () => {
      valueAnim.removeListener(listener);
    };
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        flex: 1,
      }}
    >
      <View style={{
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        marginHorizontal: 4,
      }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: color + '20',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          <SimpleIcon name={iconName} size={20} color={color} />
        </View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.text,
        }}>
          {displayValue}{unit}
        </Text>
        <Text style={{
          fontSize: 11,
          color: colors.textSecondary,
          fontWeight: '500',
          textAlign: 'center',
        }}>
          {title}
        </Text>
      </View>
    </Animated.View>
  );
};

// Simple Challenge Card Component
const SimpleChallengeCard = () => {
  const { colors, theme } = useTheme();
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    glowAnimation.start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ 
      transform: [{ scale: scaleAnim }],
      marginBottom: 24,
    }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          backgroundColor: colors.primary + '20',
          borderRadius: 30,
          padding: 24,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.primary,
            borderRadius: 30,
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.1],
            }),
          }}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <View style={{ flex: 1 }}>
            {/* Challenge Badge */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              alignSelf: 'flex-start',
              marginBottom: 16,
            }}>
              <SimpleIcon name="A" size={14} color={colors.surface} />
              <Text style={{
                color: colors.surface,
                fontWeight: '700',
                fontSize: 12,
                marginLeft: 6,
              }}>
                TODAY'S CHALLENGE
              </Text>
            </View>

            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: 8,
              lineHeight: 34,
            }}>
              Challenge With{'\n'}Pro Coach
            </Text>

            <Text style={{
              fontSize: 14,
              color: colors.textSecondary,
              marginBottom: 20,
              lineHeight: 20,
            }}>
              Complete today's workout and earn rewards
            </Text>

            <TouchableOpacity 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 25,
                alignSelf: 'flex-start',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 8,
              }}
              activeOpacity={0.8}
            >
              <SimpleIcon name="P" size={16} color={colors.primary} />
              <Text style={{
                color: colors.primary,
                fontWeight: '700',
                fontSize: 14,
                marginLeft: 8,
              }}>
                Start Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Coach Avatar */}
          <View style={{ marginLeft: 16 }}>
            <View style={{
              width: 80,
              height: 100,
              backgroundColor: colors.surface + '50',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.2,
              shadowRadius: 16,
              elevation: 12,
            }}>
              <SimpleIcon name="Z" size={40} color={colors.primary} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Simple Exercise Type Selector
const SimpleExerciseSelector = () => {
  const { colors } = useTheme();
  const [selectedType, setSelectedType] = useState('running');

  const exerciseTypes = [
    { id: 'running', name: 'Run', color: colors.error },
    { id: 'walking', name: 'Walk', color: colors.success },
    { id: 'nutrition', name: 'Nutrition', color: colors.warning },
    { id: 'weights', name: 'Weights', color: colors.info },
    { id: 'more', name: 'More', color: colors.accent },
  ];

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
      }}>
        Select exercise type
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {exerciseTypes.map((type) => {
          const isSelected = selectedType === type.id;
          
          return (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              style={{
                alignItems: 'center',
                marginRight: 20,
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: isSelected ? type.color + '20' : colors.surface,
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? type.color : colors.border,
                shadowColor: isSelected ? type.color : colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isSelected ? 0.25 : 0.08,
                shadowRadius: 4,
                elevation: isSelected ? 6 : 2,
                minWidth: 80,
              }}
              activeOpacity={0.8}
            >
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: isSelected ? type.color : colors.textSecondary + '20',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <SimpleIcon 
                  name={type.name.charAt(0)} 
                  size={24} 
                  color={isSelected ? colors.surface : colors.textSecondary}
                />
              </View>
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: isSelected ? type.color : colors.textSecondary,
                textAlign: 'center',
              }}>
                {type.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// Simple Muscle Selector
const SimpleMuscleSelector = () => {
  const { colors } = useTheme();
  const [selectedMuscle, setSelectedMuscle] = useState('Shoulders');

  const muscles = [
    { name: 'Shoulders', color: colors.primary },
    { name: 'Back', color: colors.success },
    { name: 'Chest', color: colors.error },
    { name: 'Arms', color: colors.warning },
  ];

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
      }}>
        Target Muscle Groups
      </Text>
      <Text style={{
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 20,
        lineHeight: 20,
      }}>
        Select muscles you want to strengthen today
      </Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {muscles.map((muscle) => {
          const isSelected = selectedMuscle === muscle.name;
          return (
            <TouchableOpacity
              key={muscle.name}
              onPress={() => setSelectedMuscle(muscle.name)}
              style={{
                flex: 1,
                minWidth: (width - 64) / 2 - 6,
                backgroundColor: isSelected ? muscle.color + '20' : colors.surface,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? muscle.color : colors.border,
                shadowColor: isSelected ? muscle.color : colors.shadow,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: isSelected ? 0.25 : 0.08,
                shadowRadius: 8,
                elevation: isSelected ? 8 : 3,
              }}
              activeOpacity={0.8}
            >
              {/* Simple Body Visualization */}
              <View style={{
                width: 80,
                height: 100,
                backgroundColor: colors.textSecondary + '10',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <View style={{
                  width: 40,
                  height: 60,
                  backgroundColor: isSelected ? muscle.color + '40' : colors.textSecondary + '30',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <SimpleIcon 
                    name={muscle.name.charAt(0)} 
                    size={24} 
                    color={isSelected ? muscle.color : colors.textSecondary}
                  />
                </View>
              </View>

              <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: isSelected ? muscle.color : colors.text,
                textAlign: 'center',
              }}>
                {muscle.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function HomeTab() {
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 16,
      paddingBottom: Math.max(insets.bottom, 20) + 100,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: colors.primary + '30',
    },
    greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    subGreeting: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    notificationButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
      gap: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: userData.profileImage }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.greeting}>
                Hello, {userData.name}
              </Text>
              <Text style={styles.subGreeting}>
                Ready for today's workout?
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <SimpleIcon name="B" size={24} color={colors.text} />
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.error,
            }} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <SimpleStatsCard
            title="Steps Today"
            value={8547}
            unit=""
            iconName="S"
            color={colors.success}
            delay={0}
          />
          <SimpleStatsCard
            title="Calories"
            value={425}
            unit=""
            iconName="C"
            color={colors.error}
            delay={200}
          />
          <SimpleStatsCard
            title="Minutes"
            value={32}
            unit="min"
            iconName="M"
            color={colors.info}
            delay={400}
          />
        </View>

        {/* Challenge Card */}
        <SimpleChallengeCard />

        {/* Exercise Selector */}
        <SimpleExerciseSelector />

        {/* Muscle Selector */}
        <SimpleMuscleSelector />
      </ScrollView>
    </SafeAreaView>
  );
}