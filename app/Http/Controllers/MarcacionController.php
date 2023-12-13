<?php

namespace App\Http\Controllers;

use PDF;
use Carbon\Carbon;
use App\Models\Marcacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Exports\MarcacionesExport;
use App\Models\SrvJustificacion;
use App\Models\User;
use Carbon\CarbonPeriod;
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
            $_marcacion = Marcacion::where('user_id', $request->user_id)
                ->where('fecha', Carbon::now()->format('Y-m-d'))
                ->first();

            if (!$_marcacion) {
                $marcacion = new Marcacion();
                $marcacion->fecha = Carbon::now()->format('Y-m-d');
                $marcacion->reg_entrada = Carbon::now()->format('H:i:s');
                $marcacion->user_id = $request->user_id;

                $marcacion->save();
                return response()->json(['status' => 'success', 'msg' => 'Se ha registrado su marcación de entrada correctamente'], 201);
            } else {
                return response()->json(['status' => 'warning', 'msg' => 'La marcación de este día ya se encuentra registrada'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function addSalida(Request $request): JsonResponse
    {
        try {
            $marcacion = Marcacion::where('user_id', $request->user_id)
                ->where('fecha', Carbon::now()->format('Y-m-d'))
                ->first();

            if (is_null($marcacion)) {
                $marcacion = new Marcacion();
                $marcacion->fecha = Carbon::now()->format('Y-m-d');
                $marcacion->reg_salida = Carbon::now()->format('H:i:s');
                $marcacion->user_id = $request->user_id;
                $marcacion->save();
                return response()->json(['status' => 'success', 'msg' => 'Se ha registrado su marcación de salida correctamente'], 201);
            } else {
                $marcacion->reg_salida = Carbon::now()->format('H:i:s');
                $marcacion->update();
                return response()->json(['status' => 'success', 'msg' => 'Se ha registrado su marcación de salida correctamente'], 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function getMarcacionesForUser(Request $request): JsonResponse
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         m.reg_entrada, m.reg_salida,
                         u.nmbre_usrio as usuario,
                         srvp.nombre_permiso')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
            ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
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
                         m.fecha,
                         m.reg_entrada, m.reg_salida,
                         u.cdgo_usrio,
                         u.nmbre_usrio as usuario,
                         d.alias as departamento,
                         d.cdgo_dprtmnto,
                         srvj.hora_inicio, srvj.hora_fin,
                         srvj.detalle, srvp.nombre_permiso')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion') //Es para usuario
            ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
            ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
            ->fecha($request->fecha)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->departamento($request->cdgo_dprtmnto)
            ->usuario($request->cdgo_usrio)
            ->where('d.id_empresa', $request->id_empresa)
            ->orderby('d.nmbre_dprtmnto', 'ASC')
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->orderBy('m.fecha', 'DESC')
            ->get();

        return response()->json(['status' => 'success', 'marcaciones' => $marcaciones], 200);
    }

    function exportExcelMarcacionesAdmin(Request $request)
    {
        return Excel::download(new MarcacionesExport(
            $request->id_empresa,
            $request->fecha,
            $request->fecha_inicio,
            $request->fecha_fin,
            $request->cdgo_usrio,
            $request->cdgo_dprtmnto
        ), 'marcaciones.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    function exportPDFMarcacionesAdmin(Request $request)
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         m.reg_entrada, m.reg_salida,
                         TIMEDIFF(m.reg_entrada, "08:00:00") as atraso,
                         srvp.nombre_permiso,
                         d.alias as departamento,
                         d.id_empresa')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion') //Es para usuario
            ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
            ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
            ->fecha($request->fecha)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->departamento($request->cdgo_dprtmnto)
            ->usuario($request->cdgo_usrio)
            ->where('d.id_empresa', $request->id_empresa)
            ->orderby('d.nmbre_dprtmnto', 'ASC')
            ->orderBy('u.nmbre_usrio', 'ASC')
            ->orderBy('m.fecha', 'ASC')
            ->get();

        if (sizeof($marcaciones) >= 1) {
            $data = [
                'title' => 'Informe de reporte de marcaciones',
                'marcaciones' => $marcaciones,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin
            ];

            $pdf = PDF::loadView('pdf.marcaciones.reporte_admin', $data)->setPaper('a4', 'landscape');
            return $pdf->download('marcaciones_admin.pdf');
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen marcaciones registradas'], 500);
        }
    }

    function exportPDFMarcacionForUser(Request $request)
    {
        $marcaciones = Marcacion::from('srv_marcaciones as m')
            ->selectRaw('m.id, date_format(m.fecha, "%Y-%m-%d") as current_fecha,
                         u.nmbre_usrio as usuario,
                         m.reg_entrada, m.reg_salida,
                         TIMEDIFF(m.reg_entrada, "08:00:00") as atraso,
                         u.crgo as cargo_usuario,
                         d.nmbre_dprtmnto as departamento,
                         d.id_empresa,
                         us.nmbre_usrio as director,
                         us.crgo as cargo_director,
                         srvp.nombre_permiso')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'm.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->join('usrios_sstma as us', 'us.cdgo_usrio', 'd.id_jefe')
            ->leftJoin('srv_justificaciones as srvj', 'srvj.srv_marcacion_id', 'm.id')
            ->leftJoin('srv_permisos as srvp', 'srvp.id', 'srvj.srv_permiso_id')
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

            $pdf = PDF::loadView('pdf.marcaciones.reporte', $data)->setPaper('a4', 'landscape');
            return $pdf->download('marcaciones.pdf');
        } else {
            return response()->json(['status' => 'error', 'msg' => 'No existen marcaciones registradas'], 500);
        }
    }

    function addJustificacion(Request $request): JsonResponse
    {
        try {
            $periodos = CarbonPeriod::create($request->fecha_inicio, $request->fecha_fin);
            $fechas = [];
            $marcs = [];
            $index = 0;

            foreach ($periodos as $periodo) {
                $fechas[] = [
                    'fecha' => $periodo->format('Y-m-d'),
                    'hora_inicio' => $request->hora_inicio,
                    'hora_fin' => $request->hora_fin,
                    'user_id' => $request->cdgo_usrio,
                    'srv_permiso_id' => $request->srv_permiso_id,
                    'detalle' => $request->detalle
                ];
                $marcs[] = [
                    'fecha' => $periodo->format('Y-m-d'),
                    'reg_entrada' => null,
                    'reg_salida' =>  null,
                    'user_id' => $request->cdgo_usrio,
                ];
                $index++;
            }

            $marcaciones = Marcacion::from('srv_marcaciones as m')
                ->selectRaw('m.id')
                ->where('m.fecha', $request->fecha_inicio)
                ->where('m.user_id', $request->cdgo_usrio)
                ->first();
            $justificacion = SrvJustificacion::from('srv_justificaciones as j')
                ->selectRaw('j.id')
                ->where('j.fecha', $request->fecha_inicio)
                ->where('j.user_id', $request->cdgo_usrio)
                ->first();

            if (is_null($marcaciones) && is_null($justificacion)) {     //! Vacaciones
                $marcacion = [];
                $index = 0;
                foreach ($marcs as $m) {
                    $marcacion[] = Marcacion::create([
                        'fecha' => $m['fecha'],
                        'reg_entrada' => $m['reg_entrada'],
                        'reg_salida' =>  $m['reg_salida'],
                        'user_id' => $m['user_id'],
                    ]);
                }

                foreach ($marcacion as $m) {
                    $m->justificaciones()->sync([$fechas[$index]]);
                    $index++;
                }

                return response()->json(['status' => 'success', 'msg' => 'Se agrego con éxito la justificación'], 201);
            } else if (!is_null($marcaciones) && is_null($justificacion)) {  //! Permiso
                $marcaciones->justificaciones()->sync($fechas);
                return response()->json(['status' => 'success', 'msg' => 'Se agrego con éxito la justificación'], 201);
            } else {
                return response()->json(['status' => 'warning', 'msg' => '¡Ya existe una justificación para este/estos días!'], 201);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }

    function getJustificaciones(Request $request): JsonResponse
    {
        $justificaciones = SrvJustificacion::from('srv_justificaciones as srvj')
            ->selectRaw('srvj.id, srvj.fecha,
                        u.cdgo_usrio,
                        u.nmbre_usrio as usuario
                        srvj.hora_inicio, srvj.hora_fin,
                        srvp.id, srvp.nombre_permiso,
                        srvj.detalle')
            ->join('srv_permisos as srvp', 'srvp.id', 'srvj.serv_permiso_id')
            ->join('usrios_sstma as u', 'u.cdgo_usrio', 'srvj.user_id')
            ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'u.cdgo_direccion')
            ->usuario($request->user_id)
            ->fechas($request->fecha_inicio, $request->fecha_fin)
            ->get();

        return response()->json(['status' => 'success', 'justificaciones' => $justificaciones], 200);
    }

    function addMarcacionImplicitas(Request $request): JsonResponse
    {
        try {
            $totalUsuariosLosep = User::from('usrios_sstma as u')
                ->selectRaw('u.cdgo_usrio')
                ->where('u.losep', 1)
                ->get();
            foreach ($totalUsuariosLosep as $usuario) {
                $marcacion = Marcacion::where('srv_marcaciones.user_id', $usuario['cdgo_usrio'])
                    ->where('srv_marcaciones.fecha', $request->fecha)
                    ->first();
                if (!$marcacion) {
                    $marcacion = new Marcacion();
                    $marcacion->fecha = $request->fecha;
                    $marcacion->reg_entrada = null;
                    $marcacion->reg_salida = null;
                    $marcacion->user_id = $usuario['cdgo_usrio'];
                    $marcacion->save();
                }
            }
            return response()->json(['status' => 'success', 'msg' => 'Se ha registrado correctamente'], 201);

        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => $th->getMessage()], 500);
        }
    }
}
