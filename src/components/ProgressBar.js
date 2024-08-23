import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"

const ProgressBarContainer = styled(Box)({
  width: "90%",
  height: 10,
  backgroundColor: "#e0e0e0",
  borderRadius: 5,
  position: "absolute",
  zIndex: 1000,
  overflow: "hidden",
  top: 24,
})

const ProgressBarFiller = styled(Box)(({ progress }) => ({
  width: `${progress}%`,
  height: "100%",
  backgroundColor: "#76c7c0", // Green progress
  transition: "width 0.5s ease-in-out", // Smooth transition effect
}))

function CustomProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <ProgressBarContainer>
      <ProgressBarFiller progress={progress} />
    </ProgressBarContainer>
  )
}

export default CustomProgressBar
