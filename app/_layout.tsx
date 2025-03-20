import { Stack } from 'expo-router';
import { useEffect } from 'react';
import {
  Jost_300Light,
  Jost_400Regular,
  Jost_700Bold,
  useFonts,
} from '@expo-google-fonts/jost';

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

  return (<Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name='index'/>
  </Stack>)
}
