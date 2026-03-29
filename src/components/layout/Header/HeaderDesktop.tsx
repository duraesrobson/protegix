import { AppBar } from "@mui/material"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import NavItem from "../../ui/NavItem"
import logo from "../../../assets/protegix-icon.svg"
import { headerNavLinks } from "./HeaderNavLinks"
import "./header.css"

export default function Header() {
  return (
    <AppBar
      className="header"
      position="sticky"
      elevation={20}
      sx={{ background: "none", borderBottom: "1px solid var(--color-border)" }}
    >
      <Toolbar
        disableGutters
        className="header-inner"
        sx={{
          maxWidth: "var(--container-width)",
          px: 2,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="header-logo">
          <Box
            className="header-logo"
            component="img"
            src={logo}
            alt="Logo PROTEGIX"
            sx={{
              width: 30,
              objectFit: "contain"
            }}
          />
        </div>
        <div
          className="header-nav-desktop"
          style={{ display: "flex", gap: 50 }}
        >
          {headerNavLinks.map(link => (
            <NavItem key={link.to} to={link.to} end>
              {link.label}
            </NavItem>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  )
}
