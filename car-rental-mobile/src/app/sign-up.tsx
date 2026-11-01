import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SocialButton } from '@/components/social-button';
import { UnderlineInput } from '@/components/underline-input';
import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

export default function SignUpScreen() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    if (!fullName.trim() || !email.trim() || !password) {
      setError('Fill in all the fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(fullName.trim(), email.trim(), password);
      router.replace('/home');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.titleLine} />

      <View style={styles.fields}>
        <UnderlineInput
          label="FULL NAME"
          placeholder="Lorem Ipsum"
          value={fullName}
          onChangeText={setFullName}
        />
        <View style={styles.emailField}>
          <UnderlineInput
            label="EMAIL OR PHONE"
            placeholder="Loremipsum@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.passwordField}>
          <UnderlineInput label="PASSWORD" secure value={password} onChangeText={setPassword} />
        </View>
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable
        onPress={submit}
        style={({ pressed }) => [styles.mainButton, (pressed || loading) && styles.pressed]}>
        <Text style={styles.mainButtonText}>Log In</Text>
      </Pressable>

      <Text style={styles.or}>OR</Text>

      <SocialButton
        title="Continue With Google"
        icon={require('@/assets/images/google-logo.png')}
        iconSize={{ width: 31, height: 31 }}
        iconLeft={44}
        textLeft={135}
        style={styles.social}
      />
      <SocialButton
        title="Continue With Facebook"
        icon={require('@/assets/images/facebook-logo.png')}
        iconSize={{ width: 38, height: 37 }}
        iconLeft={34}
        textLeft={133}
        style={styles.social}
      />

      <View style={styles.signInRow}>
        <Text style={styles.signInHint}>Have an account Already?</Text>
        <Pressable onPress={() => router.replace('/sign-in')}>
          <Text style={styles.signInLink}>SIGN IN </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 21,
    backgroundColor: Colors.white,
  },
  title: {
    marginTop: 102,
    marginLeft: 18,
    fontFamily: Fonts.title,
    fontSize: 48,
    lineHeight: 71,
    color: Colors.black,
  },
  titleLine: {
    width: 58,
    height: 4,
    marginTop: 1,
    marginLeft: 25,
    borderRadius: 5,
    backgroundColor: Colors.darkBlue,
  },
  fields: {
    marginTop: 82,
    marginLeft: 25,
    marginRight: 11,
  },
  emailField: {
    marginTop: 18,
  },
  passwordField: {
    marginTop: 28,
  },
  error: {
    marginTop: 16,
    marginLeft: 25,
    fontSize: 12,
    color: Colors.red,
  },
  mainButton: {
    height: 52,
    marginTop: 38,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
  or: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 21,
    color: Colors.black,
  },
  social: {
    marginTop: 12,
  },
  signInRow: {
    marginTop: 41,
    marginLeft: 5,
    marginRight: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInHint: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
  },
  signInLink: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.yellow,
  },
});
