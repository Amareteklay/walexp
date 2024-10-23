// GenderQuestion.jsx
import React from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";

function GenderQuestion({ selectedValue, handleRadioChange }) {
  const options = ["Male", "Female", "Other"];

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q8. What is your gender?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleRadioChange(e.target.value)}
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
  );
}

export default GenderQuestion;
