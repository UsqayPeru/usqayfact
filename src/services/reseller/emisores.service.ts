export const getEmisores = async() => {
    try {   

        const endpoint =  process.env.NEXT_PUBLIC_INTRANET;

        const response = await fetch(`${endpoint}/backend/api/APIemisor.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json()
        
        return data
            
    } catch (error) {
        return {
            status: false,
            message: 'No se pudo obtener los emisores, vuelve a intentarlo.'
        }
    }
}