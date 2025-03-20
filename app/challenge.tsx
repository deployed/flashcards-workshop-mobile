import { BackgroundContainer, Button, Typography } from "@/components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LogoIcon from '../assets/svgs/logo.svg';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

const Challenge = () => {
    const { t } = useTranslation();
    const router = useRouter();
    return(
        <BackgroundContainer imagePath={require('../assets/images/challenge.png')}>
            <View style={styles.innerContainer} >
                <View style={styles.logo}>
                    <LogoIcon/>
                    <Typography>{t("challenge.selectFlashcards")}</Typography>
                </View>
                <View style={{gap: 30, alignItems: 'center'}} >
                    <View style={styles.flashCardsButtons}>
                        <Button onPress={() => console.log("English")}>Zestaw angielski</Button>
                        <Button onPress={() => console.log("Italian")}>Zestaw włoski</Button>
                        <Button onPress={() => console.log("Polish")}>Zestaw polski</Button>
                    </View>
                    <TouchableOpacity >
                        <Typography  size="LARGE" font="REGULAR">{t("challenge.createNewFlashcards")}</Typography>
                    </TouchableOpacity>
                    <Button style={{paddingHorizontal: 30}} onPress={() => router.back()}>{t("challenge.back")}</Button>
                </View>
            </View>
        </BackgroundContainer>
    );
}

export default Challenge;

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
    flashCardsButtons: {gap: 5, width: '90%'}
  });
  