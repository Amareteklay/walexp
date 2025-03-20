import React from "react"
import { createRoot } from 'react-dom/client';
import "./index.css"
import App from "./App"
import { ThemeProvider } from "@mui/material/styles"
import { DataProvider } from './contexts/DataContext';
import theme from "./theme"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataProvider>
        <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
