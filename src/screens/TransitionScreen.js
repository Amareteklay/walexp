import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function TransitionScreen({ onProceed }) {
  const { dispatch } = useData();
  const [rememberVideo, setRememberVideo] = useState("");
  const [captureDetail, setCaptureDetail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Enable the Continue button after a 5-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Build an array of flat dispatch actions
    const actions = [
      {
        type: "SET_DATA",
        key: "transitionContinueAt",
        value: currentTimestamp,
      },
      {
        type: "SET_DATA",
        key: "rememberVideo",
        value: rememberVideo,
      },
    ];

    // If the participant remembers, add the additional detail
    if (rememberVideo === "yes" && captureDetail.trim() !== "") {
      actions.push({
        type: "SET_DATA",
        key: "rememberVideoDetail",
        value: captureDetail,
      });
    }

    // Dispatch each action
    actions.forEach(action => {
      dispatch(action);
    });

    // Proceed to the next screen
    if (onProceed) {
      onProceed("emotionsOne");
    } else {
      console.error("onProceed function is not defined");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Practice Round Complete
      </Typography>
      <Typography variant="h6" sx={{ mx: 8, mt: 2 }}>
        Great job! You've completed the practice round. You're now ready to start the experiment.
      </Typography>
      <Typography variant="h6" sx={{ mx: 8, mt: 2 }}>
        Before proceeding, please answer the following question:
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", mx: 8, mt: 1 }}>
        Do you remember in what year the previous video was captured?
      </Typography>
      <Box sx={{ mx: 8, mt: 2 }}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="rememberVideo"
            value={rememberVideo}
            onChange={(e) => setRememberVideo(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      {rememberVideo === "yes" && (
        <Box sx={{ mx: 8, mt: 2 }}>
          <TextField
            fullWidth
            label="Please type the year:"
            variant="outlined"
            value={captureDetail}
            onChange={(e) => setCaptureDetail(e.target.value)}
          />
        </Box>
      )}
      <Typography variant="h6" sx={{ mx: 4, mt: 4, mb: 4 }}>
        Click 'Continue' to proceed.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
        disabled={!isButtonEnabled}
      />
    </>
  );
}

export default TransitionScreen;
