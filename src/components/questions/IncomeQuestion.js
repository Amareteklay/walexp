import React, { useEffect, useState } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';
import { useData } from "../../contexts/DataContext";  // Assuming you're using context to store country data

function IncomeQuestion({ selectedValue, handleRadioChange }) {
  // Access the selected country from context
  const { state } = useData();
  const selectedCountry = state.selectedCountry;

  const [incomeOptions, setIncomeOptions] = useState([]);

  useEffect(() => {
    // Update the options based on the selected country
    if (selectedCountry === "US") {
      setIncomeOptions([
        "1 000 USD or less",
        "Between 1 000 and 2 000 USD",
        "Between 2 000 and 3 000 USD",
        "Between 3 000 and 4 000 USD",
        "Between 4 000 and 5 000 USD",
        "Between 5 000 and 6 000 USD",
        "Above 6 000 USD",
        "Prefer not to say"
      ]);
    } else if (selectedCountry === "UK") {
      setIncomeOptions([
        "1 000 GBP or less",
        "Between 1 000 and 2 000 GBP",
        "Between 2 000 and 3 000 GBP",
        "Between 3 000 and 4 000 GBP",
        "Between 4 000 and 5 000 GBP",
        "Between 5 000 and 6 000 GBP",
        "Above 6 000 GBP",
        "Prefer not to say"
      ]);
    }
  }, [selectedCountry]);

  return (
    <Box>
      <Typography sx={{ mt: 4, mb: 4 }} variant="body1">
        Q9. What is your average monthly income before taxes?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedValue} onChange={(e) => handleRadioChange(e.target.value)}>
          {incomeOptions.map((option) => (
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

export default IncomeQuestion;
