import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ActionButton({ title, onPress, variant = 'filled', disabled, style }: Props) {
  const outline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outline : styles.filled,
        (pressed || disabled) && styles.pressed,
        style,
      ]}>
      <Text style={outline ? styles.outlineText : styles.filledText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: Colors.darkBlue,
  },
  outline: {
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    backgroundColor: Colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
  filledText: {
    fontFamily: Fonts.button,
    fontSize: 20,
    color: Colors.white,
  },
  outlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
});
