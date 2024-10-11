import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CustomButton from "../components/CustomButton";

function Instructions({ onProceed }) {
  const handleContinue = () => {
    onProceed("demoScreen");
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

      <Box sx={{ mx: 4, mt: 2, display: 'grid', gap: 2 }}>
        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <EmojiEmotionsIcon sx={{ mr: 2, color: "blue" }} />
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              To indicate your reaction towards the videos, you will use emojis.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <CommentIcon sx={{ mr: 2, color: "blue" }} />
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              To comment on the video the same way you would if you saw it on your social media, you will use a comment button.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <ShareIcon sx={{ mr: 2, color: "blue" }} />
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              To tell us if you would share the video on your social media, you will select 'Yes' or 'No'.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to see a demo.
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
