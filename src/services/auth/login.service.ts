export const loginAuthService = async(email: string, password: string) => {
    try {   

        const endpoint =  process.env.NEXT_PUBLIC_ENDPOINT_BACKEND

        const params = {
            usuario: email,
            contrasenia: password
        }

        
        const response = await fetch(`${endpoint}/APIindex.php?validar_usuario`, {
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
        if ( data[0].retorno === 0 ) {
            return {
                status: false,
                data,
                message: 'Usuario o contraseña incorrecta'
            }
        } else {
            return {
                status: true,
                data,
                message: 'Autenticado correctamente'
            }
        }
       
            
    } catch (error) {
        return {
            status: false,
            message: 'No se pudo autenticar, vuelve a intentarlo.'
        }
    }
}