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
import LeftArrowIcon from '../../assets/svgs/left-arrow.svg';
import RightArrowIcon from '../../assets/svgs/right-arrow.svg';

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
    <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              <View style={styles.arrowButtons}>
                <LeftArrowIcon onPress={() => currentIndex >= 1 ? setCurrentIndex((prev) => prev - 1) : null}/>
                <RightArrowIcon onPress={() => setCurrentIndex((prev) => prev + 1) }/>
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
  arrowButtons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Edit;
