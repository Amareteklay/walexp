import React from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function ValueRatingsQuestion({ selectedValues, handleRadioChange }) {
  const values = [
    "1. Living in secure surroundings",
    "2. Being successful and influencing others",
    "3. Freedom of choice and opportunities",
    "4. Being loyal to friends and family",
    "5. Protecting the environment",
  ];

  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q6. How important are the following values to you on a scale of 1 to 7?
      </Typography>
      <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: "#f7f7f7" }}>
        <Grid item xs={3}></Grid>
        {[1, 2, 3, 4, 5, 6, 7].map((val, index) => (
          <Grid item xs={1} key={val}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle2" align="center">
                {val}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {values.map((value, rowIndex) => (
        <Grid container spacing={0} alignItems="center" key={value} mt={1}>
          <Grid item xs={3}>
            <Typography variant="subtitle1">{value}</Typography>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7].map((val, index) => (
            <Grid item xs={1} key={val}>
              <Box display="flex" justifyContent="center">
                <RadioGroup
                  value={selectedValues[value] || ""}
                  onChange={(e) => handleRadioChange("valueRatings", value, e.target.value)}
                >
                  <FormControlLabel
                    value={val.toString()}
                    control={<Radio />}
                    labelPlacement='top'
                    label=""
                  />
                </RadioGroup>
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
}

export default ValueRatingsQuestion;
