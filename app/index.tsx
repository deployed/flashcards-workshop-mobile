import { StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { BackgroundContainer, Button, Typography } from '@/components';

import LogoIcon from '../assets/svgs/logo.svg';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <BackgroundContainer imagePath={require('../assets/images/home.png')}>
      <View style={styles.innerContainer}>
        <LogoIcon />
        <View style={styles.content}>
          <Typography>{t('home.createFlashcards')}</Typography>
          <Button onPress={() => console.log(t('home.startHere'))}>{t('home.startHere')}</Button>
          <Typography>{t('home.challengeYourself')}</Typography>
          <Button onPress={() => router.push('/challenge')}>{t('home.testYourself')}</Button>
        </View>
      </View>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
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
