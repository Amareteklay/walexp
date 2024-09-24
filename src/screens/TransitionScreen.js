import React from "react"
import { Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

const FeedbackBox = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
})

function TransitionScreen({ onProceed }) {
  const handleContinue = () => {
    onProceed("videoSeries")
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Practice Round Complete
      </Typography>
      <FeedbackBox>
        <Typography variant="body1" paragraph>
          You have successfully completed the practice round. Next, the experiment will begin.
        </Typography>
        <Typography variant="body1" paragraph>
        Now that you know how it works, click 'Continue' to get started.
        </Typography>
      </FeedbackBox>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default TransitionScreen
