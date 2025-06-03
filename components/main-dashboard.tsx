"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Shield, Flame, Network, Activity, FileText, Eye } from "lucide-react"
import { SystemStatus } from "@/components/system-status"
import { RecentEvents } from "@/components/recent-events"
import { SecurityMetrics } from "@/components/security-metrics"

export function MainDashboard() {
  const stats = [
    {
      title: "Câmeras Ativas",
      value: "24/26",
      icon: Camera,
      status: "warning",
      description: "2 câmeras offline",
    },
    {
      title: "Alarmes Ativos",
      value: "3",
      icon: Shield,
      status: "critical",
      description: "Requer atenção imediata",
    },
    {
      title: "Sensores Incêndio",
      value: "45/45",
      icon: Flame,
      status: "success",
      description: "Todos operacionais",
    },
    {
      title: "Dispositivos Rede",
      value: "156/160",
      icon: Network,
      status: "warning",
      description: "4 dispositivos offline",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Segurança</h1>
        <p className="text-gray-600">Visão geral do sistema de segurança corporativa</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${getStatusColor(stat.status)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="lg:col-span-2">
          <SystemStatus />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Controles frequentemente utilizados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar Todas as Câmeras
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Central de Alarmes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Status da Rede
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEvents />
        <SecurityMetrics />
      </div>
    </div>
  )
}
