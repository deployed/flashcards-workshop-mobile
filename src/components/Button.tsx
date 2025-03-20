import {StyleSheet, TouchableOpacity} from 'react-native';
import {Typography} from './Typography';

type ButtonProps = {
    children: string,
    onPress():void;
}

export const Button = ({children, onPress}: ButtonProps) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
           <Typography color='LIGHT' >{children}</Typography>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#112249',
        padding: 10,
        borderRadius: 6,
    }
})