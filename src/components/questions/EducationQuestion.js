// EducationQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function EducationQuestion({ selectedValue, handleInputChange }) {
  const options = [
    "No formal education",
    "Primary education",
    "Secondary education",
    "Higher education",
    "Prefer not to say"
  ];

  return (
    <Box>
      <Typography sx={{mt: 4, mb: 2}} variant="body1">
        Q12. What is your highest level of education?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleInputChange("education", e.target.value)}
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

export default EducationQuestion;
