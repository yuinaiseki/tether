import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { ChevronLeft, Phone } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

const Back = require('../../assets/portal/Back.png');
const strokemap = require('../../assets/portal/strokemap.png');

const together = require('../../assets/portal/together.png');
const expectationsnum= require('../../assets/portal/expectation#image.png');
const reflect = require('../../assets/portal/reflect_icon.png');
const three = require('../../assets/portal/three_circle.png');

const one = require('../../assets/portal/one.png');
const spiral = require('../../assets/portal/spiral_res.png');
const invite = require('../../assets/portal/invite.png');
const two = require('../../assets/portal/two.png');
const expectations = require('../../assets/portal/expectations_.png');
const lock = require('../../assets/portal/graylock.png');
const assurances = require('../../assets/portal/assurances.png');


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onNavigateToExpectations: () => void;
  onNavigateToReflect: () => void;
  onNavigateToAcceptInvite: () => void;
  onStartCall?: () => void;
}

export const Portal = ({ contact, onBack, onNavigateToExpectations, onNavigateToReflect, onNavigateToAcceptInvite, onStartCall }: PortalProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      // {require("../assets/backgrounds/light_ombre.png")}
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
      <View style={portalStyles.frogsContainer}>
        <Image 
          source={require("../../assets/frogs/cute_frogsx2.png")} 
          style={portalStyles.frogsImage} 
        />
        <View style={portalStyles.labelsContainer}>
          <Text style={portalStyles.userGraphicLabel}>You</Text>
          <Text style={portalStyles.userGraphicLabel}>{contact.name}</Text>
        </View>
      </View>
      <TouchableOpacity 
        onPress={onNavigateToAcceptInvite}
        style={portalStyles.spiralTouchable}
      >
        <Image 
          source={one} 
          style={portalStyles.one} 
        />
      </TouchableOpacity>
      <Image 
          source={invite} 
          style={portalStyles.invite} 
      />

      <Image 
              source={spiral} 
              style={portalStyles.spiral} 
        />
      {/* <View style={portalStyles.expectations_text_container}>
        <Image 
          source={expectations_text} 
          style={portalStyles.expectations_text} 
        />
        <Image 
          source={lock} 
          style={portalStyles.lock} 
        />
      </View> */}
      <TouchableOpacity 
        onPress={onNavigateToExpectations}
        style={portalStyles.expectationsTouchable}
      >
        <Image 
              source={two} 
              style={portalStyles.two} 
        />
      </TouchableOpacity>
      <Image 
        source={expectations} 
        style={portalStyles.expectationsImage} 
      />
      <View style={portalStyles.reflectContainer}> 
        <TouchableOpacity 
          onPress={onNavigateToReflect}
          style={portalStyles.reflectTouchable}
        > 
          <Image 
            source={lock} 
            style={portalStyles.lock} 
          />
        </TouchableOpacity>
      </View>
      <Image 
        source={assurances} 
        style={portalStyles.assurances} 
      />
      
      <TouchableOpacity 
        style={portalStyles.portalCallButton}
        onPress={onStartCall}>
        <View style={portalStyles.portalCallButtonInner}>
          <Phone size={32} color={palette.cream} />
        </View>
      </TouchableOpacity>

      
      <View style={portalStyles.elementcontainer}>
         <Image 
            source={strokemap} 
            style={portalStyles.strokemap} 
          />
        <Image 
            source={together} 
            style={portalStyles.together} 
          />
       </View>
       
      
    </ImageBackground>
  );
};
