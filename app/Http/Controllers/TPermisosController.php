<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TPermisosController extends Controller
{
    function getTiposPermisos(): JsonResponse
    {
        $tipos = DB::table('srv_permisos as p')
            ->selectRaw('p.id, p.nombre_permiso')
            ->get();
        return response()->json(['status' => 'success', 'tipos' => $tipos], 200);
    }
}
