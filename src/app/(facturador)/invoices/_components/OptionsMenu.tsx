"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Send, Mail, DollarSign, FileOutput, Truck, XCircle, Search, FileJson, Check } from 'lucide-react'
import { useState } from "react"

interface ValidationInfo {
  validacion: string
  ambiente: string
  local: string
  email: string
  usuario: string
  horaCreacion: string
  modo: string
}

interface OptionsMenuProps {
  onAction: (action: string) => void
  validationInfo: ValidationInfo
}

export function OptionsMenu({ onAction, validationInfo }: OptionsMenuProps) {
  const [showValidation, setShowValidation] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Opciones
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuItem onClick={() => onAction("print")}>
            <FileText className="mr-2 h-4 w-4 " />
            <span>Ver / Imprimir PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("whatsapp")}>
            <Send className="mr-2 h-4 w-4" />
            <span>Enviar por WhatsApp</span>
          </DropdownMenuItem>
      
          
          <DropdownMenuSeparator />
          
        
          <DropdownMenuItem onClick={() => onAction("credit-note")}>
            <FileOutput className="mr-2 h-4 w-4 " />
            <span>Generar NOTA DE CRÉDITO</span>
          </DropdownMenuItem>
          
          
          
          <DropdownMenuItem onClick={() => onAction("cancel")}>
            <XCircle className="mr-2 h-4 w-4 " />
            <span>Anular comprobante</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowValidation(true)} className="text-gray-600">
            <Search className="mr-2 h-4 w-4" />
            <span>Ver información de validación</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showValidation} onOpenChange={setShowValidation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Información de Validación</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium text-sm">VALIDACION:</div>
              <div className="text-right">{validationInfo.validacion}</div>
              
              <div className="font-medium text-sm">AMBIENTE:</div>
              <div className="text-right">{validationInfo.ambiente}</div>
              
              <div className="font-medium text-sm">LOCAL:</div>
              <div className="text-right">{validationInfo.local}</div>
              
              <div className="font-medium text-sm">EMAIL:</div>
              <div className="text-right">{validationInfo.email}</div>
              
              <div className="font-medium text-sm">USUARIO:</div>
              <div className="text-right">{validationInfo.usuario}</div>
              
              <div className="font-medium text-sm">HORA DE CREACIÓN:</div>
              <div className="text-right">{validationInfo.horaCreacion}</div>
              
              <div className="font-medium text-sm">MODO:</div>
              <div className="text-right">{validationInfo.modo}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

