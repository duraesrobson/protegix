import { AppBar } from "@mui/material"
import logo from "../../../assets/protegix-logo-sec.svg"
import "./footer.css"

export default function Footer() {
  return (
    <AppBar
      className="footer"
      component="footer"
      position="static"
      elevation={0}
      sx={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)"
      }}
    >
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={logo} alt="Logo PROTEGIX" />
        </div>

        <p className="footer-credits">
          Projeto desenvolvido por Matheus, Mikaella Teixeira, Robson Durães e
          Salatiel Martins.
        </p>

        <p className="footer-copyright">
          Protegix © 2026. Todos os direitos reservados.
        </p>
      </div>
    </AppBar>
  )
}
