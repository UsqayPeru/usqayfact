"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Transporte = () => {
  const [activeTab, setActiveTab] = useState("publico");

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-4">
        <p className="text-lg font-semibold flex items-center">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>Transporte
        </p>

        <div className="space-y-4">
          <nav>
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none ${
                  activeTab === "publico" ? "text-blue-600 border-blue-600" : "text-gray-700 hover:border-blue-600"
                }`}
                onClick={() => setActiveTab("publico")}
              >
                Público
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none ${
                  activeTab === "privado" ? "text-blue-600 border-blue-600" : "text-gray-700 hover:border-blue-600"
                }`}
                onClick={() => setActiveTab("privado")}
              >
                Privado
              </button>
            </div>
          </nav>

          <div className="pt-4">
            {activeTab === "publico" && (
              <div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Número de Documento del Transportista</label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Buscar Transportista: ej. 10728616851"
                      className="w-full"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">Razón Social del Transportista</label>
                  <Input
                    id="razon_transportista"
                    placeholder="Razón Social"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {activeTab === "privado" && (
              <div>
                <div className="mt-8">
                  <label className="text-sm font-medium text-gray-700">Tipo de Documento del Conductor</label>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="radiodniconductor"
                        name="tipo_documento_conductor"
                        value="1"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="radiodniconductor" className="ml-2 text-sm text-gray-700">
                        DNI
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="radiorucconductor"
                        name="tipo_documento_conductor"
                        value="6"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="radiorucconductor" className="ml-2 text-sm text-gray-700">
                        RUC
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">Número de Documento del Conductor</label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Buscar Conductor: ej. 10728616851"
                      className="w-full"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">Nombres del Conductor</label>
                  <Input
                    id="nombre_conductor"
                    placeholder="Nombres"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Número de Placa <span className="text-sm text-gray-500">(De 6 a 8 caracteres)</span>
                  </label>
                  <Input
                    id="placa_vehiculo"
                    placeholder="Número de Placa"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Licencia de Conducir <span className="text-sm text-gray-500">(De 9 a 10 caracteres)</span>
                  </label>
                  <Input
                    id="licencia_conductor"
                    placeholder="Licencia de Conducir"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transporte;
