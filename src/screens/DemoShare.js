import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

const DemoContainer = styled(Container)({
  textAlign: "center",
  marginTop: "20px",
})

const ButtonContainer = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
})

function DemoShare({ onProceed }) {
  const handleContinue = () => {
    onProceed("videoOne");
  };
  return (
    <DemoContainer>
      <Typography variant="h6" gutterBottom>
        For each video there is also a share button that you can use. Use this
        to indicate if this is content you would normally share on social media
        to your followers.
      </Typography>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Share
        </Button>
      </ButtonContainer>
      <Typography variant="body1" paragraph>
        Please click 'Continue' to continue reading instructions on the next
        screen
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </DemoContainer>
  )
}

export default DemoShare
