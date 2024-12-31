export const getInvoicesError = async(offset: number, limit: number) => {
    try {   

        const endpoint =  process.env.NEXT_PUBLIC_ENDPOINT_BACKEND;

        const params = {
            offset,
            limit
        }

        const response = await fetch(`${endpoint}/backend/api/logs.php?all`, {
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
            message: 'No se pudo obtener los logs, vuelve a intentarlo.'
        }
    }
}