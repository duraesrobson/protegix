import PieChartCard from "../../../charts/PieChartCard"
import styles from "../DashboardSection.module.scss"

export default function DigitalHygieneSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>
          Higiene Digital e Incidentes
        </h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Cuidado e proteção:</span> Veja como os usuários protegem suas
          contas e descubra quantos já enfrentaram situações de risco ou golpes
          online.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Diversificação de Senhas entre Serviços"
            perguntaId="senhas_diferentes"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Adoção de Autenticação em Duas Etapas"
            perguntaId="2fa"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Incidência de Vítimas de Golpes Online"
            perguntaId="golpe"
          />
        </article>
      </div>
    </section>
  )
}