import React from "react"
import { Paper } from "@mui/material"
import { styled } from "@mui/system"

// Custom Paper component to override the default styles
const CustomPaper = styled(Paper)(({ theme }) => ({
  width: "80%", // Set the width to 80% or any desired value
  maxWidth: "1000px", // Set a maximum width to prevent it from becoming too wide
  margin: "auto", // Center the Paper element on the screen
  padding: "20px", // Adjust padding to control the space inside the Paper
  backgroundColor: "#fff", // Ensure the background remains white
  boxSizing: "border-box", // Ensure padding is included within the width
  borderRadius: "12px", // Keep the rounded corners for a modern look
  boxShadow: theme.shadows[3], // Apply a subtle shadow for depth
  // More specific targeting of the auto-generated class
  "&.css-1lo9e02-MuiPaper-root": {
    width: "100% !important", // Force the width to be 100%
    padding: "20px !important", // Override any other padding
  },
}))

export default CustomPaper
