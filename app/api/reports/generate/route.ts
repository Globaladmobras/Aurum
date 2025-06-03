import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reportType, period, metrics } = await request.json()

    // Simular geração de relatório
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const reportData = {
      id: Date.now().toString(),
      type: reportType,
      period,
      metrics,
      generatedAt: new Date().toISOString(),
      status: "completed",
      downloadUrl: `/api/reports/download/${Date.now()}`,
      data: {
        summary: {
          totalIncidents: 47,
          resolvedIncidents: 44,
          averageResponseTime: "3.2 min",
          systemUptime: "99.8%",
        },
        charts: {
          incidentsByCategory: [
            { category: "Alarmes", count: 20 },
            { category: "Câmeras", count: 15 },
            { category: "Incêndio", count: 8 },
            { category: "Rede", count: 4 },
          ],
          incidentsByDay: [
            { day: "Segunda", count: 8 },
            { day: "Terça", count: 6 },
            { day: "Quarta", count: 9 },
            { day: "Quinta", count: 7 },
            { day: "Sexta", count: 12 },
            { day: "Sábado", count: 3 },
            { day: "Domingo", count: 2 },
          ],
        },
      },
    }

    return NextResponse.json({
      success: true,
      report: reportData,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao gerar relatório",
      },
      { status: 500 },
    )
  }
}
