import { useMemo, useState } from "react"
import { quizQuestions } from "../../data/quiz"
import styles from "./Quiz.module.scss"

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const question = quizQuestions[index]
  const isAnswered = selected !== null
  const isLast = index === quizQuestions.length - 1

  const feedback = useMemo(() => {
    if (selected === null) return null
    return selected === question.correctIndex
      ? "Resposta correta."
      : "Resposta incorreta."
  }, [question.correctIndex, selected])

  function handleAnswer(optionIndex: number) {
    if (isAnswered) return
    setSelected(optionIndex)
    if (optionIndex === question.correctIndex) setScore(current => current + 1)
  }

  function handleNext() {
    if (isLast) {
      setIndex(0)
      setSelected(null)
      setScore(0)
      return
    }
    setIndex(current => current + 1)
    setSelected(null)
  }

  return (
    <article className={styles.cardQuiz}>
      <div className={styles.quizMeta}>
        <span>
          Pergunta {index + 1} de {quizQuestions.length}
        </span>
        <span>Pontuação: {score}</span>
      </div>

      <h2 className={styles.questionTitle}>{question.question}</h2>

      <div className={styles.quizOptions}>
        {question.options.map((option, optionIndex) => {
          let stateClass = ""
          if (isAnswered && optionIndex === question.correctIndex)
            stateClass = "correct"
          else if (isAnswered && optionIndex === selected)
            stateClass = "incorrect"

          return (
            <button
              key={option}
              className={`${styles.quizOption} ${stateClass ? styles[stateClass] : ""}`}
              onClick={() => handleAnswer(optionIndex)}
            >
              {option}
            </button>
          )
        })}
      </div>

      {isAnswered ? (
        <div style={{ marginTop: 18 }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>{feedback}</p>
          <p className={styles.sectionSubtitle}>{question.explanation}</p>
          <button className="btn btn-primary" onClick={handleNext}>
            {isLast ? "Recomeçar quiz" : "Próxima pergunta"}
          </button>
        </div>
      ) : null}
    </article>
  )
}
