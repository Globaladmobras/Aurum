"use client"

import { useState, useEffect, useCallback } from "react"

interface RealTimeEvent {
  id: string
  type: "alarm" | "camera" | "fire" | "network"
  message: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  data?: any
}

export function useRealTime() {
  const [events, setEvents] = useState<RealTimeEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)

  const addEvent = useCallback((event: RealTimeEvent) => {
    setEvents((prev) => [event, ...prev.slice(0, 49)]) // Manter apenas os 50 mais recentes
  }, [])

  useEffect(() => {
    // Simular conexão WebSocket
    setIsConnected(true)

    const interval = setInterval(() => {
      // Simular eventos aleatórios
      if (Math.random() < 0.1) {
        // 10% de chance a cada 5 segundos
        const eventTypes = ["alarm", "camera", "fire", "network"] as const
        const severities = ["low", "medium", "high", "critical"] as const
        const messages = [
          "Movimento detectado na entrada principal",
          "Sensor de fumaça ativado no 2º andar",
          "Dispositivo de rede desconectado",
          "Alarme de porta acionado na sala de servidores",
          "Câmera offline detectada",
          "Temperatura elevada no data center",
          "Tentativa de acesso não autorizado",
          "Backup automático concluído",
        ]

        const newEvent: RealTimeEvent = {
          id: Date.now().toString(),
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          timestamp: new Date().toISOString(),
        }

        addEvent(newEvent)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [addEvent])

  return {
    events,
    isConnected,
    addEvent,
  }
}
