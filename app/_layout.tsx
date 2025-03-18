import { Stack } from 'expo-router';
import { useEffect } from 'react';
import {
  Jost_100Thin,
  // Jost_300Light,
  useFonts,
} from '@expo-google-fonts/jost';

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Jost_100Thin,
    // Jost_300Light
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
