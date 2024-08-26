import React from "react"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"


function Instructions({ onProceed }) {
  const handleContinue = () => {
    onProceed("demoicons")
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" sx={{ padding: 4 }}>
        You will now watch a number of different videos about various
        environmental phenomena such as flooding, forest fires, storms, and
        migration.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4 }}>
        Please click 'Continue' to continue reading instructions on the next
        screen.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default Instructions
