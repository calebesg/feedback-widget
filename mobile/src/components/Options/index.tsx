import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';

interface OptionsProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  const feedbacks = Object.entries(feedbackTypes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {feedbacks.map(([key, feedback]) => (
          <Option
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
            key={key}
            title={feedback.title}
            image={feedback.image}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
