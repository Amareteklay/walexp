import React, { useEffect, useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function MediaUseQuestion({ selectedValues, handleCheckboxChange, setNextEnabled }) {
  const [otherText, setOtherText] = useState("");

  const options = [
    'I am not on social media',
    'I use it to catch up on content posted by others',
    'I use it to interact with my friends and family',
    'I use it to share information I find important and/or interesting',
    'Other reason, specify',
  ];

  // Enable the "Next" button when at least one option is selected
  useEffect(() => {
    setNextEnabled(selectedValues.length > 0);
  }, [selectedValues, setNextEnabled]);

  // Disable other options if 'I am not on social media' is selected
  const isSocialMediaDisabled = selectedValues.includes('I am not on social media');

  const handleChange = (option) => {
    if (option === 'I am not on social media') {
      // If 'I am not on social media' is selected, unselect everything else.
      const updatedMediaUse = isSocialMediaDisabled ? [] : [option];
      handleCheckboxChange(updatedMediaUse);
    } else if (option === 'Other reason, specify') {
      // Toggle "Other reason, specify"
      const hasOther = selectedValues.some(
        (val) => val === 'Other reason, specify' || val.startsWith('Other reason, specify:')
      );
      if (hasOther) {
        // Remove any existing "Other reason, specify" entry.
        const updated = selectedValues.filter(
          (val) => !(val === 'Other reason, specify' || val.startsWith('Other reason, specify:'))
        );
        handleCheckboxChange(updated);
        setOtherText("");
      } else {
        handleCheckboxChange([...selectedValues, option]);
      }
    } else {
      const updatedMediaUse = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      handleCheckboxChange(updatedMediaUse);
    }
  };

  // Update the "Other reason, specify" text and append it to the parent's array.
  const handleOtherTextChange = (event) => {
    const newText = event.target.value;
    setOtherText(newText);
    // Remove any previous "Other reason, specify" entries.
    let updated = selectedValues.filter(
      (val) => !(val === 'Other reason, specify' || val.startsWith('Other reason, specify:'))
    );
    if (newText.trim() !== "") {
      updated.push(`Other reason, specify: ${newText}`);
    } else {
      updated.push('Other reason, specify');
    }
    handleCheckboxChange(updated);
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
                checked={
                  option === 'Other reason, specify'
                    ? selectedValues.some(
                        (val) =>
                          val === 'Other reason, specify' ||
                          val.startsWith('Other reason, specify:')
                      )
                    : selectedValues.includes(option)
                }
                onChange={() => handleChange(option)}
                disabled={isSocialMediaDisabled && option !== 'I am not on social media'}
              />
            }
            label={<span style={{ fontSize: '0.875rem' }}>{option}</span>}
          />
        ))}
        {selectedValues.some(
          (val) =>
            val === 'Other reason, specify' || val.startsWith('Other reason, specify:')
        ) && (
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
