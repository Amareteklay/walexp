import React from 'react';
import { Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function ValueRatingsQuestion({ selectedValues, handleRadioChange }) {
  const values = [
    "1. Living in secure surroundings",
    "2. Being successful and influencing others",
    "3. Freedom of choice and opportunities",
    "4. Being loyal to friends and family",
    "5. Protecting the environment",
  ];

  return (
    <Box>
      <Typography sx={{mb: 4}} variant="body1">
        Q6. How important are the following values to you on a scale of 1 to 7?
      </Typography>
      {values.map((value) => (
        <Box key={value} mt={2}>
          <Typography variant="subtitle1">{value}</Typography>
          <RadioGroup
            row
            value={selectedValues[value]}
            onChange={(e) => handleRadioChange("valueRatings", value, e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(val => (
              <FormControlLabel
                key={val}
                value={val.toString()}
                control={<Radio />}
                label={val}
                labelPlacement='top'
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
    </Box>
  );
}

export default ValueRatingsQuestion;
