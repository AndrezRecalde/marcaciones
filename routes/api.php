<?php

use App\Http\Controllers\ActividadController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\IncidenciaController;
use App\Http\Controllers\MarcacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

/* Auth */

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(
    ['middleware' => ['auth:sanctum']],
    function () {
        Route::get('/refresh', [AuthController::class, 'refresh']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/marcacion/today', [MarcacionController::class, 'getMarcacionForUserToday']);
        Route::post('/marcacion/entrada', [MarcacionController::class, 'addEntrada']);
        Route::put('/marcacion/salida/{user_id}', [MarcacionController::class, 'addSalida']);

        Route::post('/marcaciones/admin', [MarcacionController::class, 'getMarcacionesAdmin']);
        Route::post('/marcaciones/user', [MarcacionController::class, 'getMarcacionesForUser']);
        Route::post('/export/excel/marcaciones/admin', [MarcacionController::class, 'exportExcelMarcacionesAdmin']);
        Route::post('/export/pdf/marcaciones/user', [MarcacionController::class, 'exportPDFMarcacionForUser']);



        Route::post('/get/actividades', [ActividadController::class, 'getActivForUserForDates']);
        Route::post('/create/actividad', [ActividadController::class, 'store']);
        Route::put('/update/actividad/{id}', [ActividadController::class, 'update']);
        Route::post('/export/pdf/actividades', [ActividadController::class, 'exportPDFActividadesForUser']);


        Route::post('/incidencias/mail', [IncidenciaController::class, 'sendIncidencia']);

    }
);
