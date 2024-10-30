import React, { forwardRef, useEffect, useState } from "react"
import { Box, Typography, keyframes } from "@mui/material"
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

const factInfoAnimation = keyframes`
  0% {
    top: 0;
    transform: translate(-50%, -100%) scale(0.5);
    opacity: 0;
  }
  50% {
    top: 50%;
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 1;
  }
  100% {
    top: 15%;
    transform: translate(-50%, -50%) scale(1);
  }
`

const framingTextAnimation = keyframes`
  0% {
    top: 30%;
    transform: translate(-50%, 100%) scale(0.5);
    opacity: 0;
  }
  50% {
    top: 50%;
    transform: translate(-50%, 50%) scale(2.5);
    opacity: 1;
  }
  100% {
    top: 80%;
    transform: translate(-50%, -50%) scale(1);
  }
`

const FactualText = styled(Typography)( {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "3px 5px",
  borderRadius: "5px",
  width: "30%",
  animation: `${factInfoAnimation} 3s cubic-bezier(0.25, 1, 0.5, 1)`,
})

const FramingText = styled(Typography)( {
  position: "absolute",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "30%",
  animation: `${framingTextAnimation} 3s cubic-bezier(0.25, 1, 0.5, 1)`,
})

const VideoPlayer = forwardRef(({ videoSrc, overlayText, factInfo }, ref) => {
  const [showFactInfo, setShowFactInfo] = useState(false)
  const [showOverlayText, setShowOverlayText] = useState(false)

  useEffect(() => {
    const factInfoTimeout = setTimeout(() => {
      setShowFactInfo(true)
    }, 4000) // Show factInfo after 2 seconds

    const overlayTextTimeout = setTimeout(() => {
      setShowOverlayText(true)
    }, 9000) // Show overlayText after 4 seconds

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
