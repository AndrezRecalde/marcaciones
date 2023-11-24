<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    function getUsuariosForDepartamento(Request $request): JsonResponse
    {
        $usuarios = User::where('actvo', 1)
                    ->where('cdgo_direccion', $request->cdgo_dprtmnto)
                    ->get(['cdgo_usrio', 'nmbre_usrio']);

        return response()->json(['status' => 'success', 'usuarios' => $usuarios], 200);
    }
}
