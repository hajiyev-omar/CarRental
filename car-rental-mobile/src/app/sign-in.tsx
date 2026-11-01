import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ApiError } from '@/api';
import { SocialButton } from '@/components/social-button';
import { UnderlineInput } from '@/components/underline-input';
import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';

export default function SignInScreen() {
  const { logIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    if (!email.trim() || !password) {
      setError('Enter your email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await logIn(email.trim(), password);
      router.replace('/home');
    } catch (e) {
      setError(
        e instanceof ApiError && e.status === 401
          ? 'Wrong email or password'
          : (e as Error).message,
      );
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Sign In</Text>
      <View style={styles.titleLine} />

      <View style={styles.fields}>
        <UnderlineInput
          label="EMAIL OR PHONE"
          placeholder="Loremipsum@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordField}>
          <UnderlineInput label="PASSWORD" secure value={password} onChangeText={setPassword} />
        </View>
      </View>

      <Text style={styles.forgot}>Forgot password?</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable
        onPress={submit}
        style={({ pressed }) => [styles.loginButton, (pressed || loading) && styles.pressed]}>
        <Text style={styles.loginText}>Log In</Text>
      </Pressable>

      <Text style={styles.or}>OR</Text>

      <SocialButton
        title="Continue With Google"
        icon={require('@/assets/images/google-logo.png')}
        iconSize={{ width: 31, height: 31 }}
        iconLeft={43}
        textLeft={135}
        style={styles.social}
      />
      <SocialButton
        title="Continue With Facebook"
        icon={require('@/assets/images/facebook-logo.png')}
        iconSize={{ width: 38, height: 37 }}
        iconLeft={29}
        textLeft={133}
        style={styles.social}
      />

      <View style={styles.signUpRow}>
        <Text style={styles.signUpHint}>Don’t Have an account yet?</Text>
        <Pressable onPress={() => router.replace('/sign-up')}>
          <Text style={styles.signUpLink}>SIGN UP </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 28,
    paddingRight: 13,
    backgroundColor: Colors.white,
  },
  title: {
    marginTop: 102,
    marginLeft: 10,
    fontFamily: Fonts.title,
    fontSize: 48,
    lineHeight: 71,
    color: Colors.black,
  },
  titleLine: {
    width: 58,
    height: 4,
    marginTop: 1,
    marginLeft: 17,
    borderRadius: 5,
    backgroundColor: Colors.darkBlue,
  },
  fields: {
    marginTop: 82,
    marginLeft: 10,
    marginRight: 26,
  },
  passwordField: {
    marginTop: 28,
  },
  forgot: {
    marginTop: 12,
    marginLeft: 14,
    fontSize: 11,
    lineHeight: 18,
    color: Colors.black,
  },
  error: {
    marginTop: 8,
    marginLeft: 14,
    fontSize: 12,
    color: Colors.red,
  },
  loginButton: {
    height: 52,
    marginTop: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  pressed: {
    opacity: 0.8,
  },
  or: {
    marginTop: 9,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 21,
    color: Colors.black,
  },
  social: {
    marginTop: 9,
  },
  signUpRow: {
    marginTop: 51,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpHint: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
  },
  signUpLink: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.yellow,
  },
});
