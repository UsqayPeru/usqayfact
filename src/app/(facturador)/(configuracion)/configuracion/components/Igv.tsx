"use client"
import React, { useState } from 'react';

const IgvConfig= () => {
 // const [bankAccounts, setBankAccounts] = useState('');
 // const [comments, setComments] = useState('');
 // const [showSellerData, setShowSellerData] = useState(false);
  const [useUnitPriceWithIgv, setUseUnitPriceWithIgv] = useState(true);
  const [igvPercentage, setIgvPercentage] = useState(18);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Información De IGV</h2>
      <div className="mb-6">
        <label htmlFor="useUnitPriceWithIgv" className="block text-sm font-medium text-gray-700 mb-2">
          Activar Precio Unitario (CON IGV), por defecto se usa el VALOR SIN IGV
        </label>
        <div className="flex items-center mt-2">
          <input
            id="useUnitPriceWithIgv"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={useUnitPriceWithIgv}
            onChange={(e) => setUseUnitPriceWithIgv(e.target.checked)}
          />
          <label htmlFor="useUnitPriceWithIgv" className="ml-3 text-sm font-medium text-gray-700">
            Sí
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="igvPercentage" className="block text-sm font-medium text-gray-700 mb-2">
          IGV (porcentaje por defecto)
        </label>
        <select
          id="igvPercentage"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
          value={igvPercentage}
          onChange={(e) => setIgvPercentage(Number(e.target.value))}
        >
          <option value="18">18%</option>
          {/* Agrega más opciones si es necesario */}
        </select>
      </div>
    </div>
  );
};

export default IgvConfig;
