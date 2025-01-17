"use client"
import React, { useState } from 'react';

// Datos de prueba (reemplaza esto con tus datos reales)
const localesData = [
  {
    codigo: '001',
    descripcion: 'SU. SUCURSAL',
    ubigero: '200104',
    direccion: 'AV. ANDRES AVELINO CACERES NRO. 147 INT. MAS URB. MIRAFLORES (CENTRO COMERCIAL OPEN PLAZA PIURA)',
    departamento: 'PIURA',
    provincia: 'PIURA',
    distrito: 'CASTILLA',
    comprobantes: [
      { tipo: 'FACTURA', serie: 'F001', tamaño: 'TICKETERA' },
      { tipo: 'BOLETA', serie: 'B001', tamaño: 'TICKETERA' },
    ],
  },
  {
    codigo: '002',
    descripcion: 'SU. SUCURSAL',
    ubigero: '200104',
    direccion: 'AV. ANDRES AVELINO CACERES NRO. 147 INT. MAS URB. MIRAFLORES (CENTRO COMERCIAL OPEN PLAZA PIURA)',
    departamento: 'PIURA',
    provincia: 'PIURA',
    distrito: 'CASTILLA',
    comprobantes: [
      { tipo: 'FACTURA', serie: 'F001', tamaño: 'TICKETERA' },
      { tipo: 'BOLETA', serie: 'B001', tamaño: 'TICKETERA' },
    ],
  },
];

// Componente de la tabla
const Table = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;
  const filteredData = localesData.filter((local) =>
    Object.values(local).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const toggleMenu = (codigo: string) => {
    setOpenMenu(openMenu === codigo ? null : codigo);
  };

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex justify-start items-start">
      <div className="w-full max-w-full p-6 rounded-lg bg-white shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Locales</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar locales..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm text-gray-500">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Ubigero</th>
                <th className="px-4 py-3">Departamento</th>
                <th className="px-4 py-3">Provincia</th>
                <th className="px-4 py-3">Distrito</th>
                <th className="px-4 py-3">Dirección</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((local, index) => (
                <tr
                  key={local.codigo}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-3 whitespace-normal break-words">{local.codigo}</td>
                  <td className="px-4 py-3 whitespace-normal break-words" title={local.descripcion}>{local.descripcion}</td>
                  <td className="px-4 py-3 whitespace-normal break-words">{local.ubigero}</td>
                  <td className="px-4 py-3 whitespace-normal break-words">{local.departamento}</td>
                  <td className="px-4 py-3 whitespace-normal break-words">{local.provincia}</td>
                  <td className="px-4 py-3 whitespace-normal break-words">{local.distrito}</td>
                  <td className="px-4 py-3 whitespace-normal break-words" title={local.direccion}>{local.direccion}</td>
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() => toggleMenu(local.codigo)}
                      className="bg-[#FFC859] text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                    >
                      Opciones
                    </button>
                    {openMenu === local.codigo && (
                      <div
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                      >
                        <ul className="py-1">
                          {local.comprobantes.map((comprobante) => (
                            <li
                              key={comprobante.tipo}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
                            >
                              {comprobante.tipo} - {comprobante.serie}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
