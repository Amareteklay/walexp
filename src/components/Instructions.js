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
        You will now watch a number of different videos about various
        environmental phenomena such as flooding, forest fires, storms and
        migration.
      </Typography>
      <Typography variant="body1">
        Please click 'Continue' to continue reading instructions on the next
        screen
      </Typography>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Continue
      </Button>
    </InstructionsContainer>
  )
}

export default Instructions
