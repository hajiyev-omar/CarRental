import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

function SettingsRow({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Text style={styles.rowTitle}>{title}</Text>
      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
        size={34}
        tintColor={Colors.darkBlue}
      />
    </Pressable>
  );
}

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

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

      <Text style={styles.title}>Settings</Text>

      <View style={styles.list}>
        <SettingsRow title="Profile Settings" onPress={() => router.push('/profile')} />
        <SettingsRow title="Language" />
        <SettingsRow title="Set Password" />
        <SettingsRow title="Location" />
        <SettingsRow title="Account" />
        <SettingsRow title="About" onPress={() => router.push('/about')} />
      </View>
    </View>
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
    marginTop: 48,
    marginLeft: 35,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list: {
    marginTop: 60,
    marginHorizontal: 20,
    gap: 25,
  },
  row: {
    height: 56,
    borderRadius: 15,
    backgroundColor: Colors.paleGray,
    paddingLeft: 22,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    fontFamily: Fonts.menuRegular,
    fontSize: 20,
    color: Colors.darkBlue,
  },
  pressed: {
    opacity: 0.8,
  },
});
