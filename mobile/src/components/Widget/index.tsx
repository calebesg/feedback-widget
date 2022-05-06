import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

import { theme } from '../../theme';
import { styles } from './styles';

import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackTypeSelected, setFeedbackTypeSelected] =
    useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleFeedbackReset() {
    setFeedbackSent(false);
    setFeedbackTypeSelected(null);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
      >
        {feedbackSent ? (
          <Success onFeedbackReset={handleFeedbackReset} />
        ) : (
          <>
            {feedbackTypeSelected ? (
              <Form
                onFeedbackReset={handleFeedbackReset}
                onFeedbackSent={() => setFeedbackSent(true)}
                feedbackType={feedbackTypeSelected}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackTypeSelected} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
