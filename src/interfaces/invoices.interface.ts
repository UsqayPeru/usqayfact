export interface Invoice {
  id: string
  ruc_emisor: string
  documento_receptor: string
  tipo_documento_receptor: string
  denominacion_receptor: string
  tipo_documento: string
  serie: string
  direccion: string
  correlativo: string
  fecha_emision: string
  moneda: string
  total_gravadas: string
  total_inafecta: string
  total_exonerada: string
  total_gratuita: string
  total_icbper: string
  igv: string
  otros_impuestos: string
  total_venta: string
  estado: string
  respuesta_sunat:string
  otros: string
}
