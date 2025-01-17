import React from 'react'
import GeneralConfig from './components/General'
import CuentaDetraccion from './components/Detraccion'
import PdfConfigurationForm from './components/PdfConfiguration'
import IgvConfig from './components/Igv'
import TipoDeCambioForm from './components/TipoCambio'

export default function Configuracion() {
  return (
    <>
    <GeneralConfig/>
    <CuentaDetraccion/>
    <PdfConfigurationForm/>
    <IgvConfig/>
    <TipoDeCambioForm/>
    </>
  )
}
