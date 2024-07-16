// src/components/Background.js
import React from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));


const Background = ({ children }) => {
  return <GradientBackground>{children}</GradientBackground>
}

export default Background
