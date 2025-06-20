import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, Send, MoreHorizontal, Users, Phone, Video, 
  Plus, Camera, Mic, Smile, Settings, Info
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

interface GroupMessage {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
  type: 'text' | 'image' | 'system';
  isMe?: boolean;
}

export default function GroupChatScreen() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const groupInfo = {
    id: '1',
    name: 'Morning Runners',
    members: 15,
    avatar: '🏃‍♀️',
    onlineMembers: 8
  };

  // Mock data for group messages
  const [messages, setMessages] = useState<GroupMessage[]>([
    {
      id: '1',
      text: 'Welcome everyone to the Morning Runners group! 🏃‍♀️',
      sender: {
        id: 'admin',
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/32x32/6366f1/FFFFFF?text=S'
      },
      timestamp: '9:00 AM',
      type: 'system'
    },
    {
      id: '2',
      text: 'Hey everyone! Ready for tomorrow\'s 7 AM run?',
      sender: {
        id: '2',
        name: 'Mike Chen',
        avatar: 'https://via.placeholder.com/32x32/10B981/FFFFFF?text=M'
      },
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '3',
      text: 'Absolutely! Weather looks perfect for it.',
      sender: {
        id: 'me',
        name: 'You',
        avatar: 'https://via.placeholder.com/32x32/F59E0B/FFFFFF?text=Y'
      },
      timestamp: '10:32 AM',
      type: 'text',
      isMe: true
    },
    {
      id: '4',
      text: 'Count me in! Should we meet at the usual spot near the fountain?',
      sender: {
        id: '3',
        name: 'Emma Wilson',
        avatar: 'https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=E'
      },
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: '5',
      text: 'Perfect! See you all there. Don\'t forget to bring water! 💧',
      sender: {
        id: '2',
        name: 'Mike Chen',
        avatar: 'https://via.placeholder.com/32x32/10B981/FFFFFF?text=M'
      },
      timestamp: '10:38 AM',
      type: 'text'
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: GroupMessage = {
        id: Date.now().toString(),
        text: message,
        sender: {
          id: 'me',
          name: 'You',
          avatar: 'https://via.placeholder.com/32x32/F59E0B/FFFFFF?text=Y'
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        isMe: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: GroupMessage }) => {
    if (item.type === 'system') {
      return (
        <View style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      );
    }

    const isMe = item.isMe;
    
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        {!isMe && (
          <Image source={{ uri: item.sender.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
          {!isMe && (
            <Text style={styles.senderName}>{item.sender.name}</Text>
          )}
          <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.otherMessageTime]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
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
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
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
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    headerAvatarText: {
      fontSize: 18,
    },
    headerInfo: {
      flex: 1,
    },
    headerName: {
      ...typography.h3,
      color: colors.text,
      fontWeight: 'bold',
    },
    headerStatus: {
      ...typography.caption,
      color: colors.success,
    },
    headerActions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
    },
    messageContainer: {
      flexDirection: 'row',
      marginVertical: Spacing.xs,
      alignItems: 'flex-end',
    },
    myMessage: {
      justifyContent: 'flex-end',
    },
    otherMessage: {
      justifyContent: 'flex-start',
    },
    messageAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    messageBubble: {
      maxWidth: '75%',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.lg,
    },
    myMessageBubble: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    otherMessageBubble: {
      backgroundColor: colors.surface,
      borderBottomLeftRadius: 4,
    },
    senderName: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: 2,
    },
    messageText: {
      ...typography.body,
      marginBottom: 2,
    },
    myMessageText: {
      color: colors.surface,
    },
    otherMessageText: {
      color: colors.text,
    },
    messageTime: {
      ...typography.caption,
      fontSize: 11,
    },
    myMessageTime: {
      color: colors.surface + '80',
      textAlign: 'right',
    },
    otherMessageTime: {
      color: colors.textSecondary,
    },
    systemMessage: {
      alignItems: 'center',
      marginVertical: Spacing.md,
    },
    systemMessageText: {
      ...typography.caption,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full,
      textAlign: 'center',
    },
    typingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
    },
    typingText: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputActions: {
      flexDirection: 'row',
      marginRight: Spacing.sm,
    },
    inputActionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.xs,
    },
    messageInput: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      ...typography.body,
      color: colors.text,
      maxHeight: 100,
    },
    sendButton: {
      marginLeft: Spacing.sm,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
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
        
        <View style={styles.headerContent}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{groupInfo.avatar}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{groupInfo.name}</Text>
            <Text style={styles.headerStatus}>
              {groupInfo.onlineMembers} of {groupInfo.members} members online
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Video size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/manage-member-roles')}
          >
            <MoreHorizontal size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id}>
            {renderMessage({ item: msg })}
          </View>
        ))}
      </ScrollView>

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>Someone is typing...</Text>
        </View>
      )}

      {/* Message Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.inputActionButton}>
              <Plus size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputActionButton}>
              <Camera size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputActionButton}>
              <Smile size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Send size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
