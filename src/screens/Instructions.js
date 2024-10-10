import React from "react"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"


function Instructions({ onProceed }) {
  const handleContinue = () => {
    onProceed("demoScreen")
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" sx={{ mx: 4 }}>
        In the next task, you will watch a number of different videos about various
        environmental phenomena such as flooding, forest fires, storms, and
        migration.
      </Typography>
      <Typography variant="body1" sx={{ mx: 4, mt: 2 }}>
      For each video we ask you: 
      </Typography>
      <ul>
        <li>to indicate your reaction towards the video
        using one of the given emojis.</li>
        <li>to comment on the video the same way you would if you saw it on your social media.</li>
        <li>to tell us if you would share the video on your social media. </li>
      </ul>
      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to see a demo.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default Instructions
