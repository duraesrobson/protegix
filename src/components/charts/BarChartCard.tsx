import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { BarChart } from "@mui/x-charts/BarChart"
import { chartPalette } from "./ChartCollorPallets"
import styles from "./ChartStyles.module.scss"

interface BarChartProps {
  perguntaId: string // ex: "p1", "p2"...
  titulo: string // o texto da pergunta
}

interface BarChartData {
  label: string
  value: number
  [key: string]: string | number | undefined
}

export default function BarChartCard({ perguntaId, titulo }: BarChartProps) {
  const [data, setData] = useState<BarChartData[]>([])
  const [loading, setLoading] = useState(true)
  const total = data.reduce((acc, item) => acc + item.value, 0)

  useEffect(() => {
    // cria a query filtrando pela pergunta especifica
    const q = query(
      collection(db, "respostas"),
      where("perguntaId", "==", perguntaId)
    )

    // escuta o firebase em tempo real
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const counts: Record<string, number> = {}

        snapshot.forEach(doc => {
          const res = doc.data().opcao
          if (res) {
            counts[res] = (counts[res] || 0) + 1
          }
        })

        // transforma o objeto de contagem em array para o mui charts
        const formatted = Object.keys(counts).map(key => ({
          label: key,
          value: counts[key]
        }))

        // ordena alfabeticamente pelo label (a, b, c...)
        const sortedData = formatted.sort((a, b) =>
          a.label.localeCompare(b.label)
        )

        setData(sortedData)
        setLoading(false)
      },
      error => {
        console.error("erro ao buscar dados do firebase:", error)
        setLoading(false)
      }
    )

    // limpa o listener ao desmontar o componente
    return () => unsubscribe()
  }, [perguntaId])

  if (loading) {
    return <p style={{ textAlign: "center" }}>carregando gráfico...</p>
  }

  return (
    <div className={styles.barChartContainer}>
      <h3>{titulo}</h3>

      {data.length > 0 ? (
        <BarChart
          dataset={data}
          xAxis={[
            {
              dataKey: "label",
              tickLabelStyle: { fill: "var(--color-text-muted)" }
            }
          ]}
          yAxis={[
            {
              tickLabelStyle: { fill: "var(--color-text-muted)" }
            }
          ]}
          series={[
            {
              dataKey: "value",
              label: "Total de respostas:",
              colorGetter: params => {
                return chartPalette[params.dataIndex % chartPalette.length]
              },
              barLabel: (item, context) => {
                if (!item.value || total === 0) return null

                const percent = Math.round((Number(item.value) / total) * 100)

                if (context.bar.height < 35) return null

                return `${percent}%`
              }
            }
          ]}
          slotProps={{
            legend: {
              sx: {display: "none"}
            }
          }}
          sx={{
            [`& .MuiBarLabel-root`]: {
              fill: "var(--color-text-inverse)",
              fontWeight: 700,
              fontSize: 14
            }
          }}
          height={260}
          margin={{ top: 40, left: -10, bottom: 0 }}
        />
      ) : (
        <p>nenhuma resposta encontrada para esta pergunta.</p>
      )}
    </div>
  )
}
