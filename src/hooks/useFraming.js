// useFraming.js
import { useState, useEffect } from "react"
import { getRandomFraming } from "../utils/utils"
import { videoData } from "../data"

export function useFraming(currentStep) {
  const [framing, setFraming] = useState(null)
  const [overlayText, setOverlayText] = useState("")

  useEffect(() => {
    if (!framing) {
      setFraming(getRandomFraming())
    }

    let textKey = "neutral"

    if (currentStep >= 3 && currentStep < 6) {
      textKey = framing
    } else if (currentStep >= 6) {
      textKey = framing
    }

    if (videoData[currentStep]) {
      const currentVideo = videoData[currentStep]
      setOverlayText(currentVideo.texts[textKey])
    }
  }, [currentStep, framing])

  return { overlayText }
}
