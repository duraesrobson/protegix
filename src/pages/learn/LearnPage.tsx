import AppButton from "../../components/ui/AppButton"
import SecurityCard from "../../components/learn/SecurityCard"
import SecurityTips from "../../components/learn/SecurityTips"
import SecurityThreats from "../../components/learn/SecurityThreats"
import SecurityActions from "../../components/learn/SecurityActions"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import styles from "./LearnPage.module.scss"

export default function LearnPage() {
  return (
    <section className={`${styles.pageSection} page-section`}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className="section-title">Segurança digital para todos</h1>
            <p className={styles.heroDescription}>
              Aprenda como proteger suas contas, dados e dispositivos com dicas
              simples e práticas. A segurança digital começa com hábitos do dia
              a dia e atitudes inteligentes na internet.
            </p>
          </div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.securityCards}>
            <SecurityCard
              title="Senhas fortes"
              description="Use senhas únicas, longas e difíceis de adivinhar para proteger suas contas."
              icon={<LockOutlinedIcon fontSize="large" />}
            />
            <SecurityCard
              title="Evitar phishing"
              description="Desconfie de mensagens que pedem dados ou redirecionam para links desconhecidos."
              icon={<WarningAmberOutlinedIcon fontSize="large" />}
            />
            <SecurityCard
              title="Privacidade ativa"
              description="Configure privacidade e compartilhe informações pessoais apenas quando necessário."
              icon={<ShieldOutlinedIcon fontSize="large" />}
            />
          </div>

          <section className={styles.resourceCard}>
            <h2>Por que isso importa?</h2>
            <p>
              A segurança digital protege sua identidade, evita fraudes e mantém
              as suas informações pessoais longe de invasores. Além disso, é a
              base para usar a internet com mais confiança e menos riscos.
            </p>
            <div className={styles.resourceList}>
              <div className={styles.resourceItem}>
                <strong>Proteção</strong>
                <span>Evite acessos não autorizados.</span>
              </div>
              <div className={styles.resourceItem}>
                <strong>Controle</strong>
                <span>Tenha mais poder sobre seus dados.</span>
              </div>
              <div className={styles.resourceItem}>
                <strong>Confiança</strong>
                <span>Use apps e serviços sem medo de golpes.</span>
              </div>
            </div>
          </section>
        </div>

        <SecurityThreats />

        <SecurityActions />

        <div id="dicas">
          <SecurityTips />
        </div>
      </div>
    </section>
  )
}
