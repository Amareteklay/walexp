import React, { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Tooltip,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info"; // Info icon for tooltips
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

// Styled container for the form
const FormContainer = styled(Box)({
  marginTop: "20px",
  textAlign: "left",
  display: "inline-block",
});

// Mission statements for the tooltips
const charityInfo = {
  Greenpeace: "Greenpeace aims to ensure the ability of the Earth to nurture life in all its diversity through environmental activism.",
  WWF: "The World Wildlife Fund (WWF) works to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
  NatureConservancy: "The Nature Conservancy is a global environmental nonprofit working to create a world where people and nature can thrive.",
};

function DonationForm({ onProceed }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCharity, setSelectedCharity] = useState("");
  const { dispatch } = useData();

  const handleDonationChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCharityChange = (event) => {
    setSelectedCharity(event.target.value);
  };

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the selected donation value, selected charity, and timestamp to the centralized state
    dispatch({
      type: "SET_DATA",
      key: "donationFormSubmission",
      value: {
        selectedValue,
        selectedCharity,
        timestamp: currentTimestamp,
      },
    });

    // Proceed to the next part of the experiment
    onProceed("surveyPrompt");
  };

  return (
    <>
      <Typography variant="body1" sx={{ mx: 8, mb: 2 }}>
        Please indicate how much of the 3 Euros/Dollars you would like to donate to an environmental charity, and choose the organization.
      </Typography>

      <Grid container spacing={2}>
        {/* Donation Amount Selection Column */}
        <Grid item xs={6}>
          <FormContainer sx={{marginLeft: 8}}>
            <Typography variant="h6">Donation Amount</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedValue} onChange={handleDonationChange}>
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="0 Euro/Dollar"
                />
                <FormControlLabel
                  value="0.3"
                  control={<Radio />}
                  label="0.3 Euro/Dollar (10%)"
                />
                <FormControlLabel
                  value="0.75"
                  control={<Radio />}
                  label="0.75 Euro/Dollar (25%)"
                />
                <FormControlLabel
                  value="1.5"
                  control={<Radio />}
                  label="1.5 Euro/Dollar (50%)"
                />
                <FormControlLabel
                  value="2.25"
                  control={<Radio />}
                  label="2.25 Euro/Dollar (75%)"
                />
                <FormControlLabel
                  value="2.7"
                  control={<Radio />}
                  label="2.7 Euro/Dollar (90%)"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="3 Euro/Dollar (100%)"
                />
              </RadioGroup>
            </FormControl>
          </FormContainer>
        </Grid>

        {/* Charity Selection Column */}
        <Grid item xs={6}>
          <FormContainer sx={{marginLeft: 4}}>
            <Typography variant="h6">Select Charity Organization</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedCharity} onChange={handleCharityChange}>
                {Object.entries(charityInfo).map(([name, info]) => (
                  <FormControlLabel
                    key={name}
                    value={name}
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ marginRight: 1 }}>
                          {name}
                        </Typography>
                        <Tooltip title={info} arrow>
                          <IconButton size="small">
                            <InfoIcon fontSize="small" sx={{color: "#5E5DF0"}}/>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormContainer>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box mt={4}>
        <CustomButton
          text={"Submit"}
          onClick={handleContinue}
          disabled={!selectedValue || !selectedCharity} // Require both selections
        />
      </Box>
    </>
  );
}

export default DonationForm;
