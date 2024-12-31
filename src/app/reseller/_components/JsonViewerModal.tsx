'use client'

import { useState } from 'react'
import { Code2, Copy, Download, X } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface JsonViewerModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  jsonData: string | object | null
}

export function JsonViewerModal({ isOpen, onOpenChange, jsonData }: JsonViewerModalProps) {
  const [isCopied, setIsCopied] = useState(false)

  const formatJSON = (data: string | object | null) => {
    try {
      if (data === null) return "null"
      
      if (typeof data === 'string') {
        const decodedString = decodeURIComponent(data)
        const jsonObject = JSON.parse(decodedString)
        return JSON.stringify(jsonObject, null, 4)
      }
      return JSON.stringify(data, null, 4)
    } catch (error) {
      console.error('Error al formatear JSON:', error)
      return typeof data === 'string' ? data : JSON.stringify(data)
    }
  }

  // TODO: Función para colorear la sintaxis JSON con mejor manejo de objetos anidados 
  const syntaxHighlight = (json: string) => {
    // Primero escapamos caracteres HTML
    const escaped = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Luego aplicamos el coloreado de sintaxis
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|([{}[\]])|(\s*,\s*)|(\s*:\s*)/g,
      (match) => {
        // Colores para diferentes tipos de elementos
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            // Llaves del objeto
            return `<span class="text-purple-400">${match}</span>`
          }
          // Strings
          return `<span class="text-green-400">${match}</span>`
        } else if (/true|false/.test(match)) {
          // Booleanos
          return `<span class="text-yellow-400">${match}</span>`
        } else if (/null/.test(match)) {
          // Null
          return `<span class="text-red-400">${match}</span>`
        } else if (/^-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$/.test(match)) {
          // Números
          return `<span class="text-blue-400">${match}</span>`
        } else if (/[{}[\]]/.test(match)) {
          // Llaves y corchetes
          return `<span class="text-gray-400">${match}</span>`
        } else if (/,/.test(match)) {
          // Comas
          return `<span class="text-gray-500">${match}</span>`
        } else if (/:/.test(match)) {
          // Dos puntos
          return `<span class="text-gray-500">${match}</span>`
        }
        return match
      }
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatJSON(jsonData))
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const downloadJSON = () => {
    const element = document.createElement("a")
    const file = new Blob([formatJSON(jsonData)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = "comprobante.json"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg">
              JSON del Comprobante
            </DialogTitle>
           
          </div>
          <DialogDescription className="text-base">
            Visualización del JSON enviado a SUNAT
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <ScrollArea className="h-[500px] w-full rounded-md border bg-zinc-950 dark:bg-zinc-900">
            <pre 
              className="text-sm font-mono leading-relaxed p-6"
              style={{ tabSize: 4 }}
              dangerouslySetInnerHTML={{ 
                __html: syntaxHighlight(formatJSON(jsonData)) 
              }}
            />
          </ScrollArea>
        </div>

        <div className="flex justify-end items-center gap-4 mt-4">
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {isCopied ? "Copiado" : "Copiar JSON"}
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              onClick={downloadJSON}
              className="flex items-center gap-2"
            >
              Descargar JSON
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

