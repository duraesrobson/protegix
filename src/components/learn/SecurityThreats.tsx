import type { ReactNode } from "react"
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined"
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined"
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined"
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined"
import styles from "../../pages/learn/LearnPage.module.scss"

type ThreatCard = {
  title: string
  description: string
  icon: ReactNode
}

const threats: ThreatCard[] = [
  {
    title: "Phishing",
    description:
      "Mensagens falsas tentam enganar você para roubar dados ou contas. Sempre confirme o remetente.",
    icon: <EmailOutlinedIcon fontSize="large" />
  },
  {
    title: "Malware",
    description:
      "Programas maliciosos podem invadir seu dispositivo e roubar informações. Atualize o antivírus e evite downloads desconhecidos.",
    icon: <BugReportOutlinedIcon fontSize="large" />
  },
  {
    title: "Wi-Fi público",
    description:
      "Redes abertas podem ser monitoradas por invasores. Prefira usar VPN ou dados móveis para transações sensíveis.",
    icon: <WifiOutlinedIcon fontSize="large" />
  },
  {
    title: "Ransomware",
    description:
      "Vírus que bloqueia seus arquivos e cobra um resgate. Mantenha backups atualizados e fora do dispositivo principal.",
    icon: <LockPersonOutlinedIcon fontSize="large" />
  },
  {
    title: "Engenharia Social",
    description:
      "Manipulação psicológica para obter dados confidenciais. Desconfie de urgências excessivas ou prêmios inesperados.",
    icon: <PersonSearchOutlinedIcon fontSize="large" />
  },
  {
    title: "Vazamento de Dados",
    description:
      "Quando informações de grandes empresas são expostas. Use autenticação em duas etapas para proteger suas contas.",
    icon: <DevicesOtherOutlinedIcon fontSize="large" />
  }
]

export default function SecurityThreats() {
  return (
    <section className={styles.threatSection}>
      <div className={styles.sectionHeader}>
        <h2>Principais ameaças online</h2>
        <p>
          Reconhecer os riscos é o primeiro passo para se proteger. Essas
          ameaças estão entre as mais comuns na internet hoje.
        </p>
      </div>

      <div className={styles.threatGrid}>
        {threats.map(threat => (
          <article key={threat.title} className={styles.threatCard}>
            <div>
              <div className={styles.threatHeader}>
                <div className={styles.threatIcon}>{threat.icon}</div>
                <h3>{threat.title}</h3>
              </div>
              <p>{threat.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
