import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Props = {
  label: string;
  placeholder?: string;
  secure?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export function UnderlineInput({ label, placeholder, secure, value, onChangeText }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={secure && !visible}
        autoCapitalize="none"
        style={styles.input}
      />
      <View style={styles.line} />
      {secure && (
        <Pressable onPress={() => setVisible(!visible)} hitSlop={12} style={styles.eye}>
          <SymbolView
            name={
              visible
                ? { ios: 'eye', android: 'visibility', web: 'visibility' }
                : { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
            }
            size={28}
            tintColor={Colors.black}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.title,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.darkBlue,
  },
  input: {
    height: 18,
    marginTop: 10,
    padding: 0,
    fontSize: 16,
    color: Colors.black,
  },
  line: {
    height: 2,
    backgroundColor: Colors.line,
  },
  eye: {
    position: 'absolute',
    right: 20,
    bottom: 4,
  },
});
