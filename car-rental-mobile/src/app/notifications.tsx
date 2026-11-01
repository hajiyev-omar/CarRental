import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { notifications as initialNotifications } from '@/data/notifications';

export default function NotificationsScreen() {
  const [items, setItems] = useState(initialNotifications);

  const toggleStar = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)));
  const markRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const unreadCount = items.filter((n) => n.unread).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }}
            size={42}
            tintColor={Colors.darkBlue}
          />
        </Pressable>

        <View style={styles.bell}>
          <Image
            source={require('@/assets/images/notifications/bell-box.svg')}
            style={styles.bellBox}
          />
          {unreadCount > 0 && (
            <>
              <Image
                source={require('@/assets/images/notifications/bell-badge.svg')}
                style={styles.bellBadge}
              />
              <Text style={styles.bellCount}>{unreadCount}</Text>
            </>
          )}
        </View>
      </View>

      <Text style={styles.title}>Notifications</Text>

      <View style={styles.list}>
        {items.map((n) => (
          <Pressable
            key={n.id}
            onPress={() => markRead(n.id)}
            style={[styles.card, n.unread ? styles.cardUnread : styles.cardRead]}>
            <View style={styles.avatar}>
              <Text style={styles.letter}>{n.title[0]}</Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {n.title}
            </Text>
            <Text style={styles.cardText} numberOfLines={2}>
              {n.text}
            </Text>
            <Text style={styles.time}>{n.time}</Text>
            <Pressable onPress={() => toggleStar(n.id)} hitSlop={8} style={styles.star}>
              <Image
                source={
                  n.starred
                    ? require('@/assets/images/notifications/star-gold.svg')
                    : require('@/assets/images/notifications/star-gray.svg')
                }
                style={styles.starIcon}
              />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 50,
    paddingLeft: 35,
    paddingRight: 33,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bell: {
    width: 44,
    height: 42,
  },
  bellBox: {
    position: 'absolute',
    left: 5,
    top: 4,
    width: 36,
    height: 35,
  },
  bellBadge: {
    position: 'absolute',
    left: 28,
    top: 2,
    width: 14,
    height: 13,
  },
  bellCount: {
    position: 'absolute',
    left: 32,
    top: 2,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
  },
  title: {
    marginTop: 35,
    marginLeft: 33,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: 'bold',
    color: Colors.black,
  },
  list: {
    marginTop: 18,
    marginHorizontal: 18,
    gap: 12,
  },
  card: {
    height: 89,
    borderRadius: 10,
  },
  cardRead: {
    backgroundColor: '#F8F8F8',
  },
  cardUnread: {
    backgroundColor: Colors.white,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  avatar: {
    position: 'absolute',
    left: 16,
    top: 20,
    width: 54,
    height: 54,
    borderRadius: 5,
    backgroundColor: '#BECEDA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: Fonts.title,
    fontSize: 36,
    lineHeight: 44,
    color: Colors.darkBlue,
  },
  cardTitle: {
    position: 'absolute',
    left: 87,
    top: 24,
    right: 60,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
    color: Colors.darkBlue,
  },
  cardText: {
    position: 'absolute',
    left: 87,
    top: 45,
    right: 72,
    fontSize: 11,
    lineHeight: 14,
    color: 'rgba(0, 0, 0, 0.58)',
  },
  time: {
    position: 'absolute',
    right: 8,
    top: 65,
    fontSize: 7,
    fontWeight: '600',
    color: Colors.brown,
  },
  star: {
    position: 'absolute',
    right: 11,
    top: 9,
  },
  starIcon: {
    width: 26,
    height: 24,
  },
});
