import { View, Text, Image, TouchableOpacity } from 'react-native';

import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface SuccessProps {
  onFeedbackReset: () => void;
}

export function Success({ onFeedbackReset }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity onPress={onFeedbackReset} style={styles.button}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
