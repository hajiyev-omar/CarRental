import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Props = {
  title: string;
  icon: ImageSourcePropType;
  iconSize: { width: number; height: number };
  iconLeft: number;
  textLeft: number;
  style?: StyleProp<ViewStyle>;
};

export function SocialButton({ title, icon, iconSize, iconLeft, textLeft, style }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Image source={icon} style={[iconSize, { marginLeft: iconLeft }]} />
      <Text style={[styles.text, { marginLeft: textLeft - iconLeft - iconSize.width }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.black,
  },
});
