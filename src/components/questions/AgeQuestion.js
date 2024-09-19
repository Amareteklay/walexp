// AgeQuestion.jsx
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

function AgeQuestion({ selectedValue, handleInputChange }) {
  return (
    <Box>
      <Typography variant="body1">
        Q11. What is your age?
      </Typography>
      <TextField
        type="number"
        value={selectedValue}
        onChange={(e) => handleInputChange("age", e.target.value)}
        label="Age"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  );
}

export default AgeQuestion;
