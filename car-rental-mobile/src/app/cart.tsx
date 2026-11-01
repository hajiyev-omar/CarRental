import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { CartIcon } from '@/components/cart-icon';
import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { carImage } from '@/data/cars';

export default function CartScreen() {
  const { items, setDays, removeItem } = useCart();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
            size={42}
            tintColor={Colors.darkBlue}
          />
        </Pressable>
        <View style={styles.headerRight}>
          <Pressable onPress={() => router.push('/search')} hitSlop={10}>
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={34}
              tintColor={Colors.darkBlue}
            />
          </Pressable>
          <CartIcon badgeColor="#496CC6" />
        </View>
      </View>

      <Text style={styles.title}>My Chart</Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {items.map(({ car, days }) => (
            <View key={car.id} style={styles.row}>
              <Image source={carImage(car)} contentFit="contain" style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.name}>{car.name.toUpperCase()}</Text>
                <Text style={styles.price}>${car.pricePerDay.toFixed(2)}</Text>
                <View style={styles.rated}>
                  <Text style={styles.ratedText}>Rated: </Text>
                  <Text style={styles.stars}>{'★'.repeat(car.rating)}</Text>
                </View>

                <View style={styles.controls}>
                  <View style={styles.counter}>
                    <Pressable onPress={() => setDays(car.id, days + 1)} hitSlop={8}>
                      <Text style={styles.counterText}>+</Text>
                    </Pressable>
                    <Text style={styles.counterText}>{days}</Text>
                    <Pressable
                      onPress={() => setDays(car.id, Math.max(1, days - 1))}
                      hitSlop={8}
                      style={styles.minusArea}>
                      <View style={styles.minus} />
                    </Pressable>
                  </View>
                  <Pressable onPress={() => removeItem(car.id)} hitSlop={8} style={styles.delete}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.separator} />
            </View>
          ))}
        </ScrollView>
      )}

      <ActionButton
        title="Next"
        onPress={() => items.length > 0 && router.push('/booking')}
        style={styles.next}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 46,
    paddingLeft: 35,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    marginTop: 50,
    marginLeft: 38,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 24,
    color: Colors.black,
  },
  empty: {
    flex: 1,
    marginTop: 80,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.gray,
  },
  list: {
    flex: 1,
    marginTop: 43,
  },
  listContent: {
    paddingTop: 31,
    paddingBottom: 20,
  },
  row: {
    height: 84,
    marginBottom: 46,
  },
  image: {
    position: 'absolute',
    left: 25,
    top: -21,
    width: 157,
    height: 99,
  },
  info: {
    marginLeft: 204,
  },
  name: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.darkBlue,
  },
  price: {
    marginTop: 6,
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    lineHeight: 15,
    color: Colors.red,
  },
  rated: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratedText: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    color: '#C8C8C8',
  },
  stars: {
    fontSize: 17,
    letterSpacing: 0,
    color: '#FFCE31',
  },
  controls: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 46,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.darkBlue,
  },
  minusArea: {
    width: 8,
    height: 14,
    justifyContent: 'center',
  },
  minus: {
    width: 7,
    height: 2,
    backgroundColor: Colors.darkBlue,
  },
  delete: {
    width: 44,
    height: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: Fonts.sans,
    fontSize: 7,
    color: Colors.brown,
  },
  separator: {
    position: 'absolute',
    left: 18,
    right: 21,
    bottom: 0,
    height: 1,
    backgroundColor: '#BECEDA',
  },
  next: {
    marginLeft: 20,
    marginRight: 21,
    marginTop: 12,
    marginBottom: 35,
  },
});
