"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText, FileJson, CheckCircle2, MoreHorizontal, XCircle, CheckCircle, CircleCheck, Loader2 } from 'lucide-react'
import { OptionsMenu } from "./OptionsMenu"
import { Badge } from "@/components/ui/badge"

interface Comprobante {
  fecha: string
  tipo: string
  serie: string
  num: string
  ruc: string
  denominacion: string
  moneda: string
  tc: string
  totalOnerosa: number
  totalGratuita: number
  pagado: boolean
  anulado: boolean
  enviadoCliente: boolean
  estado: "pendiente" | "completado"
}

const comprobantes: Comprobante[] = [
  {
    fecha: "27/12/2024",
    tipo: "03",
    serie: "BU01",
    num: "12",
    ruc: "---",
    denominacion: "---",
    moneda: "S/",
    tc: "-",
    totalOnerosa: 75.00,
    totalGratuita: 0.00,
    pagado: false,
    anulado: false,
    enviadoCliente: true,
    estado: "pendiente"
  },
  {
    fecha: "27/12/2024",
    tipo: "03",
    serie: "BU01",
    num: "13",
    ruc: "74237028",
    denominacion: "JEASON CUEVA ESPINOZA",
    moneda: "S/",
    tc: "-",
    totalOnerosa: 75.00,
    totalGratuita: 0.00,
    pagado: false,
    anulado: true,
    enviadoCliente: false,
    estado: "completado"
  },
]

export function InvoicesTable() {
 const handleAction = (action: string) => {
    console.log("Action clicked:", action)
 }

  const validationInfo = {
    validacion: "PENDIENTE POR SUNAT",
    ambiente: "DEMO",
    local: "001 REST. PIURA",
    email: "arturo@gmail.com",
    usuario: "15 LUKAS",
    horaCreacion: "27 de diciembre de 2024 11:06",
    modo: "API"
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">FECHA</TableHead>
              <TableHead className="font-semibold">TIPO</TableHead>
              <TableHead className="font-semibold">SERIE</TableHead>
              <TableHead className="font-semibold">NUM.</TableHead>
              <TableHead className="font-semibold">RUC/DNI/ETC</TableHead>
              <TableHead className="font-semibold">DENOMINACIÓN</TableHead>
              <TableHead className="font-semibold">M</TableHead>
              <TableHead className="font-semibold">TC</TableHead>
              <TableHead className="font-semibold text-right">TOTAL ONEROSA</TableHead>
              <TableHead className="font-semibold text-right">TOTAL GRATUITA</TableHead>
              <TableHead className="font-semibold">ANULADO?</TableHead>
              <TableHead className="font-semibold">ENVIADO AL CLIENTE</TableHead>
              <TableHead className="font-semibold text-center">ESTADO</TableHead>
              <TableHead className="font-semibold text-center">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comprobantes.map((comprobante, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{comprobante.fecha}</TableCell>
                <TableCell>{comprobante.tipo}</TableCell>
                <TableCell>{comprobante.serie}</TableCell>
                <TableCell>{comprobante.num}</TableCell>
                <TableCell>{comprobante.ruc}</TableCell>
                <TableCell>{comprobante.denominacion}</TableCell>
                <TableCell>{comprobante.moneda}</TableCell>
                <TableCell>{comprobante.tc}</TableCell>
                <TableCell className="text-right">{comprobante.totalOnerosa.toFixed(2)}</TableCell>
                <TableCell className="text-center">{comprobante.totalGratuita.toFixed(2)}</TableCell>
                <TableCell>
                  {comprobante.anulado ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  {comprobante.enviadoCliente ? (
                    <Badge  variant="outline" className=" bg-green-100 text-green-600 border-green-200 rounded-full"> Enviado </Badge>
                  ) : (
                    <Badge  variant="outline" className=" bg-red-100 text-red-600 border-red-200 rounded-full"> No Enviado </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                {comprobante.estado === "pendiente" ? (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-600 border-yellow-200 rounded-full flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Pendiente
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200 rounded-full">
                    Enviado
                  </Badge>
                ) }
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700"
                    >
                      <FileJson className="h-4 w-4" />
                    </Button>
                  
                    <OptionsMenu 
                      onAction={handleAction}
                      validationInfo={validationInfo}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t bg-gray-50 p-4">
        <div className="grid gap-2 text-sm font-medium">
          <div className="flex justify-end">
            <span>Total de FACTURAS:</span>
            <span className="font-bold">S/0.00</span>
          </div>
          <div className="flex justify-end">
            <span>Total de BOLETAS DE VENTA:</span>
            <span className="font-bold">S/75.00</span>
          </div>
          <div className="flex justify-end">
            <span>Total de NOTAS DE CRÉDITO:</span>
            <span className="font-bold">S/0.00</span>
          </div>
          <div className="flex justify-end">
            <span>Total de NOTAS DE DÉBITO:</span>
            <span className="font-bold">S/0.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

