import AppLayout from "./components/layout/AppLayout"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import QuizPage from "./pages/QuizPage"

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </AppLayout>
  )
}
