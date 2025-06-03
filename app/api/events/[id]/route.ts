import { type NextRequest, NextResponse } from "next/server"

// Simular banco de dados de eventos (mesmo array da rota principal)
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
]

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    const eventIndex = events.findIndex((event) => event.id === id)

    if (eventIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Evento não encontrado",
        },
        { status: 404 },
      )
    }

    events[eventIndex] = { ...events[eventIndex], ...updates }

    return NextResponse.json({
      success: true,
      event: events[eventIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar evento",
      },
      { status: 500 },
    )
  }
}
