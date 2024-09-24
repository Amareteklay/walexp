import React from "react"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"


function PracticePrompt({ onProceed }) {
  const handleContinue = () => {
    onProceed("videoOne")
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Practice
      </Typography>
      <Typography variant="body1" sx={{ mx: 4 }}>
        To make sure that you understand the different parts of the experiment, we will do one practice round.
      </Typography>
      <Typography variant="body1" sx={{ mx: 4, mt: 2 }}>
      Watch the video on the next screen and: 
      </Typography>
      <ul>
        <li>use the emojis below the video to indicate your reaction.</li>
        <li>use the "Comment" button to comment on the video.</li>
        <li>click 'Yes' or 'No' to tell us if you would share the video.</li>
      </ul>
      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Click 'Next' to start the practice.
      </Typography>
      <CustomButton
        text={"Next"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default PracticePrompt
