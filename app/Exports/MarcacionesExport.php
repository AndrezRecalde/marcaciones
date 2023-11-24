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

    protected $fecha, $fecha_inicio, $fecha_fin, $cdgo_usrio, $cdgo_dprtmnto;

    public function __construct($fecha, $fecha_inicio, $fecha_fin, $cdgo_usrio, $cdgo_dprtmnto)
    {
        $this->fecha = $fecha;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
        $this->cdgo_usrio = $cdgo_usrio;
        $this->cdgo_dprtmnto = $cdgo_dprtmnto;

    }

    function columnWidths(): array
    {
        return [
            'A' => 40,
            'B' => 50,
            'C' => 40,
            'D' => 40,
            'E' => 80,
        ];
    }

    function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);

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
            'RegSalida',
            'Departamento'
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
                         m.reg_entrada, m.reg_salida,
                         d.nmbre_dprtmnto as departamento')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->fecha($this->fecha)
            ->fechas($this->fecha_inicio, $this->fecha_fin)
            ->departamento($this->cdgo_dprtmnto)
            ->usuario($this->cdgo_usrio)
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->get();
    }
}
