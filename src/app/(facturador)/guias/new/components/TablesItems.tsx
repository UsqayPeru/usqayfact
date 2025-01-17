import React from "react";
export const TablaItems = () => {
    return (
      <div className="bg-white shadow rounded p-4 mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Id</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Item</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Cantidad</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Eliminar</th>
              </tr>
            </thead>
            <tbody id="mitabla-body">
              {/* Aquí se agregan dinámicamente las filas */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };