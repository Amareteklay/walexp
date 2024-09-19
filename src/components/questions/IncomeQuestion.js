// IncomeQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function IncomeQuestion({ selectedValue, handleInputChange }) {
  const options = [
    "Low income",
    "Average income",
    "High income",
    "Prefer not to say"
  ];

  return (
    <Box>
      <Typography variant="body1">
        Q9. How would you describe your income level?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleInputChange("income", e.target.value)}
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

export default IncomeQuestion;
