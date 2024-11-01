// MediaTypeQuestion.js
import React, { useEffect, useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function MediaTypeQuestion({ selectedValues, handleCheckboxChange, setNextEnabled }) {
  const [otherText, setOtherText] = useState("");

  const options = [
    'I don’t stay updated on current events',
    'Television',
    'Newspapers',
    'Radio',
    'Social media',
    'Others, specify',
  ];

  // Enable the "Next" button when at least one option is selected
  useEffect(() => {
    setNextEnabled(selectedValues.length > 0);
  }, [selectedValues, setNextEnabled]);

  // Handle checkbox changes
  const handleChange = (option) => {
    const updatedMediaType = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    // Pass the updated array to the parent handler
    handleCheckboxChange(updatedMediaType);
  };

  // Handle the change in "Others" text field
  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
    if (!selectedValues.includes("Others, specify")) {
      handleChange("Others, specify");
    }
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q4. What type of media do you typically use to get updated on current events? (You can mark several alternatives.)
      </Typography>
      <FormGroup sx={{ paddingLeft: '20px' }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.includes(option)}
                onChange={() => handleChange(option)}
              />
            }
            label={<span style={{ fontSize: '0.875rem' }}>{option}</span>}
          />
        ))}
        {selectedValues.includes("Others, specify") && (
          <TextField
            sx={{ mt: 2, ml: 4 }}
            label="Please specify"
            value={otherText}
            onChange={handleOtherTextChange}
          />
        )}
      </FormGroup>
    </div>
  );
}

export default MediaTypeQuestion;
