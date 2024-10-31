// ValueRatingsQuestion.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

function ValueRatingsQuestion({ selectedValues, handleRadioChange, setAllAnswered }) {
  const values = [
    '1. Social power',
    '2. Equality',
    '3. Respecting the Earth',
    '4. Enjoying life',
    '5. Wealth',
    '6. A world at peace',
    '7. Unity with nature',
    '8. Authority',
    '9. Pleasure',
    '10. Social justice',
    '11. Protecting the environment',
    '12. Influence',
    '13. Be helpful',
    '14. Prevent pollution',
    '15. Ambitious',
    '16. Gratification for oneself'
  ];
  
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(values.length / itemsPerPage);

  // Check if all values have been answered
  useEffect(() => {
    const allAnswered = Object.values(selectedValues).filter(Boolean).length === values.length;
    setAllAnswered(allAnswered); // Use setAllAnswered instead of setAllValuesAnswered
  }, [selectedValues, setAllAnswered]);

  // Helper to get values for the current page
  const currentValues = values.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q6. See these 16 values as potential guiding principles in your life. For each, please rate its importance on a 7-point scale, where 1 is "not at all important" and 7 is "extremely important."
      </Typography>
      <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: '#d9d4d4' }}>
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
      {currentValues.map((value, index) => (
        <Grid container spacing={0} alignItems="center" key={value} mt={1} sx={{  backgroundColor: index % 2 !== 0 ? '#d9d4d4' : '' }}>
          <Grid item xs={3}>
            <Typography variant="subtitle1">{value}</Typography>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val) => (
            <Grid item xs={1} key={val}>
              <Box display="flex" justifyContent="center">
                <RadioGroup
                  value={selectedValues[value] || ''}
                  onChange={(e) => handleRadioChange(value, e.target.value)}
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

      {/* Pagination Controls */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default ValueRatingsQuestion;
