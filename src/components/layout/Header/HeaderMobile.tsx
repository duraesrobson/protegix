import { AppBar, Toolbar, Box, IconButton, Drawer } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import NavItem from "../../ui/NavItem"
import logoMobile from "../../../assets/protegix-icon.svg"
import { headerNavLinks } from "./HeaderNavLinks"
import "./header.css"

export default function HeaderMobile() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={0}
      sx={{
        background: "var(--color-bg)",
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
                width: "60%",
                px: 3,
                pt: 3,
                gap: 3,
                overflowY: "hidden",
                borderRight: "3px solid var(--color-border)"
              }
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pb: 2,
              fontSize: 20,
              color: "var(--color-text-muted)",
              fontWeight: 600,
              alignItems: "center",
              borderBottom: "1px solid var(--color-border)"
            }}
          >
            Menu
            <IconButton
              aria-label="fechar menu"
              onClick={() => setOpenDrawer(false)}
              sx={{
                color: "var(--color-primary)",
                p: 0
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {headerNavLinks.map(link => {
            const Icon = link.icon

            return (
              <NavItem key={link.to} to={link.to} end>
                <Icon sx={{ fontSize: 20 }} />
                {link.label}
              </NavItem>
            )
          })}
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
