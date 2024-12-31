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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Send, Mail, DollarSign, FileOutput, Truck, XCircle, Search, FileJson, Check, Loader2 } from 'lucide-react'
import { useState } from "react"
import { Input } from "@/components/ui/input"

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
  validationInfo: ValidationInfo,
  pdfUrl?: string
}

export function OptionsMenu({ onAction, validationInfo, pdfUrl = "http://localhost:8080/api/pdf/10721937661-03-BU01-2.pdf" }: OptionsMenuProps) {
  const [showValidation, setShowValidation] = useState(false)
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [showAnulate, setShowAnulate] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'A4' | '80MM' | 'A5'>('A4')
  const [isLoading, setIsLoading] = useState(false)


  const handlePrintFormat = async (format: 'A4' | '80MM' | 'A5') => {
    setSelectedFormat(format)
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Opciones
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuItem onClick={() => setShowPreview(true)}>
            <FileText className="mr-2 h-4 w-4 " />
            <span>Ver / Imprimir PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowWhatsapp(true)}>
            <Send className="mr-2 h-4 w-4" />
            <span>Enviar por WhatsApp</span>
          </DropdownMenuItem>
      
          
          <DropdownMenuSeparator />
          
        
          <DropdownMenuItem onClick={() => onAction("credit-note")}>
            <FileOutput className="mr-2 h-4 w-4 " />
            <span>Generar NOTA DE CRÉDITO</span>
          </DropdownMenuItem>
          
          
          
          <DropdownMenuItem onClick={() => setShowAnulate(true)}>
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

       {/* Preview Dialog */}
       <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Comprobante: BU01-168</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
              <Button 
                variant="outline" 
                className="flex-1 h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handlePrintFormat('A4')}
              >
                <FileText className="h-6 w-6" />
                <span>A4</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handlePrintFormat('80MM')}
              >
                <FileText className="h-6 w-6" />
                <span>80MM</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handlePrintFormat('A5')}
              >
                <FileText className="h-6 w-6" />
                <span>A5</span>
              </Button>
            </div>
            <div className="border rounded-lg flex-1 overflow-hidden relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-[500px]"
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Cerrar
            </Button>
            <Button onClick={() => window.open(pdfUrl, '_blank')}>
              Descargar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showWhatsapp} onOpenChange={setShowWhatsapp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar comprobante por whatsapp</DialogTitle>
            <DialogDescription>
              Ingresa el número del cliente
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
                <Input 
                  placeholder="+51957532973"
                  className="w-full"
                />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWhatsapp(false)}>Cancelar</Button>
            <Button >Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAnulate} onOpenChange={setShowAnulate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar anulación de comprobante</DialogTitle>
            <DialogDescription>
              ¿Desea anular el comprobante electronico?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnulate(false)}>Cancelar</Button>
            <Button >Anular</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

