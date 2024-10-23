// src/index.js
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "@mui/material/styles"
import { DataProvider } from './contexts/DataContext';
import theme from "./theme"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataProvider>
      <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
