import { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BackgroundContainer, Button, Typography } from '@/components';
import { FlashCardInput } from '@/components';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { editFlashCard, fetchFlashCards } from '@/api/challenges';

const Edit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashCardId, setFlashCardId] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { data, isSuccess } = useQuery({
    queryKey: ['flash-card-set', id],
    queryFn: () => fetchFlashCards(id),
  });
  console.log(data);

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      setFlashCardId(data[currentIndex]?.id);
      setQuestion(data[currentIndex]?.question || '');
      setAnswer(data[currentIndex]?.answer || '');
    }
  }, [isSuccess, currentIndex, data]);
  
 
  const { mutate } = useMutation({
    mutationFn: () => editFlashCard(id, flashCardId, question, answer),
    onSuccess: () => {
      if (data && currentIndex < data.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        router.back();
      }
    },
  });

  const handleContinue = () => {
    mutate();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <View style={{ marginBottom: 50 }}>
              <Typography size='MEDIUM'>{t('flashcard.title')}</Typography>
              <Typography size='SUPER_LARGE'>{currentIndex + 1}</Typography>
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
              <Button style={{ width: '100%' }} onPress={handleContinue}>
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
  scrollContainer: { flexGrow: 1 },
  innerContainer: { padding: 20, alignItems: 'center' },
  inputContainer: { width: '100%', gap: 20 },
  buttonContainer: { width: '100%', marginTop: 30, gap: 10 },
});

export default Edit;
