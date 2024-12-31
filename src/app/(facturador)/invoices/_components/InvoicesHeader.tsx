"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, Search, Filter } from 'lucide-react'
import { SearchDialog } from "./SearchDialog"
import { useState } from "react"
import { DownloadExcel } from "./DownloadExcel"
import { useInvoicesFilter } from "../hooks/useFilterContext"
import { SearchFilter } from "@/interfaces/searchfilter.interface"



export function InvoicesHeader() {
    const { setFilterState } = useInvoicesFilter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showModalDownload, setShowModalDownload] = useState(false)
    const [localFilterState, setLocalFilterState] = useState(() => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();

    return {
      documentType: '',
      entity: '',
      startDate: {
        day: '1',
        month,
        year
      },
      endDate: {
        day: today.getDate().toString(),
        month,
        year
      },
      cancellationStatus: '',
    }
  });

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]



  const handleLocalFilterChange = (key: string, value: string) => {
    if (key === 'startDate' || key === 'endDate') {
      const [dateType, dateComponent] = value.split('-');
      setLocalFilterState(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [dateComponent]: dateType
        }
      }));
    } else {
      setLocalFilterState(prev => ({ ...prev, [key]: value }));
    }
  }

  const handleFilterClick = () => {
    const formatDate = (date: { day: string, month: string, year: string }) => {
      return date.day && date.month && date.year
        ? `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`
        : '';
    };

    setFilterState({
      ...localFilterState,
      startDate: formatDate(localFilterState.startDate),
      endDate: formatDate(localFilterState.endDate)
    });
  }


  
  const handleApplySearchFilter = (searchFilter: SearchFilter) => {
    setLocalFilterState(prev => ({
      ...prev,
      ...searchFilter
    }));
    setFilterState(prev => ({
      ...prev,
      ...searchFilter
    }));
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo de Documento</label>
          <Select onValueChange={(value) => handleLocalFilterChange('documentType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo de Doc." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FAC">Factura</SelectItem>
              <SelectItem value="BO">Boleta</SelectItem>
              <SelectItem value="NOTCRED">Nota de Crédito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Entidad</label>
          <Input
            placeholder="Buscar por entidad"
            className="w-full"
            onChange={(e) => handleLocalFilterChange('entity', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fecha Inicio</label>
          <div className="flex gap-2">
            <Select
              value={localFilterState.startDate.day}
              onValueChange={(value) => handleLocalFilterChange('startDate', `${value}-day`)}
            >
              <SelectTrigger className="w-20">
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
              value={localFilterState.startDate.month}
              onValueChange={(value) => handleLocalFilterChange('startDate', `${value}-month`)}
            >
              <SelectTrigger className="w-32">
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
              value={localFilterState.startDate.year}
              onValueChange={(value) => handleLocalFilterChange('startDate', `${value}-year`)}
            >
              <SelectTrigger className="w-28">
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
          <label className="text-sm font-medium text-gray-700">Fecha Fin</label>
          <div className="flex gap-2">
            <Select
              value={localFilterState.endDate.day}
              onValueChange={(value) => handleLocalFilterChange('endDate', `${value}-day`)}
            >
              <SelectTrigger className="w-20">
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
              value={localFilterState.endDate.month}
              onValueChange={(value) => handleLocalFilterChange('endDate', `${value}-month`)}
            >
              <SelectTrigger className="w-32">
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
              value={localFilterState.endDate.year}
              onValueChange={(value) => handleLocalFilterChange('endDate', `${value}-year`)}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button 
          variant="outline" className="flex items-center gap-2"
          onClick={() => setShowModalDownload(true)}
        >
          <Download className="h-4 w-4" />
          Descarga para Excel
        </Button>

        <div className="flex-1">
          <Select onValueChange={(value) => handleLocalFilterChange('cancellationStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por anulación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Todos</SelectItem>
              <SelectItem value="2">Anulados</SelectItem>
              <SelectItem value="1">No Anulados</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
          onClick={handleFilterClick}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtrar
        </Button>

        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          <Search className="h-4 w-4" />
          Buscar Documento
        </Button>
      </div>

      <SearchDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilter={handleApplySearchFilter}
      />

      <DownloadExcel 
        isOpen={showModalDownload}
        onClose={() => setShowModalDownload(false)}
        filterState={localFilterState}
      />
    </div>
  )
}

