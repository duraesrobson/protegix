import BarChartCard from "../../charts/BarChartCard"
import PieChartCard from "../../charts/PieChartCard"
import PiePaddingChartCard from "../../charts/PiePaddingChartCard"
import styles from "./DashboardSection.module.scss"

export default function DashboardSection() {
  return (
    <section id="dashboard" className={styles.dashboardSection}>
      <div className={`container ${styles.dashboardInner}`}>
        <div className={`dashboardHeader ${styles.dashboardHeader}`}>
          <h1 className={`dashboard-title ${styles.dashboardTitle}`}>
            Dashboard
          </h1>
          <p className={`dashboardSubtitle ${styles.dashboardSubtitle}`}>
            Acompanhe, de forma visual, os dados e padrões identificados a
            partir das respostas do formulário.
          </p>
        </div>
        <div className={styles.chartsContainer}>
          <div className={styles.barCharts}>
            <BarChartCard perguntaId="p1" titulo="Pergunta 1" />
          </div>
          <div className={styles.pieCharts}>
            <PieChartCard perguntaId="p2" titulo="Pergunta 2" />
            <PiePaddingChartCard perguntaId="p1" titulo="Pergunta 3" />
            <PiePaddingChartCard perguntaId="p1" titulo="Pergunta 3" />
          </div>
          <div className={styles.barCharts}>
            <BarChartCard perguntaId="p1" titulo="Pergunta 1" />
            <BarChartCard perguntaId="p1" titulo="Pergunta 1" />
            <BarChartCard perguntaId="p1" titulo="Pergunta 1" />
          </div>
        </div>
      </div>
    </section>
  )
}
