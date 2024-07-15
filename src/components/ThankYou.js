import React, { useEffect } from "react"
import { Container, Typography, Box } from "@mui/material"

function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Experiment complete. Thank you!")
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thank you for participating!
        </Typography>
      </Box>
    </Container>
  )
}

export default ThankYou
