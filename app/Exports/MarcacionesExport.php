<?php

namespace App\Exports;

use App\Models\Marcacion;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MarcacionesExport implements FromView, WithHeadings, WithColumnWidths, WithStyles, WithEvents, WithDrawings
{

    protected $id_empresa, $fecha, $fecha_inicio, $fecha_fin, $cdgo_usrio, $cdgo_dprtmnto;

    public function __construct($id_empresa, $fecha, $fecha_inicio, $fecha_fin, $cdgo_usrio, $cdgo_dprtmnto)
    {
        $this->id_empresa = $id_empresa;
        $this->fecha = $fecha;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
        $this->cdgo_usrio = $cdgo_usrio;
        $this->cdgo_dprtmnto = $cdgo_dprtmnto;
    }

    public function drawings()
    {
        $drawing = new Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('GADPE_LOGO');
        $drawing->setPath(public_path('/assets/images/LogoTransparente.png'));
        $drawing->setHeight(150);
        $drawing->setCoordinates('J2');

        return $drawing;
    }

    function columnWidths(): array
    {
        return [
            'A' => 20,
            'B' => 30,
            'C' => 20,
            'D' => 20,
            'E' => 20,
            'F' => 30,
            'G' => 30
        ];
    }

    function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1')->getFont()->setBold(true);
        $sheet->getStyle('B1')->getFont()->setBold(true);
        $sheet->getStyle('C1')->getFont()->setBold(true);
        $sheet->getStyle('D1')->getFont()->setBold(true);
        $sheet->getStyle('E1')->getFont()->setBold(true);
        $sheet->getStyle('F1')->getFont()->setBold(true);
        $sheet->getStyle('G1')->getFont()->setBold(true);
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
            'Atrasos',
            'TipoPermiso',
            'Departamento'
        ];
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $event->sheet->getDelegate()->getStyle('1')->getFont()->setSize(14);
            },
        ];
    }


    public function view(): View
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
        ->selectRaw('date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                     u.nmbre_usrio as usuario,
                     m.reg_entrada, m.reg_salida,
                     TIMEDIFF(m.reg_entrada, "08:00:00") as atraso,
                     srvp.nombre_permiso,
                     d.alias as departamento')
        ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
        ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
        ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
        ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
        ->fecha($this->fecha)
        ->fechas($this->fecha_inicio, $this->fecha_fin)
        ->departamento($this->cdgo_dprtmnto)
        ->usuario($this->cdgo_usrio)
        ->where('d.id_empresa', $this->id_empresa)
        ->where('u.losep', 1)
        ->orderby('d.nmbre_dprtmnto', 'ASC')
        ->orderBy('u.nmbre_usrio', 'ASC')
        ->orderBy('m.fecha', 'ASC')
        ->get();

        return view('exports.marcaciones_export', ['marcaciones' => $marcaciones]);
    }


    /**
     * @return \Illuminate\Support\Collection
     */


    /* public function collection()
    {
        return Marcacion::from('srv_marcaciones as m')
            ->selectRaw('date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         m.reg_entrada, m.reg_salida,
                         TIMEDIFF(m.reg_entrada, "08:00:00") as atraso,
                         srvp.nombre_permiso,
                         d.alias as departamento')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
            ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
            ->fecha($this->fecha)
            ->fechas($this->fecha_inicio, $this->fecha_fin)
            ->departamento($this->cdgo_dprtmnto)
            ->usuario($this->cdgo_usrio)
            ->where('d.id_empresa', $this->id_empresa)
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->orderby('d.nmbre_dprtmnto', 'ASC')
            ->orderBy('m.fecha', 'ASC')
            ->get();
    } */
}
