import React, { useEffect } from "react"

const FullScreenContainer = ({ children }) => {
  useEffect(() => {
    // Request full-screen mode when the component mounts
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      /* Firefox */
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      document.documentElement.msRequestFullscreen()
    }
  }, [])

  return <div>{children}</div>
}

export default FullScreenContainer
