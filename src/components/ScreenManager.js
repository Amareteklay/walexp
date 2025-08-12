import React, { useState, useEffect } from "react";
import { useData } from "../contexts/DataContext";

import AudioCheck from "../screens/AudioCheck";
import Feedback from "../screens/Feedback";
import EmotionsScale from "../screens/EmotionsScale";
import Instructions from "../screens/Instructions";
import PracticePrompt from "../screens/PracticePrompt";
import VideoScreen from "../screens/VideoScreen";
import TransitionScreen from "../screens/TransitionScreen";
import DonationPrompt from "../screens/DonationPrompt";
import DonationForm from "../screens/DonationForm";
import SurveyPrompt from "../screens/SurveyPrompt";
import Survey from "../screens/Survey";
import ThankYou from "../screens/ThankYou";
import OddOneOutTask from "../screens/OddOneOutTask";
import Welcome from "../screens/Welcome";
import DemoScreen from "../screens/DemoScreen";
import { videoData } from "../data";

const screens = {
  audioCheck: AudioCheck,
  feedback: Feedback,
  instructions: Instructions,
  demoScreen: DemoScreen,
  practicePrompt: PracticePrompt,

  videoOne: (props) => (
    <VideoScreen
      {...props}
      videoSrc={`${process.env.PUBLIC_URL}/videos/sampleVideo.mp4`}
      nextScreen="transitionOne"
      emojiType={props.emojiType}
      overlayText="Captured in 2024"
      factInfo="Water and Island near Stockholm"
      videoId="video0"
    />
  ),

  transitionOne: TransitionScreen,

  emotionsOne: (props) => (
    <EmotionsScale {...props} nextScreen="videoSeries" emotionId={1} />
  ),

  // Attention check #1 (existing)
  oddOneOut: (props) => (
    <OddOneOutTask {...props} nextScreen="videoSeries" checkId={1} />
  ),

  // NEW: Attention check #2
  oddOneOut2: (props) => (
    <OddOneOutTask {...props} nextScreen="videoSeries" checkId={2} />
  ),

  emotionsFinal: (props) => (
    <EmotionsScale {...props} nextScreen="surveyPrompt" emotionId={25} />
  ),

  videoSeries: (props) => {
    const { currentStep, onProceed, framingType, emojiType } = props;

    // choose overlay text key
    const getTextKey = () => {
      const valid = ["Positive", "Negative", "Neutral"];
      const type = valid.includes(framingType) ? framingType : "Neutral";
      return currentStep < 5 ? "neutral" : type.toLowerCase();
    };

    const handleNext = () => {
      // After 5th, 10th, 15th, 20th, and last video -> emotions
      if ([4, 9, 14, 19, videoData.length - 1].includes(currentStep)) {
        onProceed("emotions");
      // Existing attention check around early block (index 6)
      } else if (currentStep === 6) {
        onProceed("oddOneOut");
      // NEW: second attention check later in the set (index 16)
      } else if (currentStep === 16) {
        onProceed("oddOneOut2");
      } else {
        onProceed("videoSeries");
      }
    };

    const idx = currentStep < videoData.length ? currentStep : 0;

    return (
      <VideoScreen
        key={idx}
        videoSrc={`${process.env.PUBLIC_URL}/videos/${videoData[idx].video}`}
        overlayText={videoData[idx].texts[getTextKey()]}
        videoId={videoData[idx].videoId}
        onProceed={handleNext}
        nextScreen="videoSeries"
        emojiType={emojiType}
        factInfo={videoData[idx].texts.factInfo}
      />
    );
  },

  emotions: (props) => {
    const { currentStep } = props;
    const next =
      currentStep >= videoData.length - 1 ? "donationPrompt" : "videoSeries";
    return <EmotionsScale {...props} nextScreen={next} emotionId={currentStep} />;
  },

  donationPrompt: DonationPrompt,
  donationForm: DonationForm,

  surveyPrompt: SurveyPrompt,
  survey: (props) => (
    <Survey {...props} onSubmit={() => props.onProceed("thankyou")} />
  ),

  thankyou: ThankYou,
  welcome: Welcome,
};

