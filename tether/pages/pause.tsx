import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import { palette } from '../styles/palette';
import { Play } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PauseProps {
  onResume: () => void;
}

export const Pause = ({ onResume }: PauseProps) => {
  const [timeRemaining, setTimeRemaining] = useState(296); // 4:56
  const breatheScale = new Animated.Value(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // Breathing animation
    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheScale, {
          toValue: 1.3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheScale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    breatheAnimation.start();

    return () => {
      clearInterval(timer);
      breatheAnimation.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={localStyles.background}
      resizeMode='cover'
    >
      <View style={localStyles.container}>
        <Text style={localStyles.statusText}>Conversation Paused</Text>

        <Animated.View 
          style={[
            localStyles.breatheCircle,
            { transform: [{ scale: breatheScale }] }
          ]}
        >
          <Text style={localStyles.breatheText}>Breathe</Text>
        </Animated.View>

        <View style={localStyles.timerSection}>
          <Text style={localStyles.timerLabel}>Time Remaining</Text>
          <Text style={localStyles.timerText}>{formatTime(timeRemaining)}</Text>
          <Text style={localStyles.breatheInstruction}>
            Inhale deeply... Hold... Exhale slowly...
          </Text>
        </View>

        <View style={localStyles.resourcesSection}>
          <Text style={localStyles.resourcesTitle}>Conversation Resources</Text>
          
          <View style={localStyles.resourcesGrid}>
            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#FFB84D' }]}>
                <Text style={localStyles.resourceIconText}>💡</Text>
              </View>
              <Text style={localStyles.resourceTitle}>Conversation{'\n'}Starters</Text>
              <Text style={localStyles.resourceSubtitle}>Suggested phrases{'\n'}to move forward</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#4ECDC4' }]}>
                <Text style={localStyles.resourceIconText}>👂</Text>
              </View>
              <Text style={localStyles.resourceTitle}>Active Listening Tips</Text>
              <Text style={localStyles.resourceSubtitle}>Ways to show you're{'\n'}engaged</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#FF6B9D' }]}>
                <Text style={localStyles.resourceIconText}>❤️</Text>
              </View>
              <Text style={localStyles.resourceTitle}>Empathy Prompts</Text>
              <Text style={localStyles.resourceSubtitle}>Connect with their{'\n'}perspective</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#9B59B6' }]}>
                <Text style={localStyles.resourceIconText}>🛡️</Text>
              </View>
              <Text style={localStyles.resourceTitle}>Boundary Setting</Text>
              <Text style={localStyles.resourceSubtitle}>Respectful ways to{'\n'}set limits</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#3498DB' }]}>
                <Text style={localStyles.resourceIconText}>📉</Text>
              </View>
              <Text style={localStyles.resourceTitle}>De-escalation Tactics</Text>
              <Text style={localStyles.resourceSubtitle}>Calm heated{'\n'}moments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.resourceCard}>
              <View style={[localStyles.resourceIcon, { backgroundColor: '#E74C3C' }]}>
                <Text style={localStyles.resourceIconText}>🔄</Text>
              </View>
              <Text style={localStyles.resourceTitle}>Reflection Questions</Text>
              <Text style={localStyles.resourceSubtitle}>Deepen mutual{'\n'}understanding</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={localStyles.resumeButton}
          onPress={onResume}
        >
          <Play size={24} color={palette.cream} fill={palette.cream} />
          <Text style={localStyles.resumeButtonText}>RESUME CONVERSATION</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.cream,
    marginBottom: 30,
  },
  breatheCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#9B8CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#9B8CFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  breatheText: {
    fontSize: 28,
    fontFamily: 'Avenir',
    color: palette.cream,
    fontWeight: '600',
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerLabel: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: palette.cream,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontFamily: 'Avenir',
    color: palette.cream,
    fontWeight: '700',
    marginBottom: 12,
  },
  breatheInstruction: {
    fontSize: 15,
    fontFamily: 'Avenir',
    color: palette.cream + 'CC',
    fontStyle: 'italic',
  },
  resourcesSection: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  resourcesTitle: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: palette.cream,
    fontWeight: '600',
    marginBottom: 16,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  resourceCard: {
    backgroundColor: palette.slate + 'CC',
    borderRadius: 16,
    padding: 12,
    width: SCREEN_WIDTH * 0.43,
    alignItems: 'center',
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceIconText: {
    fontSize: 20,
  },
  resourceTitle: {
    fontSize: 13,
    fontFamily: 'Avenir',
    color: palette.cream,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 11,
    fontFamily: 'Avenir',
    color: palette.cream + 'AA',
    textAlign: 'center',
    lineHeight: 14,
  },
  resumeButton: {
    backgroundColor: palette.teal,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: SCREEN_WIDTH * 0.85,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resumeButtonText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: palette.cream,
    fontWeight: '700',
  },
});