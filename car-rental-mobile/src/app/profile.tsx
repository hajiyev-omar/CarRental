import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { ComponentRef, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { apiGet } from '@/api';
import { ActionButton } from '@/components/action-button';
import { Colors, Fonts } from '@/constants/theme';
import { User, useAuth } from '@/context/auth-context';

type FieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
};

function ProfileField({ label, value, placeholder, onChangeText }: FieldProps) {
  const input = useRef<ComponentRef<typeof TextInput>>(null);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A1A1A1"
        style={styles.input}
      />
      <Pressable onPress={() => input.current?.focus()} hitSlop={10} style={styles.pencil}>
        <Image source={require('@/assets/images/profile/edit.svg')} style={styles.pencilIcon} />
      </Pressable>
      <View style={styles.line} />
    </View>
  );
}

export default function ProfileScreen() {
  const { user, setUser, saveProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [birthDay, setBirthDay] = useState(user?.birthDay ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const userId = user?.id;
  useEffect(() => {
    if (userId === undefined) return;
    let outdated = false;
    apiGet<User>(`/users/${userId}`)
      .then((u) => {
        if (outdated) return;
        setUser(u);
        setFullName(u.fullName);
        setEmail(u.email);
        setPhone(u.phone);
        setBirthDay(u.birthDay);
        setGender(u.gender);
      })
      .catch(() => {});
    return () => {
      outdated = true;
    };
  }, [userId, setUser]);

  const save = async () => {
    if (saving) return;
    if (!fullName.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await saveProfile({ fullName, email, phone, birthDay, gender });
      router.back();
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <SymbolView
              name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
              size={34}
              tintColor={Colors.darkBlue}
            />
          </Pressable>
          <SymbolView
            name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
            size={32}
            tintColor={Colors.darkBlue}
          />
        </View>

        <Text style={styles.title}>Profile</Text>

        <View style={styles.fields}>
          <ProfileField
            label="Full Name:"
            value={fullName}
            placeholder="Lorem Ipsum"
            onChangeText={setFullName}
          />
          <ProfileField
            label="Email:"
            value={email}
            placeholder="Loremipsum@gmail.com"
            onChangeText={setEmail}
          />
          <ProfileField
            label="Phone number:"
            value={phone}
            placeholder="+250 011 00 101"
            onChangeText={setPhone}
          />
          <ProfileField
            label="Birth Day:"
            value={birthDay}
            placeholder="08.09.2022"
            onChangeText={setBirthDay}
          />
          <ProfileField
            label="Gender:"
            value={gender}
            placeholder="Female"
            onChangeText={setGender}
          />
        </View>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </ScrollView>

      <ActionButton title="Save Changes" onPress={save} disabled={saving} style={styles.save} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 54,
    paddingLeft: 35,
    paddingRight: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 62,
    marginLeft: 35,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    color: Colors.black,
  },
  fields: {
    marginTop: 44,
  },
  field: {
    marginLeft: 29,
    marginRight: 17,
    marginBottom: 23,
  },
  label: {
    paddingLeft: 6,
    fontFamily: Fonts.sansBold,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.darkBlue,
  },
  input: {
    height: 26,
    marginTop: 16,
    padding: 0,
    paddingLeft: 4,
    paddingRight: 30,
    fontSize: 20,
    color: '#A1A1A1',
  },
  pencil: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  pencilIcon: {
    width: 23,
    height: 21,
  },
  line: {
    height: 1,
    backgroundColor: '#BECEDA',
  },
  error: {
    marginLeft: 35,
    marginTop: 4,
    fontSize: 13,
    color: Colors.red,
  },
  save: {
    marginLeft: 24,
    marginRight: 17,
    marginTop: 12,
    marginBottom: 52,
  },
});
