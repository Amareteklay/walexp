// GenderQuestion.jsx
import React from "react";
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";

function GenderQuestion({ selectedValue, handleRadioChange }) {
  const options = ["Female", "Male", "Non-binary", "None of the above", "Prefer not to say"];

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q8. What best describes your gender?
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
