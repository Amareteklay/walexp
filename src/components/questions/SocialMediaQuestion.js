// SocialMediaQuestion.js
import React from "react"
import { Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material"

function SocialMediaQuestion({ selectedValues, handleCheckboxChange }) {
  const options = [
    "I am not on social media",
    "Instagram",
    "X (previously Twitter)",
    "Facebook",
    "TikTok",
    "Snapchat",
    "Youtube",
    "Other(s) specify",
  ]

  return (
    <div>
      <Typography variant= "h5">Part I: Social Media Experience</Typography>
      <Typography sx={{mt: 4, mb: 2}} variant="body1">
        Q1. What social media platforms do you use frequently? (You can mark
        several alternatives.)
      </Typography>
      <FormGroup sx={{ paddingLeft: "20px" }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.socialMedia.includes(option)}
                onChange={() => handleCheckboxChange("socialMedia", option)}
              />
            }
            label={<span style={{ fontSize: "0.875rem" }}>{option}</span>}
          />
        ))}
      </FormGroup>
    </div>
  )
}

export default SocialMediaQuestion
