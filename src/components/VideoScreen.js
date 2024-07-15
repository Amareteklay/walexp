import React, { useEffect, useRef } from "react"
import { Box, Button, Typography, Container } from "@mui/material"

function VideoScreen({ onReaction, onNext }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        video.pause()
      }
    }

    const playVideo = async () => {
      try {
        await video.play()
        document.documentElement.requestFullscreen()
      } catch (error) {
        console.error("Error attempting to play video:", error)
      }
    }

    playVideo()

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.pause()
      video.currentTime = 0
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((error) => {
          console.error("Error attempting to exit fullscreen mode:", error)
        })
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleReaction = (reaction) => {
    const timestamp = videoRef.current.currentTime
    onReaction({ reaction, timestamp })
  }

  return (
    <Container>
      <Box sx={{ position: "relative", width: "100%", height: "60%" }}>
        <video
          ref={videoRef}
          loop
          autoPlay
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source
            src={`${process.env.PUBLIC_URL}/videos/Floods1.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Video playing now
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <img
          src={`${process.env.PUBLIC_URL}/emojis/happy.png`}
          alt="Happy"
          onClick={() => handleReaction("happy")}
          style={{ width: 50, height: 50, margin: "0 10px", cursor: "pointer" }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/emojis/sad.png`}
          alt="Sad"
          onClick={() => handleReaction("sad")}
          style={{ width: 50, height: 50, margin: "0 10px", cursor: "pointer" }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/emojis/neutral.png`}
          alt="Neutral"
          onClick={() => handleReaction("neutral")}
          style={{ width: 50, height: 50, margin: "0 10px", cursor: "pointer" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Container>
  )
}

export default VideoScreen
