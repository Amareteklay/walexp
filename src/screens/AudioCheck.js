import React from "react"
import { Button, Typography, Box } from "@mui/material"

function AudioCheck({ onProceed }) {
  const handleProceed = (nextScreen) => () => {
    onProceed(nextScreen)
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Check your audio system.
      </Typography>
      <Typography variant="body1" paragraph>
        This task is to check that your audio system is working.
      </Typography>
      <Typography variant="body1" paragraph>
        What kind of sound do you hear?
      </Typography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed("feedback")}
        >
          Birds
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed("feedback")}
          sx={{ marginX: 2 }}
        >
          Train
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceed("feedback")}
        >
          Waves
        </Button>
      </Box>
    </>
  )
}

export default AudioCheck
