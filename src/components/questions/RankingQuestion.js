import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, MenuItem, Select, TextField } from '@mui/material';

function RankingQuestion({ selectedRanks, handleRankChange, notifyCompletion }) {
  const factors = [
    "Covid-19 pandemic",
    "Immigration",
    "Geopolitical conflicts",
    "Global economic turmoil",
    "Climate change",
  ];

  const [shuffledFactors, setShuffledFactors] = useState([]);

  useEffect(() => {
    const shuffled = [...factors].sort(() => Math.random() - 0.5);
    setShuffledFactors(shuffled);
  }, []);

  const rankOptions = Array.from({ length: factors.length }, (_, i) => i + 1);

  useEffect(() => {
    // Check if every factor has been ranked (all selected ranks are filled)
    const allRanked = shuffledFactors.every(factor => selectedRanks[factor] !== undefined && selectedRanks[factor] !== "");
    notifyCompletion(allRanked); // Notify parent about the completion status
  }, [selectedRanks, shuffledFactors, notifyCompletion]);

  return (
    <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9', mb: 3 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
        Rank the following factors in the order in which they have most changed the way you look at your future.
      </Typography>
      <Typography variant="caption" sx={{ color: '#666', mb: 2, display: 'block' }}>
        (1 = Most impact, {factors.length} = Least impact)
      </Typography>
      
      <Grid container spacing={2}>
        {shuffledFactors.map((factor, index) => (
          <Grid container item xs={12} spacing={2} key={factor} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="subtitle1">{factor}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                value={selectedRanks[factor] || ""}
                onChange={(e) => handleRankChange(factor, e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Rank</MenuItem>
                {rankOptions.map((rank) => (
                  <MenuItem
                    key={rank}
                    value={rank}
                    disabled={Object.values(selectedRanks).includes(rank)}
                  >
                    {rank}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {factor === "Other, specify" && (
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  placeholder="Specify other factor"
                  variant="outlined"
                  onChange={(e) => handleRankChange("Other - Specify", e.target.value)}
                />
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RankingQuestion;