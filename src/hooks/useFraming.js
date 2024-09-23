// useFraming.js
import { useState, useEffect } from "react";
import { videoData } from "../data";

export function useFraming(currentStep, framingType = "Neutral") {
  const [overlayText, setOverlayText] = useState("");
  const [factInfo, setFactInfo] = useState("");

  useEffect(() => {
    let textKey = "neutral"; // Default text key is neutral

    // Determine the textKey based on the currentStep and framingType
    if (currentStep >= 3) {
      // Use framingType after the first three videos
      if (framingType === "Positive") {
        textKey = "positive";
      } else if (framingType === "Negative") {
        textKey = "negative";
      }
    }

    // Set overlay text based on the current video and textKey
    if (videoData[currentStep]) {
      const currentVideo = videoData[currentStep];
      setFactInfo(currentVideo.texts.factInfo); // Set factInfo text
      setOverlayText(currentVideo.texts[textKey]); // Set overlay text based on framing type
    }
  }, [currentStep, framingType]); // Add framingType as a dependency

  return { overlayText, factInfo };
}
