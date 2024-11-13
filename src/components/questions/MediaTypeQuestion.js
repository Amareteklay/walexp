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

  // Disable other options if 'I don’t stay updated on current events' is selected
  const isNotStayingUpdated = selectedValues.includes('I don’t stay updated on current events');

  const handleChange = (option) => {
    if (option === 'I don’t stay updated on current events') {
      // If 'I don’t stay updated on current events' is selected, unselect everything else
      const updatedMediaType = isNotStayingUpdated ? [] : [option];
      handleCheckboxChange(updatedMediaType);
    } else if (option === 'Others, specify' && !isNotStayingUpdated) {
      // Handle 'Others, specify' option text change
      if (selectedValues.includes(option)) {
        handleCheckboxChange(selectedValues.filter(value => value !== option));
      } else {
        handleCheckboxChange([...selectedValues, option]);
      }
    } else {
      const updatedMediaType = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];

      handleCheckboxChange(updatedMediaType);
    }
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
                disabled={isNotStayingUpdated && option !== 'I don’t stay updated on current events'}
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
