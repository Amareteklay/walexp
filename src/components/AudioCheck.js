import React from "react"
import { Button, Typography } from "@mui/material"

function AudioCheck({ onProceed }) {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Check your audio system.
      </Typography>
      <Typography variant="body1" paragraph>
        This task is to check that your audio system is working.
      </Typography>
      <Typography>What kind of sound do you hear?</Typography>
      <div>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Birds
      </Button>
      <Button variant="contained" color="primary" onClick={onProceed} sx={{marginLeft: 4, marginRight: 4}}>
        Train
      </Button>
      <Button variant="contained" color="primary" onClick={onProceed}>
        Waves
      </Button>
      </div>
    </>
  )
}

export default AudioCheck
