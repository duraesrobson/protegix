import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined"
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined"
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined"
import PhonelinkLockOutlinedIcon from "@mui/icons-material/PhonelinkLockOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import styles from "../../pages/learn/LearnPage.module.scss"

const actions = [
  {
    title: "Auditoria de permissões",
    description:
      "Revise quais aplicativos têm acesso à câmera, localização e contatos. Remova permissões desnecessárias.",
    icon: <HttpsOutlinedIcon fontSize="large" />
  },
  {
    title: "Backups automáticos",
    description:
      "Ative backups na nuvem para proteger seus arquivos e mensagens importantes contra perdas.",
    icon: <ShieldOutlinedIcon fontSize="large" />
  },
  {
    title: "Logins recentes",
    description:
      "Verifique acessos às suas contas e desconecte sessões que não reconheça como suas.",
    icon: <AutoFixHighOutlinedIcon fontSize="large" />
  },
  {
    title: "Atualize seus softwares",
    description:
      "Mantenha o sistema operacional e aplicativos atualizados para corrigir falhas de segurança conhecidas.",
    icon: <UpdateOutlinedIcon fontSize="large" />
  },
  {
    title: "Bloqueio de tela automático",
    description:
      "Configure um tempo curto para o bloqueio automático de tela em seu celular e computador.",
    icon: <PhonelinkLockOutlinedIcon fontSize="large" />
  },
  {
    title: "Oculte notificações",
    description:
      "Configure a tela de bloqueio para não exibir o conteúdo de mensagens e códigos de verificação.",
    icon: <VisibilityOffOutlinedIcon fontSize="large" />
  }
]

export default function SecurityActions() {
  return (
    <section className={styles.actionSection}>
      <div className={styles.sectionHeader}>
        <h2>Como agir agora</h2>
        <p>
          Coloque em prática pequenas ações hoje mesmo para reduzir riscos e
          tornar sua navegação mais segura.
        </p>
      </div>

      <div className={styles.actionGrid}>
        {actions.map(action => (
          <article key={action.title} className={styles.actionCard}>
            <div className={styles.actionHeader}>
              <div className={styles.actionIcon}>{action.icon}</div>
              <h3>{action.title}</h3>
            </div>
            <div>
              <p>{action.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
