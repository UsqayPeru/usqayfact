"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Destinatario = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-4 m-1">
        <p className="text-lg font-semibold flex items-center">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>Destinatario
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de Documento</label>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="radiodnidestinatario"
                  name="tipo_documento"
                  value="1"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="radiodnidestinatario" className="ml-2 text-sm text-gray-700">
                  DNI
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="radiorucdestinatario"
                  name="tipo_documento"
                  value="6"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="radiorucdestinatario" className="ml-2 text-sm text-gray-700">
                  RUC
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Número de Documento</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Buscar Destinatario: ej. 72861658"
                className="w-full"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // Logic for buscar destinatario
                  }
                }}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Razón Social</label>
            <Input
              id="razonSocial_destinatario"
              placeholder="Razón Social"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-sm text-gray-500">(Opcional)</span>
            </label>
            <Input
              id="correo"
              placeholder="Email"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Código País <span className="text-sm text-gray-500">(Opcional)</span>
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un código" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="51">Perú (+51)</SelectItem>
                <SelectItem value="1">USA (+1)</SelectItem>
                <SelectItem value="34">España (+34)</SelectItem>
                {/* Agregar más opciones */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              WhatsApp <span className="text-sm text-gray-500">(Opcional)</span>
            </label>
            <Input
              id="telefono_wpp"
              placeholder="Número de WhatsApp"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinatario;
