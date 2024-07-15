import React from "react"

function Instructions({ onProceed }) {
  return (
    <div className="screen">
      <h2>Instructions</h2>
      <p>
        Watch the video and react using the emojis below the video. Click next
        when you are ready to proceed.
      </p>
      <button onClick={onProceed}>Proceed to Video</button>
    </div>
  )
}

export default Instructions
