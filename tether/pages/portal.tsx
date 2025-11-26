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
const spiral = require('../assets/portal/everything1.png');
const together = require('../assets/portal/together.png');
const expectations = require('../assets/portal/expectations.png');
const reflect = require('../assets/portal/reflect.png');
const expectations_text = require('../assets/portal/expectation_word.png');
const lock = require('../assets/portal/lock.png');



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
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* Two frogs in upper right */}
      <View style={newstyles.frogsContainer}>
        <Image 
          source={require("../assets/frogs/cute_frogsx2.png")} 
          style={newstyles.frogsImage} 
        />
        <View style={newstyles.labelsContainer}>
          <Text style={newstyles.userGraphicLabel}>You</Text>
          <Text style={newstyles.userGraphicLabel}>{contact.name}</Text>
        </View>
      </View>
      <Image 
            source={spiral} 
            style={newstyles.spiral} 
      />
      {/* <View style={newstyles.expectations_text_container}>
        <Image 
          source={expectations_text} 
          style={newstyles.expectations_text} 
        />
        <Image 
          source={lock} 
          style={newstyles.lock} 
        />
      </View> */}
      <Image 
            source={expectations} 
            style={newstyles.expectations} 
      />
      <Image 
            source={reflect} 
            style={newstyles.reflect} 
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
  frogsContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.1,
    right: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
    zIndex: 5,
    gap: .1,
  },
  frogsImage: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
  },
  labelsContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 5,
  },
  userGraphicLabel: {
    fontSize: 14,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  spiral: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.4,
    resizeMode: 'contain',
    bottom: SCREEN_HEIGHT * 0.45,
    left: SCREEN_WIDTH * 0.1,
    zIndex: 10,
  },
  // expectations_text_container: {
  //   // position: 'absolute',
  //   // width: SCREEN_WIDTH * 0.35,
  //   // height: SCREEN_HEIGHT * 0.35,
  //   // resizeMode: 'contain',
  //   // bottom: SCREEN_HEIGHT * 0.5,
  //   // left: SCREEN_WIDTH * 0.2,
  //   // zIndex: 1,
  // },
  // expectations_text: {
  //   // position: 'absolute',
  //   // width: SCREEN_WIDTH * 0.35,
  //   // height: SCREEN_HEIGHT * 0.35,
  //   // resizeMode: 'contain',
  //   // bottom: SCREEN_HEIGHT * 0.465,
  //   // left: SCREEN_WIDTH * 0.15,
  //   // zIndex: 1,
  // },
  // lock: {
  //   // position: 'absolute',
  //   // width: SCREEN_WIDTH * 0.35,
  //   // height: SCREEN_HEIGHT * 0.35,
  //   // resizeMode: 'contain',
  //   // bottom: SCREEN_HEIGHT * 0.465,
  //   // left: SCREEN_WIDTH * 0.15,
  //   // zIndex: 1,
  // },

  expectations: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.35,
    resizeMode: 'contain',
    bottom: SCREEN_HEIGHT * 0.35,
    left: SCREEN_WIDTH * 0.6,
    zIndex: 1,
  },
  reflect: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.4,
    resizeMode: 'contain',
    bottom: SCREEN_HEIGHT * 0.15,
    left: SCREEN_WIDTH * 0.1,
    zIndex: 1,
  },
  elementcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 30,
    paddingTop: 5,
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