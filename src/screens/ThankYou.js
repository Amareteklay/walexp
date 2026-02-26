import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useData } from "../contexts/DataContext";

function ThankYou() {
  const { state } = useData();
  useEffect(() => {
    const timer = setTimeout(() => {
      window.parent.postMessage(
        {
          type: "experiment_complete",
          data: state,
        },
        "*" // Replace with your specific origin for security purposes
      );

    }, 9000);

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