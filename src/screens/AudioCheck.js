import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function AudioCheck({ onProceed }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const videoRef = useRef(null);
  const { dispatch } = useData();

  // Using useCallback to memoize the function and avoid unnecessary re-renders
  const playAudioOnly = useCallback(async () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      try {
        await videoElement.play();
      } catch (error) {
        console.error("Autoplay was prevented or another error occurred:", error);
        setErrorMessage("There was an issue with the audio playback.");
      }
    }
  }, []);

  useEffect(() => {
    // Delay to ensure video is fully rendered and ready to play
    const timeoutId = setTimeout(playAudioOnly, 100);
    return () => clearTimeout(timeoutId);
  }, [playAudioOnly]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setErrorMessage(""); // Clear error message when the user interacts
  };

  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();
    const newAttempts = attempts + 1;

    // Increment the number of attempts
    setAttempts(newAttempts);

    // Dispatch each piece of data separately in a flat structure
    const actions = [
      {
        type: "SET_DATA",
        key: `attempt${newAttempts}`,
        value: selectedOption,
      },
      {
        type: "SET_DATA",
        key: `attempt${newAttempts}_at`,
        value: currentTimestamp,
      },
    ];

    // Dispatch each action separately
    actions.forEach(action => dispatch(action));

    // Only proceed if the correct option is selected
    if (selectedOption === "birds") {
      onProceed("feedback");
    } else {
      setErrorMessage("Please check your audio system and try again.");
    }
  };

  return (
    <>
      {/* Video element for background audio */}
      <video
        ref={videoRef}
        style={{ display: "none" }}
        autoPlay
        loop
        preload="auto"
        src={`${process.env.PUBLIC_URL}/videos/birds.mp4`}
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>

      <Typography variant="h5" sx={{ fontWeight: "bold", padding: 2 }} gutterBottom>
        Check audio system
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 4 }}>
        This task is to check that your audio system is working.
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", padding: 2 }}>
        What kind of sound do you hear?
      </Typography>
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ marginBottom: 2 }}
      >
        <FormControlLabel value="birds" control={<Radio />} label="Birds" />
        <FormControlLabel value="train" control={<Radio />} label="Train" />
        <FormControlLabel value="waves" control={<Radio />} label="Waves" />
      </RadioGroup>

      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Button to proceed */}
      <Box mt={2}>
        <CustomButton
          text={"Continue"}
          onClick={handleContinue}
          disabled={!selectedOption}
          endIcon={<ArrowForwardIcon />}
        />
      </Box>
    </>
  );
}

export default AudioCheck;
