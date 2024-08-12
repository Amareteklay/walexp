import { useEffect } from "react"

const useFullscreen = () => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Optionally add logic for what happens when exiting fullscreen
      }
    }

    const enterFullscreen = async () => {
      try {
        document.documentElement.requestFullscreen()
      } catch (error) {
        console.error("Error attempting to enter full-screen mode:", error)
      }
    }

    enterFullscreen()

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((error) => {
          console.error("Error attempting to exit full-screen mode:", error)
        })
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])
}

export default useFullscreen
