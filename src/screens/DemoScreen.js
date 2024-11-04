import React, { useRef, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReplayIcon from "@mui/icons-material/Replay";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

function DemoScreen({ onProceed, emojiType }) {
  const videoRef = useRef(null);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const { dispatch } = useData();

  // Determines the appropriate video source based on the emojiType prop
  const getVideoSource = () => {
    const videoSources = {
      Facebook: "FacebookDemo.mp4",
      Generic: "GenericDemo.mp4",
    };
    return `${process.env.PUBLIC_URL}/videos/${videoSources[emojiType] || "GenericDemo.mp4"}`;
  };

  // Handler for when the user clicks the 'Continue' button
  const handleContinue = () => {
    const currentTimestamp = new Date().toISOString();

    // Save the timestamp when the Continue button is clicked
    dispatch({
      type: "SET_DATA",
      key: "demoScreenContinueTimestamp",
      value: currentTimestamp,
    });

    onProceed("practicePrompt");
  };

  // Handler for when the video ends
  const handleVideoEnd = () => {
    setShowReplayButton(true);
  };

  // Handler for replay button click
  const handleReplay = () => {
    if (videoRef.current) {
      const currentTimestamp = new Date().toISOString();
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowReplayButton(false);
      setReplayCount((prevCount) => prevCount + 1);

      // Save the replay click timestamp with a unique key for each replay count
      dispatch({
        type: "SET_DATA",
        key: `demoScreenReplayTimestamp_${replayCount + 1}`,
        value: currentTimestamp,
      });
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: 4, color: "#175676" }}
        gutterBottom
      >
        To help you understand the task, please watch the walkthrough video below.
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

      <Typography variant="h5" sx={{ fontWeight: "bold", padding: 2 }}>
        Click 'Continue' to proceed to the next screen.
      </Typography>
      <CustomButton
        text={"Continue"}
        onClick={handleContinue}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default DemoScreen;
