import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function CommentDialog({ open, comment, shareOption, onClose, onCommentChange, onShareOptionChange }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
      sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: "400px" } }}
    >
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
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          Would you normally share this video on your social media?
        </Typography>
        <RadioGroup
          value={shareOption}
          onChange={(e) => onShareOptionChange(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;