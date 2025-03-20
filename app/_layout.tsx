import { Stack } from 'expo-router';
import { useEffect } from 'react';
import i18n from '@/i18n';
import {
  Jost_300Light,
  Jost_400Regular,
  Jost_700Bold,
  useFonts,
} from '@expo-google-fonts/jost';
import { I18nextProvider } from 'react-i18next';
export default function RootLayout() {

  const [loaded, error] = useFonts({
    Jost_300Light,
    Jost_400Regular,
    Jost_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }


      return (
        <I18nextProvider i18n={i18n}>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='index'/>
            <Stack.Screen name='challenge'/>
          </Stack>
      </I18nextProvider>
  )
}
