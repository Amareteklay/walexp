// AreaQuestion.jsx
import React from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";

function AreaQuestion({ selectedValue, handleRadioChange }) {
  const options = [
    "Centrally in a bigger city (bigger than 1 M inhabitants)", 
    "In the suburb to a bigger city", 
    "Centrally in medium size city (bigger than 500 000 inhabits)", 
    "In a smaller city (less than 500 000 inhabitants)",
    "In a rural area"
  ];

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q10. What type of area do you live in?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={(e) => handleRadioChange(e.target.value)}>
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
  );
}

export default AreaQuestion;
