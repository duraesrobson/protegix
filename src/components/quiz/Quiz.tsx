import { useMemo, useState, useEffect } from "react"
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel
} from "@mui/material"
import { quizQuestions } from "../../data/quiz"
import { useLeaderboard } from "../../hooks/useLeaderboard"
import styles from "./Quiz.module.scss"

export default function Quiz() {
  const [selectedQuestions, setSelectedQuestions] = useState<
    typeof quizQuestions
  >([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [wantToSave, setWantToSave] = useState(false)
  const [savingScore, setSavingScore] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const { saveScore } = useLeaderboard()

  // Selecionar 10 perguntas aleatórias ao iniciar
  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setSelectedQuestions(shuffled.slice(0, 15))
  }, [])

  const question = selectedQuestions[index]
  const isAnswered = selected !== null
  const isLast = index === selectedQuestions.length - 1

  const feedback = useMemo(() => {
    if (selected === null) return null
    return selected === question?.correctIndex
      ? "Resposta correta."
      : "Resposta incorreta."
  }, [question?.correctIndex, selected])

  // Mensagens personalizadas baseadas na pontuação
  const getFinalMessage = (score: number) => {
    if (score === 0)
      return "Ops! Parece que você precisa aprender mais sobre segurança digital. Que tal revisar os conteúdos da página 'Aprenda'?"
    if (score <= 5)
      return "Você teve um bom começo! Há espaço para melhorar. Continue estudando sobre segurança digital."
    if (score <= 9)
      return "Bom trabalho! Você tem conhecimentos básicos sólidos sobre segurança digital."
    if (score <= 12)
      return "Excelente! Você demonstra um bom entendimento sobre segurança na internet."
    if (score <= 15)
      return "Parabéns! Você é um expert em segurança digital. Continue mantendo essas boas práticas!"
    return ""
  }

  function handleAnswer(optionIndex: number) {
    if (isAnswered || !question) return
    setSelected(optionIndex)
    if (optionIndex === question.correctIndex) setScore(current => current + 1)
  }

  function handleNext() {
    if (isLast) {
      setIsFinished(true)
      return
    }
    setIndex(current => current + 1)
    setSelected(null)
  }

  async function handleSaveScore() {
    if (!wantToSave) {
      setIsFinished(true)
      return
    }

    if (!playerName.trim()) {
      setSaveError("Por favor, digite seu nome")
      return
    }

    setSavingScore(true)
    setSaveError(null)

    try {
      const success = await saveScore(playerName.trim(), score, 10)
      if (success) {
        setSaveSuccess(true)
        setTimeout(() => {
          setIsFinished(true)
        }, 1500)
      } else {
        setSaveError("Erro ao salvar pontuação. Tente novamente.")
      }
    } catch (error) {
      setSaveError("Erro ao salvar pontuação. Tente novamente.")
    } finally {
      setSavingScore(false)
    }
  }

  function handleRestart() {
    // Selecionar novas 15 perguntas aleatórias
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setSelectedQuestions(shuffled.slice(0, 15))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setIsFinished(false)
    setPlayerName("")
    setWantToSave(false)
    setSaveError(null)
    setSaveSuccess(false)
  }

  // Não renderizar nada até as perguntas serem carregadas
  if (selectedQuestions.length === 0) {
    return <div>Carregando quiz...</div>
  }

  // Tela final com resultado
  if (isFinished) {
    return (
      <article className={styles.cardQuiz}>
        <div className={styles.quizMeta}>
          <span>Quiz finalizado!</span>
        </div>

        <h2 className={styles.questionTitle}>Resultado Final</h2>

        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "var(--color-primary)",
              marginBottom: "16px"
            }}
          >
            {score}/15
          </div>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: "24px"
            }}
          >
            {getFinalMessage(score)}
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleRestart}>
          Fazer outro quiz
        </button>
      </article>
    )
  }

  // Tela para salvar resultado (opcional)
  if (wantToSave && !saveSuccess) {
    return (
      <article className={styles.cardQuiz}>
        <div className={styles.quizMeta}>
          <span>Quiz finalizado!</span>
        </div>

        <h2 className={styles.questionTitle}>Salvar Resultado (Opcional)</h2>

        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <Typography
            variant="h4"
            sx={{ color: "var(--color-primary)", mb: 2 }}
          >
            {score}/15
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Digite seu nome para aparecer no ranking dos experts:
          </Typography>

          <Box sx={{ maxWidth: 300, mx: "auto", mb: 3 }}>
            <TextField
              fullWidth
              label="Seu nome"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 20 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "var(--color-border)" },
                  "&:hover fieldset": { borderColor: "var(--color-primary)" },
                  "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" }
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" }
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  handleSaveScore()
                }
              }}
            />
          </Box>

          {saveError && (
            <Alert severity="error" sx={{ mb: 2, maxWidth: 300, mx: "auto" }}>
              {saveError}
            </Alert>
          )}

          {saveSuccess && (
            <Alert severity="success" sx={{ mb: 2, maxWidth: 300, mx: "auto" }}>
              Pontuação salva com sucesso! 🎉
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Button
              variant="contained"
              onClick={handleSaveScore}
              disabled={savingScore || saveSuccess}
              sx={{
                backgroundColor: "var(--color-bg)",
                borderRadius: "16px",
                border: "1.5px solid var(--color-border)",
                color: "var(--color-text)",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  backgroundColor: "var(--color-surface)",
                  boxShadow: "var(--shadow-sm)"
                }
              }}
            >
              {savingScore
                ? "Salvando..."
                : saveSuccess
                  ? "Salvo!"
                  : "Salvar Pontuação"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setWantToSave(false)}
              disabled={savingScore}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1.5px solid var(--color-border)",
                color: "var(--color-text-inverse)",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  boxShadow: "var(--shadow-sm)"
                }
              }}
            >
              Não salvar
            </Button>
          </Box>
        </div>
      </article>
    )
  }

  return (
    <article className={styles.cardQuiz}>
      <div className={styles.quizMeta}>
        <span>
          Pergunta {index + 1} de {selectedQuestions.length}
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
            {isLast ? "Finalizar quiz" : "Próxima pergunta"}
          </button>
        </div>
      ) : null}

      {isLast && isAnswered && (
        <Box
          sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={wantToSave}
                onChange={e => setWantToSave(e.target.checked)}
                sx={{
                  color: "var(--color-primary)",
                  "&.Mui-checked": {
                    color: "var(--color-primary)"
                  }
                }}
              />
            }
            label="Quero salvar minha pontuação no ranking"
            sx={{ color: "var(--color-text)" }}
          />
        </Box>
      )}
    </article>
  )
}
