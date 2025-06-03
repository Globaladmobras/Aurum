import { NextResponse } from "next/server"

const sensors = [
  {
    id: "SMOKE_001",
    type: "smoke",
    location: "Sala de Servidores",
    floor: "Subsolo",
    status: "normal",
    value: 15,
    unit: "ppm",
    threshold: 50,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "TEMP_002",
    type: "temperature",
    location: "Cozinha",
    floor: "Térreo",
    status: "warning",
    value: 85,
    unit: "°C",
    threshold: 80,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "CO2_003",
    type: "co2",
    location: "Auditório",
    floor: "1º Andar",
    status: "normal",
    value: 400,
    unit: "ppm",
    threshold: 1000,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: "SMOKE_004",
    type: "smoke",
    location: "Depósito",
    floor: "2º Andar",
    status: "critical",
    value: 150,
    unit: "ppm",
    threshold: 50,
    lastUpdate: new Date().toISOString(),
  },
]

export async function GET() {
  // Simular variação nos valores dos sensores
  const updatedSensors = sensors.map((sensor) => ({
    ...sensor,
    value: sensor.value + (Math.random() - 0.5) * 10,
    lastUpdate: new Date().toISOString(),
  }))

  return NextResponse.json({
    success: true,
    sensors: updatedSensors,
    summary: {
      total: sensors.length,
      normal: updatedSensors.filter((s) => s.status === "normal").length,
      warning: updatedSensors.filter((s) => s.status === "warning").length,
      critical: updatedSensors.filter((s) => s.status === "critical").length,
    },
  })
}
