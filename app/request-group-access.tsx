import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Shield, Clock, CheckCircle, XCircle, Calendar, MapPin } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function RequestGroupAccessScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  
  const [isRequesting, setIsRequesting] = useState(false);

  const groupInfo = {
    name: 'Elite Fitness Warriors',
    description: 'An exclusive group for serious fitness enthusiasts. We focus on advanced training techniques, nutrition optimization, and achieving peak physical performance.',
    image: '💪',
    color: '#FF6B6B',
    members: 234,
    location: 'San Francisco, CA',
    category: 'Weightlifting',
    isPrivate: true,
    admin: {
      name: 'Marcus Thompson',
      avatar: 'https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=M',
      title: 'Certified Personal Trainer',
    },
    requirements: [
      'Minimum 2 years of consistent training experience',
      'Ability to attend weekly group sessions',
      'Commitment to group goals and community guidelines',
      'Valid fitness assessment or certification (optional but preferred)',
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Heavy Lifting Workshop',
        date: 'Saturday, Dec 23',
        time: '10:00 AM',
      },
      {
        id: '2',
        title: 'Nutrition Planning Session',
        date: 'Monday, Dec 25',
        time: '7:00 PM',
      },
    ],
  };

  const handleRequestAccess = async () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      Alert.alert(
        'Request Sent!',
        'Your request to join Elite Fitness Warriors has been sent to the group admin. You\'ll receive a notification once it\'s reviewed.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.lg,
    },
    groupCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      marginBottom: Spacing.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    groupHeader: {
      alignItems: 'center',
      marginBottom: Spacing.lg,
    },
    groupIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    groupIconText: {
      fontSize: 40,
    },
    groupName: {
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    privateLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.warning + '20',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
      marginBottom: Spacing.md,
    },
    privateLabelText: {
      ...typography.caption,
      color: colors.warning,
      fontWeight: '600',
      marginLeft: Spacing.xs,
    },
    groupStats: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    groupStat: {
      alignItems: 'center',
    },
    groupStatValue: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
    },
    groupStatLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    description: {
      ...typography.body,
      color: colors.text,
      lineHeight: 24,
      textAlign: 'center',
    },
    section: {
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: Spacing.md,
    },
    adminCard: {
      backgroundColor: colors.background,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    adminAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: Spacing.md,
    },
    adminInfo: {
      flex: 1,
    },
    adminName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    adminTitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    requirementsList: {
      gap: Spacing.sm,
    },
    requirementItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: Spacing.md,
      backgroundColor: colors.background,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    requirementText: {
      ...typography.body,
      color: colors.text,
      flex: 1,
      marginLeft: Spacing.sm,
      lineHeight: 20,
    },
    eventsContainer: {
      gap: Spacing.md,
    },
    eventCard: {
      backgroundColor: colors.background,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    eventTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    eventDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.lg,
    },
    eventDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    eventDetailText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    buttonContainer: {
      marginTop: Spacing.xl,
      gap: Spacing.md,
    },
    requestButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      alignItems: 'center',
    },
    requestButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
      fontSize: 16,
    },
    cancelButton: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    warningText: {
      ...typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Access</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Group Info */}
        <Card style={styles.groupCard} elevated>
          <View style={styles.groupHeader}>
            <View style={[styles.groupIcon, { backgroundColor: groupInfo.color + '20' }]}>
              <Text style={styles.groupIconText}>{groupInfo.image}</Text>
            </View>
            
            <Text style={styles.groupName}>{groupInfo.name}</Text>
            
            <View style={styles.privateLabel}>
              <Shield size={14} color={colors.warning} />
              <Text style={styles.privateLabelText}>PRIVATE GROUP</Text>
            </View>

            <View style={styles.groupStats}>
              <View style={styles.groupStat}>
                <Text style={styles.groupStatValue}>{groupInfo.members}</Text>
                <Text style={styles.groupStatLabel}>Members</Text>
              </View>
              <View style={styles.groupStat}>
                <Text style={styles.groupStatValue}>{groupInfo.category}</Text>
                <Text style={styles.groupStatLabel}>Category</Text>
              </View>
            </View>

            <Text style={styles.description}>{groupInfo.description}</Text>
          </View>
        </Card>

        {/* Group Admin */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Admin</Text>
          <View style={styles.adminCard}>
            <Image source={{ uri: groupInfo.admin.avatar }} style={styles.adminAvatar} />
            <View style={styles.adminInfo}>
              <Text style={styles.adminName}>{groupInfo.admin.name}</Text>
              <Text style={styles.adminTitle}>{groupInfo.admin.title}</Text>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membership Requirements</Text>
          <View style={styles.requirementsList}>
            {groupInfo.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <CheckCircle size={16} color={colors.success} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventsContainer}>
            {groupInfo.upcomingEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Calendar size={14} color={colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.requestButton, { opacity: isRequesting ? 0.7 : 1 }]}
            onPress={handleRequestAccess}
            disabled={isRequesting}
          >
            <Text style={styles.requestButtonText}>
              {isRequesting ? 'Sending Request...' : 'Request to Join'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.warningText}>
            Your request will be reviewed by the group admin. This may take 1-3 business days.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
