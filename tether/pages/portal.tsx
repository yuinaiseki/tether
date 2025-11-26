import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import styles from '../styles/styles';
import { palette } from '../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

const Back = require('../assets/portal/Back.png');
const strokemap = require('../assets/portal/strokemap.png');
const spiral = require('../assets/portal/spiral.png');
const together = require('../assets/portal/together.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string };
  onBack: () => void;
}

export const Portal = ({ contact, onBack }: PortalProps) => {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={styles.screen}>
          <View style={[styles.heading, {marginBottom: 0}]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={40} color={palette.slate} />
            </TouchableOpacity>
            {/* <Text style={styles.headingtext}>Portal with {contact.name}</Text> */}
          </View>

          <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.centeredContent}>
              <View style={styles.userImg}>
                <Image 
                  source={require("../assets/frogs/cute_frogsx2.png")} 
                  style={{width: 150, height: 65}} 
                />
              </View>
              <View style={styles.userGraphic}>
                <Text style={styles.userGraphicLabel}>You</Text>
                <Text style={styles.userGraphicLabel}>{contact.name}</Text>
              </View>
            </View>
           
          </ScrollView>
        </View>
      </SafeAreaView>
      <Image 
            source={spiral} 
            style={newstyles.spiral} 
      />
      <View style={newstyles.elementcontainer}>
         <Image 
            source={strokemap} 
            style={newstyles.strokemap} 
          />
        <Image 
            source={together} 
            style={newstyles.together} 
          />
       </View>
    </ImageBackground>
  );
};

const newstyles = StyleSheet.create({
  spiral: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'contain',
    bottom: SCREEN_HEIGHT * 0.48,
    left: SCREEN_WIDTH * 0.2,
    zIndex: 1,
  },
  elementcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 30,
    paddingTop: 10,
  },
  strokemap: {
    // width: SCREEN_WIDTH * 0.4,
    // position: 'absolute',
    // width: SCREEN_WIDTH * 0.6,
    // height: SCREEN_HEIGHT * 0.5,
    // resizeMode: 'contain',
    // alignSelf: 'center',
    // top: SCREEN_HEIGHT * 0.2,
    // zIndex: 1,
  },
  together: {
    width: "100%",
    height: "80%",
  },
});