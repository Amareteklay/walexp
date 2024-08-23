import React from "react"
import { Button, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

function Welcome({ onStart }) {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Welcome!
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 4 }}
        gutterBottom
      >
        You will be asked to complete a series of tasks. For each task you will
        see instructions to guide you.
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
        Please read the instructions carefully.
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 4, marginBottom: 12 }}
        gutterBottom
      >
        When you're ready, click 'Continue'.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onStart("audioCheck")}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        Continue <ArrowForwardIcon />
      </Button>
    </>
  )
}

export default Welcome
