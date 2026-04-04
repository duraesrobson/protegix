import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where, limit } from "firebase/firestore"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import styles from "./ChartStyles.module.scss"

interface FeedbackProps {
  perguntaId: string
  titulo: string
}

export default function FeedbackListCard({
  perguntaId,
  titulo
}: FeedbackProps) {
  const [feedbacks, setFeedbacks] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pegamos os últimos 20 feedbacks para não sobrecarregar a tela
    const q = query(
      collection(db, "respostas"),
      where("perguntaId", "==", perguntaId),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const texts: string[] = []
      snapshot.forEach(doc => {
        const text = doc.data().opcao
        if (text && text.trim().length > 0) {
          texts.push(text)
        }
      })
      setFeedbacks(texts)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [perguntaId])

  if (loading) return <p>carregando comentários...</p>

  return (
    <div className={styles.feedbackListContainer}>
      <h3>{titulo}</h3>
      <div className={styles.feedbackList}>
        {feedbacks.length > 0 ? (
          feedbacks.map((text, index) => (
            <div key={index} className={styles.feedbackItem}>
              <AccountCircleIcon className={styles.avatar} />
              <p>"{text}"</p>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Ainda não recebemos comentários.</p>
        )}
      </div>
    </div>
  )
}
