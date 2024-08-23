import React, { useState } from "react"
import {
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material"

function AudioCheck({ onProceed }) {
  const [selectedOption, setSelectedOption] = useState("")

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleContinue = () => {
    if (selectedOption === "birds") {
      // Proceed only if "Birds" is selected
      window.parent.postMessage(
        {
          type: "audio_check",
          buttonName: "birds",
          timestamp: Date.now(),
        },
        "*"
      )
      onProceed("feedback")
    } else {
      // Show alert for "Train" or "Waves"
      alert("Please check your audio system and try again.")
    }
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        Check audio system
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 4 }}>
        This task is to check that your audio system is working.
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", padding: 4 }}>
        What kind of sound do you hear?
      </Typography>
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ marginBottom: 4 }}
      >
        <FormControlLabel value="birds" control={<Radio />} label="Birds" />
        <FormControlLabel value="train" control={<Radio />} label="Train" />
        <FormControlLabel value="waves" control={<Radio />} label="Waves" />
      </RadioGroup>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={!selectedOption} // Disable the button until an option is selected
        >
          Continue
        </Button>
      </Box>
    </>
  )
}

export default AudioCheck
