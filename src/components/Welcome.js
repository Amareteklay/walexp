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
        <Typography variant="h3" gutterBottom>
          Welcome to the Experiment
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart}>
          Start Experiment
        </Button>
      </WelcomeContainer>
  )
}

export default Welcome
