import { BackgroundContainer, Button } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

const Test = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
        <View style={styles.innerContainer}>
              <Button onPress={() => console.log("hello")}>{id}</Button>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1 },
    innerContainer: { padding: 20, alignItems: 'center' },
    inputContainer: { width: '100%', gap: 20 },
    buttonContainer: { width: '100%', marginTop: 30, gap: 10 },
  });
  