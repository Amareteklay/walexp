import React, { useRef, useState } from "react"
import { Container, Button } from "@mui/material"
import VideoPlayer from "../components/VideoPlayer"
import EmojiReaction from "../components/EmojiReaction"
import CommentDialog from "../components/CommentDialog"

function VideoScreen({
  videoSrc,
  overlayText,
  videoId,
  onProceed,
  nextScreen,
}) {
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [shareOption, setShareOption] = useState("")

  // Create a ref for the video element
  const videoRef = useRef(null)

  const handleReaction = (reaction) => {
    if (videoRef.current) {
      const timestamp = videoRef.current.currentTime
      setSelectedEmoji(reaction)
      // Send emoji reaction data to PsychoJS
      window.parent.postMessage(
        { type: "emoji_reaction", reaction, videoId, timestamp },
        "*"
      )
    } else {
      console.error("Video element not found or not loaded yet.")
    }
  }

  const handleAddComment = () => {
    setOpen(true)
  }

  const handleClose = () => {
    const timestamp = new Date().toISOString()

    // Send comment and share option data to PsychoJS
    window.parent.postMessage(
      {
        type: "comment_submitted",
        comment,
        shareOption,
        videoId,
        timestamp,
      },
      "*"
    )
    setOpen(false)
  }

  const handleNext = () => {
    const timestamp = new Date().toISOString()

    // Send next button click event to PsychoJS
    window.parent.postMessage({ type: "next_click", videoId, timestamp }, "*")

    if (onProceed && nextScreen) {
      onProceed(nextScreen)
    } else {
      console.error("onProceed or nextScreen is not defined.")
    }
  }

  return (
    <Container>
      <VideoPlayer
        videoSrc={videoSrc}
        overlayText={overlayText}
        ref={videoRef}
      />
      <EmojiReaction
        selectedEmoji={selectedEmoji}
        onReaction={handleReaction}
      />
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
        onClick={handleNext}
        sx={{ mt: 2 }}
      >
        Next
      </Button>
      <CommentDialog
        open={open}
        comment={comment}
        shareOption={shareOption}
        onClose={handleClose}
        onCommentChange={setComment}
        onShareOptionChange={setShareOption}
      />
    </Container>
  )
}

export default VideoScreen