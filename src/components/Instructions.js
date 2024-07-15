import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"

function Instructions({ onProceed }) {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
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
      </Box>
    </Container>
  )
}

export default Instructions
