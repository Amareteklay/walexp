import React, { useState } from "react"
import { Container, Button } from "@mui/material"
import VideoPlayer from "../components/VideoPlayer"
import EmojiReaction from "../components/EmojiReaction"
import CommentDialog from "../components/CommentDialog"

function VideoScreen({ videoSrc, overlayText, onProceed, nextScreen }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [shareOption, setShareOption] = useState("")

  const handleReaction = (reaction) => {
    const timestamp = document.getElementById("video").currentTime
    setSelectedEmoji(reaction)
    window.parent.postMessage(
      { type: "emoji_reaction", reaction, timestamp },
      "*"
    )
  }

  const handleAddComment = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleNext = () => {
    if (onProceed && nextScreen) {
      onProceed(nextScreen) // Ensure this is called with the correct next screen
    } else {
      console.error("onProceed or nextScreen is not defined.")
    }
  }

  return (
    <Container>
      <VideoPlayer videoSrc={videoSrc} overlayText={overlayText} />
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
        onClick={handleNext} // This button should trigger the transition
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
