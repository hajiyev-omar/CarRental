import { Hind_600SemiBold } from '@expo-google-fonts/hind';
import { Iceberg_400Regular } from '@expo-google-fonts/iceberg';
import { Imprima_400Regular } from '@expo-google-fonts/imprima';
import { Inconsolata_800ExtraBold } from '@expo-google-fonts/inconsolata';
import { KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';
import { PTSans_400Regular, PTSans_700Bold } from '@expo-google-fonts/pt-sans';
import { Poly_400Regular } from '@expo-google-fonts/poly';
import { RedHatMono_400Regular } from '@expo-google-fonts/red-hat-mono';
import { RedHatText_400Regular, RedHatText_600SemiBold } from '@expo-google-fonts/red-hat-text';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Iceberg_400Regular,
    Hind_600SemiBold,
    Imprima_400Regular,
    Inconsolata_800ExtraBold,
    KaushanScript_400Regular,
    PTSans_400Regular,
    PTSans_700Bold,
    Poly_400Regular,
    RedHatMono_400Regular,
    RedHatText_400Regular,
    RedHatText_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </AuthProvider>
  );
}
