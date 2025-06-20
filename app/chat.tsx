import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Send, 
  MoreHorizontal, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  MessageCircle
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  avatar?: string;
  name?: string;
}

export default function ChatScreen() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! Ready for our morning run tomorrow?',
      sender: 'other',
      timestamp: '10:30 AM',
      name: 'Sarah',
      avatar: '👩‍🦰'
    },
    {
      id: '2',
      text: 'Absolutely! What time are we meeting?',
      sender: 'me',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      text: 'How about 7 AM at Central Park? The weather looks perfect!',
      sender: 'other',
      timestamp: '10:35 AM',
      name: 'Sarah',
      avatar: '👩‍🦰'
    },
    {
      id: '4',
      text: 'Perfect! See you there 🏃‍♀️',
      sender: 'me',
      timestamp: '10:36 AM'
    }
  ]);

  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const isMe = message.sender === 'me';
    const showAvatar = !isMe && (index === 0 || messages[index - 1].sender !== message.sender);
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.otherMessageContainer,
          { opacity: fadeAnim }
        ]}
      >
        {showAvatar && (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{message.avatar || '👤'}</Text>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isMe ? styles.myMessageBubble : styles.otherMessageBubble,
          !showAvatar && !isMe && { marginLeft: 50 }
        ]}>
          <Text style={[
            styles.messageText,
            isMe ? styles.myMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
          <Text style={[
            styles.messageTime,
            isMe ? styles.myMessageTime : styles.otherMessageTime
          ]}>
            {message.timestamp}
          </Text>
        </View>
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
      flex: 1,
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
    headerInfo: {
      flex: 1,
    },    headerTitle: {
      ...typography.h3,
      color: colors.text,
    },
    headerSubtitle: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    headerActions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    headerButton: {
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
      paddingVertical: Spacing.md,
    },
    messageContainer: {
      marginBottom: Spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    myMessageContainer: {
      justifyContent: 'flex-end',
    },
    otherMessageContainer: {
      justifyContent: 'flex-start',
    },
    avatarContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.sm,
    },
    avatar: {
      fontSize: 16,
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
      borderWidth: 1,
      borderColor: colors.border,
    },
    messageText: {
      ...typography.body,
      lineHeight: 20,
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
      marginTop: 4,
    },
    myMessageTime: {
      color: colors.surface + '80',
      textAlign: 'right',
    },
    otherMessageTime: {
      color: colors.textSecondary,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: colors.background,
      borderRadius: BorderRadius.xl,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginRight: Spacing.sm,
      maxHeight: 100,
    },
    textInput: {
      ...typography.body,
      color: colors.text,
      flex: 1,
      paddingVertical: Spacing.xs,
      minHeight: 36,
      maxHeight: 80,
    },
    inputActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    inputButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Morning Runners</Text>
              <Text style={styles.headerSubtitle}>12 members • Active now</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Phone size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Video size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
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
          {messages.map((message, index) => renderMessage(message, index))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.inputButton}>
                <Paperclip size={18} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputButton}>
                <Smile size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={!messageText.trim()}
          >
            <Send size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
