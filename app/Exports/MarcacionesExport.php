<?php

namespace App\Exports;

use App\Models\Marcacion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MarcacionesExport implements FromCollection, WithHeadings, WithColumnWidths, WithStyles
{

    protected $fecha;

    public function __construct($fecha)
    {
        $this->fecha = $fecha;
    }

    function columnWidths(): array
    {
        return [
            'A' => 40,
            'B' => 50,
            'E' => 40,
            'F' => 40
        ];
    }

    function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    function headings(): array
    {
        return [
            'Fecha',
            'Empleado',
            'RegEntrada',
            'RegSalida'
        ];
    }


    /**
     * @return \Illuminate\Support\Collection
     */

    public function collection()
    {
        return Marcacion::from('srv_marcaciones as m')
            ->selectRaw('date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         m.reg_entrada, m.reg_salida')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->where('m.fecha', $this->fecha)
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->get();
    }
}
