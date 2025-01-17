"use client"
import React, { useState } from 'react';

const TipoDeCambioForm = () => {
  const [obligarIngresoTipoCambio, setObligarIngresoTipoCambio] = useState(false);
  const [mostrarTipoCambioEnPdf, setMostrarTipoCambioEnPdf] = useState(false);
  const [tipoCambio, setTipoCambio] = useState('COMERCIAL');
  const [tipoCalculo, setTipoCalculo] = useState('Modificar Valor Unitario');

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Tipo de Cambio</h2>

      <div className="flex items-center mb-6">
        <input
          id="obligarIngresoTipoCambio"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={obligarIngresoTipoCambio}
          onChange={(e) => setObligarIngresoTipoCambio(e.target.checked)}
        />
        <label htmlFor="obligarIngresoTipoCambio" className="ml-3 text-sm font-medium text-gray-700">
          Obligar ingreso de tipo de cambio
        </label>
      </div>

      <div className="flex items-center mb-6">
        <input
          id="mostrarTipoCambioEnPdf"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={mostrarTipoCambioEnPdf}
          onChange={(e) => setMostrarTipoCambioEnPdf(e.target.checked)}
        />
        <label htmlFor="mostrarTipoCambioEnPdf" className="ml-3 text-sm font-medium text-gray-700">
          Mostrar Tipo de Cambio en el PDF
        </label>
      </div>

      <div className="mb-6">
        <label htmlFor="tipoCambio" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de cambio a usar en compras y ventas
        </label>
        <select
          id="tipoCambio"
          className=" bg-slate-100 mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
          value={tipoCambio}
          onChange={(e) => setTipoCambio(e.target.value)}
        >
          <option value="COMERCIAL">Tipo de cambio COMERCIAL</option>
          {/* Agrega más opciones si es necesario */}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="tipoCalculo" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de cálculo desde total en líneas
        </label>
        <select
          id="tipoCalculo"
          className="bg-slate-100 mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
          value={tipoCalculo}
          onChange={(e) => setTipoCalculo(e.target.value)}
        >
          <option value="Modificar Valor Unitario">Modificar Valor Unitario</option>
          {/* Agrega más opciones si es necesario */}
        </select>
      </div>
    </div>
  );
};

export default TipoDeCambioForm;
