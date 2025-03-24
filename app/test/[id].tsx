import { fetchFlashCards } from '@/api/challenges';
import { BackgroundContainer, Button, FlipCard, Typography} from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function Test() {
  const isFlipped = useSharedValue(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { data, isSuccess } = useQuery({
      queryKey: ['flash-card-set', id],
      queryFn: () => fetchFlashCards(id),
    });

  useEffect(() => {
      if (isSuccess && data.length > 0) {
        setQuestion(data[currentIndex]?.question || '');
        setAnswer(data[currentIndex]?.answer || '');
      }
    }, [isSuccess, currentIndex, data]);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  return (
    <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
        <View style={styles.innerContainer}>
            <View>
                <Typography>Fiszka</Typography>
                <View style={{flexDirection: 'row'}}>
                <Typography size='LARGE' font='REGULAR'>{`${currentIndex} / ${data ? data.length - 1 : 1}`}</Typography>
                </View>
            </View>
            <Pressable onPress={handlePress}>
                <FlipCard isFlipped={isFlipped} question={question} answer={answer} />
            </Pressable>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button style={{backgroundColor: '#2A3D6A', width: 100}} onPress={() => console.log("Wiem")}>Nie wiem</Button>
            <Button style={{backgroundColor: '#2A3D6A',  width: 100 }} onPress={() =>console.log("Nie wiem")}>Wiem</Button>
            </View>
                <Button style={{ width: 100 }} onPress={() => setCurrentIndex((prev) => prev + 1)}>Dalej</Button>
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
    buttonContainer: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
