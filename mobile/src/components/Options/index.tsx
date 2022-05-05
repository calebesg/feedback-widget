import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';

export function Options() {
  const feedbacks = Object.entries(feedbackTypes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {feedbacks.map(([key, feedback]) => (
          <Option key={key} title={feedback.title} image={feedback.image} />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
