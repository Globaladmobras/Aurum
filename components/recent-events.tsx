"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Shield, Flame, Network, AlertTriangle, Eye, Clock } from "lucide-react"

export function RecentEvents() {
  const events = [
    {
      id: 1,
      type: "camera",
      title: "Movimento detectado - Entrada Principal",
      description: "Câmera 01 detectou movimento fora do horário comercial",
      severity: "high",
      timestamp: "2 min atrás",
      status: "pending",
    },
    {
      id: 2,
      type: "alarm",
      title: "Alarme acionado - Sala de Servidores",
      description: "Sensor de porta detectou abertura não autorizada",
      severity: "critical",
      timestamp: "5 min atrás",
      status: "acknowledged",
    },
    {
      id: 3,
      type: "network",
      title: "Dispositivo desconectado",
      description: "Switch do 3º andar perdeu conectividade",
      severity: "medium",
      timestamp: "12 min atrás",
      status: "resolved",
    },
    {
      id: 4,
      type: "fire",
      title: "Teste de sensor concluído",
      description: "Teste semanal dos sensores de incêndio realizado com sucesso",
      severity: "info",
      timestamp: "1 hora atrás",
      status: "resolved",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "camera":
        return <Camera className="h-4 w-4" />
      case "alarm":
        return <Shield className="h-4 w-4" />
      case "fire":
        return <Flame className="h-4 w-4" />
      case "network":
        return <Network className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "high":
        return (
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            Alto
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Médio
          </Badge>
        )
      case "info":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Info
          </Badge>
        )
      default:
        return <Badge variant="secondary">Baixo</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Pendente
          </Badge>
        )
      case "acknowledged":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            Reconhecido
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos Recentes</CardTitle>
        <CardDescription>Últimas atividades do sistema de segurança</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{getEventIcon(event.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(event.severity)}
                    {getStatusBadge(event.status)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.timestamp}
                  </div>
                  {event.status === "pending" && (
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Investigar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" className="w-full">
            Ver Todos os Eventos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
