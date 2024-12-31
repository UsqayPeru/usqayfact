"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, Printer, Download } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { InvoicesError } from '@/interfaces/invoiceserror.interface'

// Datos de ejemplo para la gráfica
const chartData = [
    { fecha: '2024-12-30', atascados: 0 },
]



const tableData: InvoicesError[] = []

const donutData = [
    { name: 'Aceptados', value: 0, color: '#02C1A2' },
    { name: 'Pendientes', value: 0, color: '#0198FF' },
    { name: 'Rechazados', value: 0, color: '#F2B531' },
]

export function MonitoringInvoice() {
    const [periodo, setPeriodo] = useState('1d')
    const [searchTerm, setSearchTerm] = useState('')
    const [entriesPerPage, setEntriesPerPage] = useState('10')

    return (
        <div className="space-y-8">
            <div className='mx-w-5xl mx-auto'>
                <h1 className='text-4xl font-bold'>Monitoreo</h1>
                <h3 className='text-md text-gray-500'>Comprobantes electronicos enviados a cola desde el API/facturador</h3>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-4'>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Comprobantes atascados</CardTitle>
                        <CardDescription>Visualización de comprobantes pendientes</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <div className="mb-4">
                            <Select onValueChange={(value) => setPeriodo(value)} defaultValue={periodo}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Seleccionar período" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1d">Hoy</SelectItem>
                                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <ChartContainer
                            config={{
                                atascados: {
                                    label: "Comprobantes Atascados",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[270px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="atascados"
                                        stroke="var(--color-atascados)"
                                        name="Comprobantes Atascados"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Comprobantes según estado de SUNAT</CardTitle>
                        <CardDescription>Visualización de comprobantes rechazados, aceptados y pendientes.</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <div className="mb-4">
                            <Select onValueChange={(value) => setPeriodo(value)} defaultValue={periodo}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Seleccionar período" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1d">Hoy</SelectItem>
                                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="p-4">
                            <ResponsiveContainer width="100%" height={270}>
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {donutData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderRadius: '6px',
                                            border: '1px solid hsl(var(--border))',
                                        }}
                                        formatter={(value) => `${value}%`}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        className='text-sm'
                                        height={36}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='pb-14'>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Comprobantes en cola</CardTitle>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Razón Social</TableHead>
                                    <TableHead>Proceso</TableHead>
                                    <TableHead>Serie</TableHead>
                                    <TableHead>Correlativo</TableHead>
                                    <TableHead>Reintentos</TableHead>
                                    <TableHead>Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {tableData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.serie}</TableCell>
                                        <TableCell>{row.correlativo}</TableCell>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {tableData.length !== 0 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-gray-500">
                                    Showing 1 to {Math.min(parseInt(entriesPerPage), tableData.length)} of {tableData.length} entries
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

