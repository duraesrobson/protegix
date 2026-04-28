import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined"
import { DashboardOutlined } from "@mui/icons-material"

export const headerNavLinks = [
  { to: "/", label: "Início", icon: HomeOutlinedIcon },
  { to: "/aprenda", label: "Aprenda", icon: SchoolOutlinedIcon },
  { to: "/quiz", label: "Quiz", icon: QuizOutlinedIcon },
  { to: "/dashboard", label: "Dashboard", icon: DashboardOutlined },
  { to: "/sobre", label: "Sobre Nós", icon: HomeOutlinedIcon }
]
