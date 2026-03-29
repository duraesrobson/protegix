import AppButton from "../ui/AppButton"
import styles from "./HeroSection.module.scss"

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className="container hero-inner-container">
        <h1 className={styles.heroTitle}>
          Proteja sua vida digital com informação.
        </h1>
        <p className={styles.heroDescription}>
          Aprenda sobre segurança digital, conheça seus direitos e tome decisões
          mais seguras no ambiente online.
        </p>
        <div className={styles.heroButtons}>
          <AppButton text="Ver dashboard" to="/" />
          <AppButton text="Fazer quiz" to="/" variant="secondary" />
        </div>
      </div>
    </section>
  )
}
