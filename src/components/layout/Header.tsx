import { AppBar } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import logo from "../../assets/protegix-logo-sec.svg"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="container header">
      <div className="header-inner">
        <AppBar
          position="sticky"
          elevation={20}
          sx={{
            background: "none",
            color: "var(--color-text)"
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              maxWidth: "var(--container-width)",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo PROTEGIX"
              sx={{
                width: 150,
                objectFit: "contain",
                marginRight: "auto"
              }}
            />

            <Button color="inherit" component={Link} to="/">
              Início
            </Button>
            <Button color="inherit" component={Link} to="/aprenda">
              Aprenda
            </Button>
            <Button color="inherit" component={Link} to="/quiz">
              Quiz
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  )
}
