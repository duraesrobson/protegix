import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { PieChart, pieClasses } from "@mui/x-charts/PieChart"
import type { DefaultizedPieValueType } from "@mui/x-charts/models"
import { chartPalette } from "./ChartCollorPallets"
import styles from "./ChartStyles.module.scss"
import { generateChartInsight } from "../../utils/generateChartInsight"

interface PieProps {
  perguntaId: string
  titulo: string
}

interface PieData {
  id: string | number
  label: string
  value: number
  color?: string // a cor agora faz parte do objeto de dados
}

export default function PieChartCard({ perguntaId, titulo }: PieProps) {
  const [data, setData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)

  // detecção de mobile
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

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

      // cria os dados basicos e ordena para manter a consistencia
      const rawData = Object.keys(counts)
        .map(key => ({
          label: key,
          value: counts[key]
        }))
        .sort((a, b) => a.label.localeCompare(b.label))

      // mapeia as cores da paleta baseada no indice ordenado
      const formatted: PieData[] = rawData.map((item, index) => ({
        id: index,
        ...item,
        color: chartPalette[index % chartPalette.length] // injeta a cor definida no tema
      }))

      setData(formatted)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [perguntaId])

  const total = data.reduce((acc, item) => acc + item.value, 0)

  const getArcLabel = (params: DefaultizedPieValueType) => {
    if (total === 0) return ""
    const percent = params.value / total
    return `${(percent * 100).toFixed(0)}%`
  }

  if (loading)
    return (
      <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
        carregando...
      </p>
    )

  // gera um insight automático baseado nos dados do gráfico
  const insight = generateChartInsight({
    perguntaId,
    titulo,
    data,
    total
  })

  return (
    <div className={styles.pieChartContainer}>
      <h3>{titulo}</h3>

      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data,
              arcLabel: getArcLabel,
              arcLabelMinAngle: 35,
              outerRadius: isMobile ? 80 : 100,
              highlightScope: { fade: "global", highlight: "item" },
              // configuracao do efeito de fade usando as cores do tema
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "var(--color-surface-alt)"
              }
            }
          ]}
          sx={{
            [`& .${pieClasses.root}`]: {
              fontWeight: "bold"
            },
            // cor do texto das etiquetas dentro do grafico
            [`& .MuiPieArcLabel-root`]: {
              fill: "var(--color-text-inverse)",
              fontSize: 14
            }
          }}
          // configuracao da legenda para manter o visual limpo
          slotProps={{
            legend: {
              direction: isMobile ? "horizontal" : "vertical",
              position: {
                vertical: isMobile ? "bottom" : "middle",
                horizontal: isMobile ? "center" : "end"
              },
              sx: {
                color: "var(--color-text-muted)"
              }
            }
          }}
          height={260}
        />
      ) : (
        <p style={{ color: "var(--color-text-muted)" }}>
          sem dados para exibir.
        </p>
      )}
      <div className={styles.chartInsightContainer}>
        <p className={styles.chartInsightText}>{insight}</p>
      </div>
    </div>
  )
}
