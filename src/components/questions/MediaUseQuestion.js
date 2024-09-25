// MediaUseQuestion.js
import React from "react"
import { Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material"

function MediaUseQuestion({ selectedValues, handleCheckboxChange }) {
  const options = [
    "I am not on social media",
    "I only use it to catch up on content posted by others",
    "I use it to interact with my friends and family",
    "I use it to share information I find important and/or interesting",
    "Other reason, specify",
  ]

  return (
    <div>
      <Typography sx={{mt: 4, mb: 2}} variant="body1">
        Q3. What do you typically use these platforms for? You can mark several
        alternatives.
      </Typography>
      <FormGroup sx={{ paddingLeft: "20px" }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.mediaUse.includes(option)}
                onChange={() => handleCheckboxChange("mediaUse", option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </div>
  )
}

export default MediaUseQuestion
