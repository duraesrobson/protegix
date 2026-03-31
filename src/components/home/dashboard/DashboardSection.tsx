import BarChartCard from "../../charts/BarChartCard"
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
        <BarChartCard />
      </div>
    </section>
  )
}