import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ActionButton } from '@/components/action-button';
import { CartIcon } from '@/components/cart-icon';
import { ToggleSwitch } from '@/components/toggle-switch';
import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';
import { carImage } from '@/data/cars';

export default function BookingScreen() {
  const {
    items,
    needsDriver,
    setNeedsDriver,
    location,
    setLocation,
    days,
    price,
    driverFee,
    total,
  } = useCart();

  const summary = [
    { label: 'Selected:', value: String(items.length) },
    { label: 'Days:', value: String(days) },
    { label: 'Price:', value: `$${price}` },
    { label: 'Drivers Fee:', value: `$${driverFee}` },
  ];

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <SymbolView
              name={{
                ios: 'chevron.left',
                android: 'chevron_left',
                web: 'chevron_left',
              }}
              size={42}
              tintColor={Colors.darkBlue}
            />
          </Pressable>
          <CartIcon badgeColor="#6AC649" />
        </View>

        <Text style={styles.title}>Selected</Text>

        <View style={styles.driverRow}>
          <Text style={styles.driverText}>Needs a driver</Text>
          <ToggleSwitch value={needsDriver} onValueChange={setNeedsDriver} />
        </View>

        <View style={styles.cars}>
          {items.map(({ car }) => (
            <View key={car.id} style={styles.carRow}>
              <Image source={carImage(car)} contentFit="contain" style={styles.carImage} />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{car.name.toUpperCase()}</Text>
                <Text style={styles.carPrice}>${car.pricePerDay.toFixed(2)}</Text>
                <View style={styles.rated}>
                  <Text style={styles.ratedText}>Rated: </Text>
                  <Text style={styles.stars}>{'★'.repeat(car.rating)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.line} />

        <View style={styles.summary}>
          {summary.map(({ label, value }) => (
            <View key={label} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{label}</Text>
              <Text style={styles.summaryValue}>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.line} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>

        <Text style={styles.locationTitle}>LOCATION</Text>
        <View style={styles.locationBox}>
          <SymbolView
            name={{
              ios: 'mappin.and.ellipse',
              android: 'location_on',
              web: 'location_on',
            }}
            size={24}
            tintColor={Colors.darkBlue}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Street 203   House 348  City Kigali"
            placeholderTextColor="rgba(0, 0, 0, 0.58)"
            style={styles.locationInput}
          />
        </View>
      </ScrollView>

      <ActionButton
        title="Confirm"
        onPress={() => router.push('/payment')}
        style={styles.confirm}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 12,
  },
  header: {
    marginTop: 46,
    paddingLeft: 35,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    marginLeft: 49,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 24,
    color: Colors.black,
  },
  driverRow: {
    marginTop: 26,
    paddingLeft: 49,
    paddingRight: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverText: {
    fontSize: 16,
    fontWeight: '300',
    color: Colors.darkBlue,
  },
  cars: {
    marginTop: 47,
  },
  carRow: {
    height: 118,
    flexDirection: 'row',
  },
  carImage: {
    width: 213,
    height: 118,
    marginLeft: 8,
  },
  carInfo: {
    marginLeft: 15,
    paddingTop: 23,
  },
  carName: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    color: Colors.darkBlue,
  },
  carPrice: {
    marginTop: 14,
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    lineHeight: 15,
    color: Colors.red,
  },
  rated: {
    marginTop: 13,
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
    color: '#FFCE31',
  },
  line: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#BECEDA',
  },
  summary: {
    paddingTop: 25,
    paddingBottom: 5,
  },
  summaryRow: {
    height: 42,
    paddingLeft: 41,
    paddingRight: 37,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    color: '#A1A1A1',
  },
  summaryValue: {
    width: 46,
    fontFamily: Fonts.sansBold,
    fontSize: 17,
    color: '#A1A1A1',
  },
  totalRow: {
    height: 28,
    marginTop: 8,
    paddingLeft: 41,
    paddingRight: 37,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 13,
    color: Colors.darkBlue,
  },
  totalValue: {
    width: 46,
    fontFamily: Fonts.sansBold,
    fontSize: 17,
    color: Colors.black,
  },
  locationTitle: {
    marginTop: 25,
    marginLeft: 31,
    fontFamily: Fonts.sansBold,
    fontSize: 17,
    lineHeight: 22,
    color: '#333333',
  },
  locationBox: {
    height: 38,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 21,
    paddingLeft: 36,
    borderRadius: 30,
    backgroundColor: 'rgba(43, 76, 89, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    height: 38,
    marginLeft: 20,
    padding: 0,
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'italic',
    color: Colors.black,
  },
  confirm: {
    marginLeft: 21,
    marginRight: 20,
    marginTop: 12,
    marginBottom: 35,
  },
});
