import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";

function PracticePrompt({ onProceed }) {
  const handleContinue = () => {
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

      <Box sx={{ mx: 4, mt: 2, display: 'grid', gap: 2 }}>
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

      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to start the practice.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default PracticePrompt;
