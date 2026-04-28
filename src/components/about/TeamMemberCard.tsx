import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

interface TeamMemberCardProps {
  name: string
  github?: string
  linkedin?: string
}

export default function TeamMemberCard({ name, github, linkedin }: TeamMemberCardProps) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        transition: "all 0.3s ease"
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          border: "3px solid var(--color-surface)",
          boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)"
        }}
      >
        <span style={{ color: "var(--color-text-inverse)", fontWeight: 700, fontSize: "1.5rem" }}>
          {name.charAt(0)}
        </span>
      </div>
      <h3 style={{ color: "var(--color-text)", fontWeight: 600, marginBottom: 0, marginTop: 0 }}>
        {name}
      </h3>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-text-muted)", transition: "color 0.2s ease" }}
          >
            <GitHubIcon fontSize="small" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-text-muted)", transition: "color 0.2s ease" }}
          >
            <LinkedInIcon fontSize="small" />
          </a>
        )}
      </div>
    </div>
  )
}