import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Typography } from '@/components';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LogoIcon from '../assets/svgs/logo.svg';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.outerContainer} edges={['left', 'right']}>
        <ImageBackground
          source={require('../assets/images/home.png')}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.innerContainer}>
            <LogoIcon />
            <View style={styles.content}>
              <Typography>{t("home.createFlashcards")}</Typography>
              <Button onPress={() => console.log(t("home.startHere"))}>
                {t("home.startHere")}
              </Button>
              <Typography>{t("home.challengeYourself")}</Typography>
              <Button onPress={() => console.log(t("home.testYourself"))}>
                {t("home.testYourself")}
              </Button>
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
  },
});
