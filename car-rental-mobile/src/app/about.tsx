import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={34}
            tintColor={Colors.darkBlue}
          />
        </Pressable>
        <SymbolView
          name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
          size={32}
          tintColor={Colors.darkBlue}
        />
      </View>

      <Text style={styles.title}>About Us</Text>

      <Text style={styles.text}>
        {
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly use to demonstrate the visual form of a document\n\nOr a a typeface without rely meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'
        }
      </Text>
      <Text style={styles.more}>More</Text>

      <Text style={styles.reach}>Reach Us</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Image source={require('@/assets/images/about/phone.svg')} style={styles.phoneIcon} />
        </View>
        <View style={styles.button}>
          <Image source={require('@/assets/images/about/email.svg')} style={styles.emailIcon} />
        </View>
        <View style={styles.button}>
          <Image
            source={require('@/assets/images/about/location.svg')}
            style={styles.locationIcon}
          />
        </View>
      </View>

      <Image
        source={require('@/assets/images/about/map.jpg')}
        contentFit="cover"
        style={styles.map}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    marginTop: 54,
    paddingLeft: 35,
    paddingRight: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 48,
    marginLeft: 35,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    color: Colors.black,
  },
  text: {
    height: 200,
    marginTop: 29,
    marginLeft: 24,
    marginRight: 3,
    fontFamily: Fonts.menuRegular,
    fontSize: 19,
    lineHeight: 24,
    color: '#7B7B7B',
  },
  more: {
    marginTop: 15,
    marginRight: 49,
    alignSelf: 'flex-end',
    fontSize: 16,
    lineHeight: 19,
    color: Colors.red,
  },
  reach: {
    marginTop: 70,
    marginLeft: 35,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.black,
  },
  buttons: {
    marginTop: 25,
    marginLeft: 43,
    flexDirection: 'row',
    gap: 23,
  },
  button: {
    width: 83,
    height: 27,
    borderRadius: 7,
    backgroundColor: 'rgba(246, 246, 246, 0.52)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    width: 19,
    height: 20,
  },
  emailIcon: {
    width: 21,
    height: 20,
  },
  locationIcon: {
    width: 23,
    height: 23,
  },
  map: {
    height: 170,
    marginTop: 47,
    marginHorizontal: 20,
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
});
