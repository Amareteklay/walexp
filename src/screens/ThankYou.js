import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useData } from "../contexts/DataContext";

function ThankYou() {
  // Get the complete state from the DataContext
  const { state } = useData();
console.log("State: ", state)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Send a message to the parent window (PsychoJS) indicating the experiment is complete
      // Include the entire data collected from the experiment
      window.parent.postMessage(
        {
          type: "experiment_complete",
          data: state,
        },
        "*" // Replace with your specific origin for security purposes
      );

      // Optional: Display an alert or any other final message
      // alert("Experiment complete. Thank you!");
    }, 9000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <>
      <Typography variant="h4" sx={{mb: 4}} gutterBottom>
        Thank you for participating!
      </Typography>
      <Typography variant="h6" sx={{mx: 8}} gutterBottom>
      We will donate the amount you specified on your behalf, without deducting it from your payment.
      </Typography>
      <Typography variant="h6" sx={{mx: 8}} gutterBottom>
     You'll now be redirected to Prolific, where you'll receive your full participation fee.
      </Typography>
    </>
  );
}

export default ThankYou;
