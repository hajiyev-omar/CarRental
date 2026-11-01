import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';

const GREEN = '#6AC649';

export default function ThankYouScreen() {
  const { order } = useCart();

  const goHome = () => router.replace('/home');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace('/home');
      return true;
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={goHome} hitSlop={12}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
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
        <Image source={require('@/assets/images/thank-you/circle.svg')} style={styles.circle} />
        <Image source={require('@/assets/images/thank-you/cart-check.svg')} style={styles.cart} />
      </View>

      <Text style={styles.title}>Thank You</Text>

      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>PAYMENT MADE</Text>
        <Text style={styles.paymentValue}>${order?.total ?? 0}</Text>
      </View>

      <Text style={styles.message}>
        {'Well done Your payment is\nSuccessfuly  done\nand your car is on its way.'}
      </Text>

      <View style={styles.spacer} />

      <ActionButton
        title="Track"
        variant="outline"
        onPress={() => router.push('/tracking')}
        style={styles.track}
      />
      <ActionButton title="Go Back" onPress={goHome} style={styles.goBack} />
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
    width: 183,
    height: 178,
    marginTop: 71,
    alignSelf: 'center',
  },
  circle: {
    width: 183,
    height: 178,
  },
  cart: {
    position: 'absolute',
    left: 39,
    top: 41,
    width: 106,
    height: 95,
  },
  title: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    color: GREEN,
  },
  paymentRow: {
    marginTop: 34,
    paddingLeft: 39,
    paddingRight: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 16,
    color: Colors.darkBlue,
  },
  paymentValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 17,
    color: GREEN,
  },
  message: {
    marginTop: 40,
    marginLeft: 39,
    fontFamily: Fonts.mono,
    fontSize: 18,
    lineHeight: 24,
    color: '#676767',
  },
  spacer: {
    flex: 1,
  },
  track: {
    marginLeft: 24,
    marginRight: 17,
  },
  goBack: {
    marginLeft: 24,
    marginRight: 17,
    marginTop: 29,
    marginBottom: 34,
  },
});
