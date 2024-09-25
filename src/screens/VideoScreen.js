import React, { useRef, useState, useEffect } from "react"
import { Container, Box, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import VideoPlayer from "../components/VideoPlayer"
import EmojiReaction from "../components/EmojiReaction"
import CommentDialog from "../components/CommentDialog"
import AddCommentIcon from "@mui/icons-material/AddComment"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

function VideoScreen({
  videoSrc,
  overlayText,
  videoId,
  onProceed,
  nextScreen,
  factInfo,
  emojiType,
}) {
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [shareOption, setShareOption] = useState("")
  const [isNextDisabled, setIsNextDisabled] = useState(true) // Initially disable the Next button
  const [commentSubmitted, setCommentSubmitted] = useState(false) // Track if the comment is submitted

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
    setCommentSubmitted(true) // Mark the comment as submitted
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

  const handleShareOptionChange = (value) => {
    setShareOption(value) // Update the shareOption when radio is selected
  }

  useEffect(() => {
    // Enable the Next button after 5 seconds
    const timer = setTimeout(() => {
      setIsNextDisabled(false)
    }, 5000)

    // Cleanup timer on unmount
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <VideoPlayer
        videoSrc={videoSrc}
        overlayText={overlayText}
        factInfo={factInfo}
        ref={videoRef}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Vertically center the items
          justifyContent: "center",
          gap: 2, // Add some space between the items
        }}
      >
        <EmojiReaction
          selectedEmoji={selectedEmoji}
          onReaction={handleReaction}
          interactive={true}
          emojiType={emojiType}
        />
        <CustomButton
          text={"Comment"}
          onClick={handleAddComment}
          startIcon={<AddCommentIcon />}
          disabled={commentSubmitted} // Disable button once comment is submitted
        />
      </Box>
      <Box sx={{marginTop: 4, marginLeft: 8}}>
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          Would you normally share this video on your social media?
        </Typography>
        <RadioGroup
        row
          value={shareOption}
          onChange={(e) => handleShareOptionChange(e.target.value)} // Corrected onChange handler
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Vertically center the items
          justifyContent: "center",
          gap: 2, // Add some space between the items
          marginTop: 8,
        }}
      >
        <CustomButton
          id="nextButton"
          text={"Next"}
          onClick={handleNext}
          endIcon={<ArrowForwardIcon />}
          disabled={isNextDisabled} // Disable button based on state
        />
      </Box>

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
