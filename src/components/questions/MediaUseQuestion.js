// MediaUseQuestion.js
import React, { useEffect, useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function MediaUseQuestion({ selectedValues, handleCheckboxChange, setNextEnabled }) {
  const [otherText, setOtherText] = useState("");

  const options = [
    'I am not on social media',
    'I only use it to catch up on content posted by others',
    'I use it to interact with my friends and family',
    'I use it to share information I find important and/or interesting',
    'Other reason, specify',
  ];

  // Enable the "Next" button when at least one option is selected
  useEffect(() => {
    setNextEnabled(selectedValues.length > 0);
  }, [selectedValues, setNextEnabled]);

  // Handle checkbox changes
  const handleChange = (option) => {
    const updatedMediaUse = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    // Pass the updated array to the parent handler
    handleCheckboxChange(updatedMediaUse);
  };

  // Handle the change in "Other" text field
  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
    if (!selectedValues.includes("Other reason, specify")) {
      handleChange("Other reason, specify");
    }
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q3. What do you typically use these platforms for? You can mark several alternatives.
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
        {selectedValues.includes("Other reason, specify") && (
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

export default MediaUseQuestion;
