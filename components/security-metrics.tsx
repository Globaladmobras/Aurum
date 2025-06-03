"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function SecurityMetrics() {
  const metrics = [
    {
      name: "Incidentes Resolvidos",
      value: 94,
      target: 95,
      trend: "up",
      change: "+2.1%",
    },
    {
      name: "Tempo Médio de Resposta",
      value: 87,
      target: 90,
      trend: "down",
      change: "-5.3%",
    },
    {
      name: "Disponibilidade do Sistema",
      value: 99.8,
      target: 99.9,
      trend: "stable",
      change: "0.0%",
    },
    {
      name: "Alertas Falso-Positivos",
      value: 12,
      target: 10,
      trend: "up",
      change: "+1.2%",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Segurança</CardTitle>
        <CardDescription>Indicadores de desempenho do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm ${getTrendColor(metric.trend)}`}>{metric.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={metric.value} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{metric.value}%</span>
                  <span>Meta: {metric.target}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
