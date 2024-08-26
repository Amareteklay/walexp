import React, { useState } from "react"
import { Typography } from "@mui/material"
import EmojiReaction from "../components/EmojiReaction"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"


function DemoEmoicons({ onProceed }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null)

  const handleReaction = (emoji) => {
    setSelectedEmoji(emoji)
  }

  const handleContinue = () => {
    onProceed("demoshare")
  }

  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", padding: 4 }}
        gutterBottom
      >
        For each video we ask you to indicate your reaction towards the video
        using one of the following emojis.
      </Typography>

      <EmojiReaction
        selectedEmoji={selectedEmoji}
        onReaction={handleReaction}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold", padding: 4, mt: 2 }}>
        Please click 'Continue' to continue reading instructions on the next
        screen.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default DemoEmoicons
