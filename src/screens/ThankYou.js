import React, { useEffect } from "react"
import {Typography, Box } from "@mui/material"


function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Send a message to the parent window (PsychoJS) indicating the experiment is complete
      window.parent.postMessage({ type: "experiment_complete" }, "*")

      // Optional: Display an alert or any other final message
      alert("Experiment complete. Thank you!")
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Thank you for participating!
      </Typography>
    </>
  )
}

export default ThankYou
