import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share as ShareAPI, Alert, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, Share, MessageCircle, Copy, Twitter, 
  Facebook, Instagram, Link, Mail, Download, Bookmark, Heart, ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { responsiveValue, LAYOUT, TOUCH, SCREEN } from '@/utils/responsive';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SharePostScreen() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const shareOptions = [
    {
      id: 'copy',
      title: 'Copy Link',
      icon: Copy,
      color: colors.textSecondary,
      action: () => handleCopyLink(),
    },
    {
      id: 'message',
      title: 'Message',
      icon: MessageCircle,
      color: colors.primary,
      action: () => handleShareViaMessage(),
    },
    {
      id: 'mail',
      title: 'Mail',
      icon: Mail,
      color: colors.info,
      action: () => handleShareViaEmail(),
    },
    {
      id: 'twitter',
      title: 'Twitter',
      icon: Twitter,
      color: '#1DA1F2',
      action: () => handleShareToTwitter(),
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: Facebook,
      color: '#4267B2',
      action: () => handleShareToFacebook(),
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      action: () => handleShareToInstagram(),
    },
  ];

  const postActions = [
    {
      id: 'bookmark',
      title: 'Save Post',
      icon: Bookmark,
      color: colors.warning,
      action: () => handleSavePost(),
    },
    {
      id: 'download',
      title: 'Download',
      icon: Download,
      color: colors.success,
      action: () => handleDownloadPost(),
    },
  ];

  const handleCopyLink = () => {
    // In a real app, you'd copy the actual post URL to clipboard
    Alert.alert('Success', 'Link copied to clipboard!');
  };

  const handleShareViaMessage = () => {
    // Navigate to messaging or open system message app
    router.push('/messaging');
  };

  const handleShareViaEmail = () => {
    // Open email app with pre-filled content
    Alert.alert('Email', 'Opening email app...');
  };

  const handleShareToTwitter = () => {
    // Open Twitter app or web with pre-filled tweet
    Alert.alert('Twitter', 'Opening Twitter...');
  };

  const handleShareToFacebook = () => {
    // Open Facebook app or web
    Alert.alert('Facebook', 'Opening Facebook...');
  };

  const handleShareToInstagram = () => {
    // Open Instagram app
    Alert.alert('Instagram', 'Opening Instagram...');
  };

  const handleSavePost = () => {
    Alert.alert('Success', 'Post saved to your bookmarks!');
  };

  const handleDownloadPost = () => {
    Alert.alert('Download', 'Starting download...');
  };

  const handleNativeShare = async () => {
    try {
      const result = await ShareAPI.share({
        message: 'Check out this amazing workout post from our fitness community!',
        url: 'https://example.com/post/123', // In real app, this would be the actual post URL
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing');
    }
  };

  const renderShareOption = (option: typeof shareOptions[0]) => {
    const IconComponent = option.icon;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={styles.shareOption}
        onPress={option.action}
      >
        <View style={[styles.shareIconContainer, { backgroundColor: option.color + '20' }]}>
          <IconComponent size={24} color={option.color} />
        </View>
        <Text style={styles.shareOptionText}>{option.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderPostAction = (action: typeof postActions[0]) => {
    const IconComponent = action.icon;
    
    return (
      <TouchableOpacity
        key={action.id}
        style={styles.actionItem}
        onPress={action.action}
      >
        <View style={[styles.actionIconContainer, { backgroundColor: action.color + '15' }]}>
          <IconComponent size={20} color={action.color} />
        </View>
        <Text style={styles.actionText}>{action.title}</Text>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: LAYOUT.getContentPadding(),
      paddingVertical: LAYOUT.getPadding(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    backButton: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    headerTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      flex: 1,
    },
    scrollContent: {
      padding: LAYOUT.getContentPadding(),
    },
    section: {
      marginBottom: LAYOUT.getMargin(32),
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: LAYOUT.getMargin(24),
    },
    shareGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    shareOption: {
      width: responsiveValue({
        xs: '32%', sm: '30%', md: '30%', lg: '30%', default: '30%'
      }),
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(24),
    },
    shareIconContainer: {
      width: responsiveValue({
        xs: 55, sm: 58, md: 60, lg: 62, default: 60
      }),
      height: responsiveValue({
        xs: 55, sm: 58, md: 60, lg: 62, default: 60
      }),
      borderRadius: responsiveValue({
        xs: 27.5, sm: 29, md: 30, lg: 31, default: 30
      }),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    shareOptionText: {
      ...typography.caption,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '500',
    },    actionsContainer: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(24),
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: LAYOUT.getPadding(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    actionIconContainer: {
      width: TOUCH.getButtonSize('medium'),
      height: TOUCH.getButtonSize('medium'),
      borderRadius: LAYOUT.getBorderRadius(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getMargin(16),
    },
    actionText: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
      flex: 1,
    },
    nativeShareButton: {
      backgroundColor: colors.primary,
      borderRadius: LAYOUT.getBorderRadius(16),
      paddingVertical: LAYOUT.getPadding(16),
      paddingHorizontal: LAYOUT.getPadding(24),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: LAYOUT.getMargin(24),
    },
    nativeShareButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: LAYOUT.getMargin(8),
    },
    postPreview: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(24),
      marginBottom: LAYOUT.getMargin(24),
    },
    postTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: LAYOUT.getMargin(8),
    },
    postDescription: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
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
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Share Post</Text>
      </View>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Post Preview */}
        <View style={styles.postPreview}>
          <Text style={styles.postTitle}>
            10K Marathon Training Complete! 🏃‍♂️💪
          </Text>
          <Text style={styles.postDescription}>
            Just completed my 10K marathon training! Feeling stronger every day. 
            The journey has been incredible and I'm grateful for all the support...
          </Text>
        </View>

        {/* Share Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share via</Text>
          <View style={styles.shareGrid}>
            {shareOptions.map(renderShareOption)}
          </View>
        </View>

        {/* Post Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            {postActions.map(renderPostAction)}
          </View>
        </View>

        {/* Native Share Button */}
        <TouchableOpacity 
          style={styles.nativeShareButton}
          onPress={handleNativeShare}
        >
          <Share size={20} color={colors.surface} />
          <Text style={styles.nativeShareButtonText}>More Options</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
