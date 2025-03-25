import { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSharedValue } from 'react-native-reanimated';

import { fetchFlashCards } from '@/api/challenges';
import { BackgroundContainer, Button, FlipCard, Typography } from '@/components';
import { useMarkAsKnown, useMarkAsUnknown } from '@/hooks';
import { queryClient } from '@/api/client';

export default function Test() {
  const isFlipped = useSharedValue(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ['flash-card-set', id],
    queryFn: () => fetchFlashCards(id),
  });
   
  const flashcardId = data?.[currentIndex]?.id || '';
  const question = data?.[currentIndex]?.question || '';
  const answer =  data?.[currentIndex]?.answer || '';

  const { mutate: mutateMarkAsKnown } = useMarkAsKnown();
  const { mutate: mutateMarkAsUnknown } = useMarkAsUnknown();

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  const handleNext = () => {
    if (currentIndex < (data?.length || 1) - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      queryClient.invalidateQueries({ queryKey: ['flash-card-sets-counters', id] });
      router.navigate(`/summary/${id}`);
    }
  };

  return (
    <BackgroundContainer>
      <View style={styles.innerContainer}>
        <View>
          <Typography>Fiszka</Typography>
          <View style={styles.counterContainer}>
            <Typography size="LARGE" font="REGULAR">
              {`${currentIndex + 1} / ${data ? data.length : 1}`}
            </Typography>
          </View>
        </View>
        <Pressable onPress={handlePress}>
          <FlipCard isFlipped={isFlipped} question={question} answer={answer} />
        </Pressable>
        <View style={styles.buttonRow}>
          <Button
            style={[styles.button, styles.blueBackground]}
            onPress={() => mutateMarkAsKnown({ id, flashCardId: flashcardId.toString(), user: '123' })}
          >
            {t('test.knowIt')}
          </Button>
          <Button
            style={[styles.button, styles.blueBackground]}
            onPress={() => mutateMarkAsUnknown({ id, flashCardId: flashcardId.toString(), user: '123' })}
          >
            {t('test.dontKnowIt')}
          </Button>
        </View>
        <Button style={styles.nextButton} onPress={handleNext}>
          {t('test.next')}
        </Button>
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
    paddingHorizontal: 50,
  },
  counterContainer: {
    flexDirection: 'row',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
  },
  blueBackground: {
    backgroundColor: '#2A3D6A',
  },
  nextButton: {
    width: 100,
  },
});
