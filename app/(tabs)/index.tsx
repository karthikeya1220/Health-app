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
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';

const { width, height } = Dimensions.get('window');

// Responsive dimensions helper
const responsive = {
  // Screen size categories
  isSmallScreen: width < 360,
  isMediumScreen: width >= 360 && width < 400,
  isLargeScreen: width >= 400,
  
  // Responsive values
  spacing: {
    xs: width < 360 ? 4 : 6,
    sm: width < 360 ? 6 : 8,
    md: width < 360 ? 8 : 12,
    lg: width < 360 ? 12 : 16,
    xl: width < 360 ? 16 : 20,
    xxl: width < 360 ? 20 : 24,
  },
  
  // Icon sizes
  iconSize: {
    small: width < 360 ? 16 : 20,
    medium: width < 360 ? 20 : 24,
    large: width < 360 ? 24 : 28,
    xlarge: width < 360 ? 28 : 32,
  },
  
  // Text sizes
  fontSize: {
    caption: width < 360 ? 10 : 12,
    small: width < 360 ? 12 : 14,
    body: width < 360 ? 14 : 16,
    title: width < 360 ? 16 : 18,
    large: width < 360 ? 18 : 22,
    xlarge: width < 360 ? 36 : 42,
  },
  
  // Component sizes
  avatar: width < 360 ? 44 : 52,
  button: width < 360 ? 40 : 48,
  searchHeight: width < 360 ? 44 : 52,
  progressSize: width < 360 ? 100 : 115,
  statTileHeight: width < 360 ? 100 : 120,
  
  // Padding and margins
  containerPadding: width < 360 ? 12 : 16,
  cardPadding: width < 360 ? 16 : 20,
};

// Enhanced Icon Component with responsive sizing
const CleanIcon = ({ name, size, color, backgroundColor, style }: {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: any;
}) => {
  const { colors } = useTheme();
  
  // Use responsive size if not specified
  const iconSize = size || responsive.iconSize.medium;
  const containerSize = Math.max(iconSize + 8, 24); // Minimum container size
  
  const iconMap: { [key: string]: string } = {
    'fire': '🔥',
    'steps': '👟',
    'heart': '💖',
    'sleep': '😴',
    'standing': '🧍',
    'protein': '🥗',
    'bell': '🔔',
    'search': '🔍',
    'filter': '⚙️',
    'arrow': '→',
  };

  return (
    <View style={[{
      width: containerSize,
      height: containerSize,
      backgroundColor: backgroundColor || colors.primary + '15',
      borderRadius: containerSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 0.5,
      borderColor: 'rgba(255,255,255,0.3)',
    }, style]}>
      <Text style={{ 
        fontSize: Math.max(iconSize * 0.7, 12), // Minimum font size
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }}>
        {iconMap[name] || '📊'}
      </Text>
    </View>
  );
};

// Enhanced Responsive Circular Progress Ring Component
const CircularProgress = ({ 
  progress, 
  size, 
  strokeWidth, 
  value,
  unit,
  label 
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  value: string | number;
  unit: string;
  label: string;
}) => {
  const { colors } = useTheme();
  
  // Responsive sizing
  const progressSize = size || responsive.progressSize;
  const progressStroke = strokeWidth || (progressSize < 110 ? 6 : 8);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * ((progressSize - progressStroke) / 2);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{ 
      width: progressSize, 
      height: progressSize, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Background Circle - Premium glass effect */}
      <View style={{
        position: 'absolute',
        width: progressSize,
        height: progressSize,
        borderRadius: progressSize / 2,
        borderWidth: progressStroke,
        borderColor: '#F8FAFC',
        backgroundColor: 'rgba(248, 250, 252, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }} />
      
      {/* Progress Circle - Enhanced gradient with glow effect */}
      <Animated.View style={{
        position: 'absolute',
        width: progressSize,
        height: progressSize,
        borderRadius: progressSize / 2,
        borderWidth: progressStroke,
        borderColor: 'transparent',
        borderTopColor: '#6366F1',
        borderRightColor: '#8B5CF6',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
        transform: [{
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['-90deg', `${(progress * 3.6) - 90}deg`],
          }),
        }],
      }} />
      
      {/* Inner glow effect */}
      <View style={{
        position: 'absolute',
        width: progressSize - progressStroke * 2,
        height: progressSize - progressStroke * 2,
        borderRadius: (progressSize - progressStroke * 2) / 2,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 2,
      }} />
      
      {/* Center Content - Enhanced glass morphism */}
      <View style={{ 
        position: 'absolute', 
        alignItems: 'center',
        backgroundColor: 'rgba(99, 102, 241, 0.95)',
        paddingHorizontal: progressSize < 110 ? 12 : 16,
        paddingVertical: progressSize < 110 ? 8 : 12,
        borderRadius: progressSize < 110 ? 20 : 28,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        minWidth: progressSize * 0.6,
        maxWidth: progressSize * 0.8,
      }}>
        <Text style={{
          fontSize: progressSize < 110 ? 14 : 18,
          fontWeight: '900',
          color: '#FFFFFF',
          letterSpacing: 0.8,
          textShadowColor: 'rgba(0,0,0,0.3)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
          textAlign: 'center',
        }}>
          {value}
        </Text>
        <Text style={{
          fontSize: progressSize < 110 ? 10 : 12,
          fontWeight: '700',
          color: '#FFFFFF',
          opacity: 0.95,
          letterSpacing: 0.5,
          textShadowColor: 'rgba(0,0,0,0.2)',
          textShadowOffset: { width: 0, height: 0.5 },
          textShadowRadius: 1,
          textAlign: 'center',
        }}>
          {unit}
        </Text>
      </View>
    </View>
  );
};

