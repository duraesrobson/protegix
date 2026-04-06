import { useEffect, useState } from "react"
import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "../lib/firebase"

export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  totalQuestions: number
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar top 10 pontuações
  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const q = query(
        collection(db, "quiz-scores"),
        orderBy("score", "desc"),
        orderBy("name", "asc"),
        limit(10)
      )

      const querySnapshot = await getDocs(q)
      const entries: LeaderboardEntry[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        entries.push({
          id: doc.id,
          name: data.name,
          score: data.score,
          totalQuestions: data.totalQuestions ?? 15
        })
      })

      setLeaderboard(entries)
      setError(null)
    } catch (err) {
      console.error("Erro ao buscar leaderboard:", err)
      setError("Erro ao carregar o ranking")
    } finally {
      setLoading(false)
    }
  }

  // Salvar nova pontuação
  const saveScore = async (name: string, score: number, totalQuestions: number) => {
    try {
      await addDoc(collection(db, "quiz-scores"), {
        name: name.trim(),
        score,
        totalQuestions: totalQuestions,
        date: new Date()
      })

      // Recarregar leaderboard após salvar
      await fetchLeaderboard()
      return true
    } catch (err) {
      console.error("Erro ao salvar pontuação:", err)
      setError("Erro ao salvar sua pontuação")
      return false
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return {
    leaderboard,
    loading,
    error,
    saveScore,
    refetch: fetchLeaderboard
  }
}