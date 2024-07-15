import React from "react"

function Welcome({ onStart }) {
  return (
    <div className="screen">
      <h1>Welcome to the Experiment</h1>
      <button onClick={onStart}>Start Experiment</button>
    </div>
  )
}

export default Welcome
