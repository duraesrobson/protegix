import { createTheme } from "@mui/material/styles"

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#0ea5e9",
    },
    secondary: {
      main: "#12305a",
    },
    background: {
      default: "#010b23",
      paper: "#07142f",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#b6c5d8",
    },
  },
})

export default muiTheme