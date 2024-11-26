import React, { useEffect } from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleRadioChange, setAllAnswered, currentPage }) {
  const statements = [
    { id: 'stmt1', text: "1. Acting environmentally friendly is an important part of who I am." },
    { id: 'stmt2', text: "2. I am the type of person who acts environmentally friendly." },
    { id: 'stmt3', text: "3. I see myself as an environmentally friendly person." },
    { id: 'stmt4', text: "4. I am worried about the consequences of climate change." },
    { id: 'stmt5', text: "5. I am worried about geopolitical conflicts." },
    { id: 'stmt6', text: "6. I am worried about increased migration." },
    { id: 'stmt7', text: "7. I am worried about global pandemics like the Covid-19 pandemic." },
    { id: 'stmt8', text: "8. I am worried about global economic turmoil." },
  ];

  const itemsPerPage = 1;
  const currentStatements = statements.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  
  useEffect(() => {
    const allAnswered = currentStatements.every((statement) => selectedValues[statement.id] !== undefined && selectedValues[statement.id] !== '');
    setAllAnswered(allAnswered);
  }, [selectedValues, setAllAnswered, currentStatements]);

  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant="body1">
        Q7. To what degree do you agree with the following statements? Indicate on a scale from 1 = completely
        disagree, to 7 = completely agree.
      </Typography>

      {currentStatements.map(({ id, text }, index) => (
        <Box key={id} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{text}</Typography>

          {/* Header row for rating options displayed right below each statement */}
          <Grid container spacing={1} alignItems="center" sx={{ backgroundColor: '#d9d4d4' }}>
            {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val, i) => (
              <Grid item xs={i < 7 ? 1 : 2.5} key={i}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="subtitle2" align="center">{val}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Radio buttons for the current statement */}
          <Grid container spacing={1} alignItems="center">
            {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val, i) => (
              <Grid item xs={i < 7 ? 1 : 2.5}  key={i}>
                <RadioGroup
                  row
                  name={id}
                  value={selectedValues[id] || ''}
                  onChange={(e) => handleRadioChange('statementRatings', id, e.target.value)}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    value={val.toString()}
                    control={<Radio />}
                    labelPlacement="top"
                    label=""
                    sx={{ margin: 0 }}
                  />
                </RadioGroup>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default StatementRatingsQuestion;
