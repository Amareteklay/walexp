import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const EmojiContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
});

const EmojiWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 10px",
});

const EmojiIcon = styled(Box)(({ selected, interactive }) => ({
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: selected ? "2px solid #5937ce" : "2px solid transparent",
  backgroundColor: selected ? "#5937ce" : "transparent",
  borderRadius: "50%",
  transition: "border 0.2s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease",
  cursor: interactive ? "pointer" : "default",
  "&:hover": interactive
    ? {
        transform: "scale(1.5)",
        backgroundColor: "rgba(173, 216, 230, 0.9)",
      }
    : {},
}));

function EmojiReaction({ selectedEmoji, onReaction, interactive = false }) {
  // Define the two emoji sets
  const genEmojis = [
    { name: "sad", label: "Sad", symbol: "😢" },
    { name: "slightly sad", label: "Slightly Sad", symbol: "😟" },
    { name: "neutral", label: "Neutral", symbol: "😐" },
    { name: "slightly happy", label: "Slightly Happy", symbol: "🙂" },
    { name: "happy", label: "Happy", symbol: "😊" },
  ];

  // Select the appropriate emoji set based on the emojiType prop
  const emojis = genEmojis;

  return (
    <EmojiContainer>
      {emojis.map((emoji) => (
        <EmojiWrapper key={emoji.name}>
            <EmojiIcon
              selected={selectedEmoji === emoji.name}
              interactive={interactive}
              onClick={interactive ? () => onReaction(emoji.name) : undefined}
              style={{ fontSize: "24px" }}
            >
              {emoji.symbol}
            </EmojiIcon>
          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            {emoji.label}
          </Typography>
        </EmojiWrapper>
      ))}
    </EmojiContainer>
  );
}

export default EmojiReaction;
