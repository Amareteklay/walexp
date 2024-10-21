// New CommentDialog Component
import React, { useState } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material"
import CustomButton from "./CustomButton"

function CommentDialog({
  open,
  comment,
  shareOption,
  onClose,
  onCommentChange,
  onShareOptionChange,
  onSubmit,
}) {
  const [isCommentValid, setIsCommentValid] = useState(false)

  // Handle comment change and validate input
  const handleCommentChange = (value) => {
    onCommentChange(value)
    const hasValidText = value.trim().length > 5 && /[a-zA-Z]/.test(value)
    setIsCommentValid(hasValidText)
  }

  const handleSubmit = () => {
    onSubmit() // Call the submit handler passed from the parent
    onClose() // Close the dialog
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
      sx={{
        "& .MuiDialog-paper": {
          marginLeft: "300px",
          width: "100%",
          maxWidth: "360px",
          padding: "10px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Comment</DialogTitle>
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
          onChange={(e) => handleCommentChange(e.target.value)}
          multiline
          minRows={3}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          text={"Submit"}
          onClick={handleSubmit}
          disabled={!isCommentValid}
        />
      </DialogActions>
    </Dialog>
  )
}

export default CommentDialog
