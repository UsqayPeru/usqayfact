export const getInvoicesIntegrations = async(offset: number, limit: number) => {
    try {   

        const endpoint =  process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

        const params = {
            offset,
            limit
        }

        const response = await fetch(`${endpoint}/backend/api/companies.php?integrations`, {
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
        console.log(data)
        
        return data
            
    } catch (error) {
        return {
            status: false,
            message: 'No se pudo obtener los tokens de las empresas, vuelve a intentarlo.'
        }
    }
}