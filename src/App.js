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
import FullScreenContainer from "./components/FullScreenContainer"
import { textFrames, videos } from "./data" // Import your data

function getRandomTextFrame(textFrames) {
  const types = ["positive", "negative", "neutral"]
  const randomType = types[Math.floor(Math.random() * types.length)]
  const texts = textFrames[randomType]
  const randomText = texts[Math.floor(Math.random() * texts.length)]
  return randomText // Return only the text since we don't need the type
}

function App() {
  const [screen, setScreen] = useState("welcome")
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [reactionData, setReactionData] = useState([])
  const [comments, setComments] = useState("")
  const [overlayText, setOverlayText] = useState("") // New state for overlay text

  // This state will track if the experiment is complete
  const [experimentComplete, setExperimentComplete] = useState(false)

  useEffect(() => {
    const randomText = getRandomTextFrame(textFrames)
    setOverlayText(randomText) // Set the random overlay text for the current video
  }, [currentVideoIndex])

  // Handle redirection to Prolific when experiment is complete
  useEffect(() => {
    if (experimentComplete) {
      window.parent.postMessage({ type: "experiment_complete" }, "*")
    }
  }, [experimentComplete])

  const handleStart = () => {
    setScreen("audioCheck")
    requestFullScreen() // Trigger full-screen on start
  }

  const handleProceedToFeedback = () => setScreen("feedback")
  const handleProceedToEmotionsScale = () => setScreen("emotions")
  const handleProceedToInstructions = () => setScreen("instructions")
  const handleProceedToVideo = () => setScreen("video")
  const handleProceedToDemoIcons = () => setScreen("demoicons")
  const handleProceedToDemoShare = () => setScreen("demoshare")

  const handleReaction = (reaction) =>
    setReactionData([...reactionData, reaction])

  const handleNext = () => {
    // Loop videos: after the last video, start again from the first
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

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

  const requestFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
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
          videoSrc={`${process.env.PUBLIC_URL}/videos/${videos[currentVideoIndex]}`}
          overlayText={overlayText}
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
    <FullScreenContainer>
      <Background>
        <ContentContainer>{content}</ContentContainer>
      </Background>
    </FullScreenContainer>
  )
}

export default App
