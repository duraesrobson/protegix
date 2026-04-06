import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Collapse,
  Button
} from "@mui/material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { useLeaderboard } from "../../hooks/useLeaderboard"
import styles from "./Leaderboard.module.scss"

export default function Leaderboard() {
  const { leaderboard, loading, error } = useLeaderboard()
  const [expanded, setExpanded] = useState(false)

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${position}`
    }
  }

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "#FFD700"
      case 2:
        return "#C0C0C0"
      case 3:
        return "#CD7F32"
      default:
        return "var(--color-text-secondary)"
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Carregando ranking...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <div className={styles.leaderboardContainer}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          cursor: "pointer"
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmojiEventsIcon sx={{ color: "var(--color-primary)" }} />
          <h2 className={styles.leaderboardTitle}>Ranking dos Experts</h2>
        </Box>
        <Button
          className={styles.expandButton}
          endIcon={
            expanded ? (
              <ExpandLessIcon className={styles.expandIcon} />
            ) : (
              <ExpandMoreIcon className={styles.expandIcon} />
            )
          }
          sx={{
            color: "var(--color-text-secondary)",
            padding: 0,
            "& span": { margin: 0 }
          }}
        >
          {expanded}
        </Button>
      </Box>

      <Collapse in={expanded}>
        {leaderboard.length === 0 ? (
          <Paper
            sx={{ p: 3, textAlign: "center", bgcolor: "rgba(0, 0, 0, 0.02)" }}
          >
            <Typography variant="body2" color="text.secondary">
              Ainda não há pontuações registradas.
              <br />
              Seja o primeiro a fazer o quiz e aparecer no ranking!
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} className={styles.leaderboardTable}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      width: "60px",
                      fontSize: "0.875rem"
                    }}
                  >
                    Pos.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "0.875rem" }}>
                    Nome
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      width: "80px",
                      fontSize: "0.875rem"
                    }}
                  >
                    Pontos
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      width: "70px",
                      fontSize: "0.875rem"
                    }}
                  >
                    %
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((entry, index) => {
                  const position = index + 1
                  const percentage = Math.round(
                    (entry.score / 15) * 100
                  )

                  return (
                    <TableRow
                      key={entry.id}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "rgba(0, 0, 0, 0.02)"
                        },
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)"
                        }
                      }}
                    >
                      <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: getRankColor(position),
                            fontWeight: position <= 3 ? "bold" : "normal"
                          }}
                        >
                          {getRankIcon(position)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium" }}
                        >
                          {entry.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                        <Chip
                          label={`${entry.score}/15`}
                          size="small"
                          sx={{
                            height: "20px",
                            fontSize: "0.7rem",
                            backgroundColor:
                              percentage >= 80
                                ? "#4caf50"
                                : percentage >= 60
                                  ? "#2196f3"
                                  : "#757575",
                            color: "white"
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            color:
                              percentage >= 80
                                ? "success.main"
                                : percentage >= 60
                                  ? "primary.main"
                                  : "text.secondary"
                          }}
                        >
                          {percentage}%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Collapse>
    </div>
  )
}
