import React from 'react';
import { Box, Grid, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

function PoliticalScaleQuestion({ selectedValue, handleRadioChange, isUS }) {
  const questionText = isUS
    ? "Where would you place yourself politically on a liberal-to-conservative scale?"
    : "Where would you place yourself politically on a left-to-right scale?";
  const scaleDescription = isUS
    ? "(1: Very leaning towards liberal, 7: Very leaning towards conservative)"
    : "(1: Very leaning towards left, 7: Very leaning towards right)";

  return (
    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9', mb: 3 }}>
      
      {/* Statement Row */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Q5. {questionText}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            {scaleDescription}
          </Typography>
        </Grid>
      </Grid>

      {/* Header Row for Scale Options */}
      <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: '#d9d4d4', mt: 2, py: 1 }}>
        <Grid item xs={3}></Grid>
        {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val) => (
          <Grid item xs={1} key={val}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle2" align="center">
                {val}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Radio Buttons Row */}
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={3}></Grid>
        {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val) => (
          <Grid item xs={1} key={val}>
            <Box display="flex" justifyContent="center">
              <RadioGroup
                value={selectedValue}
                onChange={(e) => handleRadioChange(e.target.value)}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <FormControlLabel
                  value={val.toString()}
                  control={<Radio />}
                  label=""
                  sx={{ margin: 0 }}
                />
              </RadioGroup>
            </Box>
          </Grid>
        ))}
      </Grid>
      
    </Box>
  );
}

export default PoliticalScaleQuestion;