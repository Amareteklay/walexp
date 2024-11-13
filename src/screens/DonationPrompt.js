import { Typography, Box, RadioGroup, Radio, FormControlLabel, FormControl } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";
import { useState, useEffect } from "react";

function DonationPrompt({ onProceed }) {
  const { dispatch, state } = useData();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currency, setCurrency] = useState("");

  // Handle country selection and set the currency based on the country
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    // Set the currency based on the country
    if (country === "US") {
      setCurrency("USD");
    } else if (country === "UK") {
      setCurrency("GBP");
    }
  };

  // Store the selected country in the context for further use
  useEffect(() => {
    if (selectedCountry) {
      dispatch({
        type: "SET_DATA",
        key: "selectedCountry",
        value: selectedCountry,
      });
    }
  }, [selectedCountry, dispatch]);

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Next button is clicked
    dispatch({
      type: "SET_DATA",
      key: "donationPromptNextTimestamp",
      value: {
        timestamp: currentTimestamp,
      },
    });

    onProceed("donationForm");
  };

  return (
    <>
      {!selectedCountry ? (
        // Country selection question
        <>
          <Typography variant="h5" sx={{fontWeight: "bold", my: 4}} gutterBottom>
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
          <Typography variant="h5" sx={{fontWeight: "bold", my: 4}} gutterBottom>
            You will receive an additional 3 {currency}.
          </Typography>
          <Typography variant="h6" sx={{ mx: 8, mb: 4 }} paragraph>
            You have the opportunity to donate some of this money to an
            environmental charity working to spread awareness and promote action to
            combat climate change.
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
