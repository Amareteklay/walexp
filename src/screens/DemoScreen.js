import React, { useRef, useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReplayIcon from "@mui/icons-material/Replay";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function DemoScreen({ onProceed, emojiType }) {
  const videoRef = useRef(null);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [replayTimestamps, setReplayTimestamps] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { dispatch } = useData();

  // Determines the appropriate video source based on the emojiType prop
  const getVideoSource = () => {
    const videoSources = {
      Facebook: "Demo_fb.mp4",
      Generic: "Demo_gen.mp4",
    };
    return `${process.env.PUBLIC_URL}/videos/${videoSources[emojiType] || "Demo_gen.mp4"}`;
  };

  // Set up a delay of 10 seconds on mount before enabling the Continue button
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  // Handler for when the user clicks the 'Continue' button
  const handleContinue = () => {
    if (!isButtonEnabled) return; // Prevent early clicks

    const currentTimestamp = new Date().toISOString();

    // Dispatch each data point separately in a flat structure
    const actions = [
      {
        type: "SET_DATA",
        key: "demoContinueAt",
        value: currentTimestamp,
      },
      {
        type: "SET_DATA",
        key: "demoReplayAt",
        value: replayTimestamps.join(", "),
      },
      {
        type: "SET_DATA",
        key: "demoReplayCount",
        value: replayCount,
      },
    ];

    actions.forEach(action => dispatch(action));
    onProceed("practicePrompt");
  };

  // Handler for when the video ends
  const handleVideoEnd = () => {
    setShowReplayButton(true);
  };

  // Handler for replay button click
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowReplayButton(false);
      setReplayCount(prevCount => prevCount + 1);
      const currentTimestamp = new Date().toISOString();
      setReplayTimestamps(prevTimestamps => [...prevTimestamps, currentTimestamp]);
    }
  };

  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", px: 8, color: "#175676" }}
        gutterBottom
      >
        Please watch the walkthrough video below to understand how to interact with the platform.
      </Typography>

      <div style={{ position: "relative", width: "100%", height: "60%" }}>
        <video
          ref={videoRef}
          id="video"
          width="100%"
          height="100%"
          autoPlay
          preload="auto"
          onEnded={handleVideoEnd}
        >
          <source src={getVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {showReplayButton && (
          <IconButton
            onClick={handleReplay}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#CED3DC",
              '&:hover::after': {
                content: '"Watch again"',
                position: "absolute",
                top: "75%",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#CED3DC",
                backgroundColor: "#175676",
                fontSize: "12px",
                whiteSpace: "nowrap",
              },
            }}
          >
            <ReplayIcon sx={{ fontSize: 60, color: "#175676", backgroundColor: "#CED3DC", borderRadius: "50%" }} />
          </IconButton>
        )}
      </div>

      <Typography variant="h6" sx={{ fontWeight: "bold", padding: 2 }}>
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

export default DemoScreen;
