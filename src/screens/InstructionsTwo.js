import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function InstructionsTwo({ onProceed }) {
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
    onProceed("demoScreen");
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
      Imagine you see these videos while you are at a social media platform. We want to investigate how you interact with the content on this platform.
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mx: 4 }}>
        
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

     {/*  <Typography variant="h5" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' when you're ready.
      </Typography> */}
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default InstructionsTwo;
