"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, ImageIcon, Video, Download, Upload, Search, Filter, Eye, Share, Clock, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FileModule() {
  const [searchTerm, setSearchTerm] = useState("")

  const files = [
    {
      id: 1,
      name: "Relatório_Incidente_001.pdf",
      type: "document",
      size: "2.4 MB",
      classification: "confidential",
      uploadedBy: "João Silva",
      uploadDate: "2023-06-15 14:30",
      lastAccessed: "2023-06-15 16:45",
      version: "1.2",
    },
    {
      id: 2,
      name: "Gravacao_Camera01_20230615.mp4",
      type: "video",
      size: "125 MB",
      classification: "restricted",
      uploadedBy: "Sistema",
      uploadDate: "2023-06-15 14:25",
      lastAccessed: "2023-06-15 14:30",
      version: "1.0",
    },
    {
      id: 3,
      name: "Planta_Evacuacao_2Andar.png",
      type: "image",
      size: "1.8 MB",
      classification: "internal",
      uploadedBy: "Maria Santos",
      uploadDate: "2023-06-14 09:15",
      lastAccessed: "2023-06-15 11:20",
      version: "2.1",
    },
    {
      id: 4,
      name: "Log_Sistema_20230615.txt",
      type: "document",
      size: "456 KB",
      classification: "internal",
      uploadedBy: "Sistema",
      uploadDate: "2023-06-15 00:00",
      lastAccessed: "2023-06-15 08:30",
      version: "1.0",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case "confidential":
        return <Badge variant="destructive">Confidencial</Badge>
      case "restricted":
        return (
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            Restrito
          </Badge>
        )
      case "internal":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Interno
          </Badge>
        )
      case "public":
        return (
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            Público
          </Badge>
        )
      default:
        return <Badge variant="secondary">Não Classificado</Badge>
    }
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Arquivos</h1>
        <p className="text-gray-600">Armazenamento seguro e controle de documentos</p>
      </div>

      <Tabs defaultValue="files" className="space-y-4">
        <TabsList>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Biblioteca de Arquivos</CardTitle>
                  <CardDescription>Documentos e evidências do sistema de segurança</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Buscar arquivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{file.name}</span>
                          {getClassificationBadge(file.classification)}
                          <Badge variant="outline" className="text-xs">
                            v{file.version}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{file.size}</span>
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {file.uploadedBy}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {file.uploadDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Arquivos</CardTitle>
              <CardDescription>Adicionar novos documentos ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Arraste arquivos aqui</p>
                  <p className="text-sm text-gray-500 mb-4">ou clique para selecionar</p>
                  <Button>Selecionar Arquivos</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Classificação</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option value="public">Público</option>
                      <option value="internal">Interno</option>
                      <option value="restricted">Restrito</option>
                      <option value="confidential">Confidencial</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Categoria</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option value="incident">Relatório de Incidente</option>
                      <option value="evidence">Evidência</option>
                      <option value="documentation">Documentação</option>
                      <option value="log">Log do Sistema</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <textarea
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={3}
                    placeholder="Descreva o conteúdo do arquivo..."
                  />
                </div>

                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Fazer Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Log de Auditoria</CardTitle>
              <CardDescription>Histórico de acesso e modificações nos arquivos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    action: "Download",
                    file: "Relatório_Incidente_001.pdf",
                    user: "João Silva",
                    timestamp: "2023-06-15 16:45:23",
                    ip: "192.168.1.100",
                  },
                  {
                    action: "Visualização",
                    file: "Gravacao_Camera01_20230615.mp4",
                    user: "Maria Santos",
                    timestamp: "2023-06-15 14:30:15",
                    ip: "192.168.1.105",
                  },
                  {
                    action: "Upload",
                    file: "Log_Sistema_20230615.txt",
                    user: "Sistema",
                    timestamp: "2023-06-15 00:00:01",
                    ip: "127.0.0.1",
                  },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">
                          {log.action}: {log.file}
                        </p>
                        <p className="text-sm text-gray-500">
                          {log.user} • {log.ip} • {log.timestamp}
                        </p>
                      </div>
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
              <CardTitle>Configurações de Armazenamento</CardTitle>
              <CardDescription>Políticas de retenção e segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Retenção Padrão</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>30 dias</option>
                      <option>90 dias</option>
                      <option>1 ano</option>
                      <option>Permanente</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Criptografia</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>AES-256</option>
                      <option>AES-128</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Permissões por Classificação</h4>
                  <div className="space-y-2">
                    {["Público", "Interno", "Restrito", "Confidencial"].map((level) => (
                      <div key={level} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{level}</span>
                        <Button size="sm" variant="outline">
                          Configurar
                        </Button>
                      </div>
                    ))}
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
