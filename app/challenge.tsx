import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { fetchFlashCardSets } from '@/api/challenges';
import { BackgroundContainer, Button, Typography } from '@/components';

import LogoIcon from '../assets/svgs/logo.svg';

const Challenge = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useQuery({ queryKey: ['flash-card-sets'], queryFn: fetchFlashCardSets });
  
  return (
    <BackgroundContainer imagePath={require('../assets/images/challenge.png')}>
      <View style={styles.innerContainer}>
        <View style={styles.logo}>
          <LogoIcon />
          <Typography>{t('challenge.selectFlashcards')}</Typography>
        </View>
        <View style={{ gap: 30, alignItems: 'center' }}>
          <View style={styles.flashCardsButtons}>
          {data?.map((flashcard) => (
              <Button key={flashcard.id} onPress={() => router.push(`/${flashcard.id}`)}>
                {flashcard.title}
              </Button>
            ))}
          </View>
          <TouchableOpacity>
            <Typography size="LARGE" font="REGULAR">
              {t('challenge.createNewFlashcards')}
            </Typography>
          </TouchableOpacity>
          <Button style={{ paddingHorizontal: 30 }} onPress={() => router.back()}>
            {t('challenge.back')}
          </Button>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
  },
  logo: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashCardsButtons: { gap: 5, width: '90%' },
});
