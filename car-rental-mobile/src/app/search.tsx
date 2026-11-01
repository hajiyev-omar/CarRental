import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { CarCard } from '@/components/car-card';
import { CartIcon } from '@/components/cart-icon';
import { Colors, Fonts } from '@/constants/theme';
import { useCars } from '@/data/cars';

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 86) / 2;

  const [query, setQuery] = useState('');

  const { cars: found, loading, error } = useCars({ search: query });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={30}
            tintColor={Colors.darkBlue}
          />
        </Pressable>
        <Pressable onPress={() => router.push('/cart')}>
          <CartIcon />
        </Pressable>
      </View>

      <View style={styles.search}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#B5B5B5"
          style={styles.searchInput}
        />
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={22}
          tintColor={Colors.darkBlue}
        />
      </View>
      <View style={styles.searchLine} />

      <Text style={styles.trending}>TRENDING</Text>
      <Text style={styles.cars}>Cars</Text>

      {error !== '' && <Text style={styles.message}>{error}</Text>}
      {!loading && !error && found.length === 0 && (
        <Text style={styles.message}>No cars found</Text>
      )}

      <View style={styles.grid}>
        {found.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onPress={() => router.push({ pathname: '/car/[id]', params: { id: car.id } })}
            style={{ width: cardWidth }}
          />
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
    marginTop: 47,
    paddingLeft: 45,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    width: 149,
    height: 21,
    marginTop: 38,
    marginRight: 37,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 21,
    padding: 0,
    fontSize: 13,
    color: Colors.black,
  },
  searchLine: {
    width: 149,
    height: 1,
    marginRight: 37,
    alignSelf: 'flex-end',
    backgroundColor: '#BECEDA',
  },
  trending: {
    marginTop: 40,
    marginLeft: 49,
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 14,
    color: Colors.darkBlue,
  },
  cars: {
    marginTop: 15,
    marginLeft: 49,
    fontSize: 15,
    lineHeight: 18,
    color: Colors.lightBlue,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.gray,
  },
  grid: {
    marginTop: 20,
    paddingLeft: 37,
    paddingRight: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 28,
    rowGap: 42,
  },
});
