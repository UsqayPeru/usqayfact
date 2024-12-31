'use client'
import toast, { Toaster } from 'react-hot-toast';

import { useEffect, useState } from 'react'
import { Building2, Copy, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getInvoicesIntegrations } from '@/services/reseller/integrations.service'
import { Companies } from '@/interfaces/companies.interface'
import LoadingTable from './LoadingTable'


export function IntegrationResellerComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const entriesPerPage = 25;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Token copiado correctamente")
    setCopied(true)
  }

  useEffect(() => {
      const fetchInvoiceLogs = async () => {
          setIsLoading(true);
          try {
              const offset = (currentPage - 1) * entriesPerPage;
              const data = await getInvoicesIntegrations(offset, entriesPerPage);
              setCompanies(data[0].retorno);
              setTotalEntries(data[0].total || 0);

          } catch (error) {
              console.error("Error fetching data:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchInvoiceLogs();
  }, [currentPage]);

  if ( isLoading ) {
    return <LoadingTable title="empresas" />
  }

  return (
    <div className="container mx-auto py-6">
      <Toaster position='top-center' />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Tokens para integraciones</h1>
          <p className="text-muted-foreground">
            Gestiona los tokens de integración para conectar con sistemas externos a nuestra api.
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
                      <div className={`h-3 w-3 flex-shrink-0 rounded-full ${
                        company.estado === '1' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`} />
                    </div>
                    <CardDescription className="mt-1">RUC: {company.ruc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Token de Integración</div>
                  <div className="flex items-center gap-1 rounded-md bg-muted p-2">
                    <code className="text-sm flex-1 whitespace-nowrap w-full">
                      {company.apikey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(company.apikey)}
                      className="text-muted-foreground hover:text-primary"
                    > 
                    
                        <Copy className="h-4 w-4 mr-8" />
                        <span className="sr-only">Copiar token</span>
                       
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Ubicación</div>
                    <div className="text-sm text-muted-foreground">
                      {company.departamento}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Ambiente</div>
                    <div className="text-xs text-muted-foreground">
                      {company.modo}
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

