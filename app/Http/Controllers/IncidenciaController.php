<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncidenciaRequest;
use App\Mail\IncidenciaMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class IncidenciaController extends Controller
{
    function sendIncidencia(IncidenciaRequest $request): JsonResponse
    {
        $incidencias = $request->validated();

        Mail::to('pconstantini@gadpe.gob.ec')
            ->queue(new IncidenciaMail($incidencias));

        return response()->json(['status' => 'success', 'msg' => 'Solicitud enviada con éxito'], 200);
        /* Mail::to('crecalde@gadpe.gob.ec')
            ->queue(new IncidenciaMail($request->detalle_incidencia)) */
    }
}
