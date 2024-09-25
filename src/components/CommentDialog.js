import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomButton from "./CustomButton";

function CommentDialog({ open, comment, shareOption, onClose, onCommentChange, onShareOptionChange }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth={true}
      sx={{ "& .MuiDialog-paper": {marginLeft: "300px", width: "100%", maxWidth: "360px", padding: "10px" } }}
    >
      <DialogTitle sx={{fontWeight: "bold"}}>Add Comment</DialogTitle>
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
          multiline
          minRows={3}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton text={"Submit"} onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;
