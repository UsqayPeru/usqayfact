"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, ExternalLink, MoreHorizontal, RefreshCw } from 'lucide-react'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Manual {
  title: string
  url: string
  isNew?: boolean
  format: 'JSON' | 'TXT'
}

interface Token {
  id: string
  description: string
  location: string
  route: string
  token: string
  isActive: boolean
  lastUsed: string
}

const manuals: Manual[] = [
  {
    title: "MANUAL para Facturas, Boletas de Venta y Notas para archivo",
    url: "#",
    format: "JSON"
  },
  {
    title: "MANUAL para Facturas, Boletas de Venta y Notas para archivo",
    url: "#",
    format: "TXT"
  },
  {
    title: "MANUAL para GUÍAS (Remitente, Transportista) para archivo",
    url: "#",
    format: "JSON",
    isNew: true
  }
]

const tokens: Token[] = [
  {
    id: "1",
    description: "reconexion",
    location: "LOCAL PRINCIPAL",
    route: "https://api.usqayfact",
    token: "eyJhbGciOiJIUzI1NiJ9.iJjZYWUxMmFhZWJYTRkOTk5",
    isActive: true,
    lastUsed: "2023-05-15T14:30:00Z"
  },
  {
    id: "2",
    description: "sucursal norte",
    location: "SUCURSAL NORTE",
    route: "https://api.usqayfact",
    token: "eyJhbGciOiJIUzI1NiJ9.iJjZYWUxMmFhZWJYTRkOTk6",
    isActive: false,
    lastUsed: "2023-05-10T09:15:00Z"
  }
]

export default function IntegrationPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})
  const [tokenStates, setTokenStates] = useState(tokens.map(t => ({ ...t })))

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [type]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const toggleTokenStatus = (id: string) => {
    setTokenStates(prev => prev.map(token => 
      token.id === id ? { ...token, isActive: !token.isActive } : token
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tokens</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo token
        </Button>
      </div>

   

      <div className="grid gap-6 md:grid-cols-2">
        {tokenStates.map((token) => (
          <Card key={token.id} className={`relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-1 `}></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl capitalize">{token.description}</CardTitle>
                  <CardDescription>{token.location}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`token-status-${token.id}`}
                    checked={token.isActive}
                    onCheckedChange={() => toggleTokenStatus(token.id)}
                  />
                  <Label htmlFor={`token-status-${token.id}`}>
                    {token.isActive ? 'Activo' : 'Inactivo'}
                  </Label>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Último uso: {formatDate(token.lastUsed)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">RUTA</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm flex-1 break-all">
                    {token.route}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(token.route, `route-${token.id}`)}
                    className="shrink-0"
                  >
                    <Copy className={`h-4 w-4 ${copiedStates[`route-${token.id}`] ? 'text-green-500' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">TOKEN</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm flex-1 break-all">
                    {token.token}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(token.token, `token-${token.id}`)}
                    className="shrink-0"
                  >
                    <Copy className={`h-4 w-4 ${copiedStates[`token-${token.id}`] ? 'text-green-500' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

