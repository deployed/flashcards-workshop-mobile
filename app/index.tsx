import { StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { BackgroundContainer, Button, Popup, Typography } from '@/components';
import {useMutation} from '@tanstack/react-query';
import LogoIcon from '../assets/svgs/logo.svg';
import { useState } from 'react';
import { createFlashCardSet } from '@/api/challenges';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleCreateFlashCards = () => {
      setPopupVisible(true)
  }

  const {mutate } =  useMutation({
    mutationFn: (title: string) => createFlashCardSet(title),
    onSuccess: (data) =>{ 
      console.log("Utworzony zestaw fiszek:", data); 
      router.push(`/create/${data.id}`)
  }
  });

  const handleSave = (name: string) => {
     mutate(name);
  };


  return (
    <BackgroundContainer imagePath={require('../assets/images/home.png')}>
      <View style={styles.innerContainer}>
      <Popup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSave={handleSave}
      />
        <LogoIcon />
        <View style={styles.content}>
          <Typography>{t('home.createFlashcards')}</Typography>
          <Button onPress={handleCreateFlashCards}>{t('home.startHere')}</Button>
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
