"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, Search, Filter } from 'lucide-react'

export function InvoicesHeader() {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Documento</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo de Doc." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="factura">Factura</SelectItem>
              <SelectItem value="boleta">Boleta</SelectItem>
              <SelectItem value="nota-credito">Nota de Crédito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Entidad</label>
          <Input placeholder="Buscar por entidad" className="w-full" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fecha</label>
          <div className="flex gap-2">
            <Select defaultValue="27">
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Día" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="diciembre">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="2024">
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Acciones</label>
          <Button className="w-full bg-blue-600 hover:bg-blue-500">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descarga para Excel
        </Button>

        <div className="flex-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por anulación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="anulados">Anulados</SelectItem>
              <SelectItem value="no-anulados">No Anulados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
          <Search className="h-4 w-4" />
          Buscar Documento
        </Button>
      </div>
    </div>
  )
}

