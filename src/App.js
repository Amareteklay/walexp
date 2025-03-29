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
  const totalSteps = 58;

  // State to hold the group assignment
  const [groupAssignment, setGroupAssignment] = useState({
    framingType: null,
    emojiType: Math.random() < 0.5 ? "Facebook" : "Generic", // Assign emojiType randomly
  });
  //if (!groupAssignment.framingType) {
   // return <div>Loading group assignment...</div>;
  //}

  useEffect(() => {
    function handleMessage(event) {
      // Temporary debug - log all messages
      console.log("[App] Received message:", event.origin, event.data);
      
      // Allow local development and production
      const allowedOrigins = [
        'https://run.pavlovia.org',
        'http://localhost',
        'http://127.0.0.1'
      ];
  
      if (!allowedOrigins.some(origin => event.origin.startsWith(origin))) {
        console.warn("Blocked message from unauthorized origin:", event.origin);
        return;
      }
  
      if (event.data.type === 'group_assignment') {
        console.log("[App] Received valid group assignment:", event.data);
        setGroupAssignment({
          framingType: event.data.framingType,
          emojiType: event.data.emojiType
        });
      }
    }
  
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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
