import AppLayout from "./components/layout/AppLayout"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import QuizPage from "./pages/QuizPage"
import LearnPage from "./pages/learn/LearnPage"
import DashboardPage from "./pages/dashboard/DashboardPage"

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/aprenda" element={<LearnPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AppLayout>
  )
}
