"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, Smartphone } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showMFA, setShowMFA] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    mfaCode: "",
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticação
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "admin123") {
        if (!showMFA) {
          setShowMFA(true)
          setIsLoading(false)
          return
        }
        // Simular verificação MFA
        if (credentials.mfaCode === "123456") {
          router.push("/")
        }
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Login Seguro
        </CardTitle>
        <CardDescription>
          {showMFA ? "Digite o código do seu autenticador" : "Entre com suas credenciais"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {!showMFA ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="mfa" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Código de Autenticação
              </Label>
              <Input
                id="mfa"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={credentials.mfaCode}
                onChange={(e) => setCredentials((prev) => ({ ...prev, mfaCode: e.target.value }))}
                required
              />
              <Alert>
                <AlertDescription>Digite o código de 6 dígitos do seu aplicativo autenticador.</AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verificando..." : showMFA ? "Verificar Código" : "Entrar"}
          </Button>
          {showMFA && (
            <Button type="button" variant="outline" className="w-full" onClick={() => setShowMFA(false)}>
              Voltar
            </Button>
          )}
        </CardFooter>
      </form>
      <div className="px-6 pb-6">
        <Alert>
          <AlertDescription className="text-sm">
            <strong>Demo:</strong> Use admin/admin123 para testar o sistema
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  )
}
