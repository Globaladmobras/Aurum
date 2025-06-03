import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MainDashboard } from "@/components/main-dashboard"

export default function HomePage() {
  // Simular verificação de autenticação
  const isAuthenticated = true // Em produção, verificar token/sessão

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <MainDashboard />
    </DashboardLayout>
  )
}
