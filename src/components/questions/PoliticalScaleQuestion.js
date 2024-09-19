// PoliticalScaleQuestion.jsx
import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

function PoliticalScaleQuestion({ selectedValue, handleSliderChange }) {
  return (
    <Box>
      <Typography variant="body1">
        Q5. Where would you place yourself politically on a left-to-right scale?
      </Typography>
      <Slider
        value={typeof selectedValue === 'number' ? selectedValue : 4} // Ensure value is a number
        onChange={(e, newValue) => handleSliderChange("politicalScale", newValue)}
        min={1}
        max={7}
        marks={[
          { value: 1, label: "1" },
          { value: 7, label: "7" },
        ]}
        step={1}
      />
    </Box>
  );
}

export default PoliticalScaleQuestion;
