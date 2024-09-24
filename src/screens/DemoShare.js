import React, { useState } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"
import CommentDialog from "../components/CommentDialog"
import AddCommentIcon from "@mui/icons-material/AddComment"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"


function DemoShare({ onProceed }) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false)

  const handleAddCommentClick = () => {
    setIsCommentDialogOpen(true)
  }

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false)
  }

  const handleContinue = () => {
    onProceed("practicePrompt")
  }

  return (
    <>
      <Typography variant="body1" sx={{mb: 4}} gutterBottom>
        You will see "add comment" button under each video. You can use this to
        write comments that you would normally post on similar content you watch
        on social media. We also ask you to tell us whether you would share the
        video on your social media.
      </Typography>
      <Typography variant="body1" sx={{mb: 4}} gutterBottom>
        Click the "comment" button below to see what the form looks like.
      </Typography>
        <CustomButton
        text={"Comment"}
        onClick={handleAddCommentClick}
        startIcon={<AddCommentIcon />}
      />
      <Typography variant="body1" sx={{padding: 4}} paragraph>
        Please click 'Continue' to continue reading instructions on the next
        screen
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />

      {/* Render the CommentDialog modal */}
      <CommentDialog
        open={isCommentDialogOpen}
        onClose={handleCloseCommentDialog}
      />
    </>
  )
}

export default DemoShare
