import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
import { FieldRow, fieldInputStyle } from '@/components/field-row';
import { ToggleSwitch } from '@/components/toggle-switch';
import { Colors, Fonts } from '@/constants/theme';

const methods = [
  {
    id: 'mtn',
    color: '#FFCE31',
    logo: require('@/assets/images/payment/mtn.png'),
  },
  {
    id: 'mastercard',
    color: '#EB001B',
    logo: require('@/assets/images/payment/mastercard.svg'),
  },
  {
    id: 'paypal',
    color: '#496CC6',
    logo: require('@/assets/images/payment/paypal.svg'),
  },
];

export default function PaymentScreen() {
  const [selected, setSelected] = useState(0);
  const [simName, setSimName] = useState('');
  const [phone, setPhone] = useState('');
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

        <Text style={styles.title}>Payment Methods</Text>

        <View style={styles.methods}>
          {methods.map((method, index) => (
            <Pressable
              key={method.id}
              onPress={() => setSelected(index)}
              style={[
                styles.method,
                { borderColor: method.color },
                index === selected ? styles.methodSelected : styles.methodNormal,
              ]}>
              <Image source={method.logo} contentFit="contain" style={styles.logo} />
            </Pressable>
          ))}
        </View>

        <View style={styles.dots}>
          {methods.map((method, index) => (
            <View key={method.id} style={index === selected ? styles.dotActive : styles.dot} />
          ))}
        </View>

        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>OUR CODE</Text>
          <Text style={styles.codeValue}>1001110</Text>
        </View>

        <FieldRow label="Sim Name:" gap={43}>
          <TextInput
            value={simName}
            onChangeText={setSimName}
            placeholder="Lorem Ipsum"
            placeholderTextColor={Colors.gray}
            style={fieldInputStyle}
          />
        </FieldRow>
        <FieldRow label="Phone Number:" gap={25}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+  250 000 11 0011"
            placeholderTextColor={Colors.gray}
            keyboardType="phone-pad"
            style={fieldInputStyle}
          />
        </FieldRow>
        <FieldRow label="Rememer This Info:" gap={30}>
          <ToggleSwitch value={remember} onValueChange={setRemember} />
        </FieldRow>
      </ScrollView>

      <ActionButton
        title="Pay"
        onPress={() => router.push(methods[selected].id === 'mastercard' ? '/card' : '/confirm')}
        style={styles.pay}
      />
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
  title: {
    marginTop: 61,
    marginLeft: 21,
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 24,
    color: Colors.black,
  },
  methods: {
    height: 80,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  method: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodSelected: {
    height: 80,
    borderWidth: 1,
  },
  methodNormal: {
    height: 58,
    borderWidth: 1.5,
  },
  logo: {
    width: '75%',
    height: '75%',
  },
  dots: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
  },
  codeRow: {
    marginTop: 53,
    paddingLeft: 24,
    paddingRight: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 15,
    color: Colors.darkBlue,
  },
  codeValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 15,
    color: Colors.gray,
  },
  pay: {
    marginLeft: 24,
    marginRight: 17,
    marginTop: 12,
    marginBottom: 34,
  },
});
