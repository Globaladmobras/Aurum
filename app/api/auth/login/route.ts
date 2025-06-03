import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { username, password, mfaCode } = await request.json()

    // Simular validação de credenciais
    if (username === "admin" && password === "admin123") {
      // Simular validação MFA
      if (mfaCode && mfaCode === "123456") {
        // Gerar JWT token
        const token = sign(
          {
            userId: "1",
            username: "admin",
            role: "administrator",
            permissions: ["read", "write", "admin"],
          },
          JWT_SECRET,
          { expiresIn: "24h" },
        )

        const response = NextResponse.json({
          success: true,
          message: "Login realizado com sucesso",
          user: {
            id: "1",
            username: "admin",
            email: "admin@empresa.com",
            role: "administrator",
          },
        })

        // Definir cookie httpOnly com o token
        response.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 86400, // 24 horas
        })

        return response
      } else if (!mfaCode) {
        return NextResponse.json({
          success: false,
          requireMFA: true,
          message: "Código MFA necessário",
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Código MFA inválido",
          },
          { status: 401 },
        )
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Credenciais inválidas",
      },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
