import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/system"

const AudioCheckContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function AudioCheck({ onProceed }) {
  return (
    <AudioCheckContainer>
      <Typography variant="h4" gutterBottom>
        Check your audio system.
      </Typography>
      <Typography variant="body1" paragraph>
        This task is to check that your audio system is working.
      </Typography>
      <Typography>What kind of sound do you hear?</Typography>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Birds
      </Button>
      <Button variant="contained" color="primary" onClick={onProceed} sx={{marginLeft: 4, marginRight: 4}}>
        Train
      </Button>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Waves
      </Button>
    </AudioCheckContainer>
  )
}

export default AudioCheck
