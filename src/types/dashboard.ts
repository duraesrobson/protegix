export type ChartItem = {
  label: string
  value: number
}

export type DashboardResponse = {
  pcd: ChartItem[]
  crucial: ChartItem[]
  iA: ChartItem[]
}
