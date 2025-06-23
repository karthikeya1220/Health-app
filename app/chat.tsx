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
import { ResponsiveLayout, useResponsiveDimensions } from '@/components/ui/ResponsiveLayout';
import { 
  SCREEN, 
  LAYOUT, 
  TOUCH,
  COMPONENT,
  TYPOGRAPHY,
  responsiveValue,
  useBreakpoint 
} from '@/utils/responsive';

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
  const { isMobile, isCompact, contentPadding } = useResponsiveDimensions();
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
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: COMPONENT.getHeaderHeight(),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      width: TOUCH.getTouchSize(40),
      height: TOUCH.getTouchSize(40),
      borderRadius: TOUCH.getTouchSize(40) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(16),
    },
    headerInfo: {
      flex: 1,
    },    
    headerTitle: {
      fontSize: TYPOGRAPHY.getHeaderSize(3),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getHeaderSize(3)),
      color: colors.text,
      fontWeight: '600',
    },
    headerSubtitle: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize()),
      color: colors.textSecondary,
      marginTop: 2,
    },
    headerActions: {
      flexDirection: 'row',
      gap: LAYOUT.getPadding(8),
    },
    headerButton: {
      width: TOUCH.getTouchSize(40),
      height: TOUCH.getTouchSize(40),
      borderRadius: TOUCH.getTouchSize(40) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
    },    messageContainer: {
      marginBottom: LAYOUT.getPadding(16),
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
      width: responsiveValue({ xs: 28, sm: 32, default: 32 }),
      height: responsiveValue({ xs: 28, sm: 32, default: 32 }),
      borderRadius: responsiveValue({ xs: 14, sm: 16, default: 16 }),
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: LAYOUT.getPadding(12),
    },
    avatar: {
      fontSize: responsiveValue({ xs: 14, sm: 16, default: 16 }),
    },
    messageBubble: {
      maxWidth: responsiveValue({ xs: '80%', sm: '75%', default: '75%' }),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(12),
      borderRadius: LAYOUT.getBorderRadius(16),
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
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium'), 1.4),
    },
    myMessageText: {
      color: colors.surface,
    },
    otherMessageText: {
      color: colors.text,
    },
    messageTime: {
      fontSize: TYPOGRAPHY.getCaptionSize(),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getCaptionSize()),
      marginTop: LAYOUT.getPadding(4),
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
      alignItems: 'flex-end',      paddingHorizontal: contentPadding,
      paddingVertical: LAYOUT.getPadding(16),
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: colors.background,
      borderRadius: LAYOUT.getBorderRadius(24),
      paddingHorizontal: LAYOUT.getPadding(16),
      paddingVertical: LAYOUT.getPadding(12),
      marginRight: LAYOUT.getPadding(12),
      maxHeight: responsiveValue({ xs: 80, sm: 100, default: 100 }),
      minHeight: COMPONENT.input.md,
    },
    textInput: {
      fontSize: TYPOGRAPHY.getBodySize('medium'),
      lineHeight: TYPOGRAPHY.getLineHeight(TYPOGRAPHY.getBodySize('medium')),
      color: colors.text,
      flex: 1,
      paddingVertical: LAYOUT.getPadding(8),
      minHeight: responsiveValue({ xs: 32, sm: 36, default: 36 }),
      maxHeight: responsiveValue({ xs: 64, sm: 80, default: 80 }),
    },
    inputActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: LAYOUT.getPadding(8),
    },
    inputButton: {
      width: TOUCH.getTouchSize(32),
      height: TOUCH.getTouchSize(32),
      borderRadius: TOUCH.getTouchSize(32) / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButton: {
      width: TOUCH.getTouchSize(44),
      height: TOUCH.getTouchSize(44),
      borderRadius: TOUCH.getTouchSize(44) / 2,
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
    <ResponsiveLayout safeArea={true} scrollable={false} padding={false}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeft size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Morning Runners</Text>
              <Text style={styles.headerSubtitle}>12 members • Active now</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <Phone size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <Video size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <MoreHorizontal size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
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
              <TouchableOpacity style={styles.inputButton} activeOpacity={0.7}>
                <Paperclip size={responsiveValue({ xs: 16, sm: 18, default: 18 })} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputButton} activeOpacity={0.7}>
                <Smile size={responsiveValue({ xs: 16, sm: 18, default: 18 })} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={!messageText.trim()}
            activeOpacity={0.8}
          >
            <Send size={responsiveValue({ xs: 18, sm: 20, default: 20 })} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ResponsiveLayout>
  );
}
