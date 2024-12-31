import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getInvoicesAll } from "@/services/invoices/invoice.service";

export async function POST(req: NextRequest) {
    try {
        const filterState = await req.json();

        // Fetch invoices based on the filter state
        const invoices = await getInvoicesAll(
            filterState.ruc,
            filterState.startDate,
            filterState.endDate,
            filterState.serie,
            filterState.cancellationStatus,
            filterState.documentType,
            filterState.idLocal,
            filterState.apikey
        );

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Invoices');

        // Add headers
        worksheet.addRow([
            'Fecha', 'Tipo', 'Serie', 'Número', 'RUC/DNI', 'Denominación',
            'Moneda', 'Dirección', 'Total Venta', 'Anulado', 'Enviado al Cliente', 'Estado'
        ]);

        // Add data
        invoices.forEach((invoice: any) => {
            worksheet.addRow([
                invoice.fecha_emision,
                invoice.tipo_documento,
                invoice.serie,
                invoice.correlativo,
                invoice.documento_receptor,
                invoice.denominacion_receptor,
                invoice.moneda,
                invoice.direccion,
                invoice.total_venta,
                invoice.estado === "2" ? "Sí" : "No",
                invoice.estado === "1" ? "Enviado" : "Anulado",
                invoice.estado === "3" ? "Pendiente" : (invoice.estado === "2" ? "Anulado" : "Enviado")
            ]);
        });

        // Generate Excel file
        const buffer = await workbook.xlsx.writeBuffer();

        // Return the Excel file as a response
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=invoices.xlsx'
            }
        });
    } catch (error) {
        console.error('Error generating Excel file:', error);
        return NextResponse.json({ error: 'Failed to generate Excel file' }, { status: 500 });
    }
}

