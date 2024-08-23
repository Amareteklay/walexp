import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"

// Gradient background
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  backgroundImage: "linear-gradient(180deg, #4b79a1, #283e51, #5a3f87)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

// Tablet frame styling
const TabletFrame = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "512px", // Tablet width
  height: "80%",
  maxHeight: "100vh", // Tablet height
  border: "16px solid #333", // Border color for the tablet frame
  borderRadius: "36px", // Rounded corners to mimic a tablet
  background: "#000", // Background color inside the border (tablet frame color)
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", // Shadow to give a 3D effect
  position: "relative",
  overflow: "hidden", // Hide overflow if content goes outside the frame
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

// Inner screen styling
const TabletScreen = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#f3f3f3", // Background of the screen itself
  borderRadius: "20px", // Inner rounded corners to mimic a screen
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center content vertically
  alignItems: "center", // Center content horizontally
  padding: "10px", // Padding inside the tablet screen
  boxSizing: "border-box",
}))

const Background = ({ children }) => {
  return (
    <GradientBackground>
      <TabletFrame>
        <TabletScreen>{children}</TabletScreen>
      </TabletFrame>
    </GradientBackground>
  )
}

export default Background
