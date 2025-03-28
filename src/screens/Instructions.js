import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Instructions({ onProceed }) {
  const [step, setStep] = useState(1); // Track which instruction step to show
  const { dispatch } = useData();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Set up a delay of 10 seconds each time the step changes
  useEffect(() => {
    setIsButtonEnabled(false); // Disable button on step change
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 4000);

    // Clean up the timer when the component unmounts or step changes
    return () => clearTimeout(timer);
  }, [step]);

  const handleContinue = () => {
    // Optionally prevent early click even if the button is clicked programmatically
    if (!isButtonEnabled) return;

    const currentTimestamp = new Date().toISOString();

    // Dispatch the timestamp for the current step in a flat structure
    const actions = [
      {
        type: "SET_DATA",
        key: `instructionsNext${step}_at`,
        value: currentTimestamp,
      },
    ];

    // Dispatch the actions
    actions.forEach(action => dispatch(action));

    if (step === 1) {
      setStep(2); // Move to the second step
    } else {
      onProceed("demoScreen"); // Proceed to the next screen after both steps
    }
  };

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 8 }} gutterBottom>
        Instructions
      </Typography>

      {step === 1 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
            In the next task, you will watch a number of different videos about various
            environmental phenomena such as flooding, forest fires, storms, and
            migration.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", padding: 4, my: 4 }}>
            Click 'Next' to continue reading the instructions.
          </Typography>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
            Imagine you see these videos while you are at a social media platform. We want to investigate how you interact with the content on this platform.
          </Typography>
          <Box sx={{ mx: 4, mt: 2, display: 'grid', gap: 2, mb: 4 }}>
            <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <EmojiEmotionsIcon sx={{ mr: 2, color: "blue" }} />
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  You will use emojis to indicate your reaction towards the videos.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <CommentIcon sx={{ mr: 2, color: "blue" }} />
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  You will have the chance to comment on some of the videos.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <ShareIcon sx={{ mr: 2, color: "blue" }} />
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  You can use a 'Share' button to indicate if you would share the video on social media.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      )}

      <CustomButton
        text={step === 1 ? "Next" : "Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
        disabled={!isButtonEnabled}
      />
    </>
  );
}

export default Instructions;
