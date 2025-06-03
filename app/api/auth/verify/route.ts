import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token não encontrado",
        },
        { status: 401 },
      )
    }

    const decoded = verify(token, JWT_SECRET) as any

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role,
        permissions: decoded.permissions,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Token inválido",
      },
      { status: 401 },
    )
  }
}
