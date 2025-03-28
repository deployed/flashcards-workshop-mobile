import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { fetchFlashCards } from '@/api/challenges';
import { queryKeys } from '@/api/queryKyes';
import { BackgroundContainer, Button, Typography, FlashCardInput } from '@/components';
import { useEditFlashCard } from '@/hooks';

import LeftArrowIcon from '../../assets/svgs/left-arrow.svg';
import RightArrowIcon from '../../assets/svgs/right-arrow.svg';

const Edit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashCardId, setFlashCardId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { data, isSuccess } = useQuery({
    queryKey: queryKeys.set(id),
    queryFn: () => fetchFlashCards(id),
  });

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      const currentCard = data[currentIndex];

      if (currentCard?.id !== Number(flashCardId)) {
        setFlashCardId(currentCard.id.toString());
        setQuestion(currentCard?.question ?? '');
        setAnswer(currentCard?.answer ?? '');
      }
    }
  }, [isSuccess, currentIndex, data]);

  const { mutate } = useEditFlashCard();

  const handleContinue = useCallback(() => {
    mutate({ flashCardId, question, answer });
  }, [id, flashCardId, question, answer, mutate]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleContinue);

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [handleContinue]);

  return (
    <BackgroundContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={{ marginBottom: 50 }}>
              <Typography size="MEDIUM">{t('flashcard.title')}</Typography>
              <Typography size="SUPER_LARGE">{currentIndex + 1}</Typography>
              <Typography>{t('flashcard.enterBothSides')}</Typography>
            </View>

            <View style={styles.inputContainer}>
              <FlashCardInput
                label="Awers"
                value={question}
                onChangeText={setQuestion}
                placeholder={t('flashcard.textPlaceholder')}
                backgroundColor="#FBFBFB"
              />
              <FlashCardInput
                label="Rewers"
                value={answer}
                onChangeText={setAnswer}
                placeholder={t('flashcard.translationPlaceholder')}
                backgroundColor="#E6EEFF"
              />
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.arrowButtons}>
                <LeftArrowIcon
                  onPress={() => {
                    if (currentIndex > 0) {
                      setCurrentIndex((prev) => prev - 1);
                    }
                  }}
                />
                <RightArrowIcon
                  onPress={() => {
                    if (currentIndex < (data?.length || 0) - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    }
                  }}
                />
              </View>
              <Button style={{ width: '100%' }} onPress={() => router.back()}>
                {t('flashcard.finish')}
              </Button>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 90,
    paddingHorizontal: 50,
  },
  inputContainer: { width: '100%', gap: 20 },
  buttonContainer: { width: '100%', marginTop: 30, gap: 30 },
  arrowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Edit;
