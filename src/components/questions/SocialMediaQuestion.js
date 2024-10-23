// SocialMediaQuestion.js
import React, { useEffect } from "react";
import { Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function SocialMediaQuestion({ selectedValues = [], handleCheckboxChange, setNextEnabled }) {
  const options = [
    "I am not on social media",
    "Instagram",
    "X (previously Twitter)",
    "Facebook",
    "TikTok",
    "Snapchat",
    "YouTube",
    "Other(s), specify",
  ];

  useEffect(() => {
    setNextEnabled(selectedValues.length > 0);
  }, [selectedValues, setNextEnabled]);

  const handleChange = (option) => {
    const updatedSocialMedia = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    handleCheckboxChange(updatedSocialMedia);
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q1. What social media platforms do you use frequently? (You can mark several alternatives.)
      </Typography>
      <FormGroup sx={{ paddingLeft: "20px" }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedValues.includes(option)}
                onChange={() => handleChange(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </div>
  );
}

export default SocialMediaQuestion;
