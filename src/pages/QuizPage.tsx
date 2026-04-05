import Quiz from "../components/quiz/Quiz"

export default function QuizPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1 className="section-title">Quiz interativo</h1>
        <p className="section-subtitle">
          Responda às perguntas e veja na hora se acertou, qual era a alternativa correta e por que ela é importante.
        </p>
        <Quiz />
      </div>
    </section>
  )
}
