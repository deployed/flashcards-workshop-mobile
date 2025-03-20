import { BackgroundContainer, Button, Typography } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import LogoIcon from '../assets/svgs/logo.svg';
import { useTranslation } from 'react-i18next';

const ChallengeSettings = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { t } = useTranslation();
    const router = useRouter();
    
    return(
        <BackgroundContainer imagePath={require('../assets/images/challenge.png')}>
        <View style={styles.innerContainer} >
            <View style={styles.logo}>
                <LogoIcon/>
                <Typography>Zestaw Angielski</Typography>
            </View>
            <View style={{gap: 100, alignItems: 'center'}} >
                <View style={styles.flashCardsButtons}>
                    <Button style={{paddingHorizontal: 50}}onPress={() => console.log("Test yourself")}>{t("settings.testYourself")}</Button>
                    <Button onPress={() => console.log("Edit set")}>{t("settings.editSet")}</Button>
                    <Button onPress={() => console.log("Delete set")}>{t("settings.deleteSet")}</Button>
                </View>
                <Button style={{paddingHorizontal: 30}} onPress={() => router.back()}>{t("challenge.back")}</Button>
            </View>
        </View>
    </BackgroundContainer>
    );
}

export default ChallengeSettings;

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
    flashCardsButtons: {gap: 20}
  });
