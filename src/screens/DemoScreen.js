import React, { useRef } from "react"
import { Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

function DemoScreen({ onProceed, emojiType }) {
  const videoRef = useRef(null)

  const getVideoSource = () => {
    const videoData = {
      Facebook: "walkthrough_facebook.mp4",
      Generic: "walkthrough_generic.mp4",
    }
    return `${process.env.PUBLIC_URL}/videos/${videoData[emojiType]}`
  }

  const handleContinue = () => {
    onProceed("practicePrompt")
  }

  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", padding: 4 }}
        gutterBottom
      >
        Please watch the following walkthrough video.
      </Typography>

      <video
        ref={videoRef}
        id="video"
        width="100%"
        height="100%"
        autoPlay
        loop
        preload="auto"
        controls
      >
        <source src={getVideoSource()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", padding: 4, mt: 2 }}
      >
        Please click 'Continue' to proceed to the next screen.
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
