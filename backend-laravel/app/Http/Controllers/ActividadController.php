<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actividad;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\ActividadResource;


class ActividadController extends Controller
{
    public function actividad()
    {
        $actividad = Actividad::all();

        // si la lista esta vacia
        if ($actividad->isEmpty()) {

            return response()->json([
                'success' => false,
                'message' => 'No se encontro actividad'
            ], 404);
        }else {

        return response()->json([
            'success' => true,
            'items' => ActividadResource::collection($actividad)
        ], 200);
    }
    }

    public function actividadporlibro($idlibro)
    {
        $actividad = Actividad::where('idlibro', $idlibro)->get();
        // si la lista esta vacia
        if ($actividad->isEmpty()) {

            return response()->json([
                'success' => false,
                'message' => 'No se encontro actividad para este libro'
            ], 404);
        }else {
            
        return response()->json([
            'success' => true,
            'items' => ActividadResource::collection($actividad)
        ], 200);
        }
    }

}
