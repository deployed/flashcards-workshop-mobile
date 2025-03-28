import { View, StyleSheet } from 'react-native';

import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Typography } from './Typography';

type FlipCardType = {
  isFlipped: SharedValue<boolean>;
  question: string;
  answer: string;
};

export const FlipCard = ({ isFlipped, question, answer }: FlipCardType) => {
  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);

    const rotateValue = withTiming(`${spinValue}deg`, { duration: 200 });
    const opacity = Number(isFlipped.value) < 0.5 ? 1 : 0;
    return {
      transform: [{ rotateX: rotateValue }],
      opacity,
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration: 200 });
    const opacity = Number(isFlipped.value) > 0.5 ? 1 : 0;
    return {
      transform: [{ rotateX: rotateValue }],
      opacity,
    };
  });

  return (
    <View>
      <Animated.View style={[styles.regularCard, styles.flipCard, regularCardAnimatedStyle]}>
        <View style={styles.card}>
          <Typography>{question}</Typography>
        </View>
      </Animated.View>
      <Animated.View style={[styles.flippedCard, styles.flipCard, flippedCardAnimatedStyle]}>
        <View style={styles.card}>
          <Typography>{answer}</Typography>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#FBFBFB',
  },
  flippedCard: {
    zIndex: 2,
    backgroundColor: '#E6EEFF',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    width: 300,
    height: 200,
    backfaceVisibility: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
