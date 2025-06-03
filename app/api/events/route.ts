import { type NextRequest, NextResponse } from "next/server"

// Simular banco de dados de eventos
const events = [
  {
    id: "1",
    type: "camera",
    title: "Movimento detectado - Entrada Principal",
    description: "Câmera 01 detectou movimento fora do horário comercial",
    severity: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "pending",
    location: "Entrada Principal",
  },
  {
    id: "2",
    type: "alarm",
    title: "Alarme acionado - Sala de Servidores",
    description: "Sensor de porta detectou abertura não autorizada",
    severity: "critical",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "acknowledged",
    location: "Sala de Servidores",
  },
  {
    id: "3",
    type: "network",
    title: "Dispositivo desconectado",
    description: "Switch do 3º andar perdeu conectividade",
    severity: "medium",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    status: "resolved",
    location: "3º Andar",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let filteredEvents = events

  if (type) {
    filteredEvents = filteredEvents.filter((event) => event.type === type)
  }

  if (status) {
    filteredEvents = filteredEvents.filter((event) => event.status === status)
  }

  filteredEvents = filteredEvents.slice(0, limit)

  return NextResponse.json({
    success: true,
    events: filteredEvents,
    total: events.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    const newEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: "pending",
      ...eventData,
    }

    events.unshift(newEvent)

    return NextResponse.json({
      success: true,
      event: newEvent,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar evento",
      },
      { status: 500 },
    )
  }
}
