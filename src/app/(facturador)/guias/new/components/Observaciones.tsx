"use client"
import React from "react";
export const Observaciones = () => {
    return (
      <div className="space-y-4 mt-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="space-y-2">
            <label htmlFor="txt_observaciones" className="text-sm font-medium text-gray-700">
              Observaciones <span className="text-sm font-light text-gray-500">(Opcional)</span>
            </label>
            <textarea
              id="txt_observaciones"
              placeholder="Deja una observación"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>
        </div>
  
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => console.log("Emitir")}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 w-3/4"
          >
            Emitir
          </button>
        </div>
      </div>
    );
  };