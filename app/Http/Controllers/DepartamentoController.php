<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    function getDepartamentos(Request $request): JsonResponse
    {
        $departamentos = Departamento::where('interna', 1)
            ->where('dep_activo', 1)
            ->where('es_direccion', 1)
            ->where('id_empresa', $request->id_empresa)
            ->get(['cdgo_dprtmnto', 'nmbre_dprtmnto']);

        return response()->json(['status' => 'success', 'departamentos' => $departamentos], 200);
    }
}