// Enhanced Responsive Stat Tile Component
const StatTile = ({ 
  icon, 
  title, 
  value,
  backgroundColor
}: {
  icon: string;
  title: string;
  value: string;
  backgroundColor?: string;
}) => {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 6,
    }).start();
  };

  return (
    <Animated.View style={{ 
      transform: [{ scale: scaleAnim }], 
      flex: 1,
      minWidth: responsive.isSmallScreen ? 90 : 100,
      maxWidth: width / 3 - responsive.spacing.lg,
    }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          backgroundColor: backgroundColor || colors.card,
          borderRadius: responsive.isSmallScreen ? 16 : 20,
          padding: responsive.spacing.md,
          paddingVertical: responsive.spacing.lg,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 6,
          height: responsive.statTileHeight,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.9)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle inner glow */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'rgba(255,255,255,0.6)',
        }} />
          
        <View style={{ 
          alignItems: 'center', 
          justifyContent: 'center', 
          flex: 1,
          paddingHorizontal: 4,
        }}>
          <CleanIcon 
            name={icon}
            size={responsive.iconSize.large}
            backgroundColor="transparent"
          />
          <Text style={{
            color: colors.text,
            marginTop: responsive.spacing.sm,
            fontSize: responsive.fontSize.caption,
            fontWeight: '600',
            letterSpacing: 0.3,
            opacity: 0.8,
            textAlign: 'center',
            numberOfLines: 1,
          }}>
            {title}
          </Text>
          <Text style={{
            color: colors.text,
            fontWeight: '800',
            fontSize: responsive.fontSize.small,
            marginTop: 2,
            letterSpacing: 0.2,
            textShadowColor: 'rgba(0,0,0,0.1)',
            textShadowOffset: { width: 0, height: 0.5 },
            textShadowRadius: 1,
            textAlign: 'center',
            numberOfLines: 1,
            adjustsFontSizeToFit: true,
          }}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Dashboard Component with Responsive Design
