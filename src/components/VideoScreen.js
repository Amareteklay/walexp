import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Typography, Container } from "@mui/material"
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

const EmojiContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
})

const EmojiBox = styled(Box)(({ selected }) => ({
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 10px",
  cursor: "pointer",
  backgroundColor: selected ? "#f0a" : "#ddd",
  borderRadius: "50%",
}))

function VideoScreen({ onReaction, onNext }) {
  const videoRef = useRef(null)
  const [selectedEmoji, setSelectedEmoji] = useState(null)

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
    setSelectedEmoji(reaction)
  }

  return (
    <Container>
      <VideoContainer>
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
        <OverlayText variant="h6">Video playing now</OverlayText>
      </VideoContainer>
      <EmojiContainer>
        <EmojiBox
          selected={selectedEmoji === "happy"}
          onClick={() => handleReaction("happy")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/emojis/happy.png`}
            alt="Happy"
            style={{ width: "50px", height: "50px" }}
          />
        </EmojiBox>
        <EmojiBox
          selected={selectedEmoji === "sad"}
          onClick={() => handleReaction("sad")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/emojis/sad.png`}
            alt="Sad"
            style={{ width: "50px", height: "50px" }}
          />
        </EmojiBox>
        <EmojiBox
          selected={selectedEmoji === "neutral"}
          onClick={() => handleReaction("neutral")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/emojis/neutral.png`}
            alt="Neutral"
            style={{ width: "50px", height: "50px" }}
          />
        </EmojiBox>
      </EmojiContainer>
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
