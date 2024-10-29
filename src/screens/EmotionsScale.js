import React, { useState } from "react";
import { Typography, Slider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "../components/CustomButton";
import { useData } from "../contexts/DataContext";

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

function EmotionsScale({ onProceed, nextScreen, emotionId }) {
  const [value, setValue] = useState(null);
  const { dispatch } = useData();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConfirm = () => {
    if (value !== null) {
      const currentTimestamp = new Date().toISOString();

      // Save the emotion response to the centralized state with a unique key for each instance
      dispatch({
        type: "SET_DATA",
        key: `emotionResponse_${emotionId}`,
        value: {
          emotionId: emotionId,
          emotionValue: value,
          timestamp: currentTimestamp,
        },
      });

      // Log the data for debugging purposes
      console.log(`Emotion Saved: ${emotionId}, Value: ${value}, Timestamp: ${currentTimestamp}`);

      // Proceed to the next screen
      onProceed(nextScreen);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 8 }}
        gutterBottom
      >
        How are you feeling right now?
      </Typography>
      <Typography variant="h5" sx={{ mx: 8 }}>
        Think about how you're feeling at this moment. Use the scale below to
        describe your emotions.
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="emotion-scale-slider"
        aria-valuetext={value !== null ? `Emotion level ${value}` : "No emotion selected"}
        step={0.01}
        defaultValue={0}
        marks={marks}
        min={-2}
        max={2}
        valueLabelDisplay="auto"
        sx={{ mb: 12, mt: 8, width: "80%",
          "& .MuiSlider-thumb": {
            display: value === null ? "none" : "block",
          }, }}
      />

      <CustomButton
        text={"Continue"}
        onClick={handleConfirm}
        disabled={value === null}
        endIcon={<ArrowForwardIcon />}
      />
    </>
  );
}

export default EmotionsScale;
