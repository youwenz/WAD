import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PRIMARY} from '../Style/Color';

interface props {
  backgroundColor?: string;
  textColor?: string;
  text: string;
  onPressFunction: () => void;
  width?: number;
}
const CustomButton: React.FC<props> = ({
  backgroundColor=PRIMARY,
  textColor='white',
  text,
  onPressFunction,
  width = 175,
}) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor, width}]} onPress={onPressFunction}>
      <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 175,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
  },
});

export default CustomButton;
