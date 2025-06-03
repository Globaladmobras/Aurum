import { NextResponse } from "next/server"

const cameras = [
  {
    id: 1,
    name: "Entrada Principal",
    location: "Térreo",
    status: "online",
    recording: true,
    ip: "192.168.1.101",
    resolution: "1080p",
    fps: 30,
  },
  {
    id: 2,
    name: "Recepção",
    location: "Térreo",
    status: "online",
    recording: true,
    ip: "192.168.1.102",
    resolution: "1080p",
    fps: 30,
  },
  {
    id: 3,
    name: "Corredor 1º Andar",
    location: "1º Andar",
    status: "offline",
    recording: false,
    ip: "192.168.1.103",
    resolution: "720p",
    fps: 25,
  },
  {
    id: 4,
    name: "Sala de Reuniões",
    location: "2º Andar",
    status: "online",
    recording: true,
    ip: "192.168.1.104",
    resolution: "1080p",
    fps: 30,
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    cameras,
    summary: {
      total: cameras.length,
      online: cameras.filter((c) => c.status === "online").length,
      recording: cameras.filter((c) => c.recording).length,
    },
  })
}
