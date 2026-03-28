import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./styles/index.css"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import muiTheme from "./theme/muiTheme"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
