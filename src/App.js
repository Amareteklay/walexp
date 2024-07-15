import React, { useState } from "react"
import Welcome from "./components/Welcome"
import DataPrivacy from "./components/DataPrivacy"
import Instructions from "./components/Instructions"
import VideoScreen from "./components/VideoScreen"
import ThankYou from "./components/ThankYou"
import "./App.css"

function App() {
  const [screen, setScreen] = useState("welcome")
  const [reactionData, setReactionData] = useState([])

  const handleStart = () => setScreen("dataPrivacy")
  const handleProceedToInstructions = () => setScreen("instructions")
  const handleProceedToVideo = () => setScreen("video")
  const handleReaction = (reaction) =>
    setReactionData([...reactionData, reaction])
  const handleNext = () => {
    saveData(reactionData)
    setScreen("thankyou")
  }

  const saveData = (data) => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "reaction_data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  switch (screen) {
    case "dataPrivacy":
      return <DataPrivacy onProceed={handleProceedToInstructions} />
    case "instructions":
      return <Instructions onProceed={handleProceedToVideo} />
    case "video":
      return <VideoScreen onReaction={handleReaction} onNext={handleNext} />
    case "thankyou":
      return <ThankYou />
    default:
      return <Welcome onStart={handleStart} />
  }
}

export default App
