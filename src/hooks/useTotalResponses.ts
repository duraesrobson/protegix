import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../lib/firebase"

interface UseTotalResponsesParams {
  perguntaId: string
}

export function useTotalResponses({
  perguntaId
}: UseTotalResponsesParams) {
  const [totalRespostas, setTotalRespostas] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, "respostas"),
      where("perguntaId", "==", perguntaId)
    )

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        setTotalRespostas(snapshot.size)
        setLoading(false)
      },
      error => {
        console.error("erro ao buscar total de respostas:", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [perguntaId])

  return {
    totalRespostas,
    loading
  }
}