import React from "react"
import { Paper } from "@mui/material"
import { styled } from "@mui/system"

const CenteredContainer = styled(Paper)(({ theme }) => ({
  height: "80vh",
  maxWidth: "1200px",
  margin: "auto",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: theme.shadows[5],
}))

const ContentContainer = ({ children }) => {
  return <CenteredContainer>{children}</CenteredContainer>
}

export default ContentContainer
