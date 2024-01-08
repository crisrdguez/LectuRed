<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Models\User;

class ActividadMiListaResource extends JsonResource
{

    public static $model = 'App\Models\ActividadMiLista';
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return
            [
                'nombre' => User::find($this->user_id)->name,
                'fecha' => Carbon::parse($this->created_at)->format('d/m/Y'),
                'idLibro'=>$this->idlibro,
                'puntuacion' => $this->puntuacion,
                'critica' => $this->critica,
                'estado' => $this->estado,
            ];
    }
}
