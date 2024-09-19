// ValueRatingsQuestion.jsx
import React from 'react';
import { Typography, Box, Slider } from '@mui/material';

function ValueRatingsQuestion({ selectedValues, handleSliderChange }) {
  const values = [
    "Living in secure surroundings",
    "Being successful and influencing others",
    "Freedom of choice and opportunities",
    "Being loyal to friends and family",
    "Protecting the environment",
  ];

  return (
    <Box>
      <Typography variant="body1">
        Q6. How important are the following values to you on a scale of 1 to 7?
      </Typography>
      {values.map((value) => (
        <Box key={value} mt={2}>
          <Typography variant="subtitle1">{value}</Typography>
          <Slider
            value={selectedValues[value] || 4}
            onChange={(e, val) => handleSliderChange("valueRatings", { [value]: val })}
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

export default ValueRatingsQuestion;
