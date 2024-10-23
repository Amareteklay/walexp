// MediaUseQuestion.js
import React, { useEffect } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

function MediaUseQuestion({ selectedValues, handleCheckboxChange, setNextEnabled }) {
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
      </FormGroup>
    </div>
  );
}

export default MediaUseQuestion;
