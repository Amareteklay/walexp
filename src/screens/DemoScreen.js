import React, { useRef } from "react"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

function DemoScreen({ onProceed, emojiType }) {
  const videoRef = useRef(null)

  const getVideoSource = () => {
    const videoData = {
      Facebook: "FacebookDemo.mp4",
      Generic: "GenericDemo.mp4",
    }
    return `${process.env.PUBLIC_URL}/videos/${videoData[emojiType]}`
  }

  const handleContinue = () => {
    onProceed("practicePrompt")
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", padding: 4, color: "#175676" }}
        gutterBottom
      >
        To help you understand the task, please watch the walkthrough video below.
      </Typography>

      <video
        ref={videoRef}
        id="video"
        width="80%"
        height="80%"
        autoPlay
        loop
        preload="auto"
        controls
      >
        <source src={getVideoSource()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", padding: 2, mt: 2 }}
      >
        Click 'Continue' to proceed to the next screen.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default DemoScreen
