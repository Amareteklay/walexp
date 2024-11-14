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
  const [otherFactor, setOtherFactor] = useState("");

  useEffect(() => {
    const shuffled = [...factors].sort(() => Math.random() - 0.5);
    setShuffledFactors(shuffled);
  }, []);

  const rankOptions = Array.from({ length: factors.length }, (_, i) => i + 1);

  useEffect(() => {
    const allRanked = shuffledFactors.every(factor => selectedRanks[factor] !== undefined && selectedRanks[factor] !== "");
    notifyCompletion(allRanked && (otherFactor.trim() !== ""));
  }, [selectedRanks, shuffledFactors, notifyCompletion, otherFactor]);

  const handleOtherChange = (e) => {
    setOtherFactor(e.target.value);
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
        Rank the following factors in the order in which they have most changed the way you look at your future.
        (1 = Most impact, {factors.length} = Least impact)
      </Typography>
      
      <Grid container spacing={1}>
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
          </Grid>
        ))}
        <Grid item xs={12} sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
  <Grid item xs={3}>
    <Typography variant="subtitle1">Other, specify:</Typography>
  </Grid>
  <Grid item xs={9}>
    <TextField
      fullWidth
      placeholder="Specify other factor"
      variant="outlined"
      value={otherFactor}
      onChange={handleOtherChange}
    />
  </Grid>
</Grid>
      </Grid>
    </Box>
  );
}

export default RankingQuestion;
