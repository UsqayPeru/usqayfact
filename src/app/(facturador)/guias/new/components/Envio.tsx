"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Envio = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded p-4">
        <p className="text-lg font-semibold flex items-center">
          <i className="fa fa-tasks mr-2" aria-hidden="true"></i>Envío
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ubigeo Origen</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione el Ubigeo" />
                </SelectTrigger>
                <SelectContent>
                  {/* Agregar opciones aquí */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Dirección Origen</label>
              <Input
                id="direccion_origen"
                placeholder="Ingrese Dirección Origen"
                className="w-full"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Ubigeo Destino</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione el Ubigeo" />
                </SelectTrigger>
                <SelectContent>
                  {/* Agregar opciones aquí */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Dirección Destino</label>
              <Input
                id="direccion_destino"
                placeholder="Ingrese Dirección Destino"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Motivo Traslado</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un Motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">Venta</SelectItem>
                  <SelectItem value="02">Compra</SelectItem>
                  <SelectItem value="03">Venta con entrega a terceros</SelectItem>
                  <SelectItem value="04">Traslado entre establecimientos de la misma empresa</SelectItem>
                  <SelectItem value="05">Consignación</SelectItem>
                  <SelectItem value="06">Devolución</SelectItem>
                  <SelectItem value="07">Recojo de bienes transformados</SelectItem>
                  <SelectItem value="08">Importación</SelectItem>
                  <SelectItem value="09">Exportación</SelectItem>
                  <SelectItem value="14">Venta sujeta a confirmación del comprador</SelectItem>
                  <SelectItem value="17">Traslado de bienes para transformación</SelectItem>
                  <SelectItem value="18">Traslado emisor itinerante de comprobantes de pago</SelectItem>
                  <SelectItem value="13">Otros (no especificados en los anteriores)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Fecha Entrega al Transportista</label>
              <Input
                id="fecha_entre_transportista"
                type="date"
                className="w-full"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-gray-700">Peso Bruto Total (KGM)</label>
              <Input
                id="peso_bruto"
                type="number"
                placeholder="Ingrese el Peso Bruto"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Envio;
