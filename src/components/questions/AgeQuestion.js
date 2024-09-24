import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

function AgeQuestion({ selectedValue, handleInputChange }) {
  // Handle the change event for the age input
  const handleAgeChange = (e) => {
    const value = e.target.value;

    // Check if the value is a valid number and within the specified range
    if (value === '' || (value >= 18 && value <= 70)) {
      handleInputChange("age", value);
    } else {
      // Optional: You can provide feedback to the user if desired
      console.warn("Age must be between 18 and 70.");
    }
  };

  return (
    <Box>
      <Typography variant="body1">
        Q11. What is your age?
      </Typography>
      <TextField
        type="number"
        value={selectedValue}
        onChange={handleAgeChange} // Use the new handle change function
        label="Age"
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 18, // Prevent user from entering a value below 18
          max: 70, // Prevent user from entering a value above 70
        }}
      />
    </Box>
  );
}

export default AgeQuestion;
