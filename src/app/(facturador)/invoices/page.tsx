
import { InvoicesFooter } from "./_components/InvoicesFooter"
import { InvoicesHeader } from "./_components/InvoicesHeader"
import { InvoicesTable } from "./_components/InvoicesTable"


export default function InvoicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Comprobantes
          </h1>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Agregar Nuevo
          </button>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white shadow">
            <div className="p-6">
              <InvoicesHeader />
            </div>
          </div>
          <div className="rounded-lg border bg-white shadow">
            <InvoicesTable />
          </div>
          <div className="rounded-lg bg-white p-6  text-center">
            <InvoicesFooter />
          </div>
        </div>
      </div>
    </div>
  )
}

