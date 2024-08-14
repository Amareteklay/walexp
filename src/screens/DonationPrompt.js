import React, { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material"
import { styled } from "@mui/system"

const DonationContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const FormContainer = styled(Box)({
  marginTop: "20px",
  textAlign: "left",
  display: "inline-block",
})

function DonationPrompt({ onProceed }) {
  const handleContinue = () => {
    onProceed("donationForm");
  };
  return (
    <DonationContainer>
      <Typography variant="h5" gutterBottom>
        You will receive an additional 10 Euro/Dollar.
      </Typography>
      <Typography variant="body1" paragraph>
        You have the opportunity to donate some of this money to an
        environmental charity working to spread awareness and promote action to
        combat climate change.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >
          Next
        </Button>
      </Box>
    </DonationContainer>
  )
}

export default DonationPrompt
