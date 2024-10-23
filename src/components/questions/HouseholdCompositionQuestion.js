// HouseholdCompositionQuestion.jsx
import React from "react";
import { TextField, Typography, Box } from "@mui/material";

function HouseholdCompositionQuestion({ selectedValues, handleInputChange }) {
  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q13. How many adults and children live in your household?
      </Typography>
      <TextField
        type="number"
        value={selectedValues.adults}
        onChange={(e) => handleInputChange("adults", e.target.value)} // Pass the input to the parent handler for adults
        label="Number of Adults"
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 1, // Prevent user from entering a value below 1 for adults
        }}
      />
      <TextField
        type="number"
        value={selectedValues.children}
        onChange={(e) => handleInputChange("children", e.target.value)} // Pass the input to the parent handler for children
        label="Number of Children"
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 0, // Allow user to enter 0 or more for children
        }}
      />
    </Box>
  );
}

export default HouseholdCompositionQuestion;
