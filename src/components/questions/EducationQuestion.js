// EducationQuestion.jsx
import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';
import { useData } from "../../contexts/DataContext";  // Assuming you're using context to store country data

function EducationQuestion({ selectedValue, handleRadioChange }) {
  const { state } = useData();
  const selectedCountry = state.selectedCountry;

  // Define country-specific education levels
  const educationLevels = {
    UK: [
      "No formal qualifications",
      "Primary education",
      "Secondary education (GCSE level)",
      "Secondary education (A-level or equivalent)",
      "Higher education (e.g., college, university degree)"
    ],
    US: [
      "No formal qualifications",
      "Elementary school",
      "Middle school",
      "High school diploma or equivalent (GED)",
      "College and above"
    ]
  };

  // Default to UK if country is not set or is unknown
  const options = educationLevels[selectedCountry] || educationLevels['UK'];

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q12. What is your highest completed education level?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={(e) => handleRadioChange(e.target.value)}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default EducationQuestion;
