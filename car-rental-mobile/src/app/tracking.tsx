import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';

export default function TrackingScreen() {
  const { width } = useWindowDimensions();
  const { order } = useCart();

  const k = width / 390;

  const [seconds, setSeconds] = useState(12 * 60 + 42);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={{ width, height: 625.6 * k }}>
        <Image source={require('@/assets/images/tracking/map.png')} style={styles.map} />

        <Image
          source={require('@/assets/images/tracking/origin-ring.svg')}
          style={{
            position: 'absolute',
            left: 115 * k,
            top: 589 * k,
            width: 36 * k,
            height: 34 * k,
          }}
        />
        <Image
          source={require('@/assets/images/tracking/origin-dot.svg')}
          style={{
            position: 'absolute',
            left: 127 * k,
            top: 601 * k,
            width: 12 * k,
            height: 12 * k,
          }}
        />

        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
          <Image
            source={require('@/assets/images/tracking/back-circle.svg')}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.title}>Car Tracking</Text>
      </View>

      <View style={styles.panel}>
        <Text style={[styles.heading, { left: 28, top: 31 }]}>Driver</Text>
        <Image source={require('@/assets/images/driver.png')} style={styles.avatar} />
        <Text style={styles.driverName}>David</Text>
        <Image source={require('@/assets/images/tracking/phone.svg')} style={styles.phone} />

        <Text style={[styles.heading, { left: 207, top: 34 }]}>Remaining Minutes</Text>
        <Image source={require('@/assets/images/tracking/clock.svg')} style={styles.clock} />
        <Text style={styles.time}>
          <Text style={styles.timeNumber}>{Math.floor(seconds / 60)}</Text> min{' '}
          <Text style={styles.timeNumber}>{seconds % 60}</Text> sec
        </Text>

        <View style={styles.location}>
          <Image source={require('@/assets/images/tracking/pin.svg')} style={styles.pin} />
          <Text style={styles.locationText}>{order?.location || 'Address not specified'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  back: {
    position: 'absolute',
    left: 37,
    top: 58,
  },
  backIcon: {
    width: 43,
    height: 42,
  },
  title: {
    position: 'absolute',
    left: 140,
    top: 64,
    fontSize: 20,
    color: Colors.darkBlue,
  },
  panel: {
    flex: 1,
  },
  heading: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  avatar: {
    position: 'absolute',
    left: 31,
    top: 59,
    width: 37,
    height: 36,
    borderRadius: 18,
  },
  driverName: {
    position: 'absolute',
    left: 76,
    top: 67,
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: Colors.darkBlue,
  },
  phone: {
    position: 'absolute',
    left: 127,
    top: 63,
    width: 21,
    height: 26,
  },
  clock: {
    position: 'absolute',
    left: 207,
    top: 70,
    width: 22,
    height: 21,
  },
  time: {
    position: 'absolute',
    left: 235,
    top: 72,
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: Colors.darkBlue,
  },
  timeNumber: {
    color: '#CCBDBD',
  },
  location: {
    position: 'absolute',
    left: 28,
    right: 13,
    top: 127,
    height: 38,
    borderRadius: 30,
    backgroundColor: 'rgba(43, 76, 89, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    marginLeft: 36,
    width: 29,
    height: 28,
  },
  locationText: {
    marginLeft: 14,
    flex: 1,
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'rgba(0, 0, 0, 0.58)',
  },
});
