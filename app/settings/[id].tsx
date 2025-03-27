import { StyleSheet, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { fetchFlashCardSet } from '@/api/challenges';
import { BackgroundContainer, Button, Typography } from '@/components';
import { useDeleteFlashCardSet } from '@/hooks';

import LogoIcon from '../../assets/svgs/logo.svg';

const ChallengeSettings = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['flash-card-set', id],
    queryFn: () => fetchFlashCardSet(id),
  });
  const { mutate } = useDeleteFlashCardSet();

  return (
    <BackgroundContainer>
      <View style={styles.innerContainer}>
        <View style={styles.logo}>
          <LogoIcon />
          <Typography>{data?.title ?? 'Flash Card Set'}</Typography>
        </View>
        <View style={{ gap: 100, alignItems: 'center' }}>
          <View style={styles.flashCardsButtons}>
            <Button
              style={{ paddingHorizontal: 50 }}
              onPress={() => router.navigate(`/learn/${id}`)}
            >
              {t('settings.testYourself')}
            </Button>
            <Button onPress={() => router.navigate(`/edit/${id}`)}>{t('settings.editSet')}</Button>
            <Button onPress={() => mutate()}>{t('settings.deleteSet')}</Button>
          </View>
          <Button style={{ paddingHorizontal: 30 }} onPress={() => router.back()}>
            {t('challenge.back')}
          </Button>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default ChallengeSettings;

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
  flashCardsButtons: { gap: 20 },
});
