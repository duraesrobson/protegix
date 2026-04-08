import AiInsightCard from "../../../charts/AiInsightCard"
import styles from "../DashboardSection.module.scss"

export default function GeneralInsightSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Análise Geral dos Dados</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Leitura automatizada:</span> Um resumo interpretativo dos padrões
          observados nas respostas coletadas sobre segurança digital, uso de IA
          e proteção de dados.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <AiInsightCard />
        </article>
      </div>
    </section>
  )
}