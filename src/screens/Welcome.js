import React from "react";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";

function Welcome({ onStart }) {
  const handleContinueClick = () => {
    const timestamp = new Date().toISOString();
    onStart("audioCheck", timestamp);
    
    // Send message to parent window for PsychoJS
    if (window.parent) {
      window.parent.postMessage({
        type: "welcome_continue_button",
        data: { 
          timestamp, 
          buttonName: "welcomeContinueButton"
        }
      }, "*");
    }
  };

  return (
    <Box textAlign="center" padding={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="h6" fontWeight="bold" padding={2} mx={4} gutterBottom>
        You will be asked to complete a series of tasks. For each task, you will see instructions to guide you.
      </Typography>
      <Typography variant="h6" fontWeight="bold" padding={2} gutterBottom>
        Please read the instructions carefully.
      </Typography>
      <Typography variant="h6" fontWeight="bold" padding={2} marginBottom={12} gutterBottom>
        When you're ready, click 'Continue'.
      </Typography>
      <CustomButton
        text="Continue"
        onClick={handleContinueClick}
        endIcon={<ArrowForwardIcon />}
      />
    </Box>
  );
}

export default Welcome;
