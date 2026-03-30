import DashboardBarChart from "../../charts/DashboardBarChart"
import { getDashboardData } from "../../../services/dashboard"
import { useEffect, useState } from "react"
import type { DashboardResponse } from "../../../types/dashboard"
import styles from "./DashboardSection.module.scss"

export default function DashboardSection() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getDashboardData()
        setData(result)
      } catch (err) {
        setError("Não foi possível carregar o dashboard.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <p>Carregando dashboard...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!data) {
    return <p>Nenhum dado encontrado.</p>
  }

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
        <DashboardBarChart title="Pcd" data={data.pcd} />
      </div>
    </section>
  )
}
