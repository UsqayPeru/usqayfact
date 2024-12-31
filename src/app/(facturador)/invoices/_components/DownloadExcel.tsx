"use client"

import { useState } from "react"
import { Loader2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { resolve } from "path"

interface Props {
    isOpen: boolean
    onClose: () => void
    filterState: any
}

export function DownloadExcel({ isOpen, onClose, filterState }: Props) {

    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]

    const [isLoading, setIsLoading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/download-excel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterState),
            });

            if (!response.ok) {
                throw new Error('Failed to generate Excel file');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'invoices.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Descargar en excel</DialogTitle>
                    <p className="text-center text-sm text-gray-600">
                        <span className="text-red-600 font-bold">Importante:</span>
                        Se exportaran los documentos según el filtro seleccionado.
                    </p>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Desde esta fecha</label>
                        <div className="flex gap-2">
                            <Select
                            >
                                <SelectTrigger className="w-24">
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

                            <Select
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Mes" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month, index) => (
                                        <SelectItem key={month} value={(index + 1).toString()}>
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                            >
                                <SelectTrigger className="w-24">
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
                        <label className="text-sm font-medium text-gray-700">Hasta esta fecha</label>
                        <div className="flex gap-2">
                            <Select
                            >
                                <SelectTrigger className="w-24">
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

                            <Select
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Mes" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month, index) => (
                                        <SelectItem key={month} value={(index + 1).toString()}>
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                            >
                                <SelectTrigger className="w-24">
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
                        <label className="text-sm font-medium">
                            Elegir tipo de reporte (obligatorio)
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Elegir" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Detalles comprobantes</SelectItem>
                                <SelectItem value="2">Items comprobantes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Elegir usuario (opcional)
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los usuarios" />
                            </SelectTrigger>
                            <SelectContent>

                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Elegir entidad (opcional)
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Buscar por entidad" />
                            </SelectTrigger>
                            <SelectContent>

                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Elegir tipo de comprobante (opcional)
                        </label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los comprobantes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="factura">Factura</SelectItem>
                                <SelectItem value="boleta">Boleta</SelectItem>
                                <SelectItem value="nota-credito">Nota de Crédito</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-500" onClick={handleDownload}
                            disabled={isLoading}
                        >
                            {
                                isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> 
                                )
                            }
                            { isLoading ? "Descargando" : "Descargar"}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

