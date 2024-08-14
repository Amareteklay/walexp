import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"

const EmojiContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
})

const EmojiBox = styled(Box)(({ selected }) => ({
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 10px",
  cursor: "pointer",
  backgroundColor: selected ? "#f0a" : "#ddd",
  borderRadius: "50%",
}))

function EmojiReaction({ selectedEmoji, onReaction }) {
  return (
    <EmojiContainer>
      {["happy", "sad", "neutral"].map((emoji) => (
        <EmojiBox
          key={emoji}
          selected={selectedEmoji === emoji}
          onClick={() => onReaction(emoji)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/emojis/${emoji}.png`}
            alt={emoji}
            style={{ width: "50px", height: "50px" }}
          />
        </EmojiBox>
      ))}
    </EmojiContainer>
  )
}

export default EmojiReaction
