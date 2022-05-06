import { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { api } from '../../libs/api';
import { styles } from './styles';
import { theme } from '../../theme';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackReset: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackReset,
  onFeedbackSent,
}: FormProps) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleScreenshot() {
    try {
      const uri = await captureScreen({ format: 'jpg', quality: 0.8 });
      setScreenshot(uri);
    } catch (error) {
      console.error(error);
    }
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleFeedbackSent() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const imageBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

    console.log(imageBase64);

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${imageBase64}`,
      });

      onFeedbackSent();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackReset}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
        autoCorrect={false}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button onPress={handleFeedbackSent} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
