import React from "react"
import { Container, Button, Typography, Box } from "@mui/material"

function Welcome({ onStart }) {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Experiment
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart}>
          Start Experiment
        </Button>
      </Box>
    </Container>
  )
}

export default Welcome
