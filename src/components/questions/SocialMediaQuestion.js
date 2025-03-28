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

  // Determine if "I am not on social media" is selected
  const isNotOnSocialMedia = selectedValues.includes("I am not on social media");

  const handleChange = (option) => {
    if (option === "I am not on social media") {
      // If this option is selected, unselect all others.
      const updated = isNotOnSocialMedia ? [] : [option];
      handleCheckboxChange(updated);
    } else if (option === "Other(s)") {
      // Toggle the selection for "Other(s)" if no text has been entered yet.
      const hasOther =
        selectedValues.some(val => val === "Other(s)") ||
        selectedValues.some(val => val.startsWith("Other(s):"));
      if (hasOther) {
        // Remove any "Other(s)" entry.
        const updated = selectedValues.filter(val => !(val === "Other(s)" || val.startsWith("Other(s):")));
        handleCheckboxChange(updated);
        setOtherText("");
      } else {
        handleCheckboxChange([...selectedValues, option]);
      }
    } else {
      const updated = selectedValues.includes(option)
        ? selectedValues.filter(value => value !== option)
        : [...selectedValues, option];
      handleCheckboxChange(updated);
    }
  };

  const handleOtherTextChange = (event) => {
    const newText = event.target.value;
    setOtherText(newText);
    // Remove any previous "Other(s)" entries.
    let updated = selectedValues.filter(val => !(val === "Other(s)" || val.startsWith("Other(s):")));
    // Append the updated "Other(s)" text.
    if (newText.trim() !== "") {
      updated.push(`Other(s): ${newText}`);
    } else {
      // If the text field is empty, you might still want to mark the option as selected.
      updated.push("Other(s)");
    }
    handleCheckboxChange(updated);
  };

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="body1">
        Q1. What social media platforms do you use frequently? (You can mark several alternatives.)
      </Typography>
      <FormGroup sx={{ paddingLeft: "20px" }}>
        {options.map(option => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={
                  option === "Other(s)"
                    ? selectedValues.some(val => val === "Other(s)" || val.startsWith("Other(s):"))
                    : selectedValues.includes(option)
                }
                onChange={() => handleChange(option)}
                disabled={isNotOnSocialMedia && option !== "I am not on social media"}
              />
            }
            label={option}
          />
        ))}
        {selectedValues.some(val => val === "Other(s)" || val.startsWith("Other(s):")) && (
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
