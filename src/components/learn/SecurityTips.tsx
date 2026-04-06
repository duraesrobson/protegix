import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import styles from "../../pages/learn/LearnPage.module.scss"

const tips = [
  {
    title: "Use senhas únicas e complexas",
    description:
      "Mínimo 12 caracteres com letras maiúsculas, minúsculas, números e símbolos. Use um gerenciador de senhas para não esquecer."
  },
  {
    title: "Ative autenticação de dois fatores",
    description:
      "Use apps de autenticação (Google Authenticator, Authy) em vez de SMS quando possível. SMS pode ser interceptado."
  },
  {
    title: "Desconfie de URLs e domínios",
    description:
      "Phishers usam URLs semelhantes às originais. Sempre verifique o endereço completo antes de clicar ou digitar senhas."
  },
  {
    title: "Mantenha contatos seguros em lista",
    description:
      "Adicione à lista segura pessoas e empresas que você confia para evitar confundir com invasores que fingem ser eles."
  },
  {
    title: "Use redes VPN em Wi-Fi público",
    description:
      "VPN criptografa sua conexão em redes abertas, impedindo que outros vejam seus dados e senhas."
  },
  {
    title: "Limpe o cache e cookies regularmente",
    description:
      "Esses arquivos podem conter dados sensíveis. Limpe-os semanalmente, especialmente após usar computadores públicos."
  }
]

export default function SecurityTips() {
  return (
    <section className={styles.tipSection}>
      <h2>Boas práticas de segurança digital</h2>
      <p>
        Pequenas atitudes do dia a dia ajudam a proteger você e seus dados
        pessoais.
      </p>

      <div className={styles.tipGrid}>
        {tips.map(tip => (
          <div key={tip.title} className={styles.tipCard}>
            <div>
              <div className={styles.tipHeader}>
                <span className={styles.tipIcon}>
                  <CheckCircleOutlineIcon fontSize="medium" />
                </span>
                <h3>{tip.title}</h3>
              </div>
              <p>{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
