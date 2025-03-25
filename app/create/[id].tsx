import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { createFlashCard } from '@/api/challenges';
import { BackgroundContainer, Button, Typography } from '@/components';
import { FlashCardInput } from '@/components';

const Create = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [flashCardNumber, setFlashCardsNumber] = useState(1);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { mutate } = useMutation({
    mutationFn: () => createFlashCard(id, question, answer),
    onSuccess: () => {
      setFlashCardsNumber((prev) => prev + 1);
      setQuestion('');
      setAnswer('');
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <BackgroundContainer>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={{ marginBottom: 50 }}>
              <Typography size="MEDIUM">{t('flashcard.title')}</Typography>
              <Typography size="SUPER_LARGE">{flashCardNumber}</Typography>
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
              <Button style={{ width: '100%' }} onPress={() => mutate()}>
                {t('flashcard.continue')}
              </Button>
              <Button style={{ width: '100%' }} onPress={() => router.back()}>
                {t('flashcard.finish')}
              </Button>
            </View>
          </View>
        </ScrollView>
      </BackgroundContainer>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 90,
    paddingHorizontal: 50,
  },
  inputContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 70,
  },
  buttonContainer: {
    gap: 20,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Create;
