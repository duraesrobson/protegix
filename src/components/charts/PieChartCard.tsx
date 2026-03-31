import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { PieChart, pieClasses } from "@mui/x-charts/PieChart"
import type { DefaultizedPieValueType } from "@mui/x-charts/models"

interface PieProps {
  perguntaId: string
  titulo: string
}

// mui pie chart espera um id unico para cada fatia alem de label e value
interface PieData {
  id: string | number
  label: string
  value: number
  color?: string
}

export default function PieChartCard({ perguntaId, titulo }: PieProps) {
  const [data, setData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, "respostas"),
      where("perguntaId", "==", perguntaId)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const counts: Record<string, number> = {}

      snapshot.forEach(doc => {
        const res = doc.data().opcao
        if (res) {
          counts[res] = (counts[res] || 0) + 1
        }
      })

      // formatando para o piechart (o id é obrigatorio aqui)
      const formatted: PieData[] = Object.keys(counts).map((key, index) => ({
        id: index,
        label: key,
        value: counts[key]
      }))

      // ordena alfabeticamente para manter o padrao do dashboard
      setData(formatted.sort((a, b) => a.label.localeCompare(b.label)))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [perguntaId])

  // calculo do total dinamico baseado no estado atual
  const total = data.reduce((acc, item) => acc + item.value, 0)

  // funcao para gerar a label de porcentagem dentro da fatia
  const getArcLabel = (params: DefaultizedPieValueType) => {
    if (total === 0) return ""
    const percent = params.value / total
    return `${(percent * 100).toFixed(0)}%`
  }

  if (loading) return <p>carregando...</p>

  return (
    <div>
      <h3>{titulo}</h3>

      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data,
              arcLabel: getArcLabel,
              arcLabelMinAngle: 35, // so mostra a porcentagem se a fatia for grande o suficiente
              outerRadius: 100,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" }
            }
          ]}
          sx={{
            [`& .${pieClasses.root}`]: {
              fill: "white",
              fontWeight: "bold"
            }
          }}
          width={250}
          height={250}
        />
      ) : (
        <p>sem dados para exibir.</p>
      )}
    </div>
  )
}
