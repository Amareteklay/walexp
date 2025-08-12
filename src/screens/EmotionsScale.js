import React, { useState } from "react";
import { Typography, Slider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";

/**
 * Props:
 *  - onProceed(nextScreen)
 *  - nextScreen (string)
 *  - emotionId (number or string)
 *  - saveEmotionResponse(entry: { emotionId, emotionStartAt, emotionSelectedAt, emotionValue, emotionEndAt })
 */
export default function EmotionsScale({
  onProceed,
  nextScreen,
  emotionId,
  saveEmotionResponse,
}) {
  const [value, setValue] = useState(null);
  const [startAt, setStartAt] = useState(null);
  const [selectedAt, setSelectedAt] = useState(null);

  const marks = [
    { value: -2, label: "Very Negative" },
    { value: -1.5, label: "" },
    { value: -1, label: "Negative" },
    { value: -0.5, label: "" },
    { value: 0, label: "Neutral" },
    { value: 0.5, label: "" },
    { value: 1, label: "Positive" },
    { value: 1.5, label: "" },
    { value: 2, label: "Very Positive" },
  ];

  const handleChange = (_evt, newVal) => {
    if (startAt === null) {
      setStartAt(new Date().toISOString());
    }
    setValue(newVal);
  };

  const handleRelease = () => {
    // user has let go of the thumb
    if (value !== null) {
      setSelectedAt(new Date().toISOString());
    }
  };

  const handleConfirm = () => {
    if (value === null) return;
    const endAt = new Date().toISOString();

    // bundle up everything
    const entry = {
      emotionId,
      emotionStartAt: startAt,
      emotionSelectedAt: selectedAt,
      emotionValue: value,
      emotionEndAt: endAt,
    };

    // hand back to ScreenManager only
    saveEmotionResponse(entry);

    // navigate
    onProceed?.(nextScreen);
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        How are you feeling right now?
      </Typography>
      <Typography variant="h5" sx={{ mb: 6 }}>
        Think about how you're feeling at this moment.
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleRelease}
        step={0.01}
        marks={marks}
        min={-2}
        max={2}
        valueLabelDisplay="auto"
        aria-labelledby="emotion-scale-slider"
        sx={{
          width: "80%",
          mb: 8,
          "& .MuiSlider-thumb": {
            display: value === null ? "none" : "block",
          },
        }}
      />

      <CustomButton
        text="Continue"
        onClick={handleConfirm}
        disabled={value === null}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}
