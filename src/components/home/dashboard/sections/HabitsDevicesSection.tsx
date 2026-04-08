import BarChartCard from "../../../charts/BarChartCard"
import PiePaddingChartCard from "../../../charts/PiePaddingChartCard"
import styles from "../DashboardSection.module.scss"

export default function HabitsDevicesSection() {
  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Hábitos e Dispositivos</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Tecnologia no dia a dia:</span> Saiba quais aparelhos as pessoas
          usam para se conectar e como elas cuidam da segurança e atualização de
          seus dispositivos.
        </p>
      </header>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Principal Dispositivo de Acesso à Internet"
            perguntaId="disp_principal"
          />
        </article>

        <article className={styles.chartWrapper}>
          <BarChartCard
            titulo="Atualização de Dispositivos"
            perguntaId="disp_atualizacao"
          />
        </article>
      </div>

      <div className={styles.chartsGrid}>
        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Verificação da Segurança de Sites"
            perguntaId="verifica_sites"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Qualidade da Internet"
            perguntaId="qualidade_internet"
          />
        </article>

        <article className={styles.chartWrapper}>
          <PiePaddingChartCard
            titulo="Impacto da Falta de Acesso à Tecnologia"
            perguntaId="falta_de_acesso"
          />
        </article>
      </div>
    </section>
  )
}
