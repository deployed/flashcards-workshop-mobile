import { BackgroundContainer, Button, Typography } from "@/components";
import { StyleSheet, View } from "react-native";
import { useTranslation } from 'react-i18next';
import { useRouter } from "expo-router";

const Summary = () => {
    const { t } = useTranslation();
    const router = useRouter();
    return(
        <BackgroundContainer imagePath={require('../../assets/images/challenge.png')}>
            <View style={styles.innerContainer}>
                <Typography>{t("summary.summary")}</Typography>
                <View>
                <Typography>{t("summary.knowIt")}</Typography>
                <Typography>{t("summary.needToReview")}</Typography>
                </View>
                 <Button onPress={() => router.navigate('/challenge')}>{t("summary.finish")}</Button>
            </View>
        </BackgroundContainer>
    );
}

export default Summary;

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
