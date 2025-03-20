import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Typography} from '@/components';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LogoIcon from '../assets/svgs/logo.svg';

export default function Index() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.outerContainer} edges={['left', 'right']}>
     <ImageBackground source={require('../assets/images/home.png')} resizeMode="cover" style={styles.image} >
          <View
            style={styles.innerContainer}
          >
            <LogoIcon/>
            <View style={styles.content}>
              <Typography>Stwórz swój zestaw fiszek od zera</Typography>
              <Button onPress={()=> console.log("Zacznij tutaj")}>Zacznij tutaj</Button>
              <Typography>Mając już stworzone fiszki, podejmij wyzwanie i sprawdź czego się nauczyłeś</Typography>
              <Button onPress={()=> console.log("Sprawdź się")}>Sprawdź się</Button>
            </View>
          </View>
    </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
 outerContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
  },
  content: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});