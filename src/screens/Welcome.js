import React from "react";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Welcome({ onStart }) {
  // Get the dispatch function from the DataContext
  const { dispatch } = useData();

  const handleContinueClick = () => {
    // Use the dispatch function to add the welcome screen data to the centralized store
    dispatch({
      type: "SET_DATA",
      key: "welcomeContinueButton",
      value: {
        timestamp: Date.now(),
        buttonName: "welcomeContinueButton",
      },
    });

    // Trigger the next screen (e.g., audio check screen)
    onStart("audioCheck");
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
      <Box display="flex" justifyContent="center">
        <CustomButton
          text="Continue"
          onClick={handleContinueClick}
          endIcon={<ArrowForwardIcon />}
        />
      </Box>
    </Box>
  );
}

export default Welcome;
