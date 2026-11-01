import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { Car, carImage } from '@/data/cars';

const cardColors: Record<number, string> = {
  1: 'rgba(252, 194, 27, 0.58)',
  2: '#CCBDBD',
  3: '#F6F6F6',
  4: '#F8F8F8',
  5: '#BECEDA',
};

type Props = {
  car: Car;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function CarCard({ car, onPress, style }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: cardColors[car.id] ?? Colors.paleGray }, style]}>
      <Image source={carImage(car)} contentFit="contain" style={styles.image} />
      <Text style={styles.name}>{car.name.toUpperCase()}</Text>
      <Text style={styles.price}>
        ${car.pricePerDay}
        <Text style={styles.perDay}>/day</Text>
      </Text>

      <View style={styles.icons}>
        <Pressable onPress={() => setLiked(!liked)} hitSlop={8}>
          <Image
            source={
              liked
                ? require('@/assets/images/heart/filled.svg')
                : require('@/assets/images/heart/outline.svg')
            }
            style={styles.heart}
          />
        </Pressable>
        <View style={styles.arrow}>
          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={11}
            tintColor={Colors.white}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 169,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  image: {
    height: 92,
    marginTop: 6,
    width: '100%',
  },
  name: {
    marginTop: 6,
    marginLeft: 8,
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.darkBlue,
  },
  price: {
    marginTop: 6,
    marginLeft: 8,
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 16,
    color: Colors.black,
  },
  perDay: {
    color: Colors.brown,
  },
  icons: {
    position: 'absolute',
    right: 13,
    top: 137,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heart: {
    width: 19,
    height: 18,
  },
  arrow: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
