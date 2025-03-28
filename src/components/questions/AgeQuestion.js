import React, { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

function AgeQuestion({ selectedValue, handleInputChange }) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validateAge = (value) => {
    if (value === "") {
      setError("Age is required");
      return false;
    }
    
    const age = parseInt(value, 10);
    if (isNaN(age)) {
      setError("Please enter a valid number");
      return false;
    }
    
    if (age < 18) {
      setError("Minimum age is 18");
      return false;
    }
    
    if (age > 90) {
      setError("Maximum age is 90");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    handleInputChange(value);
    if (touched) validateAge(value);
  };

  const handleBlur = (e) => {
    setTouched(true);
    validateAge(e.target.value);
  };

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q11. How old are you?
      </Typography>
      <TextField
        type="number"
        value={selectedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Age"
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 18,
          max: 90,
          step: 1,
        }}
        error={!!error}
        helperText={error || " "}
        FormHelperTextProps={{
          sx: { mx: 0, height: '24px' }
        }}
        InputProps={{
          sx: {
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
          }
        }}
      />
    </Box>
  );
}

export default AgeQuestion;