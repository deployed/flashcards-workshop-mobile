import { StyleSheet, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { fetchCounters } from '@/api/challenges';
import { queryKeys } from '@/api/queryKyes';
import { BackgroundContainer, Button, Typography } from '@/components';

const Summary = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: queryKeys.setCounters(id),
    queryFn: () => fetchCounters(id, '123'),
  });

  return (
    <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
      <View style={styles.innerContainer}>
        <Typography size="SUPER_LARGE" font="REGULAR">
          {t('summary.summary')}
        </Typography>
        {data ? (
          <View style={{ gap: 20 }}>
            <Typography size="MEDIUM" font="REGULAR">
              {t('summary.knowIt')}
            </Typography>
            <Typography size="LARGE" font="REGULAR">
              {data?.known}
            </Typography>
            <Typography size="MEDIUM" font="REGULAR">
              {t('summary.needToReview')}
            </Typography>
            <Typography size="LARGE" font="REGULAR">
              {data?.unknown}
            </Typography>
          </View>
        ) : (
          <Typography>No data</Typography>
        )}
        <Button onPress={() => router.navigate('/challenge')}>{t('summary.finish')}</Button>
      </View>
    </BackgroundContainer>
  );
};

export default Summary;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
