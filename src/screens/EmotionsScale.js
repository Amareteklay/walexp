import React, { useState } from "react"
import { Container, Typography, Slider, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

const ScaleContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const marks = [
  { value: -2, label: "Very Negative" },
  { value: -1, label: "Negative" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Positive" },
  { value: 2, label: "Very Positive" },
]

function EmotionsScale({ onProceed, nextScreen }) {
  const [value, setValue] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleConfirm = () => {
    if (value !== null) {
      onProceed(nextScreen) // Proceed to the next screen when a value is selected
    }
  }

  return (
    <ScaleContainer>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: 4 }}
        gutterBottom
      >
        How are you feeling right now?
      </Typography>
      <Typography variant="body1" paragraph>
        Think about how you're feeling at this moment. Use the scale below to
        express your emotions.
      </Typography>
      <Box mt={8} mb={8}>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="emotion-scale-slider"
          aria-valuetext={`Emotion level ${value}`}
          step={1}
          marks={marks}
          min={-2}
          max={2}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box mt={8}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={value === null}
        >
          Continue
        </Button>
      </Box>
    </ScaleContainer>
  )
}

export default EmotionsScale
