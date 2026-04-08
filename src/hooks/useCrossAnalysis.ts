import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"
import type { CrossAnalysisDoc } from "../types/crossAnalysisTypes"

export function useCrossAnalysis() {
  const [data, setData] = useState<CrossAnalysisDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCrossAnalysis() {
      try {
        const snapshot = await getDocs(collection(db, "cross_analysis"))

        const docs: CrossAnalysisDoc[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<CrossAnalysisDoc, "id">)
        }))

        setData(docs)
      } catch (err) {
        console.error("erro ao buscar análises cruzadas:", err)
        setError("não foi possível carregar as análises cruzadas.")
      } finally {
        setLoading(false)
      }
    }

    loadCrossAnalysis()
  }, [])

  return {
    data,
    loading,
    error
  }
}