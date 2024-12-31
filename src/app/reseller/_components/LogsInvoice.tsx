"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer, Loader, Send, Bug, AlertCircle, Copy, CircleCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InvoicesError } from "@/interfaces/invoiceserror.interface";
import { useEffect, useState } from "react";
import { getInvoicesError } from "@/services/reseller/logs.service";
import LoadingTable from "./LoadingTable";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JsonViewerModal } from "./JsonViewerModal";

interface ModalJsonState {
    isOpen: boolean
    data: string | object | null
}

export function LogsInvoice() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [tableData, setTableData] = useState<InvoicesError[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalDescription, setModalDescription] = useState({ isOpen: false, description: "" });
    const entriesPerPage = 25;
    const [isCopied, setIsCopied] = useState(false)
    const [modalDeveloper, setModalDeveloper] = useState(false)

    const [modalJson, setModalJson] = useState<ModalJsonState>({
        isOpen: false,
        data: null
    })
    
    const handleViewJson = (jsonData: any) => {
        setModalJson({
            isOpen: true,
            data: jsonData
        })
    }

    const formatErrorMessage = (message: string) => {
        try {
          const decoded = decodeURIComponent(message.replace(/\+/g, ' '))
          
          if (decoded.includes('<?xml') || decoded.includes('<')) {
            return decoded
              .replace(/></g, '>\n<')
              .replace(/\s{2,}/g, ' ')
              .trim()
          }
          
          return decoded
        } catch (e) {
          return message
        }
      }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(modalDescription.description)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const downloadReport = () => {
        const element = document.createElement("a")
        const file = new Blob([modalDescription.description], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = "error-description.txt"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    useEffect(() => {
        const fetchInvoiceLogs = async () => {
            setIsLoading(true);
            try {
                const offset = (currentPage - 1) * entriesPerPage;
                const data = await getInvoicesError(offset, entriesPerPage);
                setTableData(data[0].retorno);
                setTotalEntries(data[0].total || 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvoiceLogs();
    }, [currentPage]);

    const openModalDescriptionError = (description: string) => {
        setModalDescription({ isOpen: true, description });
    }

    return (
        <div className="space-y-8">
            <div className="mx-w-5xl mx-auto">
                <h1 className="text-4xl font-bold">Logs</h1>
                <h3 className="text-md text-gray-500">
                    Aqui podrias visualizar los errores presentados al realizar peticiones a usqayfact
                </h3>
            </div>
            <Separator />

            <div className="pb-14">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Comprobantes con error</CardTitle>
                        <div className="flex items-center justify-end">
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Excel
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    PDF
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Imprimir
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="max-w-sm"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <LoadingTable title="logs" />
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">RUC</TableHead>
                                            <TableHead className="text-center">Serie</TableHead>
                                            <TableHead className="text-center">Correlativo</TableHead>
                                            <TableHead className="text-center">Código</TableHead>
                                            <TableHead className="text-center">Tag</TableHead>
                                            <TableHead className="text-center">Fecha</TableHead>
                                            <TableHead className="text-center">Acciones</TableHead>
                                            {/* <TableHead className="text-left">Descripción</TableHead>
                                            <TableHead className="text-left">JSON</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">{row.ruc}</TableCell>
                                                <TableCell className="text-center">{row.serie}</TableCell>
                                                <TableCell className="text-center">{row.correlativo}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200 rounded-full">{row.codigo_error}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="outline" className="bg-red-100 text-red-600 border-red-200 rounded-full">{row.momento_error}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">{row.tiempo}</TableCell>
                                                <TableCell className="text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                Opciones
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-80">
                                                            <DropdownMenuItem onClick={() => openModalDescriptionError(row.descripcion_error)}>
                                                                <FileText className="mr-2 h-4 w-4 " />
                                                                <span>Ver descripción del log</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleViewJson(row.json_comprobante)}>
                                                                <FileText className="mr-2 h-4 w-4 " />
                                                                <span>Ver JSON</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => setModalDeveloper(true)}>
                                                                <Bug className="mr-2 h-4 w-4" />
                                                                <span>Reportar a desarrollo</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {tableData.length !== 0 && (
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-500">
                                            Filas {(currentPage - 1) * entriesPerPage + 1} de{" "}
                                            {Math.min(currentPage * entriesPerPage, totalEntries)}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                            >
                                                Anterior
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-gray-100"
                                            >
                                                {currentPage}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage * entriesPerPage >= totalEntries}
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                Siguiente
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={modalDeveloper} onOpenChange={setModalDeveloper}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enviar error a desarrollo</DialogTitle>
                    <DialogDescription>
                        El comprobante electronico rechazado por sunat se enviara al área de desarrollo.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setModalDeveloper(false)}>Cancelar</Button>
                    <Button >Enviar</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>


            <Dialog open={modalDescription.isOpen} onOpenChange={(isOpen) => setModalDescription({ ...modalDescription, isOpen })}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            Descripción del error
                        </DialogTitle>
                        <DialogDescription>
                            Podras visualizar cual es el error que envio sunat
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[300px] w-full rounded-md border bg-muted/50 dark:bg-muted/80">
                        <pre className="p-4 text-sm font-mono whitespace-pre-wrap break-words">
                        {formatErrorMessage(modalDescription.description) || "No hay descripción disponible."}
                        </pre>
                    </ScrollArea>

                    <DialogFooter className="sm:justify-start">
                        <div className="flex justify-between w-full">
                            <Button variant="outline" onClick={() => setModalDescription({ ...modalDescription, isOpen: false })}>
                                Cerrar
                            </Button>
                            <div className="space-x-2">
                                <Button variant="outline" onClick={copyToClipboard}>
                                    {isCopied ? "Copiado" : "Copiar"}
                                    {
                                        isCopied ? (
                                            <CircleCheck className="ml-2 h-4 w-4" />
                                        ) : (
                                            <Copy className="ml-2 h-4 w-4" />
                                        )
                                    }
                                </Button>
                                <Button onClick={downloadReport}>
                                    Descargar
                                    <Download className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <JsonViewerModal 
                isOpen={modalJson.isOpen}
                onOpenChange={(isOpen) => setModalJson({ ...modalJson, isOpen })}
                jsonData={modalJson.data}            
            />
        </div>
    );
}
