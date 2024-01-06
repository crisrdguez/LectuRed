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
            $dirtyFields = $miLista->getDirty();
            foreach ($dirtyFields as $fieldName => $newValue) {
                $originalValue = $miLista->getOriginal($fieldName);
        
                Actividad::create([
                    'user_id' => auth()->user()->id,
                    'idlibro' => $miLista->idlibro,
                    'nombre' => auth()->user()->name,
                    'tipo' => 'Ha modificado',
                    'campo_actualizado' => $fieldName,
                    'valor_anterior' => $originalValue,
                    'valor_nuevo' => $newValue,
                ]);
            }
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
