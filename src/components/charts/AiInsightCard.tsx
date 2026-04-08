import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import styles from "./AiInsightCard.module.scss"

type InsightData = {
  content: string
  totalParticipantes?: number
  version?: string
}

export default function AiInsightCard() {
  const [data, setData] = useState<InsightData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadInsight() {
      try {
        const ref = doc(db, "dashboard_insights", "daily_summary")
        const snapshot = await getDoc(ref)

        if (snapshot.exists()) {
          setData(snapshot.data() as InsightData)
        }
      } catch (error) {
        console.error("erro ao buscar análise:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInsight()
  }, [])

  if (loading) {
    return (
      <article className={styles.aiInsightCard}>
        <h3 className={styles.title}>Análise Geral dos Dados</h3>
        <p className={styles.text}>carregando análise...</p>
      </article>
    )
  }

  if (!data) {
    return (
      <article className={styles.aiInsightCard}>
        <h3 className={styles.title}>Análise Geral dos Dados</h3>
        <p className={styles.text}>análise ainda não disponível.</p>
      </article>
    )
  }

  return (
    <article className={styles.aiInsightCard}>
      <h3 className={styles.title}>Análise Geral dos Dados</h3>
      <p className={styles.text}>{data.content}</p>

      {data.totalParticipantes ? (
        <small className={styles.notice}>
          Análise gerada com base em {data.totalParticipantes} participantes.
        </small>
      ) : null}

      <small className={styles.notice}>
        Esta análise foi gerada automaticamente por Inteligência Artificial com
        base em dados agregados e possui caráter interpretativo.
      </small>
    </article>
  )
}
