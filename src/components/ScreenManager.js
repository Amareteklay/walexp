import React from "react"
import AudioCheck from "../screens/AudioCheck"
import Feedback from "../screens/Feedback"
import EmotionsScale from "../screens/EmotionsScale"
import Instructions from "../screens/Instructions"
import DemoEmoicons from "../screens/DemoEmoicons"
import DemoShare from "../screens/DemoShare"
import VideoScreen from "../screens/VideoScreen"
import TransitionScreen from "../screens/TransitionScreen"
import DonationPrompt from "../screens/DonationPrompt"
import DonationForm from "../screens/DonationForm"
import Survey from "../screens/Survey"
import ThankYou from "../screens/ThankYou"
import Welcome from "../screens/Welcome"
import { videoData } from "../data"

const screens = {
  audioCheck: AudioCheck,
  feedback: Feedback,
  emotionsOne: (props) => (
    <EmotionsScale {...props} nextScreen="instructions" />
  ),
  instructions: Instructions,
  demoicons: DemoEmoicons,
  demoshare: DemoShare,
  videoOne: (props) => (
    <VideoScreen
      {...props}
      videoSrc={`${process.env.PUBLIC_URL}/videos/Floods1.mp4`}
      nextScreen="transitionOne"
    />
  ),
  transitionOne: TransitionScreen,
  videoSeries: (props) => {
    const { currentStep, onProceed } = props

    const handleNextScreen = () => {
      const nextStep = currentStep + 1

      if ([2, 5, videoData.length - 1].includes(currentStep)) {
        onProceed("emotions")
      } else if (nextStep < videoData.length) {
        onProceed("videoSeries") // Move to the next video
      } else {
        onProceed("survey") // After the last video, show the survey
      }
    }

    const videoIndex = currentStep < videoData.length ? currentStep : 0
    return (
      <VideoScreen
        key={videoIndex} // This ensures the component re-renders with the new video
        videoSrc={`${process.env.PUBLIC_URL}/videos/${videoData[videoIndex].video}`}
        overlayText={videoData[videoIndex].texts.positive} // Choose the specific text
        videoId={videoData[videoIndex].videoId} // Ensure videoId is passed
        onProceed={handleNextScreen}
        nextScreen="videoSeries" // Pass the next screen to VideoScreen
      />
    )
  },
  emotions: (props) => {
    const { currentStep, onProceed } = props

    const nextScreen =
      currentStep >= videoData.length - 1 ? "donationPrompt" : "videoSeries"

    return <EmotionsScale {...props} nextScreen={nextScreen} />
  },
  donationPrompt: DonationPrompt,
  donationForm: DonationForm,
  survey: (props) => (
    <Survey {...props} onSubmit={() => props.onProceed("thankyou")} />
  ),
  thankyou: ThankYou,
  welcome: Welcome,
}

function ScreenManager({ screen, currentStep, overlayText, onProceed }) {
  const ScreenComponent = screens[screen] || Welcome

  return (
    <ScreenComponent
      currentStep={currentStep}
      overlayText={overlayText}
      onProceed={onProceed}
      onStart={onProceed}
    />
  )
}

export default ScreenManager
