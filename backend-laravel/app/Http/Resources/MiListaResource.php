<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Models\User;

class MiListaResource extends JsonResource
{


    public static $model = 'App\Models\MiLista';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return
            [
                'idPersona' => $this->user_id,
                'nombre' => User::find($this->user_id)->name,
                'fecha' => Carbon::parse($this->updated_at)->format('d/m/Y'),
                'idLibro'=>$this->idlibro,
                'puntuacion' => $this->puntuacion,
                'critica' => $this->critica,
                'estado' => $this->estado,
                /* 'media' => $this->media_puntuacion, */
            ];
    }
}
