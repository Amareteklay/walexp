// EducationQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function EducationQuestion({ selectedValue, handleRadioChange }) {
  const options = [
    "No completed education",
    "Elementary school",
    "Secondary school",
    "Upper secondary school",
    "University"
  ];

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q12. What is your highest completed education level?
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

export default EducationQuestion;
