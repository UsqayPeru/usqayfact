"use client"
import React, { useState } from 'react';

const CuentaDetraccion = () => {
  const [cuentaDetraccion, setCuentaDetraccion] = useState('');
  const [logoPdf, setLogoPdf] = useState(null);
  const [useLogoTicket, setUseLogoTicket] = useState(false);

  const handleLogoPdfChange = (event: any) => {
    setLogoPdf(event.target.files[0]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Cuenta de Detracción</h2>
      
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
        <div className="sm:w-1/2">
          <label htmlFor="cuentaDetraccion" className="block text-xs font-medium text-gray-700 mb-2">
            Cuenta detracción
          </label>
          <input
            type="text"
            id="cuentaDetraccion"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={cuentaDetraccion}
            onChange={(e) => setCuentaDetraccion(e.target.value)}
            placeholder="Ingresa la cuenta de detracción"
          />
        </div>

        <div className="sm:w-1/2">
          <label htmlFor="logoPdf" className="block text-xs font-medium text-gray-700 mb-2">
            Logotipo para PDF
          </label>
          <input
            type="file"
            id="logoPdf"
            className="block w-full text-sm text-gray-700 py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/jpeg, image/jpg"
            onChange={handleLogoPdfChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            Logotipo en formato JPG para Facturas (320px por 80px), máximo 20 KB.
          </p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="useLogoTicket"
          checked={useLogoTicket}
          onChange={(e) => setUseLogoTicket(e.target.checked)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="useLogoTicket" className="ml-2 text-xs font-medium text-gray-700">
          ¿Añadir logotipo en formato TICKET?
        </label>
      </div>
    </div>
  );
};

export default CuentaDetraccion;
