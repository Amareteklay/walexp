import React, { useState } from "react"
import {
  Container,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material"
import { styled } from "@mui/system"

const DonationContainer = styled(Container)({
  textAlign: "center",
  marginTop: "30px",
})

const FormContainer = styled(Box)({
  marginTop: "20px",
  textAlign: "left",
  display: "inline-block",
})

function DonationForm({ onProceed }) {
  const [selectedValue, setSelectedValue] = useState("")

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleContinue = () => {
    onProceed("survey");
  };

  return (
    <DonationContainer>
      <Typography variant="body1" paragraph>
        Please indicate how much you would like to donate.
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={!selectedValue} // Disable button until a selection is made
        >
          Submit
        </Button>
      </Box>
    </DonationContainer>
  )
}

export default DonationForm
