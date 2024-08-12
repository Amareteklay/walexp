import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/system"
import Background from "./Background"

const WelcomeContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function Welcome({ onStart }) {
  return (
    <WelcomeContainer>
      <Typography variant="h5" gutterBottom>
        Welcome!
      </Typography>
      <Typography gutterBottom>
        You will be asked to complete a series of tasks. For each task you will
        see instructions to guide you.
      </Typography>
      <Typography gutterBottom>Please read the instructions carefully.</Typography>
      <Typography gutterBottom>When you're ready, click 'Continue'.</Typography>
      <Button variant="contained" color="primary" onClick={onStart}>
        Continue
      </Button>
    </WelcomeContainer>
  )
}

export default Welcome
