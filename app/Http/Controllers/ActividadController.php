<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActividadRequest;
use App\Models\Actividad;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PDF;

class ActividadController extends Controller
{
    function getActivForUserForDates(Request $request): JsonResponse
    {
        $actividades = Actividad::from('srv_actividades as a')
            ->selectRaw('a.id, a.actividad,
                         date_format(a.fecha_actividad, "%Y-%m-%d") as fecha,
                         a.fecha_actividad,
                         u.nmbre_usrio as usuario,
                         u.cdgo_usrio as cdgo_usrio,
                         d.nmbre_dprtmnto as departamento,
                         us.nmbre_usrio as director')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'a.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->where('a.user_id', $request->user_id)
            ->whereBetween('a.fecha_actividad', [$request->fecha_inicio, $request->fecha_fin])
            ->orderBy('a.fecha_actividad', 'DESC')
            ->get();

        if (sizeof($actividades) >= 1) {
            return response()->json(['status' => 'success', 'actividades' => $actividades], 200);
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen actividades registradas'], 500);
        }
    }

    function store(ActividadRequest $request): JsonResponse
    {
        try {
            Actividad::create($request->validated());
            return response()->json(['status' => 'success', 'msg' => 'Su actividad se ha registrado'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function update(ActividadRequest $request, int $id): JsonResponse
    {
        $actividad = Actividad::find($id);

        try {
            if ($actividad) {
                $actividad->update($request->validated());
                return response()->json(['status' => 'success', 'msg' => 'Su actividad ha sido actualizada'], 201);
            } else {
                return response()->json(['status' => 'error', 'msg' => 'Actividad no encontrada'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function exportPDFActividadesForUser(Request $request)
    {
        $actividades = Actividad::from('srv_actividades as a')
            ->selectRaw('a.id, a.actividad,
                         date_format(a.fecha_actividad, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         u.crgo_id,
                         u.crgo as cargo_usuario,
                         d.nmbre_dprtmnto as departamento,
                         us.nmbre_usrio as director, us.crgo as cargo_director')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'a.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->where('a.user_id', $request->user_id)
            ->whereBetween('a.fecha_actividad', [$request->fecha_inicio, $request->fecha_fin])
            ->orderBy('current_fecha', 'ASC')
            ->get();

        if (sizeof($actividades) >= 1) {
            $data = [
                'title' => 'Informe de reporte de actividades',
                'actividades' => $actividades,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
                'current_fecha' => Carbon::now()->format('Y-m-d')
            ];

            $pdf = PDF::loadView('pdf.actividades.reporte', $data);
            return $pdf->download('actividades.pdf');
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen actividades registradas'], 500);
        }
    }
}
