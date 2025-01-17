"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Items = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-4">
        <p className="text-lg font-semibold flex items-center">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>Items
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Item</label>
            <Input
              id="id_plato"
              placeholder="Ingrese el nombre del item"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Cantidad</label>
            <Input
              id="cantidad"
              type="number"
              defaultValue="1"
              placeholder="Ingrese la cantidad"
              className="w-full"
            />
          </div>

          <button
            onClick={() => console.log("Agregar item")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
