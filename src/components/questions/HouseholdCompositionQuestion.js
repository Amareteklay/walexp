// HouseholdCompositionQuestion.jsx
import React from "react"
import { TextField, Typography, Box } from "@mui/material"

function HouseholdCompositionQuestion({ adults, children, handleInputChange }) {
  return (
    <Box>
      <Typography variant="body1">
        Q13. How many adults and children live in your household?
      </Typography>
      <TextField
        type="number"
        value={adults}
        onChange={(e) => handleInputChange("adults", e.target.value)}
        label="Number of Adults"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        value={children}
        onChange={(e) => handleInputChange("children", e.target.value)}
        label="Number of Children"
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </Box>
  )
}

export default HouseholdCompositionQuestion
