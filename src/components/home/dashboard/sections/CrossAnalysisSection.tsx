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
  const order = [
    "verifica_sites_x_golpe",
    "tempo_uso_x_golpe",
    "frequencia_ia_x_verificacao_ia",
    "escolaridade_x_lgpd",
    "faixa_etaria_x_2fa",
    "lgpd_x_leitura_termos"
  ]

  const sortedCrossAnalysis = [...crossAnalysisData].sort((a, b) => {
    const indexA = order.indexOf(a.id)
    const indexB = order.indexOf(b.id)

    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
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