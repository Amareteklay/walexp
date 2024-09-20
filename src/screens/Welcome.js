import React from "react";
import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";

function Welcome({ onStart, framingType, emojiType }) {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Welcome!
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        You will be asked to complete a series of tasks. For each task you will
        see instructions to guide you.
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        Please read the instructions carefully.
      </Typography>

      {/* Display the assigned group values for testing */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2, color: "green" }}
        gutterBottom
      >
        Assigned Group:
      </Typography>
      <Typography variant="body1" sx={{ padding: 2 }}>
        <strong>Framing Type:</strong> {framingType}
      </Typography>
      <Typography variant="body1" sx={{ padding: 2 }}>
        <strong>Emoji Type:</strong> {emojiType}
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2, marginBottom: 12 }}
        gutterBottom
      >
        When you're ready, click 'Continue'.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={() => onStart("audioCheck")}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default Welcome;
