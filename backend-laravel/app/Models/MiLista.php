<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Actividad;

class MiLista extends Model
{
    use HasFactory;

    protected $table = 'mi_listas';
    protected $guarded = ['id'];

    protected static function booted()
    {

        static::saved(function ($miLista) {
            $idlibro = $miLista->idlibro;
            $mediaPuntuacion = self::where('idlibro', $idlibro)->avg('puntuacion');
    
            // Actualizar la media de puntuación en la misma fila
            self::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });

        
        static::deleted(function ($miLista) {
            $idlibro = $miLista->idlibro;
            $mediaPuntuacion = self::where('idlibro', $idlibro)->avg('puntuacion');
    
            // Actualizar la media de puntuación en la misma fila
            self::where('idlibro', $idlibro)->update(['media_puntuacion' => $mediaPuntuacion]);
        });
        
        static::creating(function ($miLista) {
           Actividad::create([
                'user_id' => auth()->user()->id,
                'idlibro' => $miLista->idlibro,
                'nombre' => auth()->user()->name,
                'tipo' => 'Ha añadido',
                'campo_actualizado' =>'libro' ,
                'valor_anterior' =>null,
                'valor_nuevo' =>'libro',
            ]);
        });
        static::updating(function ($miLista) {


            $dirtyKeys = array_keys($miLista->getDirty());
        
            Actividad::create([
                'user_id' => auth()->user()->id,
                'idlibro' => $miLista->idlibro,
                'nombre' => auth()->user()->name,
                'tipo' => 'Ha modificado',
                'campo_actualizado' => $dirtyKeys[0], // Obtener el primer atributo modificado
                'valor_anterior' => $miLista->getOriginal($dirtyKeys[0]),
                'valor_nuevo' => $miLista->getDirty()[$dirtyKeys[0]],
            ]);
        });

        static::deleting(function ($miLista) {
            Actividad::create([
                'user_id' => auth()->user()->id,
                'idlibro' => $miLista->idlibro,
                'nombre' => auth()->user()->name,
                'tipo' => 'Ha eliminado',
                'campo_actualizado' =>'libro' ,
                'valor_anterior' =>'libro',
                'valor_nuevo' =>null,
            ]);
        });
        
    }


}
