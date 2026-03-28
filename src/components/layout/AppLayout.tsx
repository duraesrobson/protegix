import type { PropsWithChildren } from "react"
import Header from "./Header"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
