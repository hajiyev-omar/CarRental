import { router } from 'expo-router';
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

import { CarCard } from '@/components/car-card';
import { CartIcon } from '@/components/cart-icon';
import { Colors, Fonts } from '@/constants/theme';
import { useCars } from '@/data/cars';

const categories = [
  { label: 'family cars', value: 'family' },
  { label: 'Cheap cars', value: 'cheap' },
  { label: 'Luxuly cars', value: 'luxury' },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 86) / 2;

  const [category, setCategory] = useState<string | undefined>();
  const { cars, loading, error } = useCars({ category });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.push('/menu')} hitSlop={10}>
          <SymbolView
            name={{ ios: 'line.3.horizontal', android: 'menu', web: 'menu' }}
            size={36}
            tintColor={Colors.darkBlue}
          />
        </Pressable>
        <Pressable onPress={() => router.push('/cart')}>
          <CartIcon />
        </Pressable>
      </View>

      <View style={styles.banner}>
        <View style={[styles.circle, styles.circleBig, { left: 176, top: 38 }]} />
        <View style={[styles.circle, styles.circleBig, { left: -10, top: 105 }]} />
        <View style={[styles.circle, styles.circleSmall, { left: 283, top: 105 }]} />
        <Text style={styles.percent}>30%</Text>
        <Text style={styles.off}>Off</Text>
        <Text style={styles.july}>THIS JULY</Text>
        <Text style={styles.script}>
          Travel to the end of the world this whole month{'\n'}cause we care when you are happy
        </Text>
        <View style={styles.tryNow}>
          <Text style={styles.tryNowText}>Try Now</Text>
          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_right_alt', web: 'arrow_right_alt' }}
            size={20}
            tintColor={Colors.white}
          />
        </View>
      </View>

      <View style={styles.chips}>
        {categories.map((c) => (
          <Pressable
            key={c.value}
            onPress={() => setCategory(category === c.value ? undefined : c.value)}
            style={[styles.chip, category === c.value && styles.chipActive]}>
            <Text style={category === c.value ? styles.chipTextActive : styles.chipText}>
              {c.label}
            </Text>
          </Pressable>
        ))}
        <Pressable onPress={() => router.push('/search')} hitSlop={10}>
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={28}
            tintColor={Colors.brown}
          />
        </Pressable>
      </View>

      <Text style={styles.heading}>Cars Available Near You</Text>
      <Pressable onPress={() => router.push('/search')}>
        <Text style={styles.viewMore}>View more</Text>
      </Pressable>

      {error !== '' && <Text style={styles.message}>{error}</Text>}
      {loading && cars.length === 0 && <ActivityIndicator style={styles.message} />}

      <View style={styles.grid}>
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}
            style={{ width: cardWidth }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 35,
    paddingLeft: 28,
    paddingRight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    height: 158,
    marginTop: 39,
    marginLeft: 15,
    marginRight: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.black,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  circleBig: {
    width: 55,
    height: 52,
    borderRadius: 27,
  },
  circleSmall: {
    width: 27,
    height: 25,
    borderRadius: 13,
  },
  percent: {
    position: 'absolute',
    left: 10,
    top: 19,
    fontFamily: Fonts.title,
    fontSize: 48,
    lineHeight: 54,
    color: '#E5E5E5',
  },
  off: {
    position: 'absolute',
    left: 44,
    top: 73,
    fontFamily: Fonts.title,
    fontSize: 55,
    lineHeight: 53,
    color: Colors.yellow,
  },
  july: {
    position: 'absolute',
    left: 138,
    top: 18,
    fontFamily: Fonts.title,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.white,
  },
  script: {
    position: 'absolute',
    left: 138,
    top: 54,
    width: 105,
    fontFamily: Fonts.script,
    fontSize: 10,
    lineHeight: 14,
    color: Colors.white,
  },
  tryNow: {
    position: 'absolute',
    left: 177,
    top: 121,
    width: 133,
    height: 18,
    borderRadius: 10,
    backgroundColor: Colors.brown,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  tryNowText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.white,
  },
  chips: {
    marginTop: 50,
    paddingLeft: 28,
    paddingRight: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    width: 83,
    height: 26,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: Colors.darkBlue,
  },
  chipText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    color: Colors.black,
  },
  chipTextActive: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.white,
  },
  heading: {
    marginTop: 63,
    marginLeft: 32,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.black,
  },
  viewMore: {
    marginRight: 18,
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 19,
    color: Colors.red,
  },
  message: {
    marginTop: 37,
    textAlign: 'center',
    color: Colors.gray,
  },
  grid: {
    marginTop: 37,
    paddingHorizontal: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 34,
    rowGap: 47,
  },
});
