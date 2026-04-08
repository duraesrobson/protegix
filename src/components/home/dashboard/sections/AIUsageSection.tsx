import BarChartCard from "../../../charts/BarChartCard"
import PieChartCard from "../../../charts/PieChartCard"
import styles from "../DashboardSection.module.scss"

export default function AIUsageSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Uso de IA Generativa</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Inovação e confiança:</span> Explore como a inteligência
          artificial está sendo integrada à rotina, a frequência de uso e o grau
          de verificação das informações geradas por essas ferramentas.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Uso de Ferramentas de IA Generativa"
            perguntaId="utiliza_ia"
          />
        </article>

        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Frequência de Uso de Ferramentas de IA"
            perguntaId="frequencia_ia"
          />
        </article>
      </div>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Finalidades de Uso da IA"
            perguntaId="finalidade_ia"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Confiança Nas Respostas de IA"
            perguntaId="confianca_ia"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Verificação de Respostas da IA"
            perguntaId="verificacao_ia"
          />
        </article>
      </div>
    </section>
  )
}