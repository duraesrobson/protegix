import BarChartCard from "../../../charts/BarChartCard"
import PieChartCard from "../../../charts/PieChartCard"
import styles from "../DashboardSection.module.scss"

export default function UserProfileSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Perfil do Usuário</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Quem são nossos participantes:</span> Um olhar sobre as
          características de quem respondeu à pesquisa, ajudando a entender
          diferentes perfis de navegação.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Distribuição por Grupos de Idade"
            perguntaId="faixa_etaria"
          />
        </article>

        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Grau de Escolaridade"
            perguntaId="escolaridade"
          />
        </article>
      </div>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Exposição Diária à Rede"
            perguntaId="tempo_uso"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PieChartCard
            titulo="Tecnologias de Conexão Utilizadas"
            perguntaId="tipo_conexao"
          />
        </article>
      </div>
    </section>
  )
}