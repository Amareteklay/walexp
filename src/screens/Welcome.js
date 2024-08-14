import React from "react"
import { Button, Typography } from "@mui/material"

function Welcome({ onStart }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome!
      </Typography>
      <Typography gutterBottom>
        You will be asked to complete a series of tasks. For each task you will
        see instructions to guide you.
      </Typography>
      <Typography gutterBottom>
        Please read the instructions carefully.
      </Typography>
      <Typography gutterBottom>When you're ready, click 'Continue'.</Typography>
      <Button variant="contained" color="primary" onClick={() => onStart("audioCheck")}>
        Continue
      </Button>
    </>
  )
}

export default Welcome
