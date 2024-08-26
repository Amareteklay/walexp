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
          You have successfully completed the practice round. Next, the actual
          experiment will begin.
        </Typography>
        <Typography variant="body1" paragraph>
          Please click 'Continue' to start the actual experiment.
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
