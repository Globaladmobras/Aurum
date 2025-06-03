"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportsModule() {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days")
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTemplates = [
    {
      id: 1,
      name: "Relatório de Incidentes",
      description: "Resumo completo de todos os incidentes de segurança",
      type: "security",
      frequency: "Mensal",
      lastGenerated: "2023-06-15",
      status: "available",
    },
    {
      id: 2,
      name: "Análise de Performance",
      description: "Métricas de desempenho dos sistemas de segurança",
      type: "performance",
      frequency: "Semanal",
      lastGenerated: "2023-06-14",
      status: "generating",
    },
    {
      id: 3,
      name: "Conformidade Regulatória",
      description: "Verificação de conformidade com normas de segurança",
      type: "compliance",
      frequency: "Trimestral",
      lastGenerated: "2023-06-01",
      status: "available",
    },
    {
      id: 4,
      name: "Auditoria de Acesso",
      description: "Log detalhado de acessos e permissões",
      type: "audit",
      frequency: "Mensal",
      lastGenerated: "2023-06-10",
      status: "available",
    },
  ]

  const metrics = [
    { name: "Total de Incidentes", value: "47", change: "-12%", trend: "down" },
    { name: "Tempo Médio de Resposta", value: "3.2 min", change: "+5%", trend: "up" },
    { name: "Taxa de Resolução", value: "94.2%", change: "+2.1%", trend: "up" },
    { name: "Disponibilidade do Sistema", value: "99.8%", change: "0%", trend: "stable" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-50 text-green-700">Disponível</Badge>
      case "generating":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Gerando...
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Erro</Badge>
      default:
        return <Badge variant="secondary">Pendente</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const generateReport = async (reportId: number) => {
    setIsGenerating(true)
    // Simular geração de relatório
    setTimeout(() => {
      setIsGenerating(false)
      alert("Relatório gerado com sucesso!")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
        <p className="text-gray-600">Análises detalhadas e relatórios de conformidade</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="custom">Personalizado</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.change} vs mês anterior</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incidentes por Categoria</CardTitle>
                <CardDescription>Distribuição dos tipos de incidentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Pizza</p>
                    <p className="text-sm">Dados simulados para demonstração</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendência de Incidentes</CardTitle>
                <CardDescription>Evolução ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Barras</p>
                    <p className="text-sm">Dados simulados para demonstração</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Relatórios Disponíveis</CardTitle>
                  <CardDescription>Relatórios pré-configurados e personalizados</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar relatórios..." className="w-64" />
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-400">Frequência: {report.frequency}</span>
                          <span className="text-xs text-gray-400">Último: {report.lastGenerated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(report.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateReport(report.id)}
                        disabled={isGenerating || report.status === "generating"}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {report.status === "generating" ? "Gerando..." : "Gerar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Análise Temporal</CardTitle>
                <CardDescription>Padrões de incidentes ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="period">Período:</Label>
                    <select
                      id="period"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="last7days">Últimos 7 dias</option>
                      <option value="last30days">Últimos 30 dias</option>
                      <option value="last90days">Últimos 90 dias</option>
                      <option value="lastyear">Último ano</option>
                    </select>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Gráfico de Análise Temporal</p>
                      <p className="text-sm">Período: {selectedPeriod}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
                <CardDescription>Descobertas automáticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Padrão Detectado</p>
                    <p className="text-xs text-blue-600">Aumento de 15% nos incidentes às sextas-feiras após 18h</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Melhoria</p>
                    <p className="text-xs text-green-600">Tempo de resposta reduziu 20% no último mês</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Atenção</p>
                    <p className="text-xs text-yellow-600">Zona B apresenta 30% mais alarmes falsos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Relatório Personalizado</CardTitle>
              <CardDescription>Configure um relatório com métricas específicas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportName">Nome do Relatório</Label>
                    <Input id="reportName" placeholder="Ex: Relatório Semanal de Segurança" />
                  </div>
                  <div>
                    <Label htmlFor="reportType">Tipo</Label>
                    <select id="reportType" className="w-full p-2 border rounded-md">
                      <option value="security">Segurança</option>
                      <option value="performance">Performance</option>
                      <option value="compliance">Conformidade</option>
                      <option value="audit">Auditoria</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Métricas Incluídas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      "Incidentes por categoria",
                      "Tempo de resposta",
                      "Taxa de resolução",
                      "Disponibilidade",
                      "Alarmes falsos",
                      "Acessos negados",
                    ].map((metric) => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Data Inicial</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Data Final</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequency">Frequência de Geração</Label>
                  <select id="frequency" className="w-full p-2 border rounded-md">
                    <option value="manual">Manual</option>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
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
