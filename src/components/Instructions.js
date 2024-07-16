import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/system"

const InstructionsContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function Instructions({ onProceed }) {
  return (
    <InstructionsContainer>
      <Typography variant="h4" gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" paragraph>
        Watch the video and react using the emojis below the video. Click next
        when you are ready to proceed.
      </Typography>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Proceed to Video
      </Button>
    </InstructionsContainer>
  )
}

export default Instructions
