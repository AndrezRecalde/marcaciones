<?php

namespace App\Http\Controllers;

use PDF;
use Carbon\Carbon;
use App\Models\Marcacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Exports\MarcacionesExport;
use Maatwebsite\Excel\Facades\Excel;

class MarcacionController extends Controller
{
    function getMarcacionForUserToday(Request $request): JsonResponse
    {
        $marcacion = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, m.fecha,
                         m.reg_entrada, m.reg_salida,
                         u.nmbre_usrio as usuario')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->where('m.user_id', $request->user_id)
            ->where('m.fecha', Carbon::now()->format('Y-m-d'))
            ->first();

        return response()->json(['status' => 'success', 'marcacion' => $marcacion], 200);
    }

    function addEntrada(Request $request): JsonResponse
    {
        try {
            $marcacion_ = Marcacion::where('user_id', $request->user_id)
                ->where('fecha', Carbon::now()->format('Y-m-d'))
                ->first();

            if (!$marcacion_) {
                $marcacion = new Marcacion();
                $marcacion->fecha = Carbon::now()->format('Y-m-d');
                $marcacion->reg_entrada = Carbon::now()->format('H:i:s');
                $marcacion->user_id = $request->user_id;

                $marcacion->save();
                return response()->json(['status' => 'success', 'msg' => 'Se ha registrado su marcación de entrada correctamente'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'La marcación de este día ya se encuentra registrada'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function addSalida(int $user_id): JsonResponse
    {
        $marcacion = Marcacion::where('user_id', $user_id)
            ->where('fecha', Carbon::now()->format('Y-m-d'))
            ->first();

        try {
            $marcacion->reg_salida = Carbon::now()->format('H:i:s');
            $marcacion->update();
            return response()->json(['status' => 'success', 'msg' => 'Se ha registrado su marcación de salida correctamente'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function getMarcacionesForUser(Request $request): JsonResponse
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         m.reg_entrada, m.reg_salida,
                         u.nmbre_usrio as usuario')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->where('m.user_id', $request->user_id)
            ->whereBetween('m.fecha', [$request->fecha_inicio, $request->fecha_fin])
            ->orderBy('m.fecha', 'DESC')
            ->get();

        if (sizeof($marcaciones) >= 1) {
            return response()->json(['status' => 'success', 'marcaciones' => $marcaciones], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen marcaciones registradas'], 500);
        }
    }

    function getMarcacionesAdmin(Request $request): JsonResponse
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         m.reg_entrada, m.reg_salida,
                         u.nmbre_usrio as usuario,
                         d.nmbre_dprtmnto as departamento')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->fecha($request->fecha)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->departamento($request->cdgo_dprtmnto)
            ->usuario($request->cdgo_usrio)
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->orderBy('m.fecha', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'marcaciones' => $marcaciones], 200);
    }

    function exportExcelMarcacionesAdmin(Request $request)
    {
        return Excel::download(new MarcacionesExport(
            $request->fecha,
            $request->fecha_inicio,
            $request->fecha_fin,
            $request->cdgo_usrio,
            $request->cdgo_dprtmnto
        ), 'marcaciones.xlsx');
    }

    function exportPDFMarcacionForUser(Request $request)
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         m.reg_entrada, m.reg_salida,
                         u.nmbre_usrio as usuario,
                         u.crgo as cargo_usuario,
                         d.nmbre_dprtmnto as departamento,
                         us.nmbre_usrio as director, us.crgo as cargo_director')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->where('m.user_id', $request->user_id)
            ->whereBetween('m.fecha', [$request->fecha_inicio, $request->fecha_fin])
            ->get();

        if (sizeof($marcaciones) >= 1) {
            $data = [
                'title' => 'Informe de reporte de marcaciones',
                'marcaciones' => $marcaciones,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin
            ];

            $pdf = PDF::loadView('pdf.marcaciones.reporte', $data);
            return $pdf->download('marcaciones.pdf');
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen marcaciones registradas'], 500);
        }
    }
}
