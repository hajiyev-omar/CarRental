import { Image, ImageSource } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Colors, Fonts } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';

function MenuRow({
  icon,
  iconSize,
  title,
  onPress,
}: {
  icon: ImageSource;
  iconSize: { width: number; height: number };
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.iconSlot}>
        <Image source={icon} style={iconSize} />
      </View>
      <Text style={styles.rowTitle}>{title}</Text>
      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
        size={34}
        tintColor={Colors.darkBlue}
      />
    </Pressable>
  );
}

export default function MenuScreen() {
  const { user, logOut } = useAuth();
  const { clearCart } = useCart();

  const name = user?.fullName ?? 'Lorem Ipsum';

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.top}>
        <Text style={styles.watermark} numberOfLines={1}>
          {name.split(' ')[0]}
        </Text>
        <Image source={require('@/assets/images/menu/photo.png')} style={styles.photo} />
        <Text style={styles.name}>{name}</Text>

        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={34}
            tintColor={Colors.white}
          />
        </Pressable>
        <View style={styles.more}>
          <SymbolView
            name={{ ios: 'ellipsis', android: 'more_vert', web: 'more_vert' }}
            size={32}
            tintColor={Colors.white}
          />
        </View>
      </View>

      <View style={styles.menu}>
        <MenuRow
          icon={require('@/assets/images/menu/profile.svg')}
          iconSize={{ width: 29, height: 28 }}
          title="My Profile"
          onPress={() => router.push('/profile')}
        />
        <MenuRow
          icon={require('@/assets/images/menu/settings.svg')}
          iconSize={{ width: 34, height: 32 }}
          title="Settings"
          onPress={() => router.push('/settings')}
        />
        <MenuRow
          icon={require('@/assets/images/menu/notification.svg')}
          iconSize={{ width: 32, height: 32 }}
          title="Notification"
          onPress={() => router.push('/notifications')}
        />
        <MenuRow
          icon={require('@/assets/images/menu/key.svg')}
          iconSize={{ width: 24, height: 23 }}
          title="Privacy"
        />
        <MenuRow
          icon={require('@/assets/images/menu/help.svg')}
          iconSize={{ width: 24, height: 23 }}
          title="Help & Info"
          onPress={() => router.push('/about')}
        />
      </View>

      <View style={styles.spacer} />

      <ActionButton
        title="Log Out"
        onPress={() => {
          logOut();
          clearCart();
          router.dismissAll();
          router.replace('/sign-in');
        }}
        style={styles.logOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  top: {
    height: 295,
    marginTop: 5,
    marginHorizontal: 6,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.91)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    left: 41,
    top: 38,
    fontFamily: Fonts.serif,
    fontSize: 110,
    lineHeight: 130,
    color: 'rgba(198, 73, 73, 0.2)',
  },
  photo: {
    width: 103,
    height: 101,
    marginTop: 82,
    borderRadius: 52,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    color: '#6B6B6B',
  },
  back: {
    position: 'absolute',
    left: 24,
    top: 40,
  },
  more: {
    position: 'absolute',
    right: 24,
    top: 40,
  },
  menu: {
    marginTop: 50,
    marginHorizontal: 20,
    gap: 21,
  },
  row: {
    height: 46,
    borderRadius: 10,
    backgroundColor: Colors.paleGray,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSlot: {
    width: 54,
    alignItems: 'center',
  },
  rowTitle: {
    flex: 1,
    marginLeft: 85,
    fontFamily: Fonts.menu,
    fontSize: 16,
    color: Colors.darkBlue,
  },
  spacer: {
    flex: 1,
  },
  logOut: {
    marginLeft: 20,
    marginRight: 21,
    marginBottom: 48,
  },
  pressed: {
    opacity: 0.8,
  },
});
