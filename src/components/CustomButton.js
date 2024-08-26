import React from "react"
import Button from "@mui/material/Button"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

const CustomButton = ({ text, onClick, startIcon, endIcon, disabled, ...props }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        display: "flex",
        backgroundColor: "#5E5DF0",
        alignItems: "center",
        gap: 1,
        borderRadius: "999px",
        boxShadow: "#5E5DF0 0 10px 20px -10px",
        boxSizing: "border-box",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
        opacity: 1,
        outline: "0 solid transparent",
        padding: "8px 18px",
        width: "fit-content",
        wordBreak: "break-word",
        border: 0,
      }}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      {...props}
    >
      {text}
    </Button>
  )
}

export default CustomButton
