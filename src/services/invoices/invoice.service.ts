export const getInvoicesAll = async(ruc: string, date_init: string, date_end: string, serie: string, estado: string, documentType: string, id_local: number, apikey: string) => {
    try {   

        const endpoint =  process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

        const params = {
            ruc: ruc,
            fecha_inicio: date_init,
            fecha_fin: date_end,
            serie: serie,
            idlocal: id_local,
            estado: parseInt(estado),
            tipo_comprobante: documentType
        }

        
        const response = await fetch(`${endpoint}/backend/api/invoices.php?all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json()
        
        return data
            
    } catch (error) {
        return {
            status: false,
            message: 'No se pudo autenticar, vuelve a intentarlo.'
        }
    }
}