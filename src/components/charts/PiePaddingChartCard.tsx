import { useEffect, useState } from "react"
import { db } from "../../lib/firebase" // ajuste o caminho se necessario
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { PieChart, pieClasses } from "@mui/x-charts/PieChart"
import type { PieValueType } from "@mui/x-charts/models"
import Stack from "@mui/material/Stack"

interface PiePaddingChartProps {
  perguntaId: string // ex: "p1"
  titulo: string
  // variant permite escolher o estilo visual
  variant?: "donut" | "gauge"
  hideLegend?: boolean
}

// interface para os dados tipados do mui charts
interface PiePaddingChartData extends PieValueType {
  id: string | number
  label: string
  value: number
}

export default function PiePaddingChartCard({
  perguntaId,
  titulo,
  variant = "donut", // padrao e o donut completo
  hideLegend = false
}: PiePaddingChartProps) {
  const [data, setData] = useState<PiePaddingChartData[]>([])
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

      // formata e ordena alfabeticamente para o dashboard
      const formatted: PiePaddingChartData[] = Object.keys(counts)
        .map((key, index) => ({
          id: index,
          label: key,
          value: counts[key]
        }))
        .sort((a, b) => a.label.localeCompare(b.label))

      setData(formatted)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [perguntaId])

  if (loading) return <p>carregando...</p>

  // configuracoes especificas para cada variante
  const gaugeSettings =
    variant === "gauge"
      ? {
          startAngle: -90, // comeca na esquerda (9 horas)
          endAngle: 90, // termina na direita (3 horas)
          cy: "100%" // move o centro para a base do container
        }
      : {} // donut nao precisa de angulos extras

  return (
    <div>
      <h3>{titulo}</h3>

      {data.length > 0 ? (
        <Stack
          width={250}
          height={250}
        >
          <PieChart
            series={[
              {
                data,
                paddingAngle: 5, // espaçamento entre as fatias
                innerRadius: "60%", // cria o buraco do donut/gauge
                outerRadius: "100%", // preenche o container
                cornerRadius: 5, // bordas arredondadas (moderno)
                // espaco para interacoes
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray"
                },

                // espalha as labels de porcentagem se tiver espaço
                arcLabelMinAngle: 20,

                ...gaugeSettings // aplica as config de angulo se for gauge
              }
            ]}
            sx={{
              [`& .${pieClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: 14
              }
            }}
            hideLegend={hideLegend}
            // remove margens para o gauge nao ficar pequeno
            margin={
              variant === "gauge"
                ? { top: 0, bottom: 0, left: 10, right: 10 }
                : undefined
            }
          />
        </Stack>
      ) : (
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          sem dados para exibir.
        </p>
      )}
    </div>
  )
}
