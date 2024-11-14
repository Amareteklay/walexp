import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Tooltip,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

const FormContainer = styled(Box)({
  marginTop: "20px",
  textAlign: "left",
  display: "inline-block",
});

// Charity info for global, US, and UK
const charityInfo = {
  US: {
    UNEP: "The UN Environment Programme works on environmental issues around the globe.",
    WWF: "The World Wildlife Fund (WWF) works to conserve nature and reduce the most pressing threats to life on Earth.",
    NatureConservancy: "The Nature Conservancy works to protect land and water on a global scale.",
  },
  UK: {
    UNEP: "The UN Environment Programme works on environmental issues around the globe.",
    WWF: "WWF UK works to protect the environment and conserve nature.",
    TheWildlifeTrusts: "The Wildlife Trusts are dedicated to protecting wildlife and wild places across the UK.",
  },
};

function DonationForm({ onProceed }) {
  const { state, dispatch } = useData();
  const selectedCountry = state.selectedCountry;
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCharity, setSelectedCharity] = useState("");
  const [charityExplanation, setCharityExplanation] = useState("");
  const [currency, setCurrency] = useState("USD");

  // Update currency based on selected country
  useEffect(() => {
    if (selectedCountry === "US") {
      setCurrency("USD");
    } else if (selectedCountry === "UK") {
      setCurrency("GBP");
    } 
  }, [selectedCountry]);

  const handleDonationChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCharityChange = (event) => {
    setSelectedCharity(event.target.value);
  };

  const handleExplanationChange = (event) => {
    setCharityExplanation(event.target.value);
  };

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    dispatch({
      type: "SET_DATA",
      key: "donationFormSubmission",
      value: {
        selectedValue,
        selectedCharity,
        charityExplanation,
        submitTimestamp: currentTimestamp,
      },
    });

    onProceed("emotionsFinal");
  };

  const charities =
    selectedCountry === "US"
      ? charityInfo.US
      : charityInfo.UK;

  return (
    <>
      <Typography variant="body1" sx={{ mx: 8, mb: 2 }}>
        Please indicate how much of the 3 {currency} you would like to donate to an environmental charity, and choose the organization.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormContainer sx={{ marginLeft: 8 }}>
            <Typography variant="h6">Donation Amount</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedValue} onChange={handleDonationChange}>
                <FormControlLabel value="0" control={<Radio />} label={`0 ${currency}`} />
                <FormControlLabel value="0.3" control={<Radio />} label={`0.3 ${currency} (10%)`} />
                <FormControlLabel value="0.75" control={<Radio />} label={`0.75 ${currency} (25%)`} />
                <FormControlLabel value="1.5" control={<Radio />} label={`1.5 ${currency} (50%)`} />
                <FormControlLabel value="2.25" control={<Radio />} label={`2.25 ${currency} (75%)`} />
                <FormControlLabel value="2.7" control={<Radio />} label={`2.7 ${currency} (90%)`} />
                <FormControlLabel value="3" control={<Radio />} label={`3 ${currency} (100%)`} />
              </RadioGroup>
            </FormControl>
          </FormContainer>
        </Grid>

        <Grid item xs={6}>
          <FormContainer sx={{ marginLeft: 4 }}>
            <Typography variant="h6">Select Charity Organization</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedCharity} onChange={handleCharityChange}>
                {Object.entries(charities).map(([name, info]) => (
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
                            <InfoIcon fontSize="small" sx={{ color: "#5E5DF0" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Could you state why you made that decision?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              onChange={handleExplanationChange}
              value={charityExplanation}
            />
          </FormContainer>
        </Grid>
      </Grid>

      <Box mt={4}>
        <CustomButton
          text={"Submit"}
          onClick={handleContinue}
          disabled={!selectedValue || !selectedCharity}
        />
      </Box>
    </>
  );
}

export default DonationForm;
