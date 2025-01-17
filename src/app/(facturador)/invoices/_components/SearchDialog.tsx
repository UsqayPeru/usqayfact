"use client"

import { FormEvent, useState } from "react"
//import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchFilter } from "@/interfaces/searchfilter.interface"

interface Props {
  isOpen: boolean
  onClose: () => void
  onApplyFilter: (filter: SearchFilter) => void
}

export function SearchDialog({ isOpen, onClose, onApplyFilter }: Props) {

  const [filter, setFilter] = useState<SearchFilter>({
    serie: '',
    numero: '',
    tipoComprobante: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onApplyFilter(filter)
    onClose()
  }

  const clearFilter = () => {
    setFilter({ serie: '', numero: '', tipoComprobante: '' })
    onApplyFilter({ serie: '', numero: '', tipoComprobante: '' })
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Buscar documento</DialogTitle>
            <p className="text-center text-sm text-gray-600">
              Se buscará los documentos que hayas emitido{" "}
              <span className="text-red-600">solamente en este local.</span>
            </p>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Serie (4 dígitos, Ejm. F001/B001/T001/RRR1/PPP1)
              </label>
              <Input placeholder="Ingrese serie" maxLength={4} value={filter.serie}
                onChange={(e) => setFilter({ ...filter, serie: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Número (1 hasta 8 dígitos)
              </label>
              <Input placeholder="Ingrese número" maxLength={8} value={filter.numero}
                onChange={(e) => setFilter({ ...filter, numero: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tipo de comprobante (opcional)
              </label>
              <Select
                value={filter.tipoComprobante}
                onValueChange={(value) => setFilter({ ...filter, tipoComprobante: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elegir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="factura">Factura</SelectItem>
                  <SelectItem value="boleta">Boleta</SelectItem>
                  <SelectItem value="nota-credito">Nota de Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                Buscar
              </Button>
              <Button
                variant="link"
                className="w-full text-blue-600"
                onClick={clearFilter}
              >
                Quitar filtro
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  )
}

