// AreaQuestion.jsx
import React from "react"
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material"

function AreaQuestion({ selectedValue, handleInputChange }) {
  const options = ["Urban", "Suburban", "Rural", "Prefer not to say"]

  return (
    <Box>
      <Typography variant="body1">
        Q10. How would you describe the area where you live?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleInputChange("area", e.target.value)}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default AreaQuestion
