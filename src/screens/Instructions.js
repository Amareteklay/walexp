import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function Instructions({ onProceed }) {
  const { dispatch } = useData();

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Next button is clicked
    dispatch({
      type: "SET_DATA",
      key: "instructionsTimestamp",
      value: {
        timestamp: currentTimestamp,
      },
    });

    // Proceed to the next screen
    onProceed("instructionsTwo");
  };

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Instructions
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
        In the next task, you will watch a number of different videos about various
        environmental phenomena such as flooding, forest fires, storms, and
        migration.
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
        
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to continue reading the instructions.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default Instructions;
