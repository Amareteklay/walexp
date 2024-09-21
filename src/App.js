import React, { useState, useEffect } from "react"
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

  // State to hold the group assignment
  const [groupAssignment, setGroupAssignment] = useState({
    framingType: null,
    emojiType: null,
  });

  // Use effect to listen for messages from the parent window (PsychoJS)
  useEffect(() => {
    // Event listener function to handle incoming messages
    function handleMessage(event) {
      // Ensure the message is from the expected origin
      if (event.origin !== 'https://run.pavlovia.org') return;

      // Check for group assignment data in the message
      if (event.data.type === 'group_assignment') {
        setGroupAssignment({
          framingType: event.data.framingType,
          emojiType: event.data.emojiType,
        });
        console.log('Group Assignment received:', event.data);
      }
    }

    // Add the event listener
    window.addEventListener('message', handleMessage);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
            framingType={groupAssignment.framingType}
            emojiType={groupAssignment.emojiType}
            onProceed={handleScreenTransition}
            onQuestionChange={handleQuestionChange}
          />
        </ContentContainer>
      </Background>
    </FullScreenContainer>
  )
}

export default App
