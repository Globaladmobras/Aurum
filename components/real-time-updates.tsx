"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

interface RealTimeEvent {
  id: string
  type: "alarm" | "camera" | "fire" | "network"
  message: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
}

export function RealTimeUpdates() {
  const [events, setEvents] = useState<RealTimeEvent[]>([])

  useEffect(() => {
    // Simular WebSocket connection para atualizações em tempo real
    const interval = setInterval(() => {
      const eventTypes = ["alarm", "camera", "fire", "network"] as const
      const severities = ["low", "medium", "high", "critical"] as const
      const messages = [
        "Movimento detectado na entrada principal",
        "Sensor de fumaça ativado no 2º andar",
        "Dispositivo de rede desconectado",
        "Alarme de porta acionado na sala de servidores",
        "Câmera offline detectada",
        "Temperatura elevada no data center",
      ]

      // Gerar evento aleatório ocasionalmente
      if (Math.random() < 0.1) {
        // 10% de chance a cada 5 segundos
        const newEvent: RealTimeEvent = {
          id: Date.now().toString(),
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          timestamp: new Date(),
        }

        setEvents((prev) => [newEvent, ...prev.slice(0, 9)]) // Manter apenas os 10 mais recentes

        // Mostrar toast para eventos críticos
        if (newEvent.severity === "critical" || newEvent.severity === "high") {
          toast.error(newEvent.message, {
            description: `${newEvent.type.toUpperCase()} - ${newEvent.timestamp.toLocaleTimeString()}`,
          })
        }
      }
    }, 5000) // Verificar a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return null // Este componente não renderiza nada visualmente
}
