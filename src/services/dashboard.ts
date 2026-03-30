import type { DashboardResponse } from "../types/dashboard"

export async function getDashboardData(): Promise<DashboardResponse> {
  const response = await fetch("/api/dashboard")

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do dashboard")
  }

  return response.json()
}