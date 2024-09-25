import React, { forwardRef, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const VideoContainer = styled(Box)( {
  position: "relative",
  width: "85%",
  height: "360px",
  backgroundColor: "#282828",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
})

const FactualText = styled(Typography)( {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "30%",
})

const FramingText = styled(Typography)( {
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "30%",
})

const VideoPlayer = forwardRef(({ videoSrc, overlayText, factInfo }, ref) => {
  const [showFactInfo, setShowFactInfo] = useState(false)
  const [showOverlayText, setShowOverlayText] = useState(false)

  useEffect(() => {
    const factInfoTimeout = setTimeout(() => {
      setShowFactInfo(true)
    }, 3000) // Show factInfo after 2 seconds

    const overlayTextTimeout = setTimeout(() => {
      setShowOverlayText(true)
    }, 6000) // Show overlayText after 4 seconds

    // Reset visibility after video ends
    const videoElement = ref.current
    const resetTimeout = setTimeout(() => {
      setShowFactInfo(false)
      setShowOverlayText(false)
    }, videoElement.duration * 1000) // Duration of the video in milliseconds

    return () => {
      clearTimeout(factInfoTimeout)
      clearTimeout(overlayTextTimeout)
      clearTimeout(resetTimeout)
    }
  }, [ref]) // Dependency on ref to ensure correct behavior

  return (
    <VideoContainer>
      <video ref={ref} id="video" width="100%" height="100%" autoPlay loop preload="auto">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {showFactInfo && factInfo && <FactualText>{factInfo}</FactualText>}
      {showOverlayText && overlayText && <FramingText>{overlayText}</FramingText>}
    </VideoContainer>
  )
})

export default VideoPlayer
