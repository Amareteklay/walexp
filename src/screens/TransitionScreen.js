import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

const FeedbackBox = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
});

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

    onProceed("videoSeries");
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }} gutterBottom>
        Practice Round Complete
      </Typography>
      <FeedbackBox>
        <Typography variant="h6" sx={{ mx: 4, mt: 2 }}>
          Great job! You've successfully completed the practice round. You're
          now ready to begin the experiment.
        </Typography>
        <Typography variant="h6" sx={{ mx: 4, mt: 4, mb: 8 }}>
         Click 'Continue' to start the experiment.
        </Typography>
      </FeedbackBox>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default TransitionScreen;
