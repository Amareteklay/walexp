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

  const totalSteps = 24

  const handleScreenTransition = (nextScreen) => {
    setOverallProgress((prevProgress) => prevProgress + 1);
    if (nextScreen === "videoSeries" && !videoSeriesStarted) {
      setCurrentStep(0)
      setVideoSeriesStarted(true)
    } else if (nextScreen === "videoSeries" || nextScreen === "nextVideo") {
      setCurrentStep((prevStep) => prevStep + 1)
    }

    setScreen(nextScreen)

  }

  return (
    <FullScreenContainer>
      <Background>
        <ContentContainer>
          <CustomProgressBar currentStep={overallProgress} totalSteps={totalSteps} />
          <ScreenManager
            screen={screen}
            currentStep={currentStep}
            overlayText={overlayText}
            onProceed={handleScreenTransition}
          />
        </ContentContainer>
      </Background>
    </FullScreenContainer>
  )
}

export default App
