import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ text, onClick, startIcon, endIcon, disabled, fontSize = "12px", fontWeight = 400, padding = "6px 12px", ...props }) => {
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
        lineHeight: "20px",
        opacity: 1,
        outline: "0 solid transparent",
        width: "fit-content",
        wordBreak: "break-word",
        border: 0,
        fontSize: fontSize,
        fontWeight: fontWeight,
        padding: padding,
      }}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