export default function HealthDashboard() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: responsive.containerPadding,
      paddingTop: responsive.spacing.lg,
      paddingBottom: Math.max(insets.bottom, responsive.spacing.lg) + responsive.spacing.xxl * 2,
    },
    header: {
      marginBottom: responsive.spacing.xl,
    },
    greeting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing.lg,
      paddingHorizontal: responsive.spacing.xs,
    },
    greetingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: responsive.avatar,
      height: responsive.avatar,
      borderRadius: responsive.avatar / 2,
      backgroundColor: colors.primary,
      marginRight: responsive.spacing.md,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.9)',
    },
    greetingTextContainer: {
      flex: 1,
      paddingRight: responsive.spacing.sm,
    },
    greetingText: {
      color: colors.textSecondary,
      marginBottom: 2,
      fontSize: responsive.fontSize.small,
      fontWeight: '500',
      letterSpacing: 0.2,
    },
    userName: {
      color: colors.text,
      fontWeight: '700',
      fontSize: responsive.fontSize.large,
      letterSpacing: 0.3,
    },
    notificationButton: {
      width: responsive.button,
      height: responsive.button,
      borderRadius: responsive.button / 2,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing.md,
      marginBottom: responsive.spacing.xl,
    },
    searchInputContainer: {
      flex: 1,
      position: 'relative',
    },
    searchInput: {
      flex: 1,
      height: responsive.searchHeight,
      backgroundColor: colors.surface,
      borderRadius: responsive.searchHeight / 2,
      paddingHorizontal: responsive.spacing.lg,
      paddingLeft: responsive.searchHeight,
      color: colors.text,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
      fontSize: responsive.fontSize.body,
      fontWeight: '500',
    },
    searchIcon: {
      position: 'absolute',
      left: responsive.spacing.lg,
      top: '50%',
      transform: [{ translateY: -responsive.iconSize.small / 2 }],
      zIndex: 1,
    },
    filterButton: {
      width: responsive.searchHeight,
      height: responsive.searchHeight,
      borderRadius: responsive.searchHeight / 2,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },
    progressSection: {
      backgroundColor: colors.surface,
      borderRadius: responsive.isSmallScreen ? 20 : 24,
      padding: responsive.cardPadding,
      marginBottom: responsive.spacing.xl,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 8,
      marginHorizontal: 2,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.9)',
      overflow: 'hidden',
    },
    progressContent: {
      flexDirection: responsive.isSmallScreen ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: responsive.spacing.lg,
    },
    progressLeft: {
      flex: responsive.isSmallScreen ? 0 : 1,
      justifyContent: 'center',
      alignItems: responsive.isSmallScreen ? 'center' : 'flex-start',
    },
    progressRight: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressTitle: {
      color: colors.text,
      marginBottom: responsive.spacing.sm,
      fontWeight: '600',
      fontSize: responsive.fontSize.title,
      letterSpacing: 0.3,
      textAlign: responsive.isSmallScreen ? 'center' : 'left',
    },
    progressPercentage: {
      color: colors.text,
      fontWeight: '800',
      fontSize: responsive.fontSize.xlarge,
      marginBottom: responsive.spacing.xs,
      letterSpacing: 0.5,
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
      textAlign: responsive.isSmallScreen ? 'center' : 'left',
    },
    progressDate: {
      color: colors.textSecondary,
      fontSize: responsive.fontSize.body,
      fontWeight: '500',
      letterSpacing: 0.2,
      textAlign: responsive.isSmallScreen ? 'center' : 'left',
    },
    statsGrid: {
      flexDirection: 'row',
      gap: responsive.spacing.md,
      marginBottom: responsive.spacing.xl,
      justifyContent: 'space-between',
      paddingHorizontal: 2,
    },
    expandedSection: {
      marginBottom: responsive.spacing.xl,
    },
    expandedGrid: {
      flexDirection: 'column',
      gap: responsive.spacing.lg,
    },
    expandedTile: {
      backgroundColor: colors.surface,
      borderRadius: responsive.isSmallScreen ? 16 : 20,
      padding: responsive.cardPadding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 6,
      minHeight: responsive.isSmallScreen ? 70 : 80,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },
    expandedTileContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    expandedTileLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    expandedTileText: {
      marginLeft: responsive.spacing.lg,
      flex: 1,
    },
    expandedTileTitle: {
      color: colors.text,
      fontWeight: '700',
      fontSize: responsive.fontSize.title,
      letterSpacing: 0.2,
    },
    expandedTileSubtitle: {
      color: colors.textSecondary,
      fontSize: responsive.fontSize.body,
      fontWeight: '500',
      marginTop: 4,
    },
  });

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();
    
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                  day === 2 || day === 22 ? 'nd' :
                  day === 3 || day === 23 ? 'rd' : 'th';
    
    return `${day}${suffix} ${month} ${year}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar 
        barStyle={theme === 'dark' ? "light-content" : "dark-content"} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <View style={styles.greetingLeft}>
              <View style={styles.avatar}>
                <Image 
                  source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Raju' }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.greetingTextContainer}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
                <Text style={styles.userName} numberOfLines={1}>Raju!</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/notifications')}
            >
              <CleanIcon name="bell" size={responsive.iconSize.small} />
              <View style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.error,
              }} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <View style={styles.searchIcon}>
                <CleanIcon 
                  name="search" 
                  size={responsive.iconSize.small}
                  backgroundColor="transparent"
                />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search any data here"
                placeholderTextColor={colors.textSecondary}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <CleanIcon 
                name="filter" 
                size={responsive.iconSize.small}
                backgroundColor="transparent"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Overview - Enhanced with responsive layout */}
        <View style={styles.progressSection}>
          {/* Subtle top highlight */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderTopLeftRadius: responsive.isSmallScreen ? 20 : 24,
            borderTopRightRadius: responsive.isSmallScreen ? 20 : 24,
          }} />
          
          <View style={styles.progressContent}>
            <View style={styles.progressLeft}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressPercentage}>91%</Text>
              <Text style={styles.progressDate}>{getCurrentDate()}</Text>
            </View>
            <View style={styles.progressRight}>
              <CircularProgress
                progress={91}
                size={responsive.progressSize}
                strokeWidth={responsive.progressSize < 110 ? 6 : 8}
                value="500"
                unit="kcal"
                label="Calories"
              />
            </View>
          </View>
        </View>

        {/* Stats Grid - Responsive 3 columns */}
        <View style={styles.statsGrid}>
          <StatTile
            icon="fire"
            title="Calories"
            value="+500kcal"
            backgroundColor="#FFE5CC"
          />
          <StatTile
            icon="steps"
            title="Steps"
            value="+9000 steps"
            backgroundColor="#E5E9FF"
          />
          <StatTile
            icon="heart"
            title="Moving"
            value="+74mins"
            backgroundColor="#FFE5F1"
          />
        </View>

        {/* Expanded Health Stats - Enhanced with responsive styling */}
        <View style={styles.expandedSection}>
          <View style={styles.expandedGrid}>
            {/* Sleep Tile */}
            <View style={styles.expandedTile}>
              {/* Subtle top highlight */}
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: responsive.isSmallScreen ? 16 : 20,
                borderTopRightRadius: responsive.isSmallScreen ? 16 : 20,
              }} />
              
              <View style={styles.expandedTileContent}>
                <View style={styles.expandedTileLeft}>
                  <CleanIcon 
                    name="sleep" 
                    size={responsive.iconSize.medium} 
                    color="#8b5cf6" 
                    backgroundColor="rgba(139, 92, 246, 0.1)" 
                  />
                  <View style={styles.expandedTileText}>
                    <Text style={styles.expandedTileTitle} numberOfLines={1}>
                      Sleep
                    </Text>
                    <Text style={styles.expandedTileSubtitle} numberOfLines={1}>
                      8 Hrs 12 Mins
                    </Text>
                  </View>
                </View>
                <Text style={{ 
                  fontSize: responsive.fontSize.large, 
                  color: colors.textSecondary, 
                  fontWeight: '600' 
                }}>⋯</Text>
              </View>
            </View>

            {/* Standing Tile */}
            <View style={styles.expandedTile}>
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: responsive.isSmallScreen ? 16 : 20,
                borderTopRightRadius: responsive.isSmallScreen ? 16 : 20,
              }} />
              
              <View style={styles.expandedTileContent}>
                <View style={styles.expandedTileLeft}>
                  <CleanIcon 
                    name="standing" 
                    size={responsive.iconSize.medium} 
                    color="#10b981" 
                    backgroundColor="rgba(16, 185, 129, 0.1)" 
                  />
                  <View style={styles.expandedTileText}>
                    <Text style={styles.expandedTileTitle} numberOfLines={1}>
                      Standing
                    </Text>
                    <Text style={styles.expandedTileSubtitle} numberOfLines={1}>
                      6 Hrs 10 Mins
                    </Text>
                  </View>
                </View>
                <Text style={{ 
                  fontSize: responsive.fontSize.large, 
                  color: colors.textSecondary, 
                  fontWeight: '600' 
                }}>⋯</Text>
              </View>
            </View>

            {/* Heart Tile */}
            <View style={styles.expandedTile}>
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: responsive.isSmallScreen ? 16 : 20,
                borderTopRightRadius: responsive.isSmallScreen ? 16 : 20,
              }} />
              
              <View style={styles.expandedTileContent}>
                <View style={styles.expandedTileLeft}>
                  <CleanIcon 
                    name="heart" 
                    size={responsive.iconSize.medium} 
                    color="#ef4444" 
                    backgroundColor="rgba(239, 68, 68, 0.1)" 
                  />
                  <View style={styles.expandedTileText}>
                    <Text style={styles.expandedTileTitle} numberOfLines={1}>
                      Heart
                    </Text>
                    <Text style={styles.expandedTileSubtitle} numberOfLines={1}>
                      Add heart data
                    </Text>
                  </View>
                </View>
                <CleanIcon 
                  name="heart" 
                  size={responsive.iconSize.small} 
                  color="#ef4444" 
                  backgroundColor="rgba(239, 68, 68, 0.1)" 
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
