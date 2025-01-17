
import { Separator } from "@/components/ui/separator"
import { InvoicesFooter } from "./_components/InvoicesFooter"
import { InvoicesHeader } from "./_components/InvoicesHeader"
import { InvoicesTable } from "./_components/InvoicesTable"
import { Suspense } from "react"
import LoadingTable from "./Loading"
import { InvoicesFilterProvider } from "./hooks/useFilterContext"


export default function InvoicesPage() {
  return (
    <InvoicesFilterProvider>
      <div className="min-h-screen p-2  ">
        <div className="container mx-auto p-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Comprobantes
            </h1>
            <button className="inline-flex items-center justify-center rounded-md bg-black hover:bg-black px-4 py-2 text-sm font-medium text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Agregar Nuevo
            </button>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg ">
              <InvoicesHeader />
            </div>
            <Separator />
            <div className="rounded-lg ">
              <Suspense fallback={<LoadingTable />}>
                <InvoicesTable />
              </Suspense>
            </div>
            <div className="rounded-lg  p-6  text-center">
              <InvoicesFooter />
            </div>
          </div>
        </div>
      </div>
    </InvoicesFilterProvider>
  )
}

