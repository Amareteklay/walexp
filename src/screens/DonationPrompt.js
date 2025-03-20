import { Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";
import { useState, useEffect } from "react";

function DonationPrompt({ onProceed }) {
  const { dispatch } = useData();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currency, setCurrency] = useState("");

  // Handle country selection and set the currency based on the country
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    // Set the currency based on the country
    if (country === "US") {
      setCurrency("$");
    } else if (country === "UK") {
      setCurrency("£");
    }
  };

  // When selectedCountry changes, dispatch both the country and a timestamp for when it was selected
  useEffect(() => {
    if (selectedCountry) {
      const countryAction = {
        type: "SET_DATA",
        key: "selectedCountry",
        value: selectedCountry,
      };
      const timestampAction = {
        type: "SET_DATA",
        key: "selectedCountryAt",
        value: new Date().toISOString(),
      };
      dispatch(countryAction);
      dispatch(timestampAction);
    }
  }, [selectedCountry, dispatch]);

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Next button is clicked using a flat structure
    const action = {
      type: "SET_DATA",
      key: "donationPromptNextAt",
      value: currentTimestamp,
    };
    dispatch(action);

    if (onProceed) {
      onProceed("donationForm");
    } else {
      console.error("onProceed is not defined.");
    }
  };

  return (
    <>
      {!selectedCountry ? (
        // Country selection question
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 4 }} gutterBottom>
            What is your country?
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="country"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <FormControlLabel value="US" control={<Radio />} label="United States (US)" />
              <FormControlLabel value="UK" control={<Radio />} label="United Kingdom (UK)" />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        // Donation prompt with selected currency
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", my: 4 }} gutterBottom>
            Your participation fee includes an extra {currency}3.
          </Typography>
          <Typography variant="h6" sx={{ mx: 8, mb: 4 }} paragraph>
            You have the opportunity to donate a portion of this amount to an environmental charity supporting climate action.
          </Typography>
          <Box mt={4}>
            <CustomButton
              text={"Next"}
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon />}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default DonationPrompt;
