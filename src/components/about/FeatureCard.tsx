import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 24,
        transition: "all 0.3s ease"
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16
        }}
      >
        {icon}
      </div>
      <h3 style={{ color: "var(--color-text)", fontWeight: 600, marginBottom: 8, marginTop: 0 }}>
        {title}
      </h3>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
        {description}
      </p>
    </div>
  )
}