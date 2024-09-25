import React from "react"
import { TextField, Typography, Box } from "@mui/material"

function HouseholdCompositionQuestion({ adults, children, handleInputChange }) {
  // Handle the change event for the adults input
  const handleAdultsChange = (e) => {
    const value = e.target.value;

    // Only allow values that are 1 or greater for adults
    if (value === '' || value >= 1) {
      handleInputChange("adults", value);
    } else {
      // Optional: You can provide feedback to the user if desired
      console.warn("Number of adults must be at least 1.");
    }
  };

  // Handle the change event for the children input
  const handleChildrenChange = (e) => {
    const value = e.target.value;

    // Allow values that are 0 or greater for children
    if (value === '' || value >= 0) {
      handleInputChange("children", value);
    }
  };

  return (
    <Box>
      <Typography sx={{mb: 4}} variant="body1">
        Q13. How many adults and children live in your household?
      </Typography>
      <TextField
        type="number"
        value={adults}
        onChange={handleAdultsChange} // Use the new handle adults change function
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
        value={children}
        onChange={handleChildrenChange} // Use the new handle children change function
        label="Number of Children"
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 0, // Allow user to enter 0 or more for children
        }}
      />
    </Box>
  )
}

export default HouseholdCompositionQuestion
