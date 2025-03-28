import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function PracticePrompt({ onProceed }) {
  const { dispatch } = useData();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable the button after a 5-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (!isButtonEnabled) return; // Prevent early click

    const currentTimestamp = new Date().toISOString();

    // Dispatch the timestamp in a flat structure
    const actions = [
      {
        type: "SET_DATA",
        key: "practicePromptNextAt",
        value: currentTimestamp,
      },
    ];

    actions.forEach(action => dispatch(action));
    onProceed("videoOne");
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Practice
      </Typography>
      <Typography variant="h5" sx={{ mx: 4 }}>
        To make sure that you understand the different parts of the experiment, you will do one practice round.
      </Typography>
      <Typography variant="h6" sx={{ mx: 4, mt: 4 }}>
        After watching the video on the next screen, try the following.
      </Typography>

      <Box sx={{ mx: 4, mt: 2, display: 'grid', gap: 2, mb: 4 }}>
        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <EmojiEmotionsIcon sx={{ mr: 1, color: 'blue' }} />
          <CardContent>
            <Typography variant="body1">
              Use the emojis below the video to indicate your reaction
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <CommentIcon sx={{ mr: 1, color: 'blue' }} />
          <CardContent>
            <Typography variant="body1">
              Click the "Comment" button to comment on the video
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <ShareIcon sx={{ mr: 1, color: 'blue' }} />
          <CardContent>
            <Typography variant="body1">
              Click the 'Share' button and select 'Yes' or 'No' to tell us if you would share the video
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
        disabled={!isButtonEnabled}
      />
    </>
  );
}

export default PracticePrompt;
