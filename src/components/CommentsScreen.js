import React, { useState } from "react"
import { Container, Button, Typography, TextField, Box } from "@mui/material"
import { styled } from "@mui/system"

const CommentsContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const CommentBox = styled(TextField)({
  width: "100%",
  marginTop: "20px",
  backgroundColor: "white",
})

function CommentsScreen({ onSubmit }) {
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    onSubmit(comment)
  }

  return (
    <CommentsContainer>
      <Typography variant="h4" color="white" gutterBottom>
        Please comment here
      </Typography>
      <CommentBox
        label="Your Comment"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </CommentsContainer>
  )
}

export default CommentsScreen
