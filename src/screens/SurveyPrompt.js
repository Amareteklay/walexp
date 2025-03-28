import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function SurveyPrompt({ onProceed }) {
  const { dispatch } = useData();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable the button after a 5-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    const action = {
      type: "SET_DATA",
      key: "surveyPromptNextAt",
      value: currentTimestamp,
    };
    dispatch(action);

    onProceed("survey");
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Survey Questions
      </Typography>
      <Typography variant="body1" sx={{ mx: 4 }}>
        Now we will ask you a few questions about your social media experience,
        demographic information and values.
      </Typography>
      <Typography variant="body1" sx={{ mx: 4, mt: 2 }}>
        The information you will provide will be used for scientific research only
        and it will be kept confidential.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to start the practice.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
        disabled={!isButtonEnabled}
      />
    </>
  );
}

export default SurveyPrompt;
