// StatementRatingsQuestion.jsx
import React from 'react';
import { Typography, Box, Slider } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleSliderChange }) {
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
          <Slider
            value={selectedValues[statement] || 4}
            onChange={(e, val) => handleSliderChange("statementRatings", { [statement]: val })}
            min={1}
            max={7}
            step={1}
            marks={[
              { value: 1, label: "1" },
              { value: 7, label: "7" },
            ]}
          />
        </Box>
      ))}
    </Box>
  );
}

export default StatementRatingsQuestion;
