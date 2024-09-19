import React from 'react';
import { Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleRadioChange }) {
  const statements = [
    "People should always strive for equality and social justice.",
    "It is important for the government to be strong and make decisions quickly.",
    "Free markets are the best way to ensure economic growth.",
    "We should do more to protect the environment even if it limits our freedom.",
  ];

  return (
    <Box>
      <Typography variant="body1">
        Q7. How much do you agree with the following statements on a scale of 1 to 7?
      </Typography>
      {statements.map((statement) => (
        <Box key={statement} mt={2}>
          <Typography variant="subtitle1">{statement}</Typography>
          <RadioGroup
            row
            value={selectedValues[statement] || '4'}
            onChange={(e) => handleRadioChange(statement, e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(num => (
              <FormControlLabel
                key={num}
                value={num.toString()}
                control={<Radio />}
                label={num}
                labelPlacement="top"
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
    </Box>
  );
}

export default StatementRatingsQuestion;
