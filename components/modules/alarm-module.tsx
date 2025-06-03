"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle, CheckCircle, Clock, MapPin, User, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AlarmModule() {
  const [selectedAlarm, setSelectedAlarm] = useState<number | null>(null)

  const alarms = [
    {
      id: 1,
      zone: "Entrada Principal",
      type: "Movimento",
      status: "active",
      priority: "high",
      timestamp: "14:30:25",
      description: "Sensor de movimento ativado fora do horário comercial",
    },
    {
      id: 2,
      zone: "Sala de Servidores",
      type: "Porta",
      status: "active",
      priority: "critical",
      timestamp: "14:25:10",
      description: "Porta aberta sem autorização",
    },
    {
      id: 3,
      zone: "Estacionamento",
      type: "Perímetro",
      status: "acknowledged",
      priority: "medium",
      timestamp: "14:20:45",
      description: "Sensor de perímetro ativado",
    },
    {
      id: 4,
      zone: "Recepção",
      type: "Vidro",
      status: "resolved",
      priority: "low",
      timestamp: "14:15:30",
      description: "Sensor de quebra de vidro - falso alarme",
    },
  ]

  const zones = [
    { id: 1, name: "Entrada Principal", sensors: 4, status: "armed" },
    { id: 2, name: "Sala de Servidores", sensors: 6, status: "armed" },
    { id: 3, name: "Estacionamento", sensors: 8, status: "armed" },
    { id: 4, name: "Recepção", sensors: 3, status: "disarmed" },
    { id: 5, name: "Escritórios", sensors: 12, status: "partial" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Ativo</Badge>
      case "acknowledged":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Reconhecido
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            Resolvido
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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
      case "low":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Baixo
          </Badge>
        )
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getZoneStatusBadge = (status: string) => {
    switch (status) {
      case "armed":
        return <Badge className="bg-red-50 text-red-700">Armado</Badge>
      case "disarmed":
        return (
          <Badge variant="secondary" className="bg-gray-50 text-gray-700">
            Desarmado
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Parcial
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Alarmes</h1>
        <p className="text-gray-600">Monitoramento e controle de alarmes de segurança</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Alarmes Ativos</TabsTrigger>
          <TabsTrigger value="zones">Zonas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alarm List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alarmes Ativos</CardTitle>
                  <CardDescription>Alarmes que requerem atenção imediata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alarms
                    .filter((alarm) => alarm.status === "active")
                    .map((alarm) => (
                      <div
                        key={alarm.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAlarm === alarm.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedAlarm(alarm.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <span className="font-medium">{alarm.zone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(alarm.priority)}
                            {getStatusBadge(alarm.status)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alarm.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Tipo: {alarm.type}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {alarm.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Alarm Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Alarme</CardTitle>
                <CardDescription>
                  {selectedAlarm ? "Informações e ações disponíveis" : "Selecione um alarme"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAlarm ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">Localização</span>
                      </div>
                      <p className="text-sm text-gray-600">{alarms.find((a) => a.id === selectedAlarm)?.zone}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notas do Operador</label>
                      <Textarea placeholder="Adicione observações sobre este alarme..." />
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Reconhecer Alarme
                      </Button>
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Enviar Equipe
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Contatar Responsável
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Selecione um alarme para ver os detalhes</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zonas de Segurança</CardTitle>
              <CardDescription>Controle e status das zonas de alarme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {zones.map((zone) => (
                  <Card key={zone.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{zone.name}</CardTitle>
                        {getZoneStatusBadge(zone.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sensores:</span>
                          <span className="font-medium">{zone.sensors}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Armar
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Desarmar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Alarmes</CardTitle>
              <CardDescription>Registro completo de todos os alarmes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alarms.map((alarm) => (
                  <div key={alarm.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {alarm.zone} - {alarm.type}
                        </p>
                        <p className="text-sm text-gray-500">{alarm.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{alarm.timestamp}</span>
                      {getStatusBadge(alarm.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
