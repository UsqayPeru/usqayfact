"use client"
import React from 'react';

const GeneralConfig = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Información General</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 mb-4">
        <div>
          <label htmlFor="ruc" className="block text-xs font-medium text-gray-700 mb-2">
            RUC<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ruc"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="20601408229"
          />
        </div>
        <div>
          <label htmlFor="razonSocial" className="block text-xs font-medium text-gray-700 mb-2">
            Razón Social o Nombre Completo<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="razonSocial"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="CV INGENIEROS CONSULTORÍA E INGENIERÍA E.I.R"
          />
        </div>
        <div>
          <label htmlFor="razonComercial" className="block text-xs font-medium text-gray-700 mb-2">
            Razón Comercial (Opcional)
          </label>
          <input
            type="text"
            id="razonComercial"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="Puro Corazón"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-2">
            Email de esta empresa
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="puro-corazon@usqay-cloud.com"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralConfig;
