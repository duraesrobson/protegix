import { AppBar, Toolbar, Box, IconButton, Drawer } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import NavItem from "../../ui/NavItem"
import logoMobile from "../../../assets/protegix-icon.svg"
import { headerNavLinks } from "./HeaderNavLinks"

export default function Header() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={20}
      sx={{
        background: "none",
        color: "var(--color-text)",
        borderBottom: "1px solid var(--color-border)"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: "var(--container-width)",
          margin: "0 auto",
          width: "100%",
          px: 2,
          minHeight: 72,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div className="header-menu-button">
          <IconButton
            edge="start"
            aria-label="abrir menu"
            onClick={() => setOpenDrawer(true)}
            sx={{ color: "var(--color-text-muted)" }}
          >
            <MenuIcon
            className="header-menu-button-icon"
              sx={{
                width: 40,
                height: "auto"
              }}
            />
          </IconButton>
        </div>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          slotProps={{
            paper: {
              sx: {
                p: 5,
                gap: 2,
                overflowY: "hidden"
              }
            }
          }}
        >
          {headerNavLinks.map(link => (
            <NavItem key={link.to} to={link.to} end>
              {link.label}
            </NavItem>
          ))}
        </Drawer>

        <div className="header-logo">
          <Box
            component="img"
            src={logoMobile}
            alt="Logo PROTEGIX"
            sx={{
              height: 35,
              objectFit: "contain",
              marginLeft: "auto"
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}
