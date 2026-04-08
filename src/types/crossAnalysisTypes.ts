export type CrossAnalysisCell =
  | number
  | {
      count: number
      percentage: number
    }

export type CrossAnalysisRow = {
  label: string
  values: Record<string, CrossAnalysisCell>
}

export type CrossAnalysisDoc = {
  id: string
  title: string
  rowLabel: string
  columnLabel: string
  columns: string[]
  rows: CrossAnalysisRow[]
  insight: string
  createdAt?: {
    seconds: number
    nanoseconds: number
  }
  updatedAt?: {
    seconds: number
    nanoseconds: number
  }
}