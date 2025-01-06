'use client'
import toast, { Toaster } from 'react-hot-toast';

import { useEffect, useState } from 'react'
import { Building2, Copy, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Companies } from '@/interfaces/companies.interface'
import LoadingTable from './LoadingTable'
import { getEmisores } from '@/services/reseller/emisores.service';
import Banner from '@/components/banner/Banner';
import { Badge } from '@/components/ui/badge';


export function Emisores() {
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
      const fetchEmisores = async () => {
          setIsLoading(true);
          try {
              const data = await getEmisores();
              setCompanies(data);

          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchEmisores();
  }, []);

  if ( isLoading ) {
    return <LoadingTable title="emisores" />
  }

  return (
    <div className="container mx-auto py-6">
      <Toaster position='top-center' />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                Empresas
                </h1>
                <button className="inline-flex items-center justify-center rounded-md bg-black hover:bg-black px-4 py-2 text-sm font-medium text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Agregar Nuevo
                </button>
            </div>
          <p className="text-muted-foreground">
            Gestiona las empresas que pertencen a usqayfact.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por RUC"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Card key={company.id} className="relative overflow-hidden">
             <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="truncate">
                        {company.razon_social}
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1">RUC: {company.ruc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className='flex justify-between items-center'>
                  <div className="space-y-2">
                    <div className={`h-3 w-3 flex-shrink-0 rounded-full`}> 
                        {company.estado === "1"  ? (
                            <Badge variant="outline" className=" bg-green-100 text-green-600 border-green-200 rounded-full"> Activo </Badge>
                        ) : (
                            <Badge variant="outline" className=" bg-red-100 text-red-600 border-red-200 rounded-full"> Inactivo </Badge>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
      </div>
    </div>
  )
}

