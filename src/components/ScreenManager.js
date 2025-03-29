import React from "react"
import { useState, useEffect } from "react"
import AudioCheck from "../screens/AudioCheck"
import Feedback from "../screens/Feedback"
import EmotionsScale from "../screens/EmotionsScale"
import Instructions from "../screens/Instructions"
import PracticePrompt from "../screens/PracticePrompt"
import VideoScreen from "../screens/VideoScreen"
import TransitionScreen from "../screens/TransitionScreen"
import DonationPrompt from "../screens/DonationPrompt"
import DonationForm from "../screens/DonationForm"
import SurveyPrompt from "../screens/SurveyPrompt"
import Survey from "../screens/Survey"
import ThankYou from "../screens/ThankYou"
import OddOneOutTask from "../screens/OddOneOutTask"
import Welcome from "../screens/Welcome"
import { videoData } from "../data"
import DemoScreen from "../screens/DemoScreen"

const screens = {
  audioCheck: AudioCheck,
  feedback: Feedback,
  instructions: Instructions,
  demoScreen: DemoScreen,
  demoicons: (props) => (
    <DemoEmoicons {...props} emojiType={props.emojiType} />
  ),
  practicePrompt: PracticePrompt,
  videoOne: (props) => (
    <VideoScreen
      {...props}
      videoSrc={`${process.env.PUBLIC_URL}/videos/sampleVideo.mp4`}
      nextScreen="transitionOne"
      emojiType={props.emojiType}
      overlayText="Captured in 2024"
      factInfo="Water and Island near Stockholm"
      videoId={'video0'}
    />
  ),
  transitionOne: TransitionScreen,
  emotionsOne: (props) => (
    <EmotionsScale {...props} nextScreen="videoSeries" emotionId="1" />
  ),
  oddOneOut: (props) => (
    <OddOneOutTask {...props} nextScreen={"videoSeries"} />),
  emotionsFinal: (props) => (
    <EmotionsScale {...props} nextScreen="surveyPrompt" emotionId="7" />
  ),
  videoSeries: (props) => {
    const { currentStep, onProceed, framingType, emojiType } = props;
    
    console.log("[VideoSeries] Received framingType:", framingType);

    // Safely handle framingType with validation
  const getTextKey = () => {
    const validTypes = ["Positive", "Negative", "Neutral"];
    const validatedType = validTypes.includes(framingType) 
      ? framingType 
      : "Neutral";

    // First 4 videos always neutral framing
    if (currentStep < 5) return "neutral";
    
    // After step 5, use actual framing
    return validatedType.toLowerCase();
  };

  const textKey = getTextKey();
  console.log("[VideoSeries] Using textKey:", textKey);

    const handleNextScreen = () => {
      const nextStep = currentStep + 1;
      console.log("Current step", currentStep);
      
      if ([4, 9, 14, 19, videoData.length - 1].includes(currentStep)) {
        onProceed("emotions");
      } else if (currentStep === 6) {
        onProceed("oddOneOut");
      } else {
        onProceed("videoSeries");
      } 
    };

    const videoIndex = currentStep < videoData.length ? currentStep : 0;

    return (
      <VideoScreen
        key={videoIndex}
        videoSrc={`${process.env.PUBLIC_URL}/videos/${videoData[videoIndex].video}`}
        overlayText={videoData[videoIndex].texts[textKey]}
        videoId={videoData[videoIndex].videoId}
        onProceed={handleNextScreen}
        nextScreen="videoSeries"
        emojiType={emojiType}
        factInfo={videoData[videoIndex].texts.factInfo}
      />
    );
  },
  emotions: (props) => {
    const { currentStep, onProceed } = props

    const nextScreen =
      currentStep >= videoData.length - 1 ? "donationPrompt" : "videoSeries"

    return <EmotionsScale {...props} nextScreen={nextScreen} emotionId={currentStep} />
  },
  donationPrompt: DonationPrompt,
  donationForm: DonationForm,
  surveyPrompt: SurveyPrompt,
  survey: (props) => (
    <Survey {...props} onSubmit={() => props.onProceed("thankyou")} />
  ),
  thankyou: ThankYou,
  welcome: Welcome,
}

function ScreenManager({
  screen,
  currentStep,
  overlayText,
  framingType,
  emojiType,
  onProceed,
  onQuestionChange,
}) {
  useEffect(() => {
    console.log("ScreenManager received framingType:", framingType);
  }, [framingType]);

  const ScreenComponent = screens[screen] || Welcome

  const [questionIndex, setQuestionIndex] = useState(0)
  const [emotionResponses, setEmotionResponses] = useState({})

  const handleQuestionChange = (index) => {
    setQuestionIndex(index)
    onQuestionChange(index)
  }

  const handleEmotionSave = (emotionId, value, timestamp) => {
    setEmotionResponses((prev) => ({
      ...prev,
      [emotionId]: { emotionId, emotion: value, timestamp },
    }))
  }

  const handlePostAllEmotions = () => {
    console.log("Posting All Emotion Responses: ", emotionResponses)
    window.parent.postMessage(
      {
        type: "all_emotion_data",
        emotionResponsesArray: Object.values(emotionResponses),
      },
      "*"
    )
  }

  return (
    <ScreenComponent
      currentStep={currentStep}
      overlayText={overlayText}
      framingType={framingType}
      emojiType={emojiType}
      onProceed={(nextScreen) => {
        onProceed(nextScreen)
        if (nextScreen === "donationPrompt" || nextScreen === "thankyou") {
          handlePostAllEmotions()
        }
      }}
      onStart={onProceed}
      questionIndex={questionIndex}
      onQuestionChange={handleQuestionChange}
      saveEmotionResponse={handleEmotionSave}
    />
  )
}

export default ScreenManager