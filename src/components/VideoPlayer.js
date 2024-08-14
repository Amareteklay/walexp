import React, { useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const VideoContainer = styled(Box)({
  position: "relative",
  width: "80%",
  height: "300px",
  margin: "auto",
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

function VideoPlayer({ videoSrc, overlayText }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error("Video playback failed:", error)
      }
    }

    playVideo()

    return () => {
      if (video) {
        video.pause()
      }
    }
  }, [videoSrc])

  return (
    <VideoContainer>
      <video
        ref={videoRef}
        key={videoSrc}
        loop
        autoPlay
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <OverlayText variant="h6">{overlayText}</OverlayText>
    </VideoContainer>
  )
}

export default VideoPlayer
