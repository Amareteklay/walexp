import React from "react";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function SurveyPrompt({ onProceed }) {
  const { dispatch } = useData();

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Next button is clicked
    dispatch({
      type: "SET_DATA",
      key: "surveyPromptNextTimestamp",
      value: {
        timestamp: currentTimestamp,
      },
    });

    onProceed("survey");
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Survey Questions
      </Typography>
      <Typography variant="body1" sx={{ mx: 4 }}>
        Now we will ask you a few questions about your social media experience, demographic information and values.
      </Typography>
      <Typography variant="body1" sx={{ mx: 4, mt: 2 }}>
        The information you will provide will be used for scientific research only and it will be kept confidential. We don't ask you for any sensitive or personal information.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to start the practice.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default SurveyPrompt;
