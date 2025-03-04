import React, {useEffect } from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

function ValueRatingsQuestion({ selectedValues, handleRadioChange, setAllAnswered, currentPage }) {
  // Define values with IDs and texts
  const values = [
    { id: 'VR1', text: '1. Social power' },
    { id: 'VR2', text: '2. Equality' },
    { id: 'VR3', text: '3. Respecting the Earth' },
    { id: 'VR4', text: '4. Enjoying life' },
    { id: 'VR5', text: '5. Wealth' },
    { id: 'VR6', text: '6. A world at peace' },
    { id: 'VR7', text: '7. Unity with nature' },
    { id: 'VR8', text: '8. Authority' },
    { id: 'VR9', text: '9. Pleasure' },
    { id: 'VR10', text: '10. Social justice' },
    { id: 'VR11', text: '11. Protecting the environment' },
    { id: 'VR12', text: '12. Influence' },
    { id: 'VR13', text: '13. Be helpful' },
    { id: 'VR14', text: '14. Prevent pollution' },
    { id: 'VR15', text: '15. Ambitious' },
    { id: 'VR16', text: '16. Gratification for oneself' }
  ];
  
  const itemsPerPage = 2;
  const currentValues = values.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  

  // Check if all values have been answered
  useEffect(() => {
    const allAnswered = values.every((value) => selectedValues[value.id] !== undefined && selectedValues[value.id] !== '');
    setAllAnswered(allAnswered);
  }, [selectedValues, setAllAnswered]);


  return (
    <Box sx={{py: 2, px: 1, border: "1px solid #a0a0a0", borderRadius: 2, boxShadow: 3}}>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q6. Consider these 16 values as potential guiding principles in your life. For each value, please rate its importance to you, from 1 ('not at all important') to 7 ('extremely important').
      </Typography>

      {/* Header row for rating options */}
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

      {/* Map over currentValues to display each value's question and radio buttons */}
      {currentValues.map(({ id, text }, index) => (
        <Grid container spacing={0} alignItems="center" key={id} mt={1} sx={{ backgroundColor: index % 2 !== 0 ? '#d9d4d4' : '' }}>
          <Grid item xs={3}>
            <Typography id={`${id}-label`} variant="body1">{text}</Typography>
          </Grid>
          {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val) => (
            <Grid item xs={1} key={val}>
              <Box display="flex" justifyContent="center">
                <RadioGroup
                name={id}
                  value={selectedValues[id] || ''}
                  onChange={(e) => handleRadioChange('valueRatings', id, e.target.value)}
                >
                  <FormControlLabel
                    value={val.toString()}
                    control={<Radio />}
                    labelPlacement="top"
                    label=""
                    sx={{ margin: 0 }}
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
