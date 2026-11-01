import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { apiPost } from '@/api';
import { ActionButton } from '@/components/action-button';
import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';

type Booking = {
  id: number;
  carName: string;
  days: number;
  price: number;
  driverFee: number;
  total: number;
};

export default function ConfirmScreen() {
  const { user } = useAuth();
  const { items, needsDriver, location, price, driverFee, total, removeItem, placeOrder } =
    useCart();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const names = items.map((item) => item.car.name).join(', ');

  const confirm = async () => {
    if (!user) {
      setError('Please log in again');
      return;
    }
    setError('');
    setLoading(true);
    try {
      let paid = 0;
      for (const item of items) {
        const booking = await apiPost<Booking>('/bookings', {
          carId: item.car.id,
          userId: user.id,
          days: item.days,
          needsDriver,
          location,
        });
        paid += booking.total;
        removeItem(item.car.id);
      }
      placeOrder(paid);
      router.dismissAll();
      router.replace('/thank-you');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

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
        <SymbolView
          name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
          size={32}
          tintColor={Colors.darkBlue}
        />
      </View>

      <View style={styles.badge}>
        <Image source={require('@/assets/images/confirm/circle.svg')} style={styles.circle} />
        <Image source={require('@/assets/images/confirm/cart-download.svg')} style={styles.cart} />
      </View>

      <Text style={styles.message}>You are going to pay the rental fee for</Text>
      <Text style={styles.names}>{names}</Text>

      <View style={styles.line} />

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${price}</Text>
      </View>
      <View style={[styles.row, styles.feeRow]}>
        <Text style={styles.label}>Drivers Fee:</Text>
        <Text style={styles.value}>${driverFee}</Text>
      </View>
      <View style={styles.totalLine} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.spacer} />

      <ActionButton
        title="Cancel"
        variant="outline"
        onPress={() => router.dismissTo('/home')}
        style={styles.cancel}
      />

      <ActionButton title="Confirm" onPress={confirm} disabled={loading} style={styles.confirm} />
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
    paddingRight: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    width: 91,
    height: 92,
    marginTop: 128,
    alignSelf: 'center',
  },
  circle: {
    width: 91,
    height: 92,
  },
  cart: {
    position: 'absolute',
    left: 10,
    top: 16,
    width: 65,
    height: 64,
  },
  message: {
    marginTop: 56,
    marginLeft: 49,
    marginRight: 20,
    fontSize: 18,
    lineHeight: 22,
    color: '#676767',
  },
  names: {
    marginTop: 18,
    marginLeft: 58,
    marginRight: 20,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  line: {
    height: 1,
    marginTop: 36,
    marginLeft: 22,
    marginRight: 17,
    backgroundColor: '#BECEDA',
  },
  row: {
    height: 22,
    marginTop: 30,
    paddingLeft: 44,
    paddingRight: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeRow: {
    marginTop: 20,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    color: '#A1A1A1',
  },
  value: {
    width: 46,
    fontFamily: Fonts.sansBold,
    fontSize: 17,
    color: '#A1A1A1',
  },
  totalLine: {
    height: 1,
    marginTop: 17,
    marginLeft: 24,
    marginRight: 15,
    backgroundColor: '#BECEDA',
  },
  totalRow: {
    height: 22,
    marginTop: 10,
    paddingLeft: 44,
    paddingRight: 36,
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
  error: {
    marginTop: 14,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 13,
    color: Colors.red,
  },
  spacer: {
    flex: 1,
  },
  cancel: {
    marginLeft: 24,
    marginRight: 17,
  },
  confirm: {
    marginLeft: 24,
    marginRight: 17,
    marginTop: 30,
    marginBottom: 34,
  },
});
