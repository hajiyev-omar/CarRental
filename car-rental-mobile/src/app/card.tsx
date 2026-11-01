import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { ActionButton } from '@/components/action-button';
import { FieldRow, fieldInputStyle } from '@/components/field-row';
import { ToggleSwitch } from '@/components/toggle-switch';
import { Colors } from '@/constants/theme';

export default function CardScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 37;

  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView>
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

        <Image
          source={require('@/assets/images/credit-card.png')}
          resizeMode="contain"
          style={[styles.card, { width: cardWidth, height: (cardWidth * 439) / 700 }]}
        />

        <FieldRow label="Card Number:" gap={95}>
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder="111 0111 202 0110 011"
            placeholderTextColor={Colors.gray}
            keyboardType="number-pad"
            style={fieldInputStyle}
          />
        </FieldRow>
        <FieldRow label="Expiration Date:" gap={25}>
          <TextInput
            value={expiry}
            onChangeText={setExpiry}
            placeholder="02.05.2030"
            placeholderTextColor={Colors.gray}
            style={fieldInputStyle}
          />
        </FieldRow>
        <FieldRow label="CCV:" gap={22}>
          <TextInput
            value={cvv}
            onChangeText={setCvv}
            placeholder="142"
            placeholderTextColor={Colors.gray}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            style={fieldInputStyle}
          />
        </FieldRow>
        <FieldRow label="Rememer This Info:" gap={22}>
          <ToggleSwitch value={remember} onValueChange={setRemember} />
        </FieldRow>
      </ScrollView>

      <ActionButton title="Pay" onPress={() => router.push('/confirm')} style={styles.pay} />
    </KeyboardAvoidingView>
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
  card: {
    marginTop: 87,
    marginLeft: 22,
  },
  pay: {
    marginLeft: 24,
    marginRight: 17,
    marginTop: 12,
    marginBottom: 34,
  },
});
