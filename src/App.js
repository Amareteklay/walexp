import React, { useState } from "react"
import Welcome from "./components/Welcome"
import DataPrivacy from "./components/DataPrivacy"
import Instructions from "./components/Instructions"
import VideoScreen from "./components/VideoScreen"
import CommentsScreen from "./components/CommentsScreen"
import ThankYou from "./components/ThankYou"
import Background from "./components/Background"
import ContentContainer from "./components/ContentContainer"
import "./App.css"

function App() {
  const [screen, setScreen] = useState("welcome")
  const [reactionData, setReactionData] = useState([])
  const [comments, setComments] = useState("")

  const handleStart = () => setScreen("dataPrivacy")
  const handleProceedToInstructions = () => setScreen("instructions")
  const handleProceedToVideo = () => setScreen("video")
  const handleReaction = (reaction) =>
    setReactionData([...reactionData, reaction])
  const handleNext = () => setScreen("comments")

  const saveData = async (reactionData, comment) => {
    try {
      const response = await fetch(
        "https://3c65-94-255-133-219.ngrok-free.app",
        {
          // Update with your Ngrok URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            reaction: reactionData,
            comment: comment,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }

  const handleSubmitComment = async (comment) => {
    setComments(comment)
    await saveData(reactionData, comment)
    setScreen("thankyou")
  }

  let content
  switch (screen) {
    case "dataPrivacy":
      content = <DataPrivacy onProceed={handleProceedToInstructions} />
      break
    case "instructions":
      content = <Instructions onProceed={handleProceedToVideo} />
      break
    case "video":
      content = <VideoScreen onReaction={handleReaction} onNext={handleNext} />
      break
    case "comments":
      content = <CommentsScreen onSubmit={handleSubmitComment} />
      break
    case "thankyou":
      content = <ThankYou />
      break
    default:
      content = <Welcome onStart={handleStart} />
  }

  return (
    <Background>
      <ContentContainer>{content}</ContentContainer>
    </Background>
  )
}

export default App
