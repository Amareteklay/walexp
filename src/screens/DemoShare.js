import React, { useState } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"
import CommentDialog from "../components/CommentDialog"
import AddCommentIcon from "@mui/icons-material/AddComment"

const DemoContainer = styled(Container)({
  textAlign: "center",
  marginTop: "20px",
})

const ButtonContainer = styled(Box)({
  marginTop: "20px",
  marginBottom: "20px",
})

function DemoShare({ onProceed }) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false)

  const handleAddCommentClick = () => {
    setIsCommentDialogOpen(true)
  }

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false)
  }

  const handleContinue = () => {
    onProceed("videoOne")
  }

  return (
    <DemoContainer>
      <Typography variant="body1" sx={{mb: 4}} gutterBottom>
        You will see "add comment" button under each video. You can use this to
        write comments that you would normally post on similar content you watch
        on social media. We also ask you to tell us whether you would share the
        video on your social media.
      </Typography>
      <Typography variant="body1" sx={{mb: 4}} gutterBottom>
        Click the "add comment" button below to see what the form looks like.
      </Typography>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCommentClick}
          sx={{ mt: 2, mr: 2 }}
          startIcon={<AddCommentIcon />}
        >
          Add Comment
        </Button>
      </ButtonContainer>
      <Typography variant="body1" paragraph>
        Please click 'Continue' to continue reading instructions on the next
        screen
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </Box>

      {/* Render the CommentDialog modal */}
      <CommentDialog
        open={isCommentDialogOpen}
        onClose={handleCloseCommentDialog}
      />
    </DemoContainer>
  )
}

export default DemoShare
