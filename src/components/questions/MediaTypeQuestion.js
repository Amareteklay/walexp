// MediaTypeQuestion.js
import React from "react";
import { Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function MediaTypeQuestion({ selectedValues, handleCheckboxChange }) {
  const options = [
    "I don’t stay updated on current events",
    "Television",
    "Newspapers",
    "Radio",
    "Social media",
    "Others, specify",
  ];

  return (
    <div>
      <Typography variant="body1">
        What type of media do you typically use to get updated on current events? You can mark several alternatives.
      </Typography>
      <FormGroup sx={{ paddingLeft: "20px" }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.mediaType.includes(option)}
                onChange={() => handleCheckboxChange("mediaType", option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </div>
  );
}

export default MediaTypeQuestion;
