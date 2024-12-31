export interface InvoicesError {
    id: number;
    ruc: string;
    serie: string;
    correlativo: string;
    codigo_error: string;
    momento_error: string;
    descripcion_error: string;
    json_comprobante: any;
    tiempo: string;
}