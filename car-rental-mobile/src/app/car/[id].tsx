import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { carImage, useCar } from '@/data/cars';

export default function CarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { car, error } = useCar(Number(id));
  const { width } = useWindowDimensions();
  const { addItem } = useCart();

  const [days, setDays] = useState(1);

  if (!car) {
    return (
      <View style={styles.notFound}>{error ? <Text>{error}</Text> : <ActivityIndicator />}</View>
    );
  }

  const specs = [
    { label: 'Transition', value: car.transmission },
    { label: 'Speed', value: `${car.maxSpeed}kmph` },
    { label: 'Rating', value: `${car.rating}/5` },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.panel}>
        <Text style={styles.watermark}>TIIRA</Text>
        <Image
          source={carImage(car)}
          contentFit="contain"
          style={[styles.carImage, { width: width - 20 }]}
        />

        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
            size={44}
            tintColor={Colors.white}
          />
        </Pressable>
        <View style={styles.more}>
          <SymbolView
            name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
            size={32}
            tintColor={Colors.white}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{car.name}</Text>
          <Text style={styles.price}>${car.pricePerDay.toFixed(2)}</Text>
        </View>

        <View style={{ flex: 41 }} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specsScroll}
          contentContainerStyle={styles.specs}>
          {specs.map((spec) => (
            <View key={spec.label} style={styles.spec}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ flex: 21 }} />
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotMiddle]} />
          <View style={styles.dot} />
        </View>

        <View style={{ flex: 14 }} />
        <Text style={styles.render}>RENDER</Text>

        <View style={{ flex: 18 }} />
        <View style={styles.ownerRow}>
          <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
          <Text style={styles.ownerName}>Lorem Ipsum</Text>
          <SymbolView
            name={{ ios: 'ellipsis.message', android: 'sms', web: 'sms' }}
            size={36}
            tintColor={Colors.brown}
            style={styles.chatIcon}
          />
          <SymbolView
            name={{ ios: 'phone', android: 'call', web: 'call' }}
            size={32}
            tintColor={Colors.darkBlue}
          />
        </View>

        <View style={{ flex: 32 }} />
        <View style={styles.bookRow}>
          <Pressable onPress={() => setDays(days + 1)} style={styles.counterButton}>
            <Text style={styles.counterSign}>+</Text>
          </Pressable>
          <Text style={styles.days}>{days}</Text>
          <Pressable onPress={() => setDays(Math.max(1, days - 1))} style={styles.counterButton}>
            <Text style={styles.counterSign}>-</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              addItem(car, days);
              router.push('/cart');
            }}
            style={({ pressed }) => [styles.bookButton, pressed && styles.pressed]}>
            <Text style={styles.bookText}>BOOK NOW</Text>
          </Pressable>
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
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    height: '49%',
    backgroundColor: Colors.lightBlue,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    zIndex: 1,
  },
  watermark: {
    position: 'absolute',
    left: 25,
    top: 144,
    fontFamily: Fonts.title,
    fontSize: 160,
    lineHeight: 160,
    color: 'rgba(255, 255, 255, 0.44)',
  },
  carImage: {
    position: 'absolute',
    left: 10,
    top: 190,
    height: '53%',
  },
  back: {
    position: 'absolute',
    left: 22,
    top: 46,
  },
  more: {
    position: 'absolute',
    right: 30,
    top: 52,
  },
  body: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 37,
  },
  nameRow: {
    paddingLeft: 25,
    paddingRight: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: Colors.black,
  },
  price: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.red,
  },
  specsScroll: {
    flexGrow: 0,
    overflow: 'visible',
  },
  specs: {
    paddingLeft: 21,
    paddingBottom: 8,
    gap: 15,
  },
  spec: {
    width: 155,
    height: 89,
    paddingTop: 14,
    borderRadius: 3,
    backgroundColor: Colors.paleGray,
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  specLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.lightBlue,
  },
  specValue: {
    marginTop: 12,
    fontFamily: Fonts.sans,
    fontSize: 12,
    color: Colors.black,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.darkBlue,
  },
  dotMiddle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.66,
  },
  render: {
    marginLeft: 21,
    fontFamily: 'sans-serif-condensed',
    fontSize: 15,
    color: Colors.darkBlue,
  },
  ownerRow: {
    paddingLeft: 21,
    paddingRight: 43,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 47,
    borderRadius: 24,
  },
  ownerName: {
    marginLeft: 11,
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: Colors.darkBlue,
  },
  chatIcon: {
    marginLeft: 'auto',
    marginRight: 16,
  },
  bookRow: {
    paddingLeft: 37,
    paddingRight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterSign: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  days: {
    width: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  bookButton: {
    flex: 1,
    height: 52,
    marginLeft: 14,
    borderRadius: 10,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookText: {
    fontFamily: Fonts.title,
    fontSize: 20,
    color: Colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
});
