import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Welcome({ onStart }) {
  const { dispatch } = useData();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable the Continue button after a 10-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleContinueClick = () => {
    // Optionally prevent early click even if button is enabled programmatically
    if (!isButtonEnabled) return;

    const currentTimestamp = Date.now();
    const actions = [
      {
        type: "SET_DATA",
        key: "welcomeContinueAt",
        value: currentTimestamp,
      },
    ];

    actions.forEach(action => dispatch(action));
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
      <Typography variant="h6" sx={{ p: 2, mb: 4, mt: 4 }} gutterBottom>
        Click 'Continue' when you're ready.
      </Typography>
      <Box display="flex" justifyContent="center">
        <CustomButton
          text="Continue"
          onClick={handleContinueClick}
          endIcon={<ArrowForwardIcon />}
          disabled={!isButtonEnabled}
        />
      </Box>
    </Box>
  );
}

export default Welcome;
