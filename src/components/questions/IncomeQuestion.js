// IncomeQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function IncomeQuestion({ selectedValue, handleRadioChange }) {
  const options = [
    "1 000 Euro or less (all alternatives in Dollar if in the US)",
    "Between 1 000 and 2 000 Euro",
    "Between 2 000 and 3 000 Euro",
    "Between 3 000 and 4 000 Euro",
    "Between 4 000 and 5 000 Euro",
    "Between 5 000 and 6 000 Euro",
    "Above 6 000 Euro",
    "Prefer not to say"
  ];  

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q9. What is your average monthly income before taxes?
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

export default IncomeQuestion;
