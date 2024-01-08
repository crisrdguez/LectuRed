<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\ActividadMiLista;
use App\Http\Resources\ActividadMiListaResource;

class ActividadMiListaController extends Controller
{
    public function actividad()
    {
        $actividad = ActividadMiLista::all();

        // si la lista esta vacia
        if ($actividad->isEmpty()) {

            return response()->json([
                'success' => false,
                'message' => 'No se encontro actividad'
            ], 404);
        }else {

        return response()->json([
            'success' => true,
            'items' => ActividadMiListaResource::collection($actividad)
        ], 200);
    }
    }

    public function actividadporlibro($idlibro)
    {
        $actividad = ActividadMiLista::where('idlibro', $idlibro)->get();
        // si la lista esta vacia
        if ($actividad->isEmpty()) {

            return response()->json([
                'success' => false,
                'message' => 'No se encontro actividad para este libro'
            ], 404);
        }else {
            
        return response()->json([
            'success' => true,
            'items' => ActividadMiListaResource::collection($actividad)
        ], 200);
        }
    }

}
