import React from "react";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Welcome({ onStart }) {
  // Get the dispatch function from the DataContext
  const { dispatch } = useData();

  const handleContinueClick = () => {
    const currentTimestamp = Date.now(); // Get the current timestamp

    // Define the actions to dispatch in a flat structure
    const actions = [
      {
        type: "SET_DATA",
        key: "welcomeContinueAt",
        value: currentTimestamp,  // Flat structure: timestamp as a simple value
      },
    ];

    // Dispatch the actions
    actions.forEach(action => dispatch(action));
  
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
      <Typography variant="h6" sx={{p:2, mb: 4, mt: 4}} gutterBottom>
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
