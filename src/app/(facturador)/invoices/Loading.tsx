import { Loader2 } from 'lucide-react'
import React from 'react'

function LoadingTable() {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Cargando comprobantes...</span>
        </div>
    )
}

export default LoadingTable