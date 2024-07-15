import React, { useEffect, useRef } from "react"

function VideoScreen({ onReaction, onNext }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    video.play()
    document.documentElement.requestFullscreen()
    return () => {
      video.pause()
      video.currentTime = 0
      document.exitFullscreen()
    }
  }, [])

  const handleReaction = (reaction) => {
    const timestamp = videoRef.current.currentTime
    onReaction({ reaction, timestamp })
  }

  return (
    <div className="screen">
      <div className="video-container">
        <video ref={videoRef} loop>
          <source src="videos/Floods1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay-text">Video playing now</div>
      </div>
      <div className="emoji-reactions">
        <img
          src="emojis/happy.png"
          alt="Happy"
          onClick={() => handleReaction("happy")}
        />
        <img
          src="emojis/sad.png"
          alt="Sad"
          onClick={() => handleReaction("sad")}
        />
        <img
          src="emojis/neutral.png"
          alt="Neutral"
          onClick={() => handleReaction("neutral")}
        />
      </div>
      <button onClick={onNext}>Next</button>
    </div>
  )
}

export default VideoScreen
