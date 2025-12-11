import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { updatePortalStep } from '../../utils/portalProgress';
import { getReflectionAIResponse } from '../../utils/gemini';

interface ReflectProps {
  contact?: { id: string; name: string; color: any };
  onBack: () => void;
  onContinue?: () => void;
  onBackToPortal?: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
}

export const Reflect = ({ contact, onBack, onContinue, onBackToPortal }: ReflectProps) => {
  // Use onBack as fallback for onContinue and onBackToPortal if not provided
  const handleContinue = async () => {
    // Mark reflect as completed if contact is provided
    if (contact) {
      await updatePortalStep(contact.id, 'reflectCompleted', true);
    }
    
    if (onContinue) {
      onContinue();
    } else if (onBackToPortal) {
      onBackToPortal();
    } else {
      onBack();
    }
  };
  
  const handleBackToPortal = onBackToPortal || onBack;
  
  const contactName = contact?.name || 'them';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi! I'm Tether AI, and I'm here to help you reflect after your conversation with ${contactName}.\n\nTaking a moment to reflect can help you:\n\n• Process what was shared and how you're feeling\n\n• Recognize growth moments and insights gained\n\n• Appreciate the courage it took to have this conversation\n\n• Consider next steps in your relationship\n\nHow are you feeling about the conversation you just had?`,
      isAI: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const userInput = inputText.trim();
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: userInput,
        isAI: false
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setInputText('');
      
      try {
        // Call Gemini AI to get response
        const aiResponseText = await getReflectionAIResponse(userInput, contactName, messages);
        
        // Add AI response
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponseText,
          isAI: true
        };
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Add error message
        const errorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `I'm sorry, I encountered an error while processing your reflection. Please try again or check your internet connection.`,
          isAI: true
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.screen}>
            <View style={[styles.heading, {marginBottom: 10}]}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={40} color={palette.slate} />
              </TouchableOpacity>
              <Text style={styles.headingtext}>Reflect</Text>
            </View>

            <ScrollView 
              style={styles.chatContainer}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <View 
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.isAI ? styles.aiMessage : styles.userMessage
                  ]}
                >
                  {message.isAI && (
                    <View style={{flexDirection: "column"}}>
                      <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <Sparkles size={28} color={palette.slate}/>
                        <Text style={[styles.headingtext, {fontSize: 24}]}>Tether AI</Text>
                      </View>
                      <View style={styles.divider} />
                    </View>
                  )}
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
            </ScrollView>

             <View style={[styles.inputArea, { marginBottom: 80 }]}>
              <TextInput
                style={styles.chatInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Share your thoughts about the conversation, what you learned, or how you're feeling..."
                placeholderTextColor={palette.mutedBrown}
                multiline
                editable={!isLoading}
              />
              <TouchableOpacity 
                onPress={handleSend} 
                style={styles.sendButton}
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={palette.slate} />
                ) : (
                  <Send size={26} color={palette.slate} />
                )}
              </TouchableOpacity>
            </View> 
              <TouchableOpacity
                style={[portalStyles.continueButton, { bottom: 20, right: 80 }]}
                onPress={handleContinue}
              >
                <Text style={portalStyles.continueButtonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleBackToPortal} style={[portalStyles.backToPortalButton, { bottom: 20, left: 70 }]}>
                <Text style={portalStyles.backToPortalText}>Back to Portal</Text>
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        
      </SafeAreaView>
    </ImageBackground>
  );
};