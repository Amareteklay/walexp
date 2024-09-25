// GenderQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

function GenderQuestion({ selectedValue, handleRadioChange }) {
  return (
    <Box>
      <Typography sx={{mt: 4, mb: 4}} variant="body1">
        Q8. What is your gender?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedValue}
          onChange={(e) => handleRadioChange("gender", e.target.value)}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default GenderQuestion;
