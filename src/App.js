import React, { useState, useEffect } from "react";
import { useFraming } from "./hooks/useFraming";
import ScreenManager from "./components/ScreenManager";
import FullScreenContainer from "./components/FullScreenContainer";
import Background from "./components/Background";
import ContentContainer from "./components/ContentContainer";
import CustomProgressBar from "./components/ProgressBar";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [videoSeriesStarted, setVideoSeriesStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0); // Track the survey question index
  const totalSteps = 59;

  // State to hold the group assignment
  const [groupAssignment, setGroupAssignment] = useState({
    framingType: null,
    emojiType: Math.random() < 0.5 ? "Facebook" : "Generic", // Assign emojiType randomly
  });

  // Use effect to listen for messages from the parent window (PsychoJS)
  useEffect(() => {
    function handleMessage(event) {
      if (event.origin !== 'https://run.pavlovia.org') return;

      if (event.data.type === 'group_assignment') {
        setGroupAssignment({
          framingType: event.data.framingType,
          emojiType: event.data.emojiType,
        });
        console.log('Group Assignment received:', event.data);
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Determine the overlay text and fact info based on the current step and framing type
  const { overlayText, factInfo } = useFraming(currentStep, groupAssignment.framingType);

  const handleScreenTransition = (nextScreen) => {
    setOverallProgress((prevProgress) => Math.min(prevProgress + 1, totalSteps)); // Ensure it does not exceed total steps
    if (nextScreen === "videoSeries" && !videoSeriesStarted) {
      setCurrentStep(0);
      setVideoSeriesStarted(true);
    } else if (nextScreen === "videoSeries" || nextScreen === "nextVideo") {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps)); // Ensure it does not exceed total steps
    }

    setScreen(nextScreen);
  };

  return (
    <FullScreenContainer>
      <Background>
        <ContentContainer>
          <CustomProgressBar currentStep={overallProgress + questionIndex} totalSteps={totalSteps} />
          <ScreenManager
            screen={screen}
            currentStep={currentStep}
            overlayText={overlayText}
            factInfo={factInfo} // Pass factInfo to ScreenManager
            framingType={groupAssignment.framingType}
            emojiType={groupAssignment.emojiType}
            onProceed={handleScreenTransition}
            onQuestionChange={setQuestionIndex}
          />
        </ContentContainer>
      </Background>
    </FullScreenContainer>
  );
}

export default App;
