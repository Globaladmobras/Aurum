"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Camera, Shield, Flame, Network } from "lucide-react"

export function NotificationCenter() {
  const [notifications] = useState([
    {
      id: 1,
      type: "camera",
      title: "Movimento detectado",
      message: "Câmera 01 - Entrada Principal",
      time: "2 min",
      unread: true,
    },
    {
      id: 2,
      type: "alarm",
      title: "Alarme acionado",
      message: "Sala de Servidores - Porta aberta",
      time: "5 min",
      unread: true,
    },
    {
      id: 3,
      type: "network",
      title: "Dispositivo offline",
      message: "Switch 3º andar desconectado",
      time: "12 min",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const getIcon = (type: string) => {
    switch (type) {
      case "camera":
        return <Camera className="h-4 w-4" />
      case "alarm":
        return <Shield className="h-4 w-4" />
      case "fire":
        return <Flame className="h-4 w-4" />
      case "network":
        return <Network className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
            <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{notification.title}</p>
                {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
              </div>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time} atrás</p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          <span className="w-full">Ver todas as notificações</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
