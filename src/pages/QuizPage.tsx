import Quiz from "../components/quiz/Quiz"
import Leaderboard from "../components/quiz/Leaderboard"

export default function QuizPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 20 }}>
          Quiz interativo
        </h1>
        <p className="section-subtitle">
          Responda às perguntas e veja na hora se acertou, qual era a
          alternativa correta e por que ela é importante. Ao final, você pode
          salvar sua pontuação e disputar um lugar no ranking dos experts!
        </p>
        <Quiz />
        <Leaderboard />
      </div>
    </section>
  )
}
