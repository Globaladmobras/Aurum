import { NextResponse } from "next/server"

const alarms = [
  {
    id: 1,
    zone: "Entrada Principal",
    type: "Movimento",
    status: "active",
    priority: "high",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    description: "Sensor de movimento ativado fora do horário comercial",
    sensor_id: "MOV_001",
  },
  {
    id: 2,
    zone: "Sala de Servidores",
    type: "Porta",
    status: "active",
    priority: "critical",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    description: "Porta aberta sem autorização",
    sensor_id: "DOOR_002",
  },
  {
    id: 3,
    zone: "Estacionamento",
    type: "Perímetro",
    status: "acknowledged",
    priority: "medium",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    description: "Sensor de perímetro ativado",
    sensor_id: "PER_003",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    alarms,
    summary: {
      total: alarms.length,
      active: alarms.filter((a) => a.status === "active").length,
      critical: alarms.filter((a) => a.priority === "critical").length,
    },
  })
}