export default function ScreenManager({
  screen,
  currentStep,
  overlayText,
  framingType,
  emojiType,
  onProceed,
  onQuestionChange,
}) {
  const { dispatch } = useData();

  const [questionIndex, setQuestionIndex] = useState(0);
  // buffer all emotion entries
  const [emotionResponses, setEmotionResponses] = useState([]);

  // track attention check results (optional local buffer)
  const [attentionResults, setAttentionResults] = useState([]);

  // called by EmotionsScale
  const handleEmotionSave = (entry) => {
    setEmotionResponses((prev) => [...prev, entry]);
  };

  // called by OddOneOutTask (#1 & #2)
  const handleAttentionResult = (entry) => {
    // expected shape: { checkId, passed, rt, startedAt, endedAt, choice }
    setAttentionResults((prev) => [...prev, entry]);

    const { checkId, passed, rt, startedAt, endedAt, choice } = entry;

    // persist immediately
    dispatch({ type: "SET_DATA", key: `attention_${checkId}_passed`, value: passed });
    dispatch({ type: "SET_DATA", key: `attention_${checkId}_rt`, value: rt });
    dispatch({ type: "SET_DATA", key: `attention_${checkId}_startedAt`, value: startedAt });
    dispatch({ type: "SET_DATA", key: `attention_${checkId}_endedAt`, value: endedAt });
    dispatch({ type: "SET_DATA", key: `attention_${checkId}_choice`, value: choice });

    // post to PsychoJS host immediately for logging
    window.parent.postMessage(
      {
        type: "attention_check",
        checkId,
        passed,
        rt,
        startedAt,
        endedAt,
        choice,
      },
      "*"
    );
  };

  // once at the very end
  const handlePostAllEmotions = () => {
    // 1) flatten into DataContext
    emotionResponses.forEach(
      ({
        emotionId,
        emotionStartAt,
        emotionSelectedAt,
        emotionValue,
        emotionEndAt,
      }) => {
        dispatch({
          type: "SET_DATA",
          key: `emotionStartAt_${emotionId}`,
          value: emotionStartAt,
        });
        dispatch({
          type: "SET_DATA",
          key: `emotionSelectedAt_${emotionId}`,
          value: emotionSelectedAt,
        });
        dispatch({
          type: "SET_DATA",
          key: `emotionValue_${emotionId}`,
          value: emotionValue,
        });
        dispatch({
          type: "SET_DATA",
          key: `emotionEndAt_${emotionId}`,
          value: emotionEndAt,
        });
      }
    );

    // 2) build flat payload and postMessage
    const payload = { type: "all_emotion_data" };
    emotionResponses.forEach(
      ({
        emotionId,
        emotionStartAt,
        emotionSelectedAt,
        emotionValue,
        emotionEndAt,
      }) => {
        payload[`emotionStartAt_${emotionId}`] = emotionStartAt;
        payload[`emotionSelectedAt_${emotionId}`] = emotionSelectedAt;
        payload[`emotionValue_${emotionId}`] = emotionValue;
        payload[`emotionEndAt_${emotionId}`] = emotionEndAt;
      }
    );
    window.parent.postMessage(payload, "*");
  };

  useEffect(() => {
    console.log("ScreenManager received framingType:", framingType);
  }, [framingType]);

  const ScreenComponent = screens[screen] || Welcome;

  return (
    <ScreenComponent
      currentStep={currentStep}
      overlayText={overlayText}
      framingType={framingType}
      emojiType={emojiType}
      saveEmotionResponse={handleEmotionSave}
      onAttentionResult={handleAttentionResult}
      onProceed={(next) => {
        onProceed(next);
        if (next === "donationPrompt" || next === "thankyou") {
          handlePostAllEmotions();
        }
      }}
      onStart={onProceed}
      questionIndex={questionIndex}
      onQuestionChange={(idx) => {
        setQuestionIndex(idx);
        onQuestionChange(idx);
      }}
    />
  );
}
