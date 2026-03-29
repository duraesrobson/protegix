import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import HeaderMobile from "./HeaderMobile"
import HeaderDesktop from "./HeaderDesktop"


export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />


}