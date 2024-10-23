import React, { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

const FormContainer = styled(Box)({
  marginTop: "20px",
  textAlign: "left",
  display: "inline-block",
});

function DonationForm({ onProceed }) {
  const [selectedValue, setSelectedValue] = useState("");
  const { dispatch } = useData();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the selected donation value and timestamp to the centralized state
    dispatch({
      type: "SET_DATA",
      key: "donationFormSubmission",
      value: {
        selectedValue,
        timestamp: currentTimestamp,
      },
    });

    // Proceed to the next part of the experiment
    onProceed("surveyPrompt");
  };

  return (
    <>
      <Typography variant="body1" sx={{ mx: 8 }}>
        Please indicate how much of the 10 Euros/Dollars you would like to donate to an environmental charity.
      </Typography>
      <FormContainer>
        <FormControl component="fieldset">
          <RadioGroup value={selectedValue} onChange={handleChange}>
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="0 Euro/Dollar"
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1 Euro/Dollar (10%)"
            />
            <FormControlLabel
              value="2.5"
              control={<Radio />}
              label="2.5 Euro/Dollar (25%)"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="5 Euro/Dollar (50%)"
            />
            <FormControlLabel
              value="7.5"
              control={<Radio />}
              label="7.5 Euro/Dollar (75%)"
            />
            <FormControlLabel
              value="9"
              control={<Radio />}
              label="9 Euro/Dollar (90%)"
            />
            <FormControlLabel
              value="10"
              control={<Radio />}
              label="10 Euro/Dollar (100%)"
            />
          </RadioGroup>
        </FormControl>
      </FormContainer>
      <Box mt={4}>
        <CustomButton
          text={"Submit"}
          onClick={handleContinue}
          disabled={!selectedValue} // Disable button until a selection is made
        />
      </Box>
    </>
  );
}

export default DonationForm;
