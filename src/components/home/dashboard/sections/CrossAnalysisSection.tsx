import CrossAnalysisCard from "../../../charts/crossTable/CrossAnalysisCard"
import type { CrossAnalysisDoc } from "../../../../types/crossAnalysisTypes"
import styles from "../DashboardSection.module.scss"

type CrossAnalysisSectionProps = {
  crossAnalysisData: CrossAnalysisDoc[]
  loadingCrossAnalysis: boolean
  crossAnalysisError: string | null
}

export default function CrossAnalysisSection({
  crossAnalysisData,
  loadingCrossAnalysis,
  crossAnalysisError
}: CrossAnalysisSectionProps) {
  const sortedCrossAnalysis = [...crossAnalysisData].sort((a, b) => {
    if (a.id === "verifica_sites_x_golpe") return -1
    if (b.id === "verifica_sites_x_golpe") return 1
    return 0
  })

  return (
    <section className={styles.dashboardContentSection}>
      <header className={styles.dashboardSectionHeader}>
        <h2 className={styles.dashboardSectionTitle}>Cruzamento de Respostas</h2>
        <p className={styles.dashboardSectionDescription}>
          <span>Relações entre variáveis:</span> Nesta seção, são apresentados
          cruzamentos entre respostas da pesquisa, permitindo observar padrões
          entre perfil dos participantes, práticas de segurança digital, uso de
          IA e conhecimento sobre proteção de dados.
        </p>
      </header>

      {loadingCrossAnalysis ? (
        <p className={styles.dashboardSectionDescription}>
          carregando análises cruzadas...
        </p>
      ) : crossAnalysisError ? (
        <p className={styles.dashboardSectionDescription}>
          {crossAnalysisError}
        </p>
      ) : (
        <div className={styles.chartsGrid2}>
          {sortedCrossAnalysis.map(item => (
            <article key={item.id} className={styles.chartWrapper}>
              <CrossAnalysisCard data={item} />
            </article>
          ))}
        </div>
      )}
    </section>
  )
}