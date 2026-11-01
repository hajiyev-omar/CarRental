import { SymbolView } from 'expo-symbols';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ title, onPress, showArrow, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Text style={styles.title}>{title}</Text>
      {showArrow && (
        <SymbolView
          name={{ ios: 'chevron.right', android: 'navigate_next', web: 'navigate_next' }}
          size={20}
          tintColor={Colors.white}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 349,
    height: 52,
    borderRadius: 50,
    backgroundColor: Colors.red,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  title: {
    fontFamily: Fonts.button,
    fontSize: 20,
    color: Colors.white,
  },
});
