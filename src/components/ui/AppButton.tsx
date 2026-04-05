import Button from "@mui/material/Button"
import { NavLink } from "react-router-dom"

type ButtonVariant = "primary" | "secondary"

type AppButtonProps = {
  text: string
  to: string
  variant?: ButtonVariant
  newTab?: boolean
}

const buttonStyles = {
  primary: {
    color: "var(--color-text)",
    bg: "var(--color-bg)",
    border: "1.5px solid var(--color-border)",
    hoverColor: "var(--color-text)",
    hoverBorder: "var(--color-primary)"
  },
  secondary: {
    color: "var(--color-text-inverse)",
    bg: "#ffffff",
    border: "1.5px solid transparent",
    hoverColor: "var(--color-text-inverse)",
    hoverBorder: "var(--color-primary)"
  }
}

export default function AppButton({
  text,
  to,
  variant = "primary",
  newTab = false
}: AppButtonProps) {
  const currentStyle = buttonStyles[variant]
  const isAnchor = to.startsWith("#")
  const shouldUseAnchor = isAnchor || newTab

  return (
    <Button
      component={shouldUseAnchor ? "a" : NavLink}
      {...(shouldUseAnchor ? { href: to } : { to })}
      {...(newTab
        ? {
            target: "_blank",
            rel: "noopener noreferrer"
          }
        : {})}
      sx={{
        color: currentStyle.color,
        background: currentStyle.bg,
        border: currentStyle.border,
        textTransform: "none",
        textAlign: "center",
        fontWeight: 600,
        fontSize: {
          xs: "1rem",
          sm: "1.3rem"
        },
        lineHeight: 1,
        minWidth: 0,
        borderRadius: {
          xs: "12px",
          sm: "16px"
        },
        px: {
          xs: 3,
          sm: 4
        },
        py: {
          xs: 1.5,
          sm: 2
        },
        transition: "all 0.2s ease",

        "&:hover": {
          color: currentStyle.hoverColor,
          borderColor: currentStyle.hoverBorder,
          boxShadow: "var(--shadow-sm)"
        }
      }}
    >
      {text}
    </Button>
  )
}
