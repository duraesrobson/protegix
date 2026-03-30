import { BarChart } from "@mui/x-charts/BarChart"
import type { ChartItem } from "../../types/dashboard"

type DashboardBarChartProps = {
  title: string
  data: ChartItem[]
}

export default function DashboardBarChart({
  title,
  data,
}: DashboardBarChartProps) {
  const values = data.map((item) => item.value)
  const labels = data.map((item) => item.label)

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ marginBottom: 16 }}>{title}</h3>

      <BarChart
        height={300}
        series={[
          {
            data: values,
            label: title,
            id: `${title}-id`,
          },
        ]}
        xAxis={[
          {
            data: labels,
            scaleType: "band",
            height: 40,
          },
        ]}
        yAxis={[{ width: 50 }]}
      />
    </div>
  )
}