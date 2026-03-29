import type { PropsWithChildren } from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  )
}
