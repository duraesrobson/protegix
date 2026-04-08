import type { CrossAnalysisDoc } from "../../../types/crossAnalysisTypes"
import CrossAnalysisTable from "./CrossAnalysisTable"
import styles from "./CrossAnalysisCard.module.scss"

type CrossAnalysisCardProps = {
  data: CrossAnalysisDoc
}

export default function CrossAnalysisCard({ data }: CrossAnalysisCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{data.title}</h3>
      </header>

      <CrossAnalysisTable data={data} />

      <div className={styles.analysisBlock}>
        <h4 className={styles.analysisTitle}>Explicação da análise</h4>
        <p className={styles.analysisText}>{data.insight}</p>
      </div>
    </article>
  )
}
