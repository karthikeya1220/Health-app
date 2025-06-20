import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Camera,
  Video,
  Image as ImageIcon,
  MapPin,
  Users,
  Globe,
  Lock,
  Smile,
  Hash,
  AtSign,
  Zap
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

type PostType = 'text' | 'photo' | 'video' | 'live';
type Privacy = 'public' | 'friends' | 'private';

export default function CreatePostScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<PostType>('text');
  const [privacy, setPrivacy] = useState<Privacy>('public');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const groups = [
    { id: '1', name: 'Morning Runners', avatar: '🏃‍♀️', members: 1234 },
    { id: '2', name: 'CrossFit Warriors', avatar: '💪', members: 856 },
    { id: '3', name: 'Yoga Masters', avatar: '🧘‍♀️', members: 2341 },
  ];

  const suggestedHashtags = ['#workout', '#fitness', '#running', '#healthy', '#motivation'];
  const suggestedMentions = ['@sarah_runs', '@fitnessguru', '@coachmax'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePost = () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }

    Alert.alert(
      'Post Created!',
      `Your ${postType} post has been shared successfully.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleStartLive = () => {
    Alert.alert(
      'Start Live Stream?',
      'You\'re about to start a live stream. Make sure you\'re ready!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Go Live',
          onPress: () => router.push('/live-post'),
        },
      ]
    );
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags(prev => [...prev, tag]);
      setPostContent(prev => prev + ' ' + tag);
    }
  };

  const addMention = (mention: string) => {
    if (!mentions.includes(mention)) {
      setMentions(prev => [...prev, mention]);
      setPostContent(prev => prev + ' ' + mention);
    }
  };

  const getPrivacyIcon = () => {
    switch (privacy) {
      case 'public': return Globe;
      case 'friends': return Users;
      case 'private': return Lock;
    }
  };

  const getPrivacyColor = () => {
    switch (privacy) {
      case 'public': return colors.success;
      case 'friends': return colors.primary;
      case 'private': return colors.warning;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerTitle: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
    },
    postButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
    },
    postButtonDisabled: {
      opacity: 0.5,
    },
    postButtonText: {
      ...typography.body,
      color: colors.surface,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    userAvatarText: {
      fontSize: 24,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    privacySelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    privacyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
    },
    privacyText: {
      ...typography.caption,
      color: colors.textSecondary,
      marginLeft: Spacing.xs,
      fontWeight: '500',
    },
    postTypeSelector: {
      paddingVertical: Spacing.md,
    },
    postTypeTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.md,
    },
    postTypeOptions: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    postTypeOption: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedPostType: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    postTypeIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    selectedPostTypeIcon: {
      backgroundColor: colors.primary,
    },
    postTypeLabel: {
      ...typography.caption,
      color: colors.text,
      fontWeight: '500',
    },
    selectedPostTypeLabel: {
      color: colors.primary,
      fontWeight: '600',
    },
    liveOption: {
      backgroundColor: colors.error + '10',
      borderColor: colors.error + '30',
    },
    liveOptionSelected: {
      borderColor: colors.error,
      backgroundColor: colors.error + '20',
    },
    liveIcon: {
      backgroundColor: colors.error + '20',
    },
    liveIconSelected: {
      backgroundColor: colors.error,
    },
    liveLabel: {
      color: colors.error,
    },
    inputSection: {
      paddingVertical: Spacing.md,
    },
    textInput: {
      ...typography.body,
      color: colors.text,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      minHeight: 120,
      textAlignVertical: 'top',
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputPlaceholder: {
      color: colors.textSecondary,
    },
    featuresSection: {
      paddingVertical: Spacing.md,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    featureInfo: {
      flex: 1,
    },
    featureTitle: {
      ...typography.body,
      color: colors.text,
      fontWeight: '500',
    },
    featureSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    featureAction: {
      backgroundColor: colors.background,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    featureActionText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    groupsSection: {
      paddingVertical: Spacing.md,
    },
    sectionTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: Spacing.md,
    },
    groupsList: {
      gap: Spacing.sm,
    },
    groupItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedGroup: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    groupAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.success + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    groupAvatarText: {
      fontSize: 20,
    },
    groupInfo: {
      flex: 1,
    },
    groupName: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    groupMembers: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    checkmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    suggestionsSection: {
      paddingVertical: Spacing.md,
    },
    suggestionsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    suggestionChip: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    suggestionChipText: {
      ...typography.caption,
      color: colors.text,
      fontWeight: '500',
    },
    liveButton: {
      backgroundColor: colors.error,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      margin: Spacing.lg,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    liveButtonText: {
      ...typography.bodyMedium,
      color: colors.surface,
      fontWeight: 'bold',
      marginLeft: Spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Post</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.postButton,
              !postContent.trim() && styles.postButtonDisabled
            ]}
            onPress={handlePost}
            disabled={!postContent.trim()}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>👤</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Your Name</Text>
                <TouchableOpacity style={styles.privacyButton}>
                  {React.createElement(getPrivacyIcon(), {
                    size: 14,
                    color: getPrivacyColor()
                  })}
                  <Text style={[styles.privacyText, { color: getPrivacyColor() }]}>
                    {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Post Type Selector */}
            <View style={styles.postTypeSelector}>
              <Text style={styles.postTypeTitle}>Post Type</Text>
              <View style={styles.postTypeOptions}>
                <TouchableOpacity
                  style={[
                    styles.postTypeOption,
                    postType === 'text' && styles.selectedPostType
                  ]}
                  onPress={() => setPostType('text')}
                >
                  <View style={[
                    styles.postTypeIcon,
                    postType === 'text' && styles.selectedPostTypeIcon
                  ]}>
                    <Hash 
                      size={20} 
                      color={postType === 'text' ? colors.surface : colors.primary} 
                    />
                  </View>
                  <Text style={[
                    styles.postTypeLabel,
                    postType === 'text' && styles.selectedPostTypeLabel
                  ]}>
                    Text
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.postTypeOption,
                    postType === 'photo' && styles.selectedPostType
                  ]}
                  onPress={() => setPostType('photo')}
                >
                  <View style={[
                    styles.postTypeIcon,
                    postType === 'photo' && styles.selectedPostTypeIcon
                  ]}>
                    <ImageIcon 
                      size={20} 
                      color={postType === 'photo' ? colors.surface : colors.primary} 
                    />
                  </View>
                  <Text style={[
                    styles.postTypeLabel,
                    postType === 'photo' && styles.selectedPostTypeLabel
                  ]}>
                    Photo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.postTypeOption,
                    postType === 'video' && styles.selectedPostType
                  ]}
                  onPress={() => setPostType('video')}
                >
                  <View style={[
                    styles.postTypeIcon,
                    postType === 'video' && styles.selectedPostTypeIcon
                  ]}>
                    <Video 
                      size={20} 
                      color={postType === 'video' ? colors.surface : colors.primary} 
                    />
                  </View>
                  <Text style={[
                    styles.postTypeLabel,
                    postType === 'video' && styles.selectedPostTypeLabel
                  ]}>
                    Video
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.postTypeOption,
                    styles.liveOption,
                    postType === 'live' && styles.liveOptionSelected
                  ]}
                  onPress={() => setPostType('live')}
                >
                  <View style={[
                    styles.postTypeIcon,
                    styles.liveIcon,
                    postType === 'live' && styles.liveIconSelected
                  ]}>
                    <Zap 
                      size={20} 
                      color={postType === 'live' ? colors.surface : colors.error} 
                    />
                  </View>
                  <Text style={[
                    styles.postTypeLabel,
                    styles.liveLabel,
                    postType === 'live' && styles.selectedPostTypeLabel
                  ]}>
                    Live
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Text Input */}
            <View style={styles.inputSection}>
              <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.textSecondary}
                value={postContent}
                onChangeText={setPostContent}
                multiline
                maxLength={500}
              />
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
              <TouchableOpacity style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <MapPin size={20} color={colors.primary} />
                </View>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Add Location</Text>
                  <Text style={styles.featureSubtitle}>Share where you are</Text>
                </View>
                <View style={styles.featureAction}>
                  <Text style={styles.featureActionText}>Add</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <AtSign size={20} color={colors.primary} />
                </View>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Tag People</Text>
                  <Text style={styles.featureSubtitle}>Mention friends in your post</Text>
                </View>
                <View style={styles.featureAction}>
                  <Text style={styles.featureActionText}>Tag</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Smile size={20} color={colors.primary} />
                </View>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Feeling/Activity</Text>
                  <Text style={styles.featureSubtitle}>Express your mood</Text>
                </View>
                <View style={styles.featureAction}>
                  <Text style={styles.featureActionText}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Share to Groups */}
            <View style={styles.groupsSection}>
              <Text style={styles.sectionTitle}>Share to Groups</Text>
              <View style={styles.groupsList}>
                {groups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={[
                      styles.groupItem,
                      selectedGroups.includes(group.id) && styles.selectedGroup
                    ]}
                    onPress={() => toggleGroup(group.id)}
                  >
                    <View style={styles.groupAvatar}>
                      <Text style={styles.groupAvatarText}>{group.avatar}</Text>
                    </View>
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>{group.name}</Text>
                      <Text style={styles.groupMembers}>
                        {group.members.toLocaleString()} members
                      </Text>
                    </View>
                    {selectedGroups.includes(group.id) && (
                      <View style={styles.checkmark}>
                        <Text style={{ color: colors.surface, fontSize: 12 }}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Hashtag Suggestions */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.sectionTitle}>Suggested Hashtags</Text>
              <View style={styles.suggestionsList}>
                {suggestedHashtags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={styles.suggestionChip}
                    onPress={() => addHashtag(tag)}
                  >
                    <Text style={styles.suggestionChipText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Mention Suggestions */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.sectionTitle}>Suggested Mentions</Text>
              <View style={styles.suggestionsList}>
                {suggestedMentions.map((mention) => (
                  <TouchableOpacity
                    key={mention}
                    style={styles.suggestionChip}
                    onPress={() => addMention(mention)}
                  >
                    <Text style={styles.suggestionChipText}>{mention}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Live Stream Button */}
            {postType === 'live' && (
              <TouchableOpacity style={styles.liveButton} onPress={handleStartLive}>
                <Zap size={24} color={colors.surface} />
                <Text style={styles.liveButtonText}>Start Live Stream</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
