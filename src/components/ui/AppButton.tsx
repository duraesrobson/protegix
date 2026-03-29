import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"

type ButtonVariant = "primary" | "secondary"

type AppButtonProps = {
  text: string
  to: string
  variant?: ButtonVariant
}

const buttonStyles = {
  primary: {
    color: "var(--color-text)",
    bg: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    hoverBg: "var(--color-surface)",
    hoverColor: "var(--color-text)",
    hoverBorder: "1px solid var(--color-primary)"
  },
  secondary: {
    color: "var(--color-text-inverse)",
    bg: "#ffffff",
    border: "1px solid transparent",
    hoverBg: "#ffffff",
    hoverColor: "var(--color-text-inverse)",
    hoverBorder: "1px solid var(--color-primary)"
  }
}

export default function AppButton({
  text,
  to,
  variant = "primary"
}: AppButtonProps) {
  const currentStyle = buttonStyles[variant]

  return (
    <Button
      component={NavLink}
      to={to}
      sx={{
        color: currentStyle.color,
        background: currentStyle.bg,
        border: currentStyle.border,
        textTransform: "none",
        fontWeight: 600,
        fontSize: {
          xs: "0.7rem",
          sm: "1rem"
        },
        lineHeight: 1,
        minWidth: 0,
        borderRadius: {
          xs: "12px",
          sm: "16px"
        },
        px: {
          xs: 2,
          sm: 3
        },
        py: {
          xs: 1.2,
          sm: 1.5
        },
        transition: "all 0.2s ease",

        "&:hover": {
          background: currentStyle.hoverBg,
          color: currentStyle.hoverColor,
          border: currentStyle.hoverBorder,
          boxShadow: "var(--shadow-sm)"
        }
      }}
    >
      {text}
    </Button>
  )
}
