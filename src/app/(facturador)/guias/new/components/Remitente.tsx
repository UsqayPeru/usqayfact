"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Remitente = () => {
  return (
    <div className="bg-white shadow rounded p-4">
         <p className="text-lg font-semibold flex items-center m-1">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>Remitente
        </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Emisor</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un emisor" />
            </SelectTrigger>
            <SelectContent>
              {/* Agregar opciones aquí */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Local</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un local" />
            </SelectTrigger>
            <SelectContent>
              {/* Agregar opciones aquí */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Remitente;
