import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";

function AudioCheck({ onProceed }) {
  const [selectedOption, setSelectedOption] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to play the video for audio only and handle potential errors
    const playAudioOnly = async () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        try {
          await videoElement.play();
          console.log("Audio playback started");
        } catch (error) {
          console.error("Autoplay was prevented or another error occurred:", error);
        }
      }
    };

    // Delay to ensure video is fully rendered
    const timeoutId = setTimeout(playAudioOnly, 100);

    return () => clearTimeout(timeoutId); // Clean up timeout on component unmount
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleContinue = () => {
    if (selectedOption === "birds") {
      window.parent.postMessage(
        {
          type: "audio_check",
          buttonName: "birds",
          timestamp: Date.now(),
        },
        "*"
      );
      onProceed("feedback");
    } else {
      alert("Please check your audio system and try again.");
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
        src={`${process.env.PUBLIC_URL}/videos/birds.mp4`}    type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
      
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", padding: 2 }}
        gutterBottom
      >
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

      {/* Button to show video if needed */}
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
