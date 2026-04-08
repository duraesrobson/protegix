import FeedbackListCard from "../../../charts/FeedbackListCard"
import styles from "../DashboardSection.module.scss"

export default function FeedbackSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Voz do Participante</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Opiniões e sugestões:</span> Confira o que pensam e as
          preocupações deixadas por quem participou da pesquisa.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <FeedbackListCard
            titulo="Maiores Riscos Percebidos na Tecnologia"
            perguntaId="feedbacks"
          />
        </article>
      </div>
    </section>
  )
}