// src/components/CustomButton.js
import React from "react"
import Button from "@mui/material/Button"

const CustomButton = ({ children, ...props }) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  )
}

export default CustomButton
