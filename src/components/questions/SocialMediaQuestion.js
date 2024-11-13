import React, { useEffect, useState } from "react";
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material";

function SocialMediaQuestion({ selectedValues = [], handleCheckboxChange, setNextEnabled }) {
  const [otherText, setOtherText] = useState("");

  const options = [
    "I am not on social media",
    "Instagram",
    "X (previously Twitter)",
    "Facebook",
    "TikTok",
    "Snapchat",
    "YouTube",
    "Other(s)",
  ];

  useEffect(() => {
    setNextEnabled(selectedValues.length > 0);
  }, [selectedValues, setNextEnabled]);

  // Disable other options if 'I am not on social media' is selected
  const isSocialMediaDisabled = selectedValues.includes("I am not on social media");

  const handleChange = (option) => {
    if (option === "I am not on social media") {
      // If 'I am not on social media' is selected, unselect everything else
      const updatedSocialMedia = isSocialMediaDisabled ? [] : [option];
      handleCheckboxChange(updatedSocialMedia);
    } else if (option === "Other(s)" && !isSocialMediaDisabled) {
      // Handle 'Other(s)' option text change
      if (selectedValues.includes(option)) {
        handleCheckboxChange(selectedValues.filter(value => value !== option));
      } else {
        handleCheckboxChange([...selectedValues, option]);
      }
    } else {
      const updatedSocialMedia = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];

      handleCheckboxChange(updatedSocialMedia);
    }
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
    if (!selectedValues.includes("Other(s)")) {
      handleChange("Other(s)");
    }
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
                disabled={isSocialMediaDisabled && option !== "I am not on social media"}
              />
            }
            label={option}
          />
        ))}
        {selectedValues.includes("Other(s)") && (
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

export default SocialMediaQuestion;
