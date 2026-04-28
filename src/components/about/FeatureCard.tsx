import type { ReactNode } from "react"
import styles from "./FeatureCard.module.scss"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.title}>
        {title}
      </h3>
      <p className={styles.description}>
        {description}
      </p>
    </div>
  )
}