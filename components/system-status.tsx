"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, Activity, Server, Database, Wifi } from "lucide-react"

export function SystemStatus() {
  const systems = [
    {
      name: "Servidor Principal",
      status: "online",
      uptime: "99.9%",
      load: 45,
      icon: Server,
    },
    {
      name: "Banco de Dados",
      status: "online",
      uptime: "99.8%",
      load: 32,
      icon: Database,
    },
    {
      name: "Conectividade",
      status: "warning",
      uptime: "98.5%",
      load: 78,
      icon: Wifi,
    },
    {
      name: "Processamento IA",
      status: "online",
      uptime: "99.2%",
      load: 67,
      icon: Activity,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            Online
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Atenção
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="secondary" className="bg-red-50 text-red-700">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status do Sistema</CardTitle>
        <CardDescription>Monitoramento em tempo real dos componentes críticos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systems.map((system) => (
            <div key={system.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <system.icon className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(system.status)}
                    <span className="font-medium">{system.name}</span>
                    {getStatusBadge(system.status)}
                  </div>
                  <p className="text-sm text-gray-500">Uptime: {system.uptime}</p>
                </div>
              </div>
              <div className="text-right min-w-[100px]">
                <div className="text-sm font-medium">{system.load}%</div>
                <Progress value={system.load} className="w-20 h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
