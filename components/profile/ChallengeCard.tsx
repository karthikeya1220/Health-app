import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Gradients } from '@/theme/colors';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

export const ChallengeCard: React.FC = () => {
  const { theme } = useTheme();
  const typography = getTypography(theme === 'dark');

  return (
    <View style={styles.container}>
      <AnimatedCard style={styles.cardContainer} animationDelay={200}>
        <LinearGradient
          colors={Gradients.primary}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.leftContent}>
              <View style={styles.challengeLabel}>
                <Trophy size={16} color="#FFFFFF" />
                <Text style={styles.challengeLabelText}>Challenge</Text>
              </View>
              
              <Text style={[typography.h2, styles.title]}>
                Challenge With{'\n'}Pro Coach
              </Text>
              
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Get Started</Text>
                <View style={styles.playButton}>
                  <Play size={16} color={Gradients.primary[0]} fill={Gradients.primary[0]} />
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.rightContent}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=2' }}
                style={styles.coachImage}
              />
            </View>
          </View>
        </LinearGradient>
      </AnimatedCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  cardContainer: {
    padding: 0,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    padding: Spacing.lg,
    minHeight: 160,
  },
  leftContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  challengeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  challengeLabelText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    justifyContent: 'flex-end',
  },
  coachImage: {
    width: 100,
    height: 120,
    borderRadius: BorderRadius.md,
  },
});