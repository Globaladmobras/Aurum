import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Segurança</h1>
          <p className="text-slate-300">Acesse sua central de monitoramento</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
