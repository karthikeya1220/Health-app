import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, MessageCircle, Users, Search, Phone, Video } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography, TextStyles } from '@/theme/typography';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function DirectMessageScreen() {
  const { colors, themeMode } = useTheme();
  const typography = getTypography(themeMode === 'dark');
  const [message, setMessage] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Mock data for conversation
  const messages = [
    {
      id: '1',
      text: 'Hey! How was your workout today?',
      sender: 'other',
      time: '10:30 AM',
      avatar: 'https://via.placeholder.com/40x40/6366f1/FFFFFF?text=S'
    },
    {
      id: '2',
      text: 'It was great! Just finished a 5K run. How about you?',
      sender: 'me',
      time: '10:32 AM',
    },
    {
      id: '3',
      text: 'Nice! I did some strength training. Want to join me for tomorrow\'s yoga session?',
      sender: 'other',
      time: '10:35 AM',
      avatar: 'https://via.placeholder.com/40x40/6366f1/FFFFFF?text=S'
    },
    {
      id: '4',
      text: 'Absolutely! What time?',
      sender: 'me',
      time: '10:36 AM',
    }
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: typeof messages[0] }) => {
    const isMe = item.sender === 'me';
    
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        {!isMe && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.otherMessageTime]}>
            {item.time}
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
      marginRight: Spacing.md,
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
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
      alignItems: 'center',    },
    sendButtonInner: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });return (
    <LinearGradient
      colors={[colors.background, colors.background + 'CC', colors.surface + '66']}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Header */}
          <LinearGradient
            colors={[colors.primary + '15', colors.surface]}
            style={styles.header}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color={colors.text} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40x40/6366f1/FFFFFF?text=S' }}
                style={styles.headerAvatar}
              />
              <View style={styles.headerInfo}>
                <Text style={[TextStyles.h3, styles.headerName]}>Sarah Johnson</Text>
                <Text style={styles.headerStatus}>Online</Text>
              </View>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Video size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Messages */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            inverted
          />

          {/* Message Input */}
          <LinearGradient
            colors={[colors.surface, colors.surface + 'F0']}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <LinearGradient
              colors={[colors.primary, colors.primary + 'DD']}
              style={styles.sendButton}
            >
              <TouchableOpacity 
                style={styles.sendButtonInner}
                onPress={sendMessage}
              >
                <Send size={20} color={colors.surface} />
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
