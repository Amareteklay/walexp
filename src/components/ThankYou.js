import React, { useEffect } from "react"
import { Container, Typography, Box } from "@mui/material"
import { styled } from "@mui/system"

const ThankYouContainer = styled(Container)({
  textAlign: "center",
  minWidth: '60%',
  minHeight: '80vh',
  marginTop: "30px",
})

function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Experiment complete. Thank you!")
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThankYouContainer>
      <Typography variant="h4" color="white" gutterBottom>
        Thank you for participating!
      </Typography>
    </ThankYouContainer>
  )
}

export default ThankYou
