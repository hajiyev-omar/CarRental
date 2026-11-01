import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleSwitch({ value, onValueChange }: Props) {
  return (
    <Pressable onPress={() => onValueChange(!value)} hitSlop={10}>
      <View style={[styles.track, !value && styles.trackOff]}>
        <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 30,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.darkBlue,
  },
  trackOff: {
    backgroundColor: '#BECEDA',
  },
  knob: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.lightBlue,
  },
  knobOn: {
    alignSelf: 'flex-end',
  },
  knobOff: {
    alignSelf: 'flex-start',
  },
});
