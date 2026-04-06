import { type ReactNode } from "react"
import styles from "../../pages/learn/LearnPage.module.scss"

type SecurityCardProps = {
  title: string
  description: string
  icon: ReactNode
}

export default function SecurityCard({
  title,
  description,
  icon
}: SecurityCardProps) {
  return (
    <article className={styles.securityCard}>
      <div>
        <div className={styles.securityCardHeader}>
          <div className={styles.securityCardIcon}>{icon}</div>
          <h3 className={styles.securityCardTitle}>{title}</h3>
        </div>
        <p className={styles.securityCardDescription}>{description}</p>
      </div>
    </article>
  )
}
