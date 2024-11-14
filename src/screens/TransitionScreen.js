import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";


function TransitionScreen({ onProceed }) {
  const { dispatch } = useData();

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Continue button is clicked
    dispatch({
      type: "SET_DATA",
      key: "transitionScreenContinueTimestamp",
      value: {
        timestamp: currentTimestamp,
      },
    });

    onProceed("emotionsOne");
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }} gutterBottom>
        Practice Round Complete
      </Typography>
        <Typography variant="h6" sx={{ mx: 8, mt: 2 }}>
          Great job! You've completed the practice round. You're
          now ready to start the experiment.
        </Typography>
        <Typography variant="h6" sx={{ mx: 4, mt: 8, mb: 4 }}>
         Click 'Start' to proceed.
        </Typography>
      <CustomButton
        text={"Start"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default TransitionScreen;
