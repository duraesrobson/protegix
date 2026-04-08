import type {
  CrossAnalysisDoc,
  CrossAnalysisCell
} from "../../../types/crossAnalysisTypes"
import styles from "./CrossAnalysisTable.module.scss"

type CrossAnalysisTableProps = {
  data: CrossAnalysisDoc
}

function formatCellValue(value: CrossAnalysisCell | undefined) {
  if (value === undefined) return "-"

  if (typeof value === "number") {
    return value
  }

  return (
    <span className={styles.cellValue}>
      <span className={styles.count}>{value.count} </span>
      <span className={styles.percentage}>({value.percentage}%)</span>
    </span>
  )
}

export default function CrossAnalysisTable({
  data
}: CrossAnalysisTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={2}>{data.rowLabel}</th>
            <th colSpan={data.columns.length}>{data.columnLabel}</th>
          </tr>

          <tr>
            {data.columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.rows.map(row => (
            <tr key={row.label}>
              <td className={styles.rowLabel}>{row.label}</td>

              {data.columns.map(column => (
                <td key={column}>{formatCellValue(row.values[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}