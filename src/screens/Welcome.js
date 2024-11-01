import React from "react";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Welcome({ onStart }) {
  // Get the dispatch function from the DataContext
  const { dispatch } = useData();

  const handleContinueClick = () => {
    // Define the action object
    const action = {
      type: "SET_DATA",
      key: "welcomeContinueButton",
      value: {
        timestamp: Date.now(),
      },
    };
  
    // Log the action object to check its structure
    // console.log("Dispatching action:", action);
  
    // Dispatch the action to the store
    dispatch(action);
  
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
        Click 'Continue' when you're ready.
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
