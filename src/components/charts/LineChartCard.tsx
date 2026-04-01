import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { LineChart } from "@mui/x-charts/LineChart"
import type { MarkElementProps } from "@mui/x-charts/LineChart"
import Box from "@mui/material/Box"
import styles from "./ChartStyles.module.scss"

interface LineChartProps {
  ids: string[] // ids da grade: ["seg_navegacao", "seg_bancos", ...]
  labels: string[] // nomes para o eixo x: ["navegação", "bancos", ...]
  titulo: string
}

export default function LineChartCard({ ids, labels, titulo }: LineChartProps) {
 const [pData, setPData] = useState<number[]>([])
  const [totalRespostas, setTotalRespostas] = useState<number>(0) // começa com zero
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, "respostas"),
      where("perguntaId", "in", ids)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const somaPorId: Record<string, number> = {}
      const contagemPorId: Record<string, number> = {}

      snapshot.forEach((doc) => {
        const { perguntaId, opcao } = doc.data()
        const valorNumerico = parseInt(opcao.replace("%", "")) || 0

        somaPorId[perguntaId] = (somaPorId[perguntaId] || 0) + valorNumerico
        contagemPorId[perguntaId] = (contagemPorId[perguntaId] || 0) + 1
      })

      // pega o total baseado no primeiro id da lista
      if (ids.length > 0) {
        const primeiroId = ids[0]
        setTotalRespostas(contagemPorId[primeiroId] || 0)
      }

      const medias = ids.map((id) => {
        const total = somaPorId[id] || 0
        const qtd = contagemPorId[id] || 1
        return Math.round(total / qtd)
      })

      setPData(medias)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [ids])

  // componente interno para as bolinhas com texto (estilo mui charts)
  function CustomMark(props: MarkElementProps) {
    const { x, y, color, dataIndex } = props
    return (
      <g>
        <circle cx={x} cy={y} r={6} fill={color || "var(--color-primary)"} />
        <text
          x={x}
          y={Number(y) - 15}
          style={{
            textAnchor: "middle",
            fill: "var(--color-text)",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {pData[dataIndex]}%
        </text>
      </g>
    )
  }

  if (loading) return <p>carregando média de segurança...</p>

  return (
    <div className={styles.barChartContainer}>
      <h3>{titulo}</h3>
      <p className="teste">Total de respostas: {totalRespostas}</p>
      <Box sx={{ width: "100%", height: 350, mt: 2 }}>
        <LineChart
          series={[
            {
              data: pData,
              label: "Nível de Segurança Médio",
              area: true, // efeito visual preenchido embaixo da linha
              color: "var(--color-primary)",
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: labels,
              tickLabelStyle: { fill: "var(--color-text-muted)", fontSize: 11 },
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 100,
              valueFormatter: (value: any) => `${value}%`,
              tickLabelStyle: { fill: "var(--color-text-muted)"},
            },
          ]}
          slots={{ mark: CustomMark }}
          margin={{ right: 30, left: 40, top: 40 }}
        />
      </Box>
    </div>
  )
}