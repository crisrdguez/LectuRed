<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Models\User;
use App\Models\MiLista;

class ActividadResource extends JsonResource
{

    protected static $model = 'App\Models\Actividad';
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return
        [
            /* 'idPersona' => $this->user_id, */
            'fecha' => Carbon::parse($this->updated_at)->format('d/m/Y'),
            'nombre' => User::find($this->user_id)->name,
            'idLibro'=> $this->idlibro,
            // buscamos el idlibro en la tabla miLista, cogemos el primer resultado y cogemos el campo media_puntuacion y si es null le asignamos "Se el primero en puntuar"
            'media_puntuacion' => MiLista::where('idlibro', $this->idlibro)->first()->media_puntuacion ?? 0,
            'accion' => $this->tipo,
            'campo' => $this->campo_actualizado,
            // si la accion es eliminado, no se muestra el valor nuevo
            'valor_nuevo' => $this->tipo == 'Eliminado' ? '' : $this->valor_nuevo,
            'fecha' => Carbon::parse($this->updated_at)->format('d/m/Y'),
        ];
        }
}
