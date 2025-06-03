"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Thermometer, Wind, Droplets, AlertTriangle, MapPin, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FireSafetyModule() {
  const sensors = [
    {
      id: 1,
      type: "smoke",
      location: "Sala de Servidores",
      floor: "Subsolo",
      status: "normal",
      value: 15,
      unit: "ppm",
      lastUpdate: "14:30:25",
    },
    {
      id: 2,
      type: "temperature",
      location: "Cozinha",
      floor: "Térreo",
      status: "warning",
      value: 85,
      unit: "°C",
      lastUpdate: "14:30:20",
    },
    {
      id: 3,
      type: "co2",
      location: "Auditório",
      floor: "1º Andar",
      status: "normal",
      value: 400,
      unit: "ppm",
      lastUpdate: "14:30:15",
    },
    {
      id: 4,
      type: "smoke",
      location: "Depósito",
      floor: "2º Andar",
      status: "critical",
      value: 150,
      unit: "ppm",
      lastUpdate: "14:29:45",
    },
  ]

  const sprinklers = [
    { id: 1, zone: "Zona A - Térreo", status: "armed", pressure: 95 },
    { id: 2, zone: "Zona B - 1º Andar", status: "armed", pressure: 92 },
    { id: 3, zone: "Zona C - 2º Andar", status: "maintenance", pressure: 0 },
    { id: 4, zone: "Zona D - Subsolo", status: "armed", pressure: 98 },
  ]

  const evacuationPlans = [
    { id: 1, floor: "Térreo", exits: 4, capacity: 150, status: "clear" },
    { id: 2, floor: "1º Andar", exits: 3, capacity: 120, status: "clear" },
    { id: 3, floor: "2º Andar", exits: 3, capacity: 120, status: "blocked" },
    { id: 4, floor: "Subsolo", exits: 2, capacity: 80, status: "clear" },
  ]

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "smoke":
        return <Flame className="h-4 w-4" />
      case "temperature":
        return <Thermometer className="h-4 w-4" />
      case "co2":
        return <Wind className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-50 text-green-700">Normal</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Atenção
          </Badge>
        )
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getSprinklerStatusBadge = (status: string) => {
    switch (status) {
      case "armed":
        return <Badge className="bg-green-50 text-green-700">Armado</Badge>
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            Manutenção
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getEvacuationStatusBadge = (status: string) => {
    switch (status) {
      case "clear":
        return <Badge className="bg-green-50 text-green-700">Livre</Badge>
      case "blocked":
        return <Badge variant="destructive">Bloqueado</Badge>
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
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Incêndio</h1>
        <p className="text-gray-600">Monitoramento de sensores e sistemas de combate a incêndio</p>
      </div>

      <Tabs defaultValue="sensors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sensors">Sensores</TabsTrigger>
          <TabsTrigger value="sprinklers">Sprinklers</TabsTrigger>
          <TabsTrigger value="evacuation">Evacuação</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="sensors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => (
              <Card key={sensor.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSensorIcon(sensor.type)}
                      <span className="font-medium text-sm">{sensor.location}</span>
                    </div>
                    {getStatusBadge(sensor.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {sensor.value} {sensor.unit}
                      </div>
                      <p className="text-sm text-gray-500">{sensor.floor}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {sensor.lastUpdate}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {sensor.floor}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Incêndio</CardTitle>
              <CardDescription>Sensores que requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sensors
                  .filter((s) => s.status !== "normal")
                  .map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getSensorIcon(sensor.type)}
                        <div>
                          <p className="font-medium">{sensor.location}</p>
                          <p className="text-sm text-gray-500">
                            {sensor.value} {sensor.unit} - {sensor.floor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(sensor.status)}
                        <Button size="sm" variant="outline">
                          Investigar
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sprinklers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Sprinklers</CardTitle>
              <CardDescription>Status e controle dos sistemas de aspersão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sprinklers.map((sprinkler) => (
                  <Card key={sprinkler.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{sprinkler.zone}</CardTitle>
                        {getSprinklerStatusBadge(sprinkler.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pressão:</span>
                          <span className="font-medium">{sprinkler.pressure} PSI</span>
                        </div>
                        <Progress value={sprinkler.pressure} className="h-2" />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Droplets className="h-4 w-4 mr-1" />
                            Testar
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Ativar
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

        <TabsContent value="evacuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Evacuação</CardTitle>
              <CardDescription>Status das rotas de fuga e capacidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evacuationPlans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{plan.floor}</p>
                        <p className="text-sm text-gray-500">
                          {plan.exits} saídas • Capacidade: {plan.capacity} pessoas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getEvacuationStatusBadge(plan.status)}
                      <Button size="sm" variant="outline">
                        Ver Planta
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Conformidade</CardTitle>
              <CardDescription>Relatórios e certificações de segurança contra incêndio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Último Teste</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">15/06</div>
                        <p className="text-sm text-gray-500">Teste mensal realizado</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Próximo Teste</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">15/07</div>
                        <p className="text-sm text-gray-500">Em 30 dias</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Conformidade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <p className="text-sm text-gray-500">Todos os requisitos</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">Gerar Relatório de Conformidade</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
