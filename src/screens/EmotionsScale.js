import React, { useState } from "react"
import { Container, Typography, Slider, Box, Button } from "@mui/material"
import { styled } from "@mui/system"

const ScaleContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const marks = [
  {
    value: -2,
    label: "-2",
  },
  {
    value: -1,
    label: "-1",
  },
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
]

function EmotionsScale({ onProceed, nextScreen }) {
  const [value, setValue] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleConfirm = () => {
    if (value !== null) {
      onProceed(nextScreen) // Use the passed nextScreen prop
    }
  }

  return (
    <ScaleContainer>
      <Typography variant="h5" gutterBottom>
        How are you feeling right now?
      </Typography>
      <Typography variant="body1" paragraph>
        Please click on the circle that best corresponds to your feelings.
      </Typography>
      <Box mt={4}>
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="discrete-slider"
          step={1}
          marks={marks}
          min={-2}
          max={2}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box mt={4}>
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
