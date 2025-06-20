import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Search, 
  Users,
  Check,
  Plus,
  MessageCircle
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
  isGroup?: boolean;
  members?: number;
}

export default function NewMessageScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '👩‍🦰',
      status: 'online'
    },
    {
      id: '2',
      name: 'Alex Chen',
      avatar: '👨‍💼',
      status: 'offline',
      lastSeen: '2h ago'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: '👩‍💻',
      status: 'online'
    },
    {
      id: '4',
      name: 'Mike Rodriguez',
      avatar: '👨‍🏋️',
      status: 'offline',
      lastSeen: '1h ago'
    },
    {
      id: '5',
      name: 'Lisa Park',
      avatar: '👩‍🎨',
      status: 'online'
    },
    {
      id: '6',
      name: 'Tom Anderson',
      avatar: '👨‍🍳',
      status: 'offline',
      lastSeen: '30m ago'
    }
  ]);

  const [groups] = useState<Contact[]>([
    {
      id: 'g1',
      name: 'Morning Runners',
      avatar: '🏃‍♀️',
      status: 'online',
      isGroup: true,
      members: 12
    },
    {
      id: 'g2',
      name: 'CrossFit Warriors',
      avatar: '💪',
      status: 'online',
      isGroup: true,
      members: 23
    },
    {
      id: 'g3',
      name: 'Yoga Masters',
      avatar: '🧘‍♀️',
      status: 'online',
      isGroup: true,
      members: 15
    }
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleStartChat = () => {
    if (selectedContacts.length === 0) return;
    
    if (selectedContacts.length === 1 && !isGroupMode) {
      // Start direct message
      router.push('/chat');
    } else {
      // Start group chat
      router.push('/chat');
    }
  };

  const renderContact = ({ item }: { item: Contact }) => {
    const isSelected = selectedContacts.includes(item.id);
    
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={[
            styles.contactItem,
            isSelected && styles.selectedContactItem
          ]}
          onPress={() => {
            if (isGroupMode) {
              toggleContactSelection(item.id);
            } else {
              setSelectedContacts([item.id]);
              setTimeout(() => handleStartChat(), 100);
            }
          }}
          activeOpacity={0.7}
        >
          <View style={styles.contactAvatar}>
            <View style={[
              styles.avatar,
              item.isGroup && styles.groupAvatar
            ]}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            {item.status === 'online' && !item.isGroup && (
              <View style={styles.onlineIndicator} />
            )}
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.isGroup ? (
              <Text style={styles.memberCount}>
                {item.members} members
              </Text>
            ) : (
              <Text style={styles.contactStatus}>
                {item.status === 'online' ? 'Online' : `Last seen ${item.lastSeen}`}
              </Text>
            )}
          </View>

          {(isGroupMode || isSelected) && (
            <View style={[
              styles.checkbox,
              isSelected && styles.checkedCheckbox
            ]}>
              {isSelected && (
                <Check size={16} color={colors.surface} />
              )}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
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
      ...typography.h2,
      color: colors.text,
      fontWeight: 'bold',
    },
    headerActions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    modeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.background,
    },
    modeToggleText: {
      ...typography.caption,
      color: colors.text,
      marginLeft: Spacing.xs,
      fontWeight: '500',
    },
    searchContainer: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    searchInput: {
      ...typography.body,
      color: colors.text,
      flex: 1,
      marginLeft: Spacing.sm,
      paddingVertical: Spacing.xs,
    },
    selectedCounter: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      backgroundColor: colors.primary + '10',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectedText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    sectionHeader: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      backgroundColor: colors.background,
    },
    sectionTitle: {
      ...typography.bodyMedium,
      color: colors.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    selectedContactItem: {
      backgroundColor: colors.primary + '10',
    },
    contactAvatar: {
      position: 'relative',
      marginRight: Spacing.md,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupAvatar: {
      backgroundColor: colors.success + '20',
    },
    avatarText: {
      fontSize: 20,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.success,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    contactStatus: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    memberCount: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedCheckbox: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    startChatButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    startChatButtonText: {
      ...typography.bodyMedium,
      color: colors.surface,
      fontWeight: '600',
      marginLeft: Spacing.sm,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Message</Text>
        </View>
        
        <TouchableOpacity
          style={styles.modeToggle}
          onPress={() => {
            setIsGroupMode(!isGroupMode);
            setSelectedContacts([]);
          }}
        >
          <Users size={16} color={colors.text} />
          <Text style={styles.modeToggleText}>
            {isGroupMode ? 'Group' : 'Direct'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Selected Counter */}
      {selectedContacts.length > 0 && (
        <View style={styles.selectedCounter}>
          <Text style={styles.selectedText}>
            {selectedContacts.length} selected
          </Text>
        </View>
      )}

      {/* Contacts List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Groups Section */}
        {filteredGroups.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Groups</Text>
            </View>
            <FlatList
              data={filteredGroups}
              renderItem={renderContact}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </>
        )}

        {/* Contacts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contacts</Text>
        </View>
        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Start Chat Button */}
      {selectedContacts.length > 0 && (
        <TouchableOpacity
          style={[
            styles.startChatButton,
            selectedContacts.length === 0 && styles.disabledButton
          ]}
          onPress={handleStartChat}
          disabled={selectedContacts.length === 0}
        >
          <MessageCircle size={20} color={colors.surface} />
          <Text style={styles.startChatButtonText}>
            Start Chat{selectedContacts.length > 1 ? ` (${selectedContacts.length})` : ''}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
