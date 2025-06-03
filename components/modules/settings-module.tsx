"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Users, Shield, Bell, Database, Network, Key, Mail, Smartphone, Save, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsModule() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true,
  })

  const [security, setSecurity] = useState({
    mfa: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
  })

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "Administrador",
      status: "active",
      lastLogin: "2023-06-15 14:30",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "Operador",
      status: "active",
      lastLogin: "2023-06-15 13:45",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      role: "Visualizador",
      status: "inactive",
      lastLogin: "2023-06-10 09:20",
    },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Administrador":
        return <Badge variant="destructive">Admin</Badge>
      case "Operador":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Operador
          </Badge>
        )
      case "Visualizador":
        return (
          <Badge variant="secondary" className="bg-gray-50 text-gray-700">
            Visualizador
          </Badge>
        )
      default:
        return <Badge variant="secondary">Usuário</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-50 text-green-700">Ativo</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-50 text-gray-700">
        Inativo
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
        <p className="text-gray-600">Gerenciar usuários, segurança e configurações gerais</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input id="companyName" defaultValue="SecureCore Ltda" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select id="timezone" className="w-full p-2 border rounded-md">
                      <option value="America/Sao_Paulo">América/São Paulo (UTC-3)</option>
                      <option value="America/New_York">América/Nova York (UTC-5)</option>
                      <option value="Europe/London">Europa/Londres (UTC+0)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <select id="language" className="w-full p-2 border rounded-md">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Descrição da Instalação</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva a instalação e localização do sistema..."
                    defaultValue="Sistema de segurança corporativa instalado na sede da empresa, cobrindo 4 andares e área externa."
                  />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciamento de Usuários</CardTitle>
                  <CardDescription>Controle de acesso e permissões</CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">Último acesso: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfis de Acesso</CardTitle>
              <CardDescription>Configurar permissões por perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Administrador", "Operador", "Visualizador"].map((role) => (
                  <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{role}</p>
                      <p className="text-sm text-gray-500">
                        {role === "Administrador" && "Acesso total ao sistema"}
                        {role === "Operador" && "Controle de alarmes e câmeras"}
                        {role === "Visualizador" && "Apenas visualização"}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Configurar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Políticas de autenticação e acesso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mfa">Autenticação Multifator (MFA)</Label>
                    <p className="text-sm text-gray-500">Exigir segundo fator para todos os usuários</p>
                  </div>
                  <Switch
                    id="mfa"
                    checked={security.mfa}
                    onCheckedChange={(checked) => setSecurity({ ...security, mfa: checked })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity({ ...security, passwordExpiry: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="loginAttempts">Máximo de Tentativas de Login</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={security.loginAttempts}
                    onChange={(e) => setSecurity({ ...security, loginAttempts: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configurações de Rede</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="allowedIPs">IPs Permitidos</Label>
                      <Textarea id="allowedIPs" placeholder="192.168.1.0/24&#10;10.0.0.0/8" />
                    </div>
                    <div>
                      <Label htmlFor="blockedIPs">IPs Bloqueados</Label>
                      <Textarea id="blockedIPs" placeholder="Lista de IPs bloqueados..." />
                    </div>
                  </div>
                </div>

                <Button>
                  <Shield className="h-4 w-4 mr-2" />
                  Salvar Configurações de Segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Configurar alertas e notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Canais de Notificação</h4>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-gray-500">Receber notificações por email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <div>
                        <Label>SMS</Label>
                        <p className="text-sm text-gray-500">Receber notificações por SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <div>
                        <Label>Push</Label>
                        <p className="text-sm text-gray-500">Notificações push no navegador</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <div>
                        <Label>Alertas Críticos</Label>
                        <p className="text-sm text-gray-500">Sempre notificar para eventos críticos</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.critical}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, critical: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configurações de Email</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpServer">Servidor SMTP</Label>
                      <Input id="smtpServer" placeholder="smtp.empresa.com" />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">Porta</Label>
                      <Input id="smtpPort" placeholder="587" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emailUser">Usuário</Label>
                      <Input id="emailUser" placeholder="sistema@empresa.com" />
                    </div>
                    <div>
                      <Label htmlFor="emailPassword">Senha</Label>
                      <Input id="emailPassword" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Salvar Configurações de Notificação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Manutenção e configurações técnicas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Banco de Dados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge className="bg-green-50 text-green-700">Online</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Uso:</span>
                          <span>2.4 GB / 10 GB</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Database className="h-4 w-4 mr-1" />
                          Backup
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Rede</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge className="bg-green-50 text-green-700">Conectado</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Latência:</span>
                          <span>12ms</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Network className="h-4 w-4 mr-1" />
                          Testar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Certificados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>SSL:</span>
                          <Badge className="bg-green-50 text-green-700">Válido</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expira:</span>
                          <span>90 dias</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Key className="h-4 w-4 mr-1" />
                          Renovar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Manutenção do Sistema</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reiniciar Serviços
                    </Button>
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Limpar Cache
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Logs do Sistema</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div>[2023-06-15 14:30:25] Sistema iniciado com sucesso</div>
                    <div>[2023-06-15 14:30:26] Conectado ao banco de dados</div>
                    <div>[2023-06-15 14:30:27] Serviços de segurança ativos</div>
                    <div>[2023-06-15 14:30:28] Sistema pronto para operação</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
