import React from "react";
import Remitente from "./components/Remitente";
import Destinatario from "./components/Desrinatario";
import Transporte from "./components/Transporte";
import Envio from "./components/Envio";
import Items from "./components/Items";
import DocumentoReferencia from "./components/DocReferencia";
import { TablaItems } from "./components/TablesItems";
import { Observaciones } from "./components/Observaciones";

export default function NuevaGuia() {
  return(
    <div >
    <div className="p-4 m-2">
      <Remitente />
    </div>
    <div className="p-4 m-2">
      <Destinatario />
    </div>
    <div className="p-4 m-2">
      <Transporte/>
    </div>
    <div className="p-4 m-2">
      <Envio/>
    </div>
    <div className="p-4 m-2 flex">
      <div className="flex-1">
      <Items />
      </div>
      <div className="flex-1">
      <DocumentoReferencia />
      </div>
    </div>
    <div className="p-4 m-2">
      <TablaItems/>
    </div>

    <div className="p-4 m-2">
      <Observaciones/>
    </div>
    
    
   </div>
  );
  
}
