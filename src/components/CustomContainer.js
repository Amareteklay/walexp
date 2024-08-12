import React from "react"
import { Container } from "@mui/material"
import { styled } from "@mui/system"

const CustomContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  margin: "20px auto", // Center the container within the parent
  backgroundColor: "red", // Example background color
  padding: "20px", // Adjust the padding for better spacing
  width: "100%", // Make the container a bit smaller than full width
  maxWidth: "600px", // Set a maximum width
  borderRadius: "12px", // Add some rounding to match the tablet design
  boxSizing: "border-box",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
}))

export default CustomContainer
