import PiePaddingChartCard from "../../../charts/PiePaddingChartCard"
import BarChartCard from "../../../charts/BarChartCard"
import styles from "../DashboardSection.module.scss"

export default function LgpdSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>
          Proteção de Dados (LGPD)
        </h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Privacidade e Direitos:</span> Entenda como os participantes
          percebem a proteção de seus dados pessoais, o nível de informação
          sobre a LGPD, práticas de consentimento e compartilhamento, além da
          confiança nas organizações que tratam essas informações.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Conhecimento Sobre a LGPD (Lei Geral de Proteção de Dados)"
            perguntaId="lgpd"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Nível de Conhecimento sobre Proteção de Dados"
            perguntaId="lgpd_nivel"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Leitura de Termos de Uso e Políticas de Privacidade"
            perguntaId="lgpd_termos"
          />
        </article>
      </div>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Impacto da Privacidade no Uso de Serviços"
            perguntaId="lgpd_uso"
          />
        </article>
      </div>
    </section>
  )
}