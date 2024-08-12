import React, { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
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

function VideoScreen({ videoSrc, overlayText, onProceed }) {
  const videoRef = useRef(null)
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [shareOption, setShareOption] = useState("")

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
    setSelectedEmoji(reaction)
    // Send data to the parent document (PsychoJS experiment)
    console.log(timestamp)
    console.log(reaction)
    window.parent.postMessage(
      { type: "emoji_reaction", reaction, timestamp },
      "*"
    )
  }

  const handleNext = () => {
    const nextClickTime = videoRef.current.currentTime
    // Send data to the parent document (PsychoJS experiment)
    window.parent.postMessage(
      { type: "next_click", timestamp: nextClickTime },
      "*"
    )
  }

  const handleAddComment = () => {
    setOpen(true)
  }

  const handleClose = () => {
    // Here you can handle sending the comment and share data
    console.log("Comment:", comment)
    console.log("Share Option:", shareOption)
    setOpen(false)
  }

  return (
    <Container>
      <VideoContainer>
        <video
          ref={videoRef}
          loop
          autoPlay
          id="video"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <OverlayText variant="h6">{overlayText}</OverlayText>
      </VideoContainer>
      <EmojiContainer>
        <EmojiBox
          selected={selectedEmoji === "happy"}
          onClick={() => handleReaction("happy")}
          data-emoji="happy"
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
          data-emoji="sad"
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
          data-emoji="neutral"
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
        onClick={handleAddComment}
        sx={{ mt: 2, mr: 2 }}
      >
        Add Comment
      </Button>
      <Button
        id="nextButton"
        variant="contained"
        color="primary"
        onClick={onProceed}
        sx={{ mt: 2 }}
      >
        Next
      </Button>

      {/* Modal for Adding Comment and Share Option */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm"
      fullWidth={true}
      sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '400px' } }}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            What would you comment if you saw this video on your social media?
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Your Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Would you normally share this video on your social media?
          </Typography>
          <RadioGroup
            value={shareOption}
            onChange={(e) => setShareOption(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default VideoScreen
