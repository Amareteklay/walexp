import React from "react"
import { Paper } from "@mui/material"
import { styled } from "@mui/system"

const CenteredContainer = styled(Paper)(({ theme }) => ({
  height: "85vh",
  width: "100%", // Set a fixed width as a percentage of the parent component's width
  maxWidth: "650px", // Set a maximum width to ensure it fits within the tablet screen
  margin: "auto", // Centers the container horizontally
  padding: "20px", // Adjust padding as needed
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f3f3f3",
  boxSizing: "border-box", // Ensures padding is included in the element's total width and height
  overflow: "hidden", // Prevents content from overflowing
}))

const ContentContainer = ({ children }) => {
  return <CenteredContainer>{children}</CenteredContainer>
}

export default ContentContainer
