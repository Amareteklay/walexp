import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/system"

const InstructionsContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function Instructions({ onProceed }) {
  const handleContinue = () => {
    onProceed("demoicons")
  }

  return (
    <InstructionsContainer>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 8 }} gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 8 }}>
        You will now watch a number of different videos about various
        environmental phenomena such as flooding, forest fires, storms, and
        migration.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 8 }}>
        Please click 'Continue' to continue reading instructions on the next
        screen.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </InstructionsContainer>
  )
}

export default Instructions
