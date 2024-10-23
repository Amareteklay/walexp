// AgeQuestion.jsx
import React from "react";
import { TextField, Typography, Box } from "@mui/material";

function AgeQuestion({ selectedValue, handleInputChange }) {
  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q11. What is your age?
      </Typography>
      <TextField
        type="number"
        value={selectedValue}
        onChange={(e) => handleInputChange(e.target.value)} // Pass the input to the parent handler
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
