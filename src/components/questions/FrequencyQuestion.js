// FrequencyQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function FrequencyQuestion({ selectedValue, handleRadioChange }) {
  const options = [
    "Never, I am not on social media",
    "A few times per year",
    "A few times per month",
    "A few times per week",
    "A few times per day",
    "Several hours every day"
  ];

  return (
    <Box>
      <Typography variant="body1">
        Q2. How often do you use social media platforms? Mark the alternative most relevant for you.
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleRadioChange("frequency", e.target.value)}
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

export default FrequencyQuestion;
