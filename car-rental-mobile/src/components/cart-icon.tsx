import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useCart } from '@/context/cart-context';

type Props = {
  badgeColor?: string;
};

export function CartIcon({ badgeColor = Colors.red }: Props) {
  const { items } = useCart();

  return (
    <View style={styles.cart}>
      <SymbolView
        name={{ ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' }}
        size={34}
        tintColor={Colors.darkBlue}
      />
      {items.length > 0 && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{items.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    width: 41,
    height: 39,
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: Fonts.title,
    fontSize: 8,
    color: Colors.white,
  },
});
