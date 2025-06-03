"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Network, Router, Server, Monitor, Activity, Wifi, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NetworkModule() {
  const devices = [
    {
      id: 1,
      name: "Switch Principal",
      type: "switch",
      ip: "192.168.1.1",
      status: "online",
      uptime: "99.9%",
      traffic: 75,
      location: "Sala de TI",
    },
    {
      id: 2,
      name: "Router Firewall",
      type: "router",
      ip: "192.168.1.254",
      status: "online",
      uptime: "99.8%",
      traffic: 45,
      location: "Sala de TI",
    },
    {
      id: 3,
      name: "Access Point 1º Andar",
      type: "wifi",
      ip: "192.168.1.10",
      status: "warning",
      uptime: "98.5%",
      traffic: 85,
      location: "1º Andar",
    },
    {
      id: 4,
      name: "Switch 2º Andar",
      type: "switch",
      ip: "192.168.1.20",
      status: "offline",
      uptime: "0%",
      traffic: 0,
      location: "2º Andar",
    },
  ]

  const securityEvents = [
    {
      id: 1,
      type: "intrusion",
      source: "192.168.1.100",
      target: "192.168.1.50",
      severity: "high",
      description: "Tentativa de acesso não autorizado",
      timestamp: "14:30:25",
    },
    {
      id: 2,
      type: "malware",
      source: "192.168.1.75",
      target: "External",
      severity: "critical",
      description: "Tráfego suspeito detectado",
      timestamp: "14:25:10",
    },
    {
      id: 3,
      type: "ddos",
      source: "Multiple",
      target: "192.168.1.1",
      severity: "medium",
      description: "Possível ataque DDoS",
      timestamp: "14:20:45",
    },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "switch":
        return <Network className="h-4 w-4" />
      case "router":
        return <Router className="h-4 w-4" />
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "server":
        return <Server className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-50 text-green-700">Online</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
            Atenção
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
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
      case "low":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Baixo
          </Badge>
        )
      default:
        return <Badge variant="secondary">Info</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Monitoramento de Rede</h1>
        <p className="text-gray-600">Supervisão da infraestrutura de rede e segurança</p>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="topology">Topologia</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(device.type)}
                      <span className="font-medium text-sm">{device.name}</span>
                    </div>
                    {getStatusBadge(device.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-500">IP: {device.ip}</p>
                      <p className="text-gray-500">Local: {device.location}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Tráfego:</span>
                        <span>{device.traffic}%</span>
                      </div>
                      <Progress value={device.traffic} className="h-2" />
                    </div>
                    <div className="text-xs text-gray-500">Uptime: {device.uptime}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dispositivos com Problemas</CardTitle>
              <CardDescription>Dispositivos que requerem atenção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {devices
                  .filter((d) => d.status !== "online")
                  .map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getDeviceIcon(device.type)}
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-gray-500">
                            {device.ip} - {device.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(device.status)}
                        <Button size="sm" variant="outline">
                          Diagnosticar
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eventos de Segurança</CardTitle>
              <CardDescription>Ameaças e tentativas de intrusão detectadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-gray-500">
                          {event.source} → {event.target} • {event.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSeverityBadge(event.severity)}
                      <Button size="sm" variant="outline">
                        Investigar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Firewall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-50 text-green-700">Ativo</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bloqueios hoje:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">IDS/IPS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-50 text-green-700">Ativo</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Alertas hoje:</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Antivírus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-green-50 text-green-700">Atualizado</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Última varredura:</span>
                    <span className="font-medium">14:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tráfego</CardTitle>
              <CardDescription>Monitoramento do tráfego de rede em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.4 GB</div>
                    <p className="text-sm text-gray-500">Entrada</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1.8 GB</div>
                    <p className="text-sm text-gray-500">Saída</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">156</div>
                    <p className="text-sm text-gray-500">Conexões Ativas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">45ms</div>
                    <p className="text-sm text-gray-500">Latência Média</p>
                  </div>
                </div>

                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Tráfego em Tempo Real</p>
                    <p className="text-sm">Dados simulados para demonstração</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topology" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Topologia da Rede</CardTitle>
              <CardDescription>Visualização da estrutura da rede</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Network className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Mapa da Rede</p>
                  <p className="text-sm">Visualização interativa da topologia</p>
                  <Button className="mt-4" variant="outline">
                    Carregar Diagrama
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
