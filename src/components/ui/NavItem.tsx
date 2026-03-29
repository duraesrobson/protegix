import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"
import type { ReactNode } from "react"

type NavItemProps = {
  to: string
  children: ReactNode
  end?: boolean
}

export default function NavItem({ to, children, end = false }: NavItemProps) {
  return (
    <Button
      component={NavLink}
      to={to}
      end={end}
      sx={{
        color: "var(--color-text)",
        textTransform: "none",
        fontWeight: 500,
        backgroundColor: "transparent",
        transition: "all 0.2s ease",
        minWidth: "0",
        p: 0,

        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.main",
        },

        "&.active": {
          color: "primary.main",
          fontWeight: 700,
        },
      }}
    >
      {children}
    </Button>
  )
}