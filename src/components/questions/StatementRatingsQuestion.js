import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

function StatementRatingsQuestion({ selectedValues, handleRadioChange, setAllAnswered }) {
  const statements = [
    { id: 'stmt1', text: "1. Acting environmentally friendly is an important part of who I am." },
    { id: 'stmt2', text: "2. I am the type of person who acts environmentally friendly." },
    { id: 'stmt3', text: "3. I see myself as an environmentally friendly person." },
    { id: 'stmt4', text: "4. I am worried about the consequences of climate change. I think they can have drastic negative effects on our ways of life in the future." },
    { id: 'stmt5', text: "5. I am worried about geopolitical conflicts. I think they can have drastic negative effects on our ways of life in the future." },
    { id: 'stmt6', text: "6. I am worried about increased migration. I think migration can have drastic negative effects on our ways of life in the future." },
    { id: 'stmt7', text: "7. I am worried about global pandemics like the Covid-19 pandemic. I think they can have drastic negative effects on our ways of life in the future." },
    { id: 'stmt8', text: "8. I am worried about global economic turmoil. I think it can have drastic negative effects on our ways of life in the future." }
  ];

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(statements.length / itemsPerPage);

  useEffect(() => {
    const allAnswered = Object.values(selectedValues).filter(Boolean).length === statements.length;
    setAllAnswered(allAnswered);
  }, [selectedValues, setAllAnswered]);

  const currentStatements = statements.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Box>
      <Typography sx={{ mb: 2 }} variant="body1">
        Q7. To what degree do you agree with the following statements? Indicate on a scale from 1 completely
        disagree, to 7 completely agree, or select "Don't know" or "Prefer not to say".
      </Typography>
      
      {/* Loop through each statement */}
      {currentStatements.map(({ id, text }, index) => (
        <Box key={id} mb={2} sx={{ padding: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}>
          {/* Statement Row */}
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>{text}</Typography>
            </Grid>
          </Grid>

          {/* Header Row for Rating Options */}
          <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: '#d9d4d4', mb: 1 }}>
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

          {/* Row for Radio Buttons */}
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={3}></Grid>
            {[1, 2, 3, 4, 5, 6, 7, "Don't know", "Prefer not to say"].map((val) => (
              <Grid item xs={1} key={val}>
                <Box display="flex" justifyContent="center">
                  <RadioGroup
                    value={selectedValues[id] || ''}
                    onChange={(e) => handleRadioChange(id, e.target.value)}
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

export default StatementRatingsQuestion;
