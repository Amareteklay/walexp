import React, { forwardRef } from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const VideoContainer = styled(Box)({
  position: "relative",
  width: "80%",
  height: "300px",
  backgroundColor: "#282828",
  display: "flex", // Flexbox layout for the content inside the container
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  margin: "0 auto", // Center horizontally within parent container
})

const OverlayText = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "5px 10px",
  borderRadius: "5px",
})

const VideoPlayer = forwardRef(({ videoSrc, overlayText }, ref) => (
  <VideoContainer>
    <video ref={ref} id="video" width="100%" height="100%" autoPlay loop>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    {overlayText && <OverlayText>{overlayText}</OverlayText>}
  </VideoContainer>
))

export default VideoPlayer
