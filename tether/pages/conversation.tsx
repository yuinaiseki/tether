import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft, Pause, Lightbulb, MessageCircleHeart } from 'lucide-react-native';
import styles from "../styles/styles"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConversationProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onPause: () => void;
}

export const Conversation = ({ contact, onBack, onPause }: ConversationProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={styles.background}
      resizeMode='cover'
    >
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ChevronLeft size={40} color={palette.slate} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.statusText}>In conversation</Text>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>

        <View style={styles.avatarsContainer}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
               <Image source = {require('../assets/frogs/frog.png')}/>
            </View>
            <Text style={styles.nameText}>{contact.name}</Text>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusLabel}>Speaking</Text>
            </View>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.avatarSection}>
            <View style={[styles.avatar, {width: 100, height: 100}]}>
               <Image source = {require('../assets/frogs/frog.png')}/>
            </View>
            <Text style={styles.nameText}>You</Text>
          </View>
        </View>

        <View style={styles.resourcesContainer}>
          <TouchableOpacity style={styles.resourceCard}>
            <View style={[styles.resourceIcon, { backgroundColor: palette.teal }]}>
              <Lightbulb size={35} color={palette.cream}/>
            </View>
            <Text style={styles.resourceTitle}>Conversation{'\n'}Starters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceCard}>
            <View style={[styles.resourceIcon, { backgroundColor: palette.lightBrown }]}>
              <MessageCircleHeart size={33} color={palette.cream}/>
            </View>
            <Text style={styles.resourceTitle}>Empathy Prompts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pauseHintText}>Pause for more resources</Text>

        <TouchableOpacity 
          style={styles.pauseButton}
          onPress={onPause}
        >
          <Pause size={24} color={palette.cream} fill={palette.cream} />
          <Text style={styles.pauseButtonText}>PAUSE & BREATHE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
