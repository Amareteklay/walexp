import React, { useState } from "react"
import { Typography, Slider } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CustomButton from "../components/CustomButton"

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
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 8 }}
        gutterBottom
      >
        How are you feeling right now?
      </Typography>
      <Typography variant="h5"  sx={{ mx: 8 }}>
        Think about how you're feeling at this moment. Use the scale below to
        describe your emotions.
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="emotion-scale-slider"
        aria-valuetext={value !== null ? `Emotion level ${value}` : "No emotion selected"}
        step={1}
        marks={marks}
        min={-2}
        max={2}
        valueLabelDisplay="auto"
        sx={{ mb: 12, mt: 8, width: "80%" }}
      />

      <CustomButton
        text={"Continue"}
        onClick={handleConfirm}
        disabled={value === null}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  )
}

export default EmotionsScale
