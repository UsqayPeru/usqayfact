"use client"
import React, { useState } from 'react';

const PdfConfigurationForm = () => {
  const [bankAccounts, setBankAccounts] = useState('');
  const [comments, setComments] = useState('');
  const [showSellerData, setShowSellerData] = useState(false);
  //const [useUnitPriceWithIgv, setUseUnitPriceWithIgv] = useState(true);
  //const [igvPercentage, setIgvPercentage] = useState(18);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Información para PDF</h2>

      <div className="mb-6">
        <label htmlFor="bankAccounts" className="block text-sm font-medium text-gray-700 mb-2">
          Cuentas bancarias (Se mostrarán al final de su PDF)
        </label>
        <textarea
          id="bankAccounts"
          rows={4}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-lg p-2"
          value={bankAccounts}
          onChange={(e) => setBankAccounts(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
          Comentarios adicionales (Se mostrarán al final de su PDF)
        </label>
        <textarea
          id="comments"
          rows={4}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-lg p-2"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div className="flex items-center mb-6">
        <input
          id="showSellerData"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={showSellerData}
          onChange={(e) => setShowSellerData(e.target.checked)}
        />
        <label htmlFor="showSellerData" className="ml-3 text-sm font-medium text-gray-700">
          Mostrar datos de vendedor, fecha y hora de creación al final de su PDF
        </label>
      </div>

   

    
    </div>
  );
};

export default PdfConfigurationForm;
