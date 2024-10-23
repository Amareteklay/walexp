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
      alert("Experiment complete. Thank you!");
    }, 5000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Thank you for participating!
      </Typography>
    </>
  );
}

export default ThankYou;
