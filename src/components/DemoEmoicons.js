import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

// Paths to your emoji images
const happyEmoji = process.env.PUBLIC_URL + "/emojis/happy.png"
const neutralEmoji = process.env.PUBLIC_URL + "/emojis/neutral.png"
const sadEmoji = process.env.PUBLIC_URL + "/emojis/sad.png"

const DemoContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const EmojisContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  marginBottom: "20px",
})

const EmojiIcon = styled("img")({
  margin: "0 10px",
  width: "50px",
  height: "50px",
})

function DemoEmoicons({ onProceed }) {
  return (
    <DemoContainer>
      <Typography variant="h5" gutterBottom>
        For each video we ask you to indicate your reaction towards the video
        using one of the following emojis:
      </Typography>
      <EmojisContainer>
        <EmojiIcon src={happyEmoji} alt="Happy" />
        <EmojiIcon src={neutralEmoji} alt="Neutral" />
        <EmojiIcon src={sadEmoji} alt="Sad" />
      </EmojisContainer>
      <Typography variant="body1" paragraph>
        Please click 'Continue' to continue reading instructions on the next
        screen.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={onProceed}>
          Continue
        </Button>
      </Box>
    </DemoContainer>
  )
}

export default DemoEmoicons
