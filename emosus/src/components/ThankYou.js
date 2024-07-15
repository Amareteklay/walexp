import React, { useEffect } from "react"

function ThankYou() {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Experiment complete. Thank you!")
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="screen">
      <h2>Thank you for participating!</h2>
    </div>
  )
}

export default ThankYou
