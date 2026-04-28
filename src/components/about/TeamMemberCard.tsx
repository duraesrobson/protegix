import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import styles from "./TeamMemberCard.module.scss"

interface TeamMemberCardProps {
  name: string
  github?: string
  linkedin?: string
  image?: string
}

export default function TeamMemberCard({
  name,
  github,
  linkedin,
  image
}: TeamMemberCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {image ? (
          <img
            src={image}
            alt={`foto de ${name}`}
            className={styles.avatarImage}
          />
        ) : (
          <span className={styles.avatarInitial}>
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h3 className={styles.name}>
        {name}
      </h3>
      <div className={styles.socialLinks}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <GitHubIcon fontSize="small" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <LinkedInIcon fontSize="small" />
          </a>
        )}
      </div>
    </div>
  )
}
