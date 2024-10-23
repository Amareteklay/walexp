// PoliticalScaleQuestion.js
import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

function PoliticalScaleQuestion({ selectedValue, handleRadioChange }) {
  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q5. Where would you place yourself politically on a left-to-right scale?
      </Typography>
      <RadioGroup
        row
        value={selectedValue}
        onChange={(e) => handleRadioChange(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <FormControlLabel
            key={value}
            value={value.toString()}
            control={<Radio />}
            label={value}
            labelPlacement='top'
          />
        ))}
      </RadioGroup>
    </Box>
  );
}

export default PoliticalScaleQuestion;
