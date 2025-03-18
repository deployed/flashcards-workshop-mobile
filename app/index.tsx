import { Text, View} from 'react-native';
import {CustomButton} from '@/components/Button';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Stwórz swój zestaw fiszek od zera</Text>
      <CustomButton title={"Hello"}/>
      <Text>Mając już stworzone fiszki, podejmij wyzwanie i sprawdź czego się nauczyłeś</Text>
      <CustomButton title={"Sprawdź się!"}/>
    </View>

  );
}
