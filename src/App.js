import React, { useState } from "react"
import { useFraming } from "./hooks/useFraming"
import ScreenManager from "./components/ScreenManager"
import FullScreenContainer from "./components/FullScreenContainer"
import Background from "./components/Background"
import ContentContainer from "./components/ContentContainer"
import CustomProgressBar from "./components/ProgressBar"

function App() {
  const [screen, setScreen] = useState("welcome")
  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0);
  const [videoSeriesStarted, setVideoSeriesStarted] = useState(false)
  const { overlayText } = useFraming(currentStep)

  const [questionIndex, setQuestionIndex] = useState(0) // Track the survey question index
  const totalSteps = 36
  // Function to update the page index
  const updatePageIndex = (newIndex) => {
    setPageIndex(newIndex);
  };

  const handleQuestionChange = (index) => {
    setQuestionIndex(index)
  }

  const handleScreenTransition = (nextScreen) => {
    setOverallProgress((prevProgress) => Math.min(prevProgress + 1, 36)); // Ensure it does not exceed total steps
    //setOverallProgress((prevProgress) => prevProgress + 1);
    if (nextScreen === "videoSeries" && !videoSeriesStarted) {
      setCurrentStep(0)
      setVideoSeriesStarted(true)
    } else if (nextScreen === "videoSeries" || nextScreen === "nextVideo") {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 36)); // Ensure it does not exceed total steps
    }

    setScreen(nextScreen)

  }

  return (
    <FullScreenContainer>
      <Background>
        <ContentContainer>
          <CustomProgressBar currentStep={overallProgress  + questionIndex} totalSteps={totalSteps} />
          <ScreenManager
            screen={screen}
            currentStep={currentStep}
            overlayText={overlayText}
            onProceed={handleScreenTransition}
            onQuestionChange={handleQuestionChange}
          />
        </ContentContainer>
      </Background>
    </FullScreenContainer>
  )
}

export default App
