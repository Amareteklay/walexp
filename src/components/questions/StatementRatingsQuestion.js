import React from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleRadioChange }) {
  // Extract the questions into a configuration to simplify iteration and maintainability
  const statements = [
    {
      id: 'equalitySocialJustice',
      text: "1. People should always strive for equality and social justice.",
    },
    {
      id: 'strongGovernment',
      text: "2. It is important for the government to be strong and make decisions quickly.",
    },
    {
      id: 'freeMarkets',
      text: "3. Free markets are the best way to ensure economic growth.",
    },
    {
      id: 'protectEnvironment',
      text: "4. We should do more to protect the environment even if it limits our freedom.",
    },
  ];

  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q7. How much do you agree with the following statements on a scale of 1 to 7?
      </Typography>
      <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: "#f7f7f7" }}>
        <Grid item xs={5}></Grid>
        {[1, 2, 3, 4, 5, 6, 7].map((val) => (
          <Grid item xs={1} key={val}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle2" align="center">
                {val}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {statements.map(({ id, text }) => (
        <Grid container spacing={0} alignItems="center" key={id} mt={1}>
          <Grid item xs={5}>
            <Typography variant="subtitle1">{text}</Typography>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7].map((val) => (
            <Grid item xs={1} key={val}>
              <Box display="flex" justifyContent="center">
                <RadioGroup
                  value={selectedValues[id] || ''}
                  onChange={(e) => handleRadioChange("statementRatings", id, e.target.value)}
                >
                  <FormControlLabel
                    value={val.toString()}
                    control={<Radio />}
                    labelPlacement="top"
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

export default StatementRatingsQuestion;
