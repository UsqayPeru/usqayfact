"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { HardDriveDownload } from "lucide-react";

const PropuestasView = () => {
  const [selectedEmisor, setSelectedEmisor] = useState("");
  const [selectedAnio, setSelectedAnio] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [ticketData, setTicketData] = useState({
    ticket: "",
    estado: "",
    periodo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sampleData = [
    { fecha: "2023-01-01", detalle: "Detalle 1", tipo: "Tipo 1", estado: "Activo" },
    { fecha: "2023-02-01", detalle: "Detalle 2", tipo: "Tipo 2", estado: "Inactivo" },
    { fecha: "2023-03-01", detalle: "Detalle 3", tipo: "Tipo 3", estado: "Activo" },
    { fecha: "2023-04-01", detalle: "Detalle 4", tipo: "Tipo 4", estado: "Inactivo" },
    { fecha: "2023-05-01", detalle: "Detalle 5", tipo: "Tipo 5", estado: "Activo" },
    { fecha: "2023-06-01", detalle: "Detalle 6", tipo: "Tipo 6", estado: "Inactivo" },
  ];
  const [data, setData] = useState<{fecha:string;detalle:string;tipo:string;estado:string;}[]>(sampleData); // Placeholder for table data

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDescargarPropuesta = () => {
    console.log("Descargar propuesta");
  };

  const handleBuscarTicket = () => {
    console.log("Buscar ticket");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="container mx-auto p-4 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          Compras
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
          <div className="form-group col-span-1">
            <label
              htmlFor="select_emisor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selecciona un Emisor
            </label>
            <select
              id="select_emisor"
              className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              value={selectedEmisor}
              onChange={(e) => setSelectedEmisor(e.target.value)}
            >
              <option value="">Selecciona un Emisor</option>
              {/* Opciones dinámicas */}
            </select>
          </div>
          <div className="form-group col-span-1">
            <label
              htmlFor="select_anio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selecciona un Año
            </label>
            <select
              id="select_anio"
              className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              value={selectedAnio}
              onChange={(e) => setSelectedAnio(e.target.value)}
            >
              <option value="">Selecciona un Año</option>
              {/* Opciones dinámicas */}
            </select>
          </div>
          <div className="form-group col-span-1">
            <label
              htmlFor="select_mes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selecciona un Mes
            </label>
            <select
              id="select_mes"
              className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
              value={selectedMes}
              onChange={(e) => setSelectedMes(e.target.value)}
            >
              <option value="">Selecciona un Mes</option>
              {/* Opciones dinámicas */}
            </select>
          </div>
          <div className="form-group col-span-1 flex items-end">
            <button
              type="button"
              onClick={handleDescargarPropuesta}
              className="bg-yellow-500 text-white px-2 py-1 rounded-md font-medium shadow-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 w-full"
            >
              <HardDriveDownload className="inline-block mr-2" />
              Descargar
            </button>
          </div>
        </form>

        <div className="bg-slate-50 p-3 shadow-md mb-6">
          <h2 className="text-md font-semibold text-gray-800 mb-3">Buscar Ticket</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="form-group col-span-1">
              <label
          htmlFor="select_ticket"
          className="block text-sm font-medium text-gray-700 mb-1"
              >
          Ticket
              </label>
              <select
          id="select_ticket"
          className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
          value={ticketData.ticket}
          onChange={(e) =>
            setTicketData((prev) => ({ ...prev, ticket: e.target.value }))
          }
              >
          <option value="">Selecciona un Ticket</option>
          {/* Opciones dinámicas */}
              </select>
            </div>
            <div className="form-group col-span-1">
              <label
          htmlFor="txt_estado_ticket"
          className="block text-sm font-medium text-gray-700 mb-1"
              >
          Estado
              </label>
              <input
          type="text"
          id="txt_estado_ticket"
          className="block w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
          value={ticketData.estado}
          disabled
              />
            </div>
            <div className="form-group col-span-1">
              <label
          htmlFor="txt_periodo_ticket"
          className="block text-sm font-medium text-gray-700 mb-1"
              >
          Periodo
              </label>
              <input
          type="text"
          id="txt_periodo_ticket"
          className="block w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100 shadow-sm"
          value={ticketData.periodo}
          disabled
              />
            </div>
            <div className="form-group col-span-1 flex items-end">
              <button
          type="button"
          onClick={handleBuscarTicket}
          className="bg-yellow-500 text-white px-2 py-1 rounded-md font-medium shadow-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 w-full"
              >
          Buscar
              </button>
            </div>
          </form>
        </div>

        <Table className="mb-6">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>FECHA</TableHead>
              <TableHead>TIPO</TableHead>
              <TableHead>DETALLE</TableHead>
              <TableHead>ESTADO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{item.fecha}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.detalle}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`rounded-full ${
                      item.estado === "Activo"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PropuestasView;
