"use client"

import { FilterState } from '@/interfaces/filterinvoices.interface'
import React, { createContext, useState, useContext } from 'react'


interface FilterContextType {
  filterState: FilterState
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
}

const InvoicesFilterContext = createContext<FilterContextType | undefined>(undefined)

export const useInvoicesFilter = () => {
  const context = useContext(InvoicesFilterContext)
  if (context === undefined) {
    throw new Error('useInvoicesFilter must be used within an InvoicesFilterProvider')
  }
  return context
}

export const InvoicesFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    documentType: '',
    entity: '',
    startDate: '',
    endDate: '',
    cancellationStatus: '',
  })

  return (
    <InvoicesFilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </InvoicesFilterContext.Provider>
  )
}

