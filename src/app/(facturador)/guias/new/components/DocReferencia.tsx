"use client";

import { Input } from "@/components/ui/input";

const DocumentoReferencia = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-4">
        <p className="text-lg font-semibold flex items-center">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i> Documento de Referencia
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="txt_serie_comprobante" className="text-sm font-medium text-gray-700">
              Serie
            </label>
            <Input
              id="txt_serie_comprobante"
              placeholder="F001"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="txt_correlativo_comprobante" className="text-sm font-medium text-gray-700">
              Correlativo
            </label>
            <Input
              id="txt_correlativo_comprobante"
              type="number"
              placeholder="123"
              className="w-full"
            />
          </div>

          <div className="my-3">
            <button
              type="button"
              onClick={() => console.log("Buscar items del comprobante")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentoReferencia;
