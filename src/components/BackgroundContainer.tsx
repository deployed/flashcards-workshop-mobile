import React from 'react';
import { ImageBackground, type ImageSourcePropType, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface BackgroundContainerProps {
  children: React.ReactNode;
  imagePath: ImageSourcePropType;
}

export const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
  imagePath,
}) => {
  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={styles.outerContainer} edges={['left', 'right']}>
        <ImageBackground source={imagePath} resizeMode="cover" style={styles.image}>
          {children}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default BackgroundContainer;
