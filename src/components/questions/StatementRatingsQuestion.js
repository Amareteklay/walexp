import React from 'react';
import { Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleRadioChange }) {
  const statements = [
    "1. People should always strive for equality and social justice.",
    "2. It is important for the government to be strong and make decisions quickly.",
    "3. Free markets are the best way to ensure economic growth.",
    "4. We should do more to protect the environment even if it limits our freedom.",
  ];

  return (
    <Box>
      <Typography sx={{mb: 4}} variant="body1">
        Q7. How much do you agree with the following statements on a scale of 1 to 7?
      </Typography>
      {statements.map((statement) => (
        <Box key={statement} mt={2}>
          <Typography sx={{mb: 2}} variant="subtitle1">{statement}</Typography>
          <RadioGroup
            row
            value={selectedValues[statement]}
            onChange={(e) => handleRadioChange("statementRatings", statement, e.target.value)}
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

export default StatementRatingsQuestion;
