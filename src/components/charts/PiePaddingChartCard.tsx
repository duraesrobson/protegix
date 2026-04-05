import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { PieChart } from "@mui/x-charts/PieChart"
import type { PieValueType } from "@mui/x-charts/models"
import { chartPalette } from "./ChartCollorPallets"
import { generateChartInsight } from "../../utils/generateChartInsight"
import styles from "./ChartStyles.module.scss"

interface PiePaddingChartProps {
  perguntaId: string
  titulo: string
  variant?: "donut" | "gauge"
  hideLegend?: boolean
}

interface PiePaddingChartData extends PieValueType {
  id: string | number
  label: string
  value: number
  color?: string // Adicionado para suportar sua paleta
}

export default function PiePaddingChartCard({
  perguntaId,
  titulo,
  variant = "donut"
}: PiePaddingChartProps) {
  const [data, setData] = useState<PiePaddingChartData[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Calcule o total de respostas
  const totalRespostas = data.reduce((acc, item) => acc + item.value, 0)

  // Função para o Tooltip (Hover)
  const valueFormatter = (item: { value: number }) => {
    const percent = ((item.value / totalRespostas) * 100).toFixed(1)
    return `${item.value} respostas (${percent}%)`
  }

  const arcLabel = (item: { value: number }) => {
    const percent = totalRespostas
      ? Math.round((item.value / totalRespostas) * 100)
      : "0"
    return `${percent}%`
  }

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

      // ordena as chaves para garantir consistência de cores
      const sortedLabels = Object.keys(counts).sort((a, b) =>
        a.localeCompare(b)
      )

      // mapeia os dados injetando a cor da sua paleta
      const formatted: PiePaddingChartData[] = sortedLabels.map(
        (key, index) => {
          let label = key

          if (perguntaId === "falta_de_acesso") {
            label = key === "Sim" ? "Foi impactado" : "Não foi impactado"
          }

          if (perguntaId === "lgpd") {
            label = key === "Sim" ? "Conhece" : "Não conhece"
          }

          return {
            id: index,
            label,
            value: counts[key],
            color: chartPalette[index % chartPalette.length]
          }
        }
      )
      setData(formatted)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [perguntaId])

  if (loading) return <p>carregando...</p>

  const gaugeSettings =
    variant === "gauge"
      ? {
          startAngle: -90,
          endAngle: 90,
          cy: "100%"
        }
      : {}

  // gera um insight automático baseado nos dados do gráfico
  const insight = generateChartInsight({
    perguntaId,
    titulo,
    data,
    total: totalRespostas
  })

  return (
    <div className={styles.piePaddingChartContainer}>
      <h3>{titulo}</h3>

      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data,
              paddingAngle: 5,
              innerRadius: "45%",
              outerRadius: "80%",
              cornerRadius: 5,
              highlightScope: { fade: "global", highlight: "item" },
              valueFormatter,
              arcLabel,
              faded: {
                innerRadius: 75,
                additionalRadius: -20,
                color: "var(--color-surface-alt)"
              },
              arcLabelMinAngle: 20,
              ...gaugeSettings
            }
          ]}
          sx={{
            "& .MuiPieArcLabel-root": {
              fill: "var(--color-text-inverse)",
              fontWeight: "bold",
              fontSize: 14
            }
          }}
          slotProps={{
            legend: {
              direction: "horizontal",
              position: {
                vertical: "bottom",
                horizontal: "center"
              },
              sx: {
                color: "var(--color-text-muted)"
              }
            }
          }}
          // Centraliza o SVG dentro do container
          height={260}
        />
      ) : (
        <p>sem dados para exibir.</p>
      )}
      <div className={styles.chartInsightContainer}>
        <p className={styles.chartInsightText}>{insight}</p>
      </div>
    </div>
  )
}
