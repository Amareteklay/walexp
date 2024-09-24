import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"

const ProgressBarContainer = styled(Box)({
  width: "90%",
  height: 12,
  backgroundColor: "#fff",
  border: "1px #5E5DF0 solid",
  borderRadius: 5,
  position: "absolute",
  zIndex: 1000,
  overflow: "hidden",
  top: 10,
})

const ProgressBarFiller = styled(Box)(({ progress }) => ({
  width: `${progress}%`,
  height: "100%",
  backgroundColor: "#5E5DF0",
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
