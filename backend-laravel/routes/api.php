<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\MyBookController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\MiListaController;
use App\Http\Controllers\ActividadController;
use App\Http\Controllers\ActividadMiListaController;
use App\Http\Controllers\PuntuacionMediaController;


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

// Rutas NO PROTEGIDAS

Route::post('/login', [AuthenticatedSessionController::class, 'generarToken']);
Route::get('/actividad/{idlibro}', [ActividadMiListaController::class, 'actividadporlibro']);
Route::get('/actividad/usuario/{idpersona}', [ActividadMiListaController::class, 'actividadporusuario']);
Route::get('/actividad', [ActividadMiListaController::class, 'actividad']);
Route::get('/puntuacionmedia/{idlibro}', [PuntuacionMediaController::class, 'puntuacionmedia']);


// Rutas PROTEGIDAS

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::apiResources([
        'users'=>UserController::class,
        'misLibros'=> MiListaController::class,

    ]);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);

});
