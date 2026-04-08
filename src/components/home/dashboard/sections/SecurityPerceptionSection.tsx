import LineChartCard from "../../../charts/LineChartCard"
import styles from "../DashboardSection.module.scss"

export default function SecurityPerceptionSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>
          Índice de Percepção de Segurança
        </h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Como as pessoas se sentem:</span> Entendendo o nível de
          confiança de quem utiliza serviços digitais no dia a dia, desde bancos
          até redes sociais.
        </p>
      </header>

      <div className={styles.spotlightGrid}>
        <article className={styles.chartWrapper}>
          <LineChartCard
            titulo="Nível de Confiança em Serviços Digitais"
            ids={[
              "seg_navegacao",
              "seg_bancos",
              "seg_redes",
              "seg_compras",
              "seg_email"
            ]}
            labels={[
              "Navegação",
              "Bancos",
              "Redes Sociais",
              "Compras",
              "Email"
            ]}
          />
        </article>
      </div>
    </section>
  )
}
