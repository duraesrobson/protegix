import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { LineChart } from "@mui/x-charts/LineChart"
import type { MarkElementProps } from "@mui/x-charts/LineChart"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import styles from "./ChartStyles.module.scss"

interface LineChartProps {
  ids: string[]
  labels: string[]
  titulo: string
}

export default function LineChartCard({ ids, labels, titulo }: LineChartProps) {
  const [pData, setPData] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const q = query(collection(db, "respostas"), where("perguntaId", "in", ids))

    const unsubscribe = onSnapshot(q, snapshot => {
      const somaPorId: Record<string, number> = {}
      const contagemPorId: Record<string, number> = {}

      snapshot.forEach(doc => {
        const { perguntaId, opcao } = doc.data()
        const valorNumerico = parseInt(opcao.replace("%", "")) || 0

        somaPorId[perguntaId] = (somaPorId[perguntaId] || 0) + valorNumerico
        contagemPorId[perguntaId] = (contagemPorId[perguntaId] || 0) + 1
      })

      const medias = ids.map(id => {
        const total = somaPorId[id] || 0
        const qtd = contagemPorId[id] || 1
        return Math.round(total / qtd)
      })

      setPData(medias)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [ids])

  function CustomMark(props: MarkElementProps) {
    const { x, y, color, dataIndex } = props

    return (
      <g>
        <circle cx={x} cy={y} r={isMobile ? 5 : 6} fill={color || "var(--color-primary)"} />
        <text
          x={x}
          y={Number(y) - (isMobile ? 10 : 15)}
          style={{
            textAnchor: "middle",
            fill: "var(--color-text)",
            fontSize: isMobile ? 10 : 12,
            fontWeight: "bold"
          }}
        >
          {pData[dataIndex]}%
        </text>
      </g>
    )
  }

  if (loading) return <p>carregando média de segurança...</p>

  return (
    <div className={styles.lineChartContainer}>
      <h3>{titulo}</h3>

      <LineChart
        series={[
          {
            data: pData,
            label: "Nível de Segurança Médio",
            area: true,
            color: "var(--color-primary)"
          }
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: labels,
            tickLabelStyle: {
              fill: "var(--color-text-muted)",
              fontSize: isMobile ? 9 : 11
            }
          }
        ]}
        yAxis={[
          {
            min: 0,
            max: 100,
            valueFormatter: (value: any) => `${value}%`,
            tickLabelStyle: {
              fill: "var(--color-text-muted)",
              padding: 10,
              fontSize: isMobile ? 10 : 12
            }
          }
        ]}
        margin={{
          right: isMobile ? 12 : 30,
          left: isMobile ? -10 : 0,
          top: isMobile ? 28 : 40,
          bottom: isMobile ? 20 : 30
        }}
        slots={{ mark: CustomMark }}
        height={isMobile ? 200 : 350}
      />
    </div>
  )
}