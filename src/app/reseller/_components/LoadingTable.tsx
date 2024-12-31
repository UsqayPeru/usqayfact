import { Loader2 } from 'lucide-react'
import React from 'react'

interface Props {
    title: string;
}

function LoadingTable({ title }: Props) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Cargando {title}...</span>
        </div>
    )
}

export default LoadingTable