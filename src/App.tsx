import AppLayout from "./components/layout/AppLayout"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppLayout>
  )
}
