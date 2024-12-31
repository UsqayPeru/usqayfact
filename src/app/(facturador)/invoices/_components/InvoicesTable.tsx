"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, FileJson, XCircle, CircleCheck, Loader2 } from 'lucide-react'
import { OptionsMenu } from "./OptionsMenu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getInvoicesAll } from "@/services/invoices/invoice.service"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import LoadingTable from "../Loading"
import { Invoice } from "@/interfaces/invoices.interface"
import { useSearchParams } from "next/navigation"
import { useInvoicesFilter } from "../hooks/useFilterContext"
import { FilterState } from "@/interfaces/filterinvoices.interface"

interface Emitter {
  ruc: string;
  id_emisor: string;
  nombre_comercial: string;
  razon_social: string;
  usuario_sol: string;
  password_sol: string;
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  apikey: string;
  local: string;
}


const getInvoicesCompany = async (company: string | null, filterState: FilterState) => {
  const emisores = localStorage.getItem("emisores");
  if (emisores) {
    const dataEmisores = JSON.parse(emisores);

    const selectedEmisor = company
      ? dataEmisores.find((emisor: any) => emisor.apikey === company)
      : dataEmisores[0];

    if (selectedEmisor) {
      const { ruc, apikey, local, id_local } = selectedEmisor;
      console.log("selectedEmisor", selectedEmisor);

      const today = new Date();
      const defaultStartDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
      const defaultEndDate = today.toISOString().split('T')[0];

      const dateInit = filterState.startDate || defaultStartDate;
      const dateEnd = filterState.endDate || defaultEndDate;
      const serie = "todos";
      const estado = filterState.cancellationStatus || "0";
      const idLocal = parseInt(id_local, 10);
      const documentType = filterState.documentType || "todos"

      console.log("date_init", dateInit);
      console.log("date_end", dateEnd);

      try {
        const invoices = await getInvoicesAll(ruc, dateInit, dateEnd, serie, estado, documentType, idLocal, apikey);
        return invoices[0]?.retorno || [];
      } catch (error) {
        console.error("Error fetching invoices:", error);
        throw error;
      }
    }
  }
  return [];
};


export function InvoicesTable() {
  const searchParams = useSearchParams();
  const company = searchParams?.get('current_business');
  const { filterState } = useInvoicesFilter();


  const [comprobantes, setComprobantes] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(7)



  useEffect(() => {
    const fetchInvoices = async () => {
      if (company) {
        setIsLoading(true);
      }
      try {
        const invoices = await getInvoicesCompany(company, filterState);
        setComprobantes(invoices);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching invoices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [company, filterState]);


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

  // TODO: PAGINACIÓN
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = comprobantes.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(comprobantes.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


  if (isLoading) {
    return <LoadingTable />
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
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
              <TableHead className="font-semibold">RUC/DNI</TableHead>
              <TableHead className="font-semibold text-center">DENOMINACIÓN</TableHead>
              <TableHead className="font-semibold text-center">MONEDA</TableHead>
              <TableHead className="font-semibold">DIRECCION</TableHead>
              <TableHead className="font-semibold text-right">TOTAL VENTA</TableHead>
              <TableHead className="font-semibold">ANULADO?</TableHead>
              <TableHead className="font-semibold">ENVIADO AL CLIENTE</TableHead>
              <TableHead className="font-semibold text-center">ESTADO</TableHead>
              <TableHead className="font-semibold text-center">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((comprobante, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{comprobante.fecha_emision}</TableCell>
                <TableCell>{comprobante.tipo_documento}</TableCell>
                <TableCell>{comprobante.serie}</TableCell>
                <TableCell>{comprobante.correlativo}</TableCell>
                <TableCell>{comprobante.documento_receptor}</TableCell>
                <TableCell className="text-center">{comprobante.denominacion_receptor}</TableCell>
                <TableCell className="text-center">{comprobante.moneda}</TableCell>
                <TableCell>{comprobante.direccion}</TableCell>
                <TableCell className="text-right">{comprobante.total_venta}</TableCell>
                <TableCell className="text-center">
                  {comprobante.estado === "2" ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {comprobante.estado === "1" ? (
                    <Badge variant="outline" className=" bg-green-100 text-green-600 border-green-200 rounded-full"> Enviado </Badge>
                  ) : (
                    <Badge variant="outline" className=" bg-red-100 text-red-600 border-red-200 rounded-full"> Anulado </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {comprobante.estado === "3" ? (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-600 border-yellow-200 rounded-full flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Pendiente
                    </Badge>
                  ) : comprobante.estado === "2" ? (
                    <Badge variant="outline" className="bg-red-100 text-red-600 border-red-200 rounded-full">
                      Anulado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200 rounded-full">
                      Enviado
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`http://localhost:8080/api/pdf/${comprobante.ruc_emisor}-03-${comprobante.serie}-${comprobante.correlativo}.pdf`}
                      target="_blank"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <FileText className="h-4 w-4 mt-2" />
                    </Link>
                    <Link
                      href={`http://localhost:8080/api/xml/${comprobante.ruc_emisor}-03-${comprobante.serie}-${comprobante.correlativo}.xml`}
                      target="_blank"
                      className="h-8 w-8 text-green-600 hover:text-green-700"
                    >
                      <FileJson className="h-4 w-4 mt-2" />
                    </Link>

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
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, comprobantes.length)} de {comprobantes.length} comprobantes
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50 cursor-pointer' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => paginate(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50 cursor-pointer' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
        </div>
      </div>
    </div>
  )
}

