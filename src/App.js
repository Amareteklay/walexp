import React, { useState, useEffect } from "react"
import Welcome from "./components/Welcome"
import DataPrivacy from "./components/DataPrivacy"
import Instructions from "./components/Instructions"
import VideoScreen from "./components/VideoScreen"
import CommentsScreen from "./components/CommentsScreen"
import ThankYou from "./components/ThankYou"
import Background from "./components/Background"
import ContentContainer from "./components/ContentContainer"
import "./App.css"
import AudioCheck from "./components/AudioCheck"
import Feedback from "./components/Feedback"
import EmotionsScale from "./components/EmotionsScale"
import DemoEmoicons from "./components/DemoEmoicons"
import DemoShare from "./components/DemoShare"
import TransitionScreen from "./components/TransitionScreen"
import DonationPrompt from "./components/DonationPrompt"
import DonationForm from "./components/DonationForm"
import Survey from "./components/Survey"

function App() {
  const [screen, setScreen] = useState("welcome")
  const [reactionData, setReactionData] = useState([])
  const [comments, setComments] = useState("")

  // This state will track if the experiment is complete
  const [experimentComplete, setExperimentComplete] = useState(false)

  // Handle redirection to Prolific when experiment is complete
  useEffect(() => {
    if (experimentComplete) {
      window.parent.postMessage({ type: "experiment_complete" }, "*")
    }
  }, [experimentComplete])

  const handleStart = () => setScreen("audioCheck")
  const handleProceedToFeedback = () => setScreen("feedback")
  const handleProceedToEmotionsScale = () => setScreen("emotions")
  const handleProceedToInstructions = () => setScreen("instructions")
  const handleProceedToDemoIcons = () => setScreen("demoicons")
  const handleProceedToDemoShare = () => setScreen("demoshare")
  const handleProceedToVideo = () => setScreen("video")
  const handleReaction = (reaction) =>
    setReactionData([...reactionData, reaction])
  const handleNext = () => setScreen("transition")
  const handleProceedToDonationPrompt = () => setScreen("donationPrompt")
  const handleProceedToDonationForm = () => setScreen("donationForm")
  const handleDonationSubmit = () => setScreen("survey")

  const saveData = async (reactionData, comment) => {
    try {
      const response = await fetch(
        "https://3c65-94-255-133-219.ngrok-free.app",
        {
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

  const handleSurveySubmit = () => {
    // Mark experiment as complete, this will trigger the redirect
    setExperimentComplete(true)
  }

  let content
  switch (screen) {
    case "audioCheck":
      content = <AudioCheck onProceed={handleProceedToFeedback} />
      break
    case "feedback":
      content = <Feedback onProceed={handleProceedToEmotionsScale} />
      break
    case "emotions":
      content = <EmotionsScale onProceed={handleProceedToInstructions} />
      break
    case "instructions":
      content = <Instructions onProceed={handleProceedToDemoIcons} />
      break
    case "demoicons":
      content = <DemoEmoicons onProceed={handleProceedToDemoShare} />
      break
    case "demoshare":
      content = <DemoShare onProceed={handleProceedToVideo} />
      break
    case "video":
      content = (
        <VideoScreen
          videoSrc={`${process.env.PUBLIC_URL}/videos/Floods1.mp4`}
          overlayText="Video 1 playing now"
          onReaction={handleReaction}
          onProceed={handleNext}
        />
      )
      break
    case "transition":
      content = <TransitionScreen onProceed={handleProceedToDonationPrompt} />
      break
    case "donationPrompt":
      content = <DonationPrompt onProceed={handleProceedToDonationForm} />
      break
    case "donationForm":
      content = <DonationForm onSubmit={handleDonationSubmit} />
      break
    case "survey":
      content = (
        <div style={{ overflowY: "auto", height: "80vh" }}>
          <Survey onSubmit={handleSurveySubmit} />
        </div>
      )
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
