import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { Colors, Fonts } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/splash-bg.png')}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar style="light" />

      <Text style={styles.logo}>
        T<Text style={styles.logoAccent}>II</Text>RA
      </Text>

      <View style={styles.spacer} />

      <View style={styles.line} />
      <Text style={styles.slogan}>Rent your dream car from the Best Company</Text>

      <PrimaryButton
        title="Get Started"
        showArrow
        onPress={() => router.replace('/sign-in')}
        style={styles.button}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 26,
    paddingBottom: 80,
  },
  logo: {
    marginTop: 218,
    alignSelf: 'center',
    fontFamily: Fonts.logo,
    fontSize: 50,
    color: Colors.white,
  },
  logoAccent: {
    color: Colors.darkBlue,
  },
  spacer: {
    flex: 1,
  },
  line: {
    width: 145,
    height: 8,
    backgroundColor: Colors.darkBlue,
  },
  slogan: {
    marginTop: 11,
    fontFamily: Fonts.text,
    fontSize: 26,
    lineHeight: 30,
    color: Colors.whiteSoft,
    textAlign: 'center',
  },
  button: {
    width: 243,
    marginTop: 70,
    alignSelf: 'center',
  },
});
