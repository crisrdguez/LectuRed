<?php

namespace App\Http\Controllers;

use App\Models\MiLista;
use Illuminate\Http\Request;
use App\Http\Resources\PuntuacionMediaResource;

class PuntuacionMediaController extends Controller
{
    
    public function puntuacionmedia($idlibro)
    {
        $puntuacionmedia = MiLista::where('idlibro', $idlibro)->first('media_puntuacion');
        $puntuacionmedia = $puntuacionmedia->media_puntuacion;

        if($puntuacionmedia == null){
            return response()->json([
                'success' => false,
                'message' => 'No hay puntuaciones para este libro'
            ], 200);
        }else{
            return new PuntuacionMediaResource($puntuacionmedia);
        }
    }
}
