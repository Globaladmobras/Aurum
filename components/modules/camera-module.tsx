"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Camera, Play, RotateCw, ZoomIn, ZoomOut, Download, Search, Grid3X3, Maximize } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CameraModule() {
  const [selectedCamera, setSelectedCamera] = useState(1)
  const [isRecording, setIsRecording] = useState(false)

  const cameras = [
    { id: 1, name: "Entrada Principal", location: "Térreo", status: "online", recording: true },
    { id: 2, name: "Recepção", location: "Térreo", status: "online", recording: true },
    { id: 3, name: "Corredor 1º Andar", location: "1º Andar", status: "offline", recording: false },
    { id: 4, name: "Sala de Reuniões", location: "2º Andar", status: "online", recording: true },
    { id: 5, name: "Estacionamento", location: "Subsolo", status: "online", recording: true },
    { id: 6, name: "Sala de Servidores", location: "Subsolo", status: "online", recording: true },
  ]

  const recordings = [
    { id: 1, camera: "Entrada Principal", date: "2023-06-15", time: "14:30", duration: "00:05:23", size: "125 MB" },
    { id: 2, camera: "Recepção", date: "2023-06-15", time: "14:25", duration: "00:03:45", size: "89 MB" },
    { id: 3, camera: "Estacionamento", date: "2023-06-15", time: "14:20", duration: "00:08:12", size: "198 MB" },
  ]

  const getStatusBadge = (status: string) => {
    return status === "online" ? (
      <Badge className="bg-green-50 text-green-700">Online</Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-50 text-red-700">
        Offline
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Câmeras</h1>
        <p className="text-gray-600">Monitoramento e controle de câmeras de segurança</p>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Visualização ao Vivo</TabsTrigger>
          <TabsTrigger value="recordings">Gravações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Camera List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Câmeras</CardTitle>
                <CardDescription>Selecione uma câmera para visualizar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCamera === camera.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCamera(camera.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{camera.name}</span>
                      {getStatusBadge(camera.status)}
                    </div>
                    <p className="text-xs text-gray-500">{camera.location}</p>
                    <div className="flex items-center mt-2">
                      <Camera className="h-3 w-3 mr-1" />
                      <span className="text-xs">{camera.recording ? "Gravando" : "Parado"}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Video Feed */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{cameras.find((c) => c.id === selectedCamera)?.name}</CardTitle>
                      <CardDescription>{cameras.find((c) => c.id === selectedCamera)?.location}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Simulated Video Feed */}
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Feed da Câmera {selectedCamera}</p>
                      <p className="text-sm opacity-75">Simulação de vídeo ao vivo</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        {isRecording ? "Parar Gravação" : "Iniciar Gravação"}
                      </Button>
                    </div>

                    {/* PTZ Controls */}
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gravações</CardTitle>
                  <CardDescription>Histórico de gravações das câmeras</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar gravações..." className="w-64" />
                  <Button size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Camera className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{recording.camera}</p>
                        <p className="text-sm text-gray-500">
                          {recording.date} às {recording.time} • {recording.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{recording.size}</span>
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações das Câmeras</CardTitle>
              <CardDescription>Configurar parâmetros e políticas de gravação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Qualidade de Gravação</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Alta (1080p)</option>
                      <option>Média (720p)</option>
                      <option>Baixa (480p)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Retenção de Dados</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>30 dias</option>
                      <option>60 dias</option>
                      <option>90 dias</option>
                    </select>
                  </div>
                </div>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
