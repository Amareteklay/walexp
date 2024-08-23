import React from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

const EmojiContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
})

const EmojiWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 10px",
})

const EmojiIcon = styled("img")(({ selected, interactive }) => ({
  width: "30px",
  height: "30px",
  backgroundColor: selected ? "#FFEB3B" : "transparent",
  borderRadius: "50%",
  cursor: interactive ? "pointer" : "default",
  transition: "transform 0.3s ease",
  "&:hover": interactive ? { transform: "scale(1.5)" } : {},
}))

function EmojiReaction({ selectedEmoji, onReaction, interactive = false }) {
  const emojis = [
    { name: "happy", label: "Happy" },
    { name: "neutral", label: "Neutral" },
    { name: "sad", label: "Sad" },
  ]

  return (
    <EmojiContainer>
      {emojis.map((emoji) => (
        <EmojiWrapper key={emoji.name}>
          <EmojiIcon
            src={`${process.env.PUBLIC_URL}/emojis/${emoji.name}.png`}
            alt={emoji.label}
            selected={selectedEmoji === emoji.name}
            interactive={interactive}
            onClick={interactive ? () => onReaction(emoji.name) : undefined}
          />
          <Typography variant="body2">{emoji.label}</Typography>
        </EmojiWrapper>
      ))}
    </EmojiContainer>
  )
}

export default EmojiReaction
