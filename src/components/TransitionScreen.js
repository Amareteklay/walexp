import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

const TransitionContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const FeedbackBox = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
})

function TransitionScreen({ onProceed }) {
  return (
    <TransitionContainer>
      <Typography variant="h4" gutterBottom>
        Practice Round Complete
      </Typography>
      <FeedbackBox>
        <Typography variant="body1" paragraph>
          You have successfully completed the practice round. Next, the actual experiment will begin.
        </Typography>
        <Typography variant="body1" paragraph>
          Please click 'Continue' to start the actual experiment.
        </Typography>
      </FeedbackBox>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onProceed}
      >
        Continue
      </Button>
    </TransitionContainer>
  )
}

export default TransitionScreen
