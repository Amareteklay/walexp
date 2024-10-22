import React from "react"
import { useState } from "react"
import AudioCheck from "../screens/AudioCheck"
import Feedback from "../screens/Feedback"
import EmotionsScale from "../screens/EmotionsScale"
import Instructions from "../screens/Instructions"
import DemoEmoicons from "../screens/DemoEmoicons"
import PracticePrompt from "../screens/PracticePrompt"
import DemoShare from "../screens/DemoShare"
import SampleVideo from "../screens/SampleVideo"
import VideoScreen from "../screens/VideoScreen"
import TransitionScreen from "../screens/TransitionScreen"
import DonationPrompt from "../screens/DonationPrompt"
import DonationForm from "../screens/DonationForm"
import SurveyPrompt from "../screens/SurveyPrompt"
import Survey from "../screens/Survey"
import ThankYou from "../screens/ThankYou"
import Welcome from "../screens/Welcome"
import { videoData } from "../data"
import DemoScreen from "../screens/DemoScreen"

const screens = {
  audioCheck: AudioCheck,
  feedback: Feedback,
  emotionsOne: (props) => (
    <EmotionsScale
      {...props}
      nextScreen="instructions"
      emotionId="emotionsOne"
    />
  ),
  instructions: Instructions,
  demoScreen: DemoScreen,
  demoicons: (props) => <DemoEmoicons {...props} emojiType={props.emojiType} />,
  sampleVideo: SampleVideo,
  practicePrompt: PracticePrompt,
  demoshare: DemoShare,
  videoOne: (props) => (
    <VideoScreen
      {...props}
      videoSrc={`${process.env.PUBLIC_URL}/videos/sampleVideo.mp4`}
      nextScreen="transitionOne"
      emojiType={props.emojiType}
      overlayText="Sample Video"
      factInfo="Sample Text"
    />
  ),
  transitionOne: TransitionScreen,
  videoSeries: (props) => {
    const { currentStep, onProceed, framingType, emojiType } = props

    const handleNextScreen = () => {
      const nextStep = currentStep + 1

      if ([2, 5, videoData.length - 1].includes(currentStep)) {
        onProceed("emotions")
      } else if (nextStep < videoData.length) {
        onProceed("videoSeries")
      } else {
        onProceed("surveyPrompt")
      }
    }

    const videoIndex = currentStep < videoData.length ? currentStep : 0

    // Determine the textKey based on currentStep and framingType
    let textKey = "neutral" // Default to neutral for the first three videos

    if (currentStep >= 3) {
      textKey =
        framingType === "Positive"
          ? "positive"
          : framingType === "Negative"
          ? "negative"
          : framingType === "Neutral"
          ? "neutral"
          : "neutral"
    }

    return (
      <VideoScreen
        key={videoIndex}
        videoSrc={`${process.env.PUBLIC_URL}/videos/${videoData[videoIndex].video}`}
        overlayText={videoData[videoIndex].texts[textKey]} // Use the determined textKey
        videoId={videoData[videoIndex].videoId}
        onProceed={handleNextScreen}
        nextScreen="videoSeries"
        emojiType={emojiType}
        factInfo={videoData[videoIndex].texts.factInfo} // Pass factInfo too
      />
    )
  },
  emotions: (props) => {
    const { currentStep, onProceed } = props

    const nextScreen =
      currentStep >= videoData.length - 1 ? "donationPrompt" : "videoSeries"

    return (
      <EmotionsScale
        {...props}
        nextScreen={nextScreen}
        emotionId={`emotions_${currentStep}`}
      />
    )
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
  const ScreenComponent = screens[screen] || Welcome

  // State to manage questionIndex
  const [questionIndex, setQuestionIndex] = useState(0)

  // State to manage emotion responses
  const [emotionResponses, setEmotionResponses] = useState({})

  const handleQuestionChange = (index) => {
    setQuestionIndex(index) // Update local state
    onQuestionChange(index) // Propagate change to parent (App)
  }

  const handleEmotionSave = (emotionId, value, timestamp) => {
    setEmotionResponses((prev) => ({
      ...prev,
      [emotionId]: { emotionId, emotion: value, timestamp },
    }))
  }

  const handlePostAllEmotions = () => {
    window.parent.postMessage(
      {
        type: "all_emotion_data",
        data: Object.values(emotionResponses),
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
        // Post all emotion responses once we reach the donation prompt or thank you screen
        if (nextScreen === "donationPrompt" || nextScreen === "thankyou") {
          handlePostAllEmotions()
        }
      }}
      onStart={onProceed}
      questionIndex={questionIndex}
      onQuestionChange={handleQuestionChange} // Pass the handler to Survey
      saveEmotionResponse={handleEmotionSave} // Pass the handler to EmotionsScale
    />
  )
}

export default ScreenManager
