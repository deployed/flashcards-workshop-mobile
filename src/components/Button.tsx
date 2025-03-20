import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { Typography } from './Typography';

type ButtonProps = {
  children: string;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ children, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Typography color="LIGHT">{children}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#112249',
    padding: 10,
    borderRadius: 6,
  },
});
