import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4'
const db = createClient(supabaseUrl, supabaseKey)

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsSection1Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsSection1 = ({ onBack, onContinue, onBackToPortal }: ExpectationsSection1Props) => {
  const [textValue, setTextValue] = useState('');

  const submitResponse = async () => {
      const {data} = await db
        .from('expectations2')
        .insert({
          text: textValue.trim(),
        })
        .select();
  }
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={localStyles.background}
      resizeMode='cover'
    >
      <View style={localStyles.container}>
        <TouchableOpacity onPress={onBack} style={localStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={localStyles.content}>
          <Text style={localStyles.sectionTitle}>What You Can Control</Text>
          
          <View style={localStyles.bulletList}>
            <Text style={localStyles.bulletPoint}>• Your tone and body language</Text>
            <Text style={localStyles.bulletPoint}>• Your honesty and vulnerability</Text>
            <Text style={localStyles.bulletPoint}>• How calmly you communicate</Text>
            <Text style={localStyles.bulletPoint}>• How you respond if emotions rise</Text>
            <Text style={localStyles.bulletPoint}>• The clarity of what you want to say</Text>
          </View>

          <Text style={localStyles.prompt}>What do you want to make sure you stay in control of during this conversation?</Text>
          
          <TextInput
            style={localStyles.textBox}
            value={textValue}
            onChangeText={setTextValue}
            placeholder="Type your thoughts here..."
            placeholderTextColor={palette.mutedBrown}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={submitResponse} style={localStyles.savebutton}>
            <Text style={localStyles.savebuttontext}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Pressable
        style={localStyles.continueButton}
        onPress={onContinue}
      >
        <Text style={localStyles.continueButtonText}>Continue</Text>
      </Pressable>

      <TouchableOpacity onPress={onBackToPortal} style={localStyles.backToPortalButton}>
        <Text style={localStyles.backToPortalText}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'visible',
  },
  backButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.05,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 90,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  bulletList: {
    marginBottom: 24,
    width: '100%',
    paddingHorizontal: 30,
  },
  bulletPoint: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    lineHeight: 32,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 26,
    marginBottom: 16,
  },
  textBox: {
    backgroundColor: palette.lightBeige,
    borderRadius: 16,
    padding: 16,
    fontSize: 17,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    minHeight: 120,
    width: '90%',
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.lightGray,
    textAlignVertical: 'top',
  },
  savebutton: {
    backgroundColor: palette.slate,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  savebuttontext: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: palette.cream,
    fontWeight: '600',
  },
  continueButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    right: SCREEN_WIDTH * 0.1,
    backgroundColor: palette.lightBeige,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
  },
  backToPortalButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backToPortalText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: palette.slate,
    textDecorationLine: 'underline',
  },
});

