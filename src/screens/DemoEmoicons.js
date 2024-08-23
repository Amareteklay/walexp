import React, { useState } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"
import EmojiReaction from "../components/EmojiReaction"

const DemoContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

function DemoEmoicons({ onProceed }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null)

  const handleReaction = (emoji) => {
    setSelectedEmoji(emoji)
  }

  const handleContinue = () => {
    onProceed("demoshare")
  }

  return (
    <DemoContainer>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", mb: 8 }}
        gutterBottom
      >
        For each video we ask you to indicate your reaction towards the video
        using one of the following emojis.
      </Typography>

      <EmojiReaction
        selectedEmoji={selectedEmoji}
        onReaction={handleReaction}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 8, mt: 4 }}>
        Please click 'Continue' to continue reading instructions on the next
        screen.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </DemoContainer>
  )
}

export default DemoEmoicons
